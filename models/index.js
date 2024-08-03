require('dotenv').config();
const Sequelize = require('sequelize');
const config = require('../config');

let sequelize;

sequelize = new Sequelize(
  `${config.MYSQL_DATABASE}`,
  `${config.MYSQL_USERNAME}`,
  config.MYSQL_ROOT_PASSWORD,
  {
    host: config.MYSQL_HOST,
    port: config.MYSQL_DOCKER_PORT,
    dialect: 'mysql',
    operatorsAliases: 0,
    timezone: '+01:00',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./auth')(sequelize, Sequelize);

db.confirmation_token = require('./token')(sequelize,Sequelize)

db.confirmation_token.belongsTo(db.user, { foreignKey: 'user_id' });

db.user.hasMany(db.confirmation_token, { foreignKey: 'user_id' });

db.deposit = require('./deposit')(sequelize,Sequelize)

db.deposit.belongsTo(db.user, { foreignKey: 'user_id' });

db.user.hasMany(db.deposit, { foreignKey: 'user_id' });

db.transaction = require('./transaction')(sequelize,Sequelize)

db.deposit.belongsTo(db.transaction,{foreignKey:'deposite_id'})

db.transaction.hasMany(db.deposit,{foreignKey:'deposite_id'})


db.wallet = require('./wallet')(sequelize,Sequelize)

db.deposit.belongsTo(db.wallet,{foreignKey:'deposite_id'})

db.wallet.hasMany(db.deposit,{foreignKey:'deposite_id'})

db.withdraw = require('./withdraw')(sequelize,Sequelize)

db.withdraw.belongsTo(db.transaction,{foreignKey:'withdraw_id'})

db.transaction.hasMany(db.withdraw,{foreignKey:'withdraw_id'})

db.withdraw.belongsTo(db.wallet,{foreignKey:'wallet_id'})

db.wallet.hasMany(db.withdraw,{foreignKey:'wallet_id'})

db.withdraw.belongsTo(db.user,{foreignKey:'user_id'})

db.user.hasMany(db.withdraw,{foreignKey:'user_id'})

db.wallet.hasMany(db.withdraw,{foreignKey:'wallet_id'})
module.exports = db;
