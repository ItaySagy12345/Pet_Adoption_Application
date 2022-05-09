import * as DBService from './DBService.js';
import * as library from '../library/library.js';
import * as petsService from '../services/petsService.js';

export async function getUsers() {
    const SQL = 'SELECT userId, isAdmin, firstName, lastName, email, phoneNumber, personalBio FROM users';
    return DBService.Query(SQL);
}

export async function getFullUsers() {
    const users = await getUsers();
    const fullUsers = Promise.all(users.map(async (user) => {
        const fullUser = await getFullUserById(user.userId);
        return fullUser;
    }));
    return fullUsers;
}

export async function getPasswordByUserId(userId) {
    const SQL = `SELECT hashPassword FROM users WHERE userId = '${userId}'`;
    return DBService.Query(SQL);
}

export async function getUserById(userId) {
    const SQL = `SELECT userId, isAdmin, firstName, lastName, email, phoneNumber, personalBio FROM users WHERE userId = '${userId}'`;
    return DBService.Query(SQL);
}

export async function getFullUserById(userId) {
    let user;
    if (!userId.email) {
        //Get user (without pets):
        user = await getUserById(userId);
        user = library.toJSONArray(user);
        user = user[0];
    } else {
        user = userId;
    }

    //Add saved pets to user object:
    user.savedPets = await petsService.getSavedPetsByUserId(user.userId);
    user.savedPets = library.toJSONArray(user.savedPets);
    user.savedPets.forEach((savedPet) => savedPet.name = library.getCapitalizedString(savedPet.name));

    //Add owned pets to user object:
    user.ownedPets = await petsService.getOwnedPetsByUserId(user.userId);
    user.ownedPets = library.toJSONArray(user.ownedPets);
    user.ownedPets.forEach((ownedPet) => ownedPet.name = library.getCapitalizedString(ownedPet.name));

    return user;
}

export async function updateUser(userId, userUpdates) {
    const fieldsToUpdate = Object.entries(userUpdates);
    let queryParameters = '';
    for (let queryParameter = 0; queryParameter < fieldsToUpdate.length; queryParameter++) {
        const [tableColumn, value] = fieldsToUpdate[queryParameter];
        value === '' ? queryParameter++ : queryParameters += `${tableColumn}='${value}', `;
    }
    queryParameters = queryParameters.slice(0, -2);

    const SQL = `UPDATE users SET ${queryParameters} WHERE userId='${userId}'`;
    return DBService.Query(SQL);
}