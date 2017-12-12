const People = require('../models').People;
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
                return People
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
                                [Op.iLike]: `${name}%`
                            },
                            userid: {
                                [Op.eq]: session.userid
                            }
                        }
                    };
                } else {
                    filters = {
                        userid: session.userid
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
                return People
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
                    .then(person => res.status(201).send(person))
                    .catch(error => res.status(400).send(error));
            });
    }
};
