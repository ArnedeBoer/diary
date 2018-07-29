const { mainName, relationNames } = require('./../../shared/defaults.js');
const Op = require('sequelize').Op;
const models = require('../models');

module.exports = {
  create(req, res) {
    const { itemType, name, date, description } = req.body;
    const items = models[itemType];
    const newItem = {name, date, description};

    return items
      .create(newItem)
      .then(item => {
        Object.keys(req.body).forEach(relationType => {
          if (req.body[relationType].constructor === Array) {
            const model = models[`${mainName}${relationType}`];

            req.body[relationType].forEach(relation => {
              model.create({
                [`${mainName}id`]: item.id,
                [`${relationType}id`]: relation.id
              });
            });
          }
        });

        res.status(201).send(item);
      })
      .catch(error => res.status(400).send(error));
  },
  filter(req, res) {
    const { itemType, name, dateStart, dateEnd } = req.body;
    const items = models[itemType];
    const order = itemType === mainName ? ['date', 'DESC'] : ['name', 'ASC'];

    let filters = { active: true };
    let dateFilters = {};

    dateStart && (dateFilters[Op.gte] = Date.parse(dateStart));
    dateEnd && (dateFilters[Op.lte] = Date.parse(dateEnd));
    (dateStart || dateEnd) && (filters.date = dateFilters);

    name && (filters.name = { [Op.iLike]: `%${name}%` });

    const includes = relationNames.map(relationName => ({
      model: models[relationName],
      required: false,
      where: { active: true },
      as: relationName
    }));

    return items
      .findAll({
        include: itemType === mainName ? includes : [],
        where: { [Op.and]: filters },
        order: [order]
      })
      .then(result => {
        if (itemType !== mainName) {
          res.status(200).send(result);
          return;
        }

        const arrayContainsArray = (arr1, arr2) => arr1.every(val => arr2.includes(val));
        let filteredItems = result;

        Object.keys(req.body).forEach(relationType => {
          if (req.body[relationType].constructor === Array) {
            const filterIds = req.body[relationType].map(relation => relation.id);

            filteredItems = filteredItems.filter(item => {
              const itemIds = item.dataValues[relationType].map(relation => relation.id);

              return arrayContainsArray(filterIds, itemIds);
            });
          }
        });

        res.status(200).send(filteredItems);
      })
      .catch(error => res.status(400).send(error));
  },
  edit(req, res) {
    const { itemType, id, name, date, description } = req.body;
    const items = models[itemType];
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
        const updatedItem = result[1][0];
        const itemid = updatedItem.dataValues.id;

        Object.keys(req.body).forEach(relationType => {
          if (req.body[relationType].constructor === Array) {
            const model = models[`${mainName}${relationType}`];

            model
              .destroy({ where: { [`${mainName}id`]: itemid }})
              .then(() => {
                req.body[relationType].forEach(relation => {
                  model.create({
                    [`${mainName}id`]: itemid,
                    [`${relationType}id`]: relation.id
                  });
                });
              });
          }
        });

        res.status(201).send(updatedItem);
      })
      .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
    const { itemType, id } = req.body;
    const items = models[itemType];

    return items
      .update(
        { active: false },
        { where: { id } }
      )
      .then(result => res.status(201).send(result))
      .catch(error => res.status(400).send(error));
  }
};
