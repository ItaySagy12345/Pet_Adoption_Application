import * as DBService from './DBService.js';

export async function getUserByEmail(userEmail) {
    const SQL = `SELECT * FROM users WHERE email = '${userEmail}'`;
    return DBService.Query(SQL);
};

export async function addUser(newUser) {
    const SQL = `
            INSERT INTO users (
                userId,
                isAdmin,
                firstName,
                lastName,
                email,
                phoneNumber,
                hashPassword
            ) VALUES (
                '${newUser.userId}',
                false,
                LOWER ('${newUser.firstName}'), 
                LOWER ('${newUser.lastName}'), 
                LOWER ('${newUser.email}'), 
                '${newUser.phoneNumber}',
                '${newUser.hashPassword}'
            )`;

    return DBService.Query(SQL);
}