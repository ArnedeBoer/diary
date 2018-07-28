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

const mainName = 'pages';
const mainColumns = {date, description, active};
const subNames = ['people', 'locations'];
const subColumns = {name, description, active};

let definitions = { [mainName]: mainColumns };
subNames.forEach(subName => { definitions[subName] = subColumns });

let db = {};

Object.keys(definitions).forEach(definition => {
  db[definition] = sequelize.define(definition, definitions[definition],  timestamp);

  if (definition !== mainName) {
    const link = `${mainName}${definition}`;

    db[link] = sequelize.define(link, {}, timestamp);
  }
});

db[mainName].associate = models => {
  subNames.forEach(subName => {
    db[mainName].belongsToMany(models[subName], {
      through: models[`${mainName}${subName}`],
      foreignKey: `${mainName}id`,
      as: subName
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
