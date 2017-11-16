const Page = require('../models').Page;
const Op = require('sequelize').Op;
const moment = require('moment');

module.exports = {
    create(req, res) {
        return Page
            .create({
                date: req.body.date,
                text: req.body.text,
                people: req.body.people,
                locations: req.body.locations,
                userid: req.params.userid
            })
            .then(page => res.status(201).send(page))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Page
            .findAll({
                order: [
                    ['date', 'DESC']
                ]
            })
            .then(pages => res.status(200).send(pages))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Page
            .findById(req.params.postid)
            .then(page => {
                if (!page) {
                    return res.status(404).send({
                        message: 'Post Not Found',
                    });
                }
                return res.status(200).send(page);
            })
            .catch(error => res.status(400).send(error));
    },
    filter(req, res) {
        const isDate = input => moment(input, 'YYYY-MM-DD', true).isValid();
        const people = req.body.people;
        const locations = req.body.locations;
        const dateStart = isDate(req.body.dateStart) ? Date.parse(req.body.dateStart) : null;
        const dateEnd = isDate(req.body.dateEnd) ? Date.parse(req.body.dateEnd) : null;

        const filters = {};

        if (dateStart !== null && dateEnd !== null) {
            filters.date = {
                [Op.gte]: dateStart,
                [Op.lte]: dateEnd
            };
        } else if (dateStart !== null) {
            filters.date = {
                [Op.gte]: dateStart
            };
        } else if (dateEnd !== null) {
            filters.date = {
                [Op.lte]: dateEnd
            };
        }

        if (people !== null) {
            filters.people = {
                [Op.contains]: people
            };
        }

        if (locations !== null) {
            filters.locations = {
                [Op.contains]: locations
            };
        }

        return Page
            .findAll({
                where: filters,
                order: [
                    ['date', 'DESC']
                ]
            })
            .then(pages => res.status(200).send(pages))
            .catch(error => res.status(400).send(error));
    },
    edit(req, res) {
        return Page
            .update(
                {
                    text: req.body.text,
                    people: req.body.people,
                    locations: req.body.locations
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
