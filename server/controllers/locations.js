const Locations = require('../models').Locations;
const Op = require('sequelize').Op;

module.exports = {
    create(req, res) {
        return Locations
            .create({
                name: req.body.name,
                text: req.body.text
            })
            .then(location => res.status(201).send(location))
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

        return Locations
            .findAll({
                where: filters,
                order: [
                    ['name']
                ]
            })
            .then(locations => res.status(200).send(locations))
            .catch(error => res.status(400).send(error));
    },
    edit(req, res) {
        return Locations
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
            .then(location => res.status(201).send(location))
            .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        const hash = req.body.hash;

        return Locations
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
            .then(location => res.status(201).send(location))
            .catch(error => res.status(400).send(error));
    }
};
