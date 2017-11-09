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
        const dateStart = isDate(req.body.dateStart) ? Date.parse(req.body.dateStart) : -Infinity;
        const dateEnd = isDate(req.body.dateEnd) ? Date.parse(req.body.dateEnd) : Infinity;
        const filters = {
            date: {
                [Op.and]: {
                    [Op.gte]: dateStart,
                    [Op.lte]: dateEnd
                }
            }
        };

        if (req.body.people !== null) {
            filters.people = {
                [Op.contains]: req.body.people
            };
        }

        if (req.body.locations !== null) {
            filters.locations = {
                [Op.contains]: req.body.locations
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
    }
};
