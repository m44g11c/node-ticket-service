var Sequelize = require('sequelize');
const ticket = require("../models").ticket;

module.exports = {
    create(req, res) {
        return ticket
            .create({
                uuid: req.body.uuid,
                user_uuid: req.body.user_uuid,
                price: req.body.price,
                subject: req.body.subject,
                body: req.body.body,
                status_id: req.body.status_id,
            })
            .then(ticket => res.status(201).send(ticket))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return ticket
            .update({
                    name: req.body.name,
                    size: req.body.size,
                    price: req.body.price,
                    status: req.body.status
                },
                {returning: true, where: {id: req.params.id}})
            .then(([rowsUpdate, [updatedRow]]) => res.status(200).send(updatedRow))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {

        return ticket
            // .findAll(whereCondition)
            .findAll()
            .then(tickets => res.status(200).send(tickets))
            .catch(error => res.status(400).send(error));
    },

    retrieve(req, res) {
        return ticket
            .findOne({
                where: {
                    uuid: req.params.id
                }
            })
            .then(ticket => {
                if (!ticket) {
                    throw({
                        "name": "ValidationError",
                        "errors": [
                            {
                                message: 'Item not found'
                            }
                        ]
                    });
                }
                return res.status(200).send(ticket);
            })
            .catch(error => res.status(400).send(error));
    },

    delete(req, res) {
        return ticket
            .destroy({
                where: {
                    uuid: req.params.id
                }
            })
            .then(rowDeleted => {
                if (rowDeleted !== 1) {
                    throw({
                        "name": "ValidationError",
                        "errors": [
                            {
                                message: 'Item not found'
                            }
                        ]
                    });
                }
                return res.status(200).json({message: "Deleted successfully"});
            })
            .catch(error => res.status(400).send(error));
    }

};
