const Page = require('../models').Page;
const Sessions = require('../models').Sessions;
const PagesLocations = require('../models').PagesLocations;
const PagesPeople = require('../models').PagesPeople;
const Op = require('sequelize').Op;
const moment = require('moment');

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
                return Page
                    .create({
                        date: req.body.date,
                        text: req.body.text,
                        userid: session.userid
                    })
                    .then(page => {
                        req.body.people.forEach(person => {
                            PagesPeople.
                                create({
                                    pageid: page.id,
                                    peopleid: person.id
                                });
                        });
                        req.body.locations.forEach(location => {
                            PagesLocations.
                                create({
                                    pageid: page.id,
                                    locationid: location.id
                                });
                        });
                        res.status(201).send(page);
                    })
                    .catch(error => res.status(400).send(error));
        });
    },
    filter(req, res) {
        const isDate = input => moment(input, 'YYYY-MM-DD', true).isValid();
        const people = req.body.people.map(person => person.id);
        const locations = req.body.locations.map(location => location.id);
        const dateStart = isDate(req.body.dateStart) ? Date.parse(req.body.dateStart) : null;
        const dateEnd = isDate(req.body.dateEnd) ? Date.parse(req.body.dateEnd) : null;
        const hash = req.body.hash;

        return Sessions
            .findOne({
                where: {
                    hash
                }
            })
            .then(session => {
                let filters;

                if (dateStart !== null && dateEnd !== null) {
                    filters = {
                        [Op.and]: {
                            date: {
                                [Op.gte]: dateStart,
                                [Op.lte]: dateEnd
                            },
                            userid: session.userid,
                            active: true
                        }
                    };
                } else if (dateStart !== null) {
                    filters = {
                        [Op.and]: {
                            date: {
                                [Op.gte]: dateStart
                            },
                            userid: session.userid,
                            active: true
                        }
                    };
                } else if (dateEnd !== null) {
                    filters = {
                        [Op.and]: {
                            date: {
                                [Op.lte]: dateEnd
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

                return Page
                    .findAll({
                        where: filters,
                        order: [
                            ['date', 'DESC']
                        ],
                        include: ['people', 'locations']
                    })
                    .then(pages => {
                        const correctPages = pages.filter(page => {
                            let correctPeople;
                            let correctLocations;

                            if (people === null) {
                                correctPeople = true;
                            } else {
                                const peopleIds = page.dataValues.people.map(person => person.dataValues.id);

                                correctPeople = people.every(person => peopleIds.indexOf(person) > -1);
                            }

                            if (locations === null) {
                                correctLocations = true;
                            } else {
                                const locationIds = page.dataValues.locations.map(location => location.dataValues.id);

                                correctLocations = locations.every(location => locationIds.indexOf(location) > -1);
                            }

                            page.dataValues.people = page.dataValues.people.filter(person => person.dataValues.active === true);
                            page.dataValues.locations = page.dataValues.locations.filter(location => location.dataValues.active === true);

                            return correctPeople && correctLocations;
                        });

                        res.status(200).send(correctPages);
                    })
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
                return Page
                    .update(
                        {
                            date: req.body.date,
                            text: req.body.text
                        },
                        {
                            where: {
                                id: req.body.id,
                                userid: session.userid
                            },
                            returning: true
                        }
                    )
                    .then(pages => {
                        const updatedPage = pages[1][0];
                        const pageId = updatedPage.dataValues.id;
                        
                        PagesPeople
                            .destroy({
                                where: {
                                    pageid: pageId
                                }
                            })
                            .then(() => {
                                req.body.people.forEach(person => {
                                    PagesPeople
                                        .create({
                                            pageid: pageId,
                                            peopleid: person.id
                                        });
                                });
                            });
                        PagesLocations
                            .destroy({
                                where: {
                                    pageid: pageId
                                }
                            })
                            .then(() => {
                                req.body.locations.forEach(location => {
                                    PagesLocations
                                        .create({
                                            pageid: pageId,
                                            locationid: location.id
                                        });
                                });
                            });
                        res.status(201).send(updatedPage);
                    })
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
                return Pages
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
                    .then(pages => res.status(201).send(pages))
                    .catch(error => res.status(400).send(error));
            })
    }
};
