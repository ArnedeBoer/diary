const People = require('../models').People;
const Op = require('sequelize').Op;

module.exports = {
    create(req, res) {
        return People
            .create({
                name: req.body.name,
                text: req.body.text,
                userid: req.params.userid
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },
    filter(req, res) {
        const name = req.body.name;

        const filters = {};

        if (name !== null) {
            filters.name = {
                [Op.iLike]: `${name}%`
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
                        id: req.body.id,
                        userid: req.body.userid
                    }
                }
            )
            .then(person => res.status(201).send(person))
            .catch(error => res.status(400).send(error));
    }
};
