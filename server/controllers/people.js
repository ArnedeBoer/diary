const People = require('../models').People;
const Op = require('sequelize').Op;

module.exports = {
    create(req, res) {
        return People
            .create({
                name: req.body.name,
                text: req.body.text
            })
            .then(person => res.status(201).send(person))
            .catch(error => res.status(400).send(error));
    },
    filter(req, res) {
        const name = req.body.name;
        let filters;

        if (name !== null) {
            filters = {
                [Op.and]: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    },
                    active: true
                }
            };
        } else {
            filters = {
                [Op.and]: {
                    active: true
                }
            };
        }

        return People
            .findAll({
                where: filters,
                order: [
                    ['name']
                ]
            })
            .then(people => res.status(200).send(people))
            .catch(error => res.status(400).send(error));

    },
    edit(req, res) {
        return People
            .update(
                {
                    name: req.body.name,
                    text: req.body.text
                },
                {
                    where: {
                        id: req.body.id
                    }
                }
            )
            .then(person => res.status(201).send(person))
            .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        return People
            .update(
                {
                    active: false
                },
                {
                    where: {
                        id: req.body.id
                    }
                }
            )
            .then(people => res.status(201).send(people))
            .catch(error => res.status(400).send(error));
    }
};
