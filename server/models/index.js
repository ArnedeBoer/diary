const { mainName, relationNames } = require('./../../shared/defaults.js');
const Sequelize = require('sequelize');
let config;

try { config = require(`${__dirname}/../config/config.json`) }
catch (err) { console.log('Create and configure a /server/config/config.json.') };

const { database, username, password, host, port, protocol, dialect } = config;
const sequelize = new Sequelize(database, username, password, { host, port, protocol, dialect });

const date = { type: Sequelize.DATE, allowNull: false };
const name = { type: Sequelize.STRING, allowNull: false };
const description = { type: Sequelize.TEXT, allowNull: false };
const active = { type: Sequelize.BOOLEAN,  allowNull: false, defaultValue: true };
const timestamp = { timestamps: false};

const mainColumns = {date, description, active};
const subColumns = {name, description, active};

let definitions = { [mainName]: mainColumns };
relationNames.forEach(relationName => { definitions[relationName] = subColumns });

let db = {};

Object.keys(definitions).forEach(definition => {
  db[definition] = sequelize.define(definition, definitions[definition],  timestamp);

  if (definition !== mainName) {
    const link = `${mainName}${definition}`;

    db[link] = sequelize.define(link, {}, timestamp);
  }
});

db[mainName].associate = models => {
  relationNames.forEach(relationName => {
    db[mainName].belongsToMany(models[relationName], {
      through: models[`${mainName}${relationName}`],
      foreignKey: `${mainName}id`,
      as: relationName
    });
  });
};

Object.keys(definitions).forEach(definition => {
  if (definition !== mainName) {
    db[definition].associate = models => {
      db[definition].belongsToMany(models[mainName], {
        through: models[`${mainName}${definition}`],
        foreignKey: `${definition}id`
      });
    };
  }
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
