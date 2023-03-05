import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const dbDial = process.env.DB_DIAL;

const db = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: dbDial,
});

export default db;
