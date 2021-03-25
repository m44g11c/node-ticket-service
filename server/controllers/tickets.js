var Sequelize = require('sequelize');
const ticket = require("../db/models").ticket;
const uuidv4 = require('uuid/v4');

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
    param(req, res, next, uuid) {
        ticket.findOne({where: {uuid: uuid}}).then(function (ticket) {
            if (!ticket) { return res.sendStatus(404); }
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
        return ticket
            .create({
                uuid: uuidv4(),
                object_uuid: req.body.object_uuid,
                price: req.body.price,
                subject: req.body.subject,
                body: req.body.body,
                status_id: req.body.status_id,
            })
            .then(ticket => res.status(201).send(ticket))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        req.ticket.uuid = req.body.uuid;
        req.ticket.object_uuid = req.body.object_uuid;
        req.ticket.subject = req.body.subject;
        req.ticket.body = req.body.body;
        req.ticket.status_id = req.body.status_id;

        req.ticket.save({fields: ['uuid', 'object_uuid', 'subject', 'body', 'status_id']});

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
