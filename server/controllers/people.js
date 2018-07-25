const people = require('../models').people;
const Op = require('sequelize').Op;

module.exports = {
  create(req, res) {
    return people
      .create({
        name: req.body.name,
        description: req.body.description
      })
      .then(result => res.status(201).send(result))
      .catch(error => res.status(400).send(error));
  },
  filter(req, res) {
    const name = req.body.name || '';
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

    return people
      .findAll({
        where: filters,
        order: [
          ['name']
        ]
      })
      .then(result => res.status(200).send(result))
      .catch(error => res.status(400).send(error));

  },
  edit(req, res) {
    return people
      .update(
        {
          name: req.body.name,
          description: req.body.description
        },
        {
          where: {
            id: req.body.id
          }
        }
      )
      .then(result => res.status(201).send(result))
      .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
    return people
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
