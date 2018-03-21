const Locations = require('../models').Locations;
const Sessions = require('../models').Sessions;
const Op = require('sequelize').Op;

module.exports = {
    create(req, res) {
        const hash = req.body.hash;

        return Sessions
            .findOne({
                where: {
                    hash
                }
            })
            .then(session => {
                return Locations
                    .create({
                        name: req.body.name,
                        text: req.body.text,
                        userid: session.userid
                    })
                    .then(user => res.status(201).send(user))
                    .catch(error => res.status(400).send(error));
            });
    },
    filter(req, res) {
        const name = req.body.name;
        const hash = req.body.hash;

        return Sessions
            .findOne({
                where: {
                    hash
                }
            })
            .then(session => {
                let filters;

                if (name !== null) {
                    filters = {
                        [Op.and]: {
                            name: {
                                [Op.iLike]: `%${name}%`
                            },
                            userid: session.userid,
                            active: true
                        }
                    };
                } else {
                    filters = {
                        [Op.and]: {
                            userid: session.userid,
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
            });
    },
    edit(req, res) {
        const hash = req.body.hash;

        return Sessions
            .findOne({
                where: {
                    hash
                }
            })
            .then(session => {
                return Locations
                    .update(
                        {
                            name: req.body.name,
                            text: req.body.text
                        },
                        {
                            where: {
                                id: req.body.id,
                                userid: session.userid
                            }
                        }
                    )
                    .then(location => res.status(201).send(location))
                    .catch(error => res.status(400).send(error));
            });
    },
    delete(req, res) {
        const hash = req.body.hash;

        return Sessions
            .findOne({
                where: {
                    hash
                }
            })
            .then(session => {
                return Locations
                    .update(
                        {
                            active: false
                        },
                        {
                            where: {
                                id: req.body.id,
                                userid: session.userid
                            }
                        }
                    )
                    .then(location => res.status(201).send(location))
                    .catch(error => res.status(400).send(error));
            })
    }
};
