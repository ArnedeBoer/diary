const pages = require('../models').pages;
const pageslocations = require('../models').pageslocations;
const pagespeople = require('../models').pagespeople;
const Op = require('sequelize').Op;
const moment = require('moment');

module.exports = {
  create(req, res) {
    return pages
      .create({
        date: req.body.date,
        description: req.body.description
      })
      .then(page => {
        req.body.people.forEach(person => {
          pagespeople.
            create({
              pageid: page.id,
              peopleid: person.id
            });
        });
        req.body.locations.forEach(location => {
          pageslocations.
            create({
              pageid: page.id,
              locationid: location.id
            });
        });
        res.status(201).send(page);
      })
      .catch(error => res.status(400).send(error));
  },
  filter(req, res) {
    const isDate = input => moment(input, 'YYYY-MM-DD', true).isValid();
    const people = req.body.people.map(person => person.id);
    const locations = req.body.locations.map(location => location.id);
    const dateStart = isDate(req.body.dateStart) ? Date.parse(req.body.dateStart) : null;
    const dateEnd = isDate(req.body.dateEnd) ? Date.parse(req.body.dateEnd) : null;

    let filters;

    if (dateStart !== null && dateEnd !== null) {
      filters = {
        [Op.and]: {
          date: {
            [Op.gte]: dateStart,
            [Op.lte]: dateEnd
          },
          active: true
        }
      };
    } else if (dateStart !== null) {
      filters = {
        [Op.and]: {
          date: {
            [Op.gte]: dateStart
          },
          active: true
        }
      };
    } else if (dateEnd !== null) {
      filters = {
        [Op.and]: {
          date: {
            [Op.lte]: dateEnd
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

    return pages
      .findAll({
        where: filters,
        order: [
          ['date', 'DESC']
        ],
        include: ['people', 'locations']
      })
      .then(result => {
        const correctPages = result.filter(page => {
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
  },
  edit(req, res) {
    return pages
      .update(
        {
          date: req.body.date,
          description: req.body.description
        },
        {
          where: {
            id: req.body.id
          },
          returning: true
        }
      )
      .then(result => {
        const updatedPage = result[1][0];
        const pageId = updatedPage.dataValues.id;

        pagespeople
          .destroy({
            where: {
              pageid: pageId
            }
          })
          .then(() => {
            req.body.people.forEach(person => {
              pagespeople
                .create({
                  pageid: pageId,
                  peopleid: person.id
                });
            });
          });
        pageslocations
          .destroy({
            where: {
              pageid: pageId
            }
          })
          .then(() => {
            req.body.locations.forEach(location => {
              pageslocations
                .create({
                  pageid: pageId,
                  locationid: location.id
                });
            });
          });
        res.status(201).send(updatedPage);
      })
      .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
    return pages
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
      .then(result => res.status(201).send(result))
      .catch(error => res.status(400).send(error));
  }
};
