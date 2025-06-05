import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(process.cwd(), process.env.SQLITE_DB_PATH),
  logging: false, // true para debug
});

export default sequelize;
