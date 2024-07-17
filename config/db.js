const dotEnv = require('dotenv').config();
const Sequelize = require('sequelize');
const { parsed: { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_DIALECT } } = dotEnv;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_DIALECT
});

module.exports = sequelize;
