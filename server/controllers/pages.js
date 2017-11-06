const Page = require('../models').Page;

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
      .findAll()
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
  }
};
