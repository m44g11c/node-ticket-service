var Sequelize = require('sequelize');
const ticket = require("../db/models").ticket;
const uuidv4 = require('uuid/v4');
const {body, validationResult} = require('express-validator');


const getPagination = (page, size) => {
    const limit = size ? +size : 15;
    const offset = page ? page * limit : 0;

    return {limit, offset};
}

const getPagingData = (data, page, limit) => {
    const {count: totalItems, rows: tickets} = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return {totalItems, tickets, totalPages, currentPage};
}

module.exports = {
    validate(method) {
        switch (method) {
            case 'create': {
                return [
                    body('object_uuid').isUUID(4),
                    body('subject').isLength({min: 1, max: undefined}),
                    body('body').isLength({min: 1, max:undefined}),
                    body('status_id').isUUID(4)
                ]
            }
            case 'update': {
                return [
                    body('object_uuid').isUUID(4),
                    body('subject').isLength({min: 1, max: undefined}),
                    body('body').isLength({min: 1, max:undefined}),
                    body('status_id').isUUID(4)
                ]
            }
        }
    },

    param(req, res, next, uuid) {
        ticket.findOne({where: {uuid: uuid}}).then(function (ticket) {
            if (!ticket) {
                return res.sendStatus(404);
            }
            req.ticket = ticket;

            return next();
        }).catch(next);
    },

    retrieve(req, res) {
        res.send(req.ticket);
    },

    delete(req, res) {
        req.ticket.destroy();

        return res.status(204).send();
    },

    create(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({errors: errors.array()})
            return;
        }

        const {object_uuid, subject, body, status_id} = req.body

        return ticket
            .create({
                uuid: uuidv4(),
                object_uuid,
                subject,
                body,
                status_id
            })
            .then(ticket => res.status(201).send(ticket))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({errors: errors.array()})
            return;
        }

        req.ticket.object_uuid = req.body.object_uuid;
        req.ticket.subject = req.body.subject;
        req.ticket.body = req.body.body;
        req.ticket.status_id = req.body.status_id;

        req.ticket.save({fields: ['object_uuid', 'subject', 'body', 'status_id']});

        return res.status(201).send(req.ticket);
    },

    list(req, res) {

        const {page, size} = req.query;
        const {limit, offset} = getPagination(page, size);

        return ticket
            .findAndCountAll({
                limit,
                offset
            })
            .then(
                data => {
                    const response = getPagingData(data, page, limit);
                    res.send(response);
                }
            )
            .catch(error => res.status(400).send(error));
    }

};
