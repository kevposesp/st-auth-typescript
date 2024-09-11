import { Sequelize, Dialect } from 'sequelize';
import dbConfig from '../config/db.config';

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT as Dialect
  }
);

export { Sequelize, sequelize };
