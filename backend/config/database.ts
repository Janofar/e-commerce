
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'test',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
  host: process.env.DB_HOST || 'localhost',
  port: 3306, 
  dialect: 'mysql',
});

export default sequelize;
