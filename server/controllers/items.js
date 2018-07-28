const pageslocations = require('../models').pageslocations;
const pagespeople = require('../models').pagespeople;
const People = require('../models').people;
const Locations = require('../models').locations;
const Op = require('sequelize').Op;

module.exports = {
  create(req, res) {
    const { itemType, name, date, description, people, locations } = req.body;
    const items = require('../models')[itemType];
    const newItem = {name, date, description};

    return items
      .create(newItem)
      .then(page => {
        const pagesid = page.id;

        !!people && people.forEach(person => {
            pagespeople.create({ pagesid, peopleid: person.id });
          });

        !!locations && locations.forEach(location => {
            pageslocations.create({ pagesid, locationsid: location.id });
          });

        res.status(201).send(page);
      })
      .catch(error => res.status(400).send(error));
  },
  filter(req, res) {
    const { itemType, name, dateStart, dateEnd, people, locations } = req.body;
    const items = require('../models')[itemType];
    const order = itemType === 'pages' ? 'date' : 'name';
    const filterPeopleIds = people ? people.map(person => person.id) : [];
    const filterLocationIds = locations ? locations.map(location => location.id) : [];

    let filters = { active: true };
    let dateFilters = {};

    dateStart && (dateFilters[Op.gte] = Date.parse(dateStart));
    dateEnd && (dateFilters[Op.lte] = Date.parse(dateEnd));
    (dateStart || dateEnd) && (filters.date = dateFilters);

    name && (filters.name = { [Op.iLike]: `%${name}%` });

    const includes = [
      { model: People, required: false, where: { active: true }, as: 'people' },
      { model: Locations, required: false, where: { active: true }, as: 'locations' }
    ];

    return items
      .findAll({
        include: itemType === 'pages' ? includes : [],
        where: { [Op.and]: filters },
        order: [[order, 'DESC']]
      })
      .then(result => {
        if (itemType !== 'pages') {
          res.status(200).send(result);
          return;
        }

        const correctPages = result.filter(page => {
          const arrayContainsArray = (arr1, arr2) => arr1.every(person => arr2.includes(person))
          const pagePeopleIds = page.dataValues.people.map(person => person.dataValues.id);
          const pageLocationIds = page.dataValues.locations.map(location => location.dataValues.id);

          return arrayContainsArray(filterPeopleIds, pagePeopleIds) && arrayContainsArray(filterLocationIds, pageLocationIds);
        });

        res.status(200).send(correctPages);
      })
      .catch(error => res.status(400).send(error));
  },
  edit(req, res) {
    const { itemType, id, name, date, description, people, locations } = req.body;
    const items = require('../models')[itemType];
    const newItem = {name, date, description};

    return items
      .update(
        newItem,
        {
          where: { id },
          returning: true
        }
      )
      .then(result => {
        const updatedPage = result[1][0];
        const pagesid = updatedPage.dataValues.id;

        !!people && pagespeople
          .destroy({ where: { pagesid } })
          .then(() => {
            people.forEach(person => {
              pagespeople.create({ pagesid, peopleid: person.id });
            });
          });

        !!locations && pageslocations
          .destroy({ where: { pagesid } })
          .then(() => {
            locations.forEach(location => {
              pageslocations.create({ pagesid, locationsid: location.id });
            });
          });

        res.status(201).send(updatedPage);
      })
      .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
    const { itemType, id } = req.body;
    const items = require('../models')[itemType];

    return items
      .update(
        { active: false },
        { where: { id } }
      )
      .then(result => res.status(201).send(result))
      .catch(error => res.status(400).send(error));
  }
};
