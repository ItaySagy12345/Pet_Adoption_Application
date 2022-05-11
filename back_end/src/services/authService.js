import * as DBService from './DBService.js';

export async function getUserByEmail(userEmail) {
    const SQL = `SELECT * FROM users WHERE email = ?`;
    const SQL_PARAMS = [userEmail];
    return DBService.QuerySecure(SQL, SQL_PARAMS);
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
            ?,
            ?,
            LOWER (?), 
            LOWER (?), 
            LOWER (?), 
            ?,
            ?
        )
    `;
    const SQL_PARAMS = [
        newUser.userId,
        false,
        newUser.firstName,
        newUser.lastName,
        newUser.email,
        newUser.phoneNumber,
        newUser.hashPassword
    ];

    return DBService.QuerySecure(SQL, SQL_PARAMS);
}