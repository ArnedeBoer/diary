const Locations = require('../models').Locations;
const Op = require('sequelize').Op;

module.exports = {
    create(req, res) {
        return Locations
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
                        id: req.body.id,
                        userid: req.body.userid
                    }
                }
            )
            .then(() => res.status(201).send('Success'))
            .catch(error => res.status(400).send(error));
    }
};
