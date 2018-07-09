const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const db = {};
let config;

try {
  config = require(`${__dirname}/../config/config.json`)[env];
} catch (err) {
  console.log('Create and configure a /server/config/config.json.');
}

const { database, username, password, host, port, protocol, dialect } = config;
const sequelize = new Sequelize(database, username, password, { host, port, protocol, dialect });

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0)
      && (file !== basename)
      && (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));

    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
