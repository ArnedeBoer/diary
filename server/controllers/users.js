const bcrypt = require('bcrypt');
const User = require('../models').User;
const Page = require('../models').Page;
const Sessions = require('../models/').Sessions;
const createHash = require('hash-generator');

module.exports = {
    create(req, res) {
        return User
            .create({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 9),
                displayname: req.body.displayName
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return User
            .findAll({
                include: [{
                    model: Page,
                    as: 'pages',
                }],
            })
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return User
            .findById(req.params.userid, {
                include: [{
                    model: Page,
                    as: 'pages',
                }],
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).send(user);
            })
            .catch(error => res.status(400).send(error));
    },
    findByUsername(req, res) {
        return User
            .findOne({
                where: {
                    username: req.params.username
                }
            })
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },
    login(req, res) {
        return User
            .findOne({
                where: {
                    username: req.body.username
                },
                include: ['sessions']
            })
            .then(user => {
                if (user !== '' && bcrypt.compareSync(req.body.password, user.dataValues.password)) {
                    const id = user.id;
                    const hash = createHash('32');

                    Sessions.create({
                        hash,
                        userid: id
                    });

                    return res.status(200).send({ hash });
                }

                return res.status(400).send('Failed');
            })
            .catch(error => res.status(400).send(error));
    }
};
