import mysql from 'mysql';
import "dotenv/config";

const DB_CONFIG = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: false
};

export const DB_CONNECTION = mysql.createConnection(DB_CONFIG);