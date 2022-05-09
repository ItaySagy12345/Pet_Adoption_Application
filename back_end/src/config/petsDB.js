import mysql from 'mysql';

const DB_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'practice_db',
    multipleStatements: false
};

export const DB_CONNECTION = mysql.createConnection(DB_CONFIG);