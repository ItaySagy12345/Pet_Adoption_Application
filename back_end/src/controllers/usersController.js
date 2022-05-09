import * as usersService from '../services/usersService.js';
import * as library from '../library/library.js';
import { TECHNICAL_ERROR } from '../library/constants.js';

export async function getUsers(req, res, next) {
    try {
        let allUsers = await usersService.getUsers();
        allUsers = library.toJSONArray(allUsers);
        allUsers.forEach((user) => {
            user.firstName = library.getCapitalizedString(user.firstName);
            user.lastName = library.getCapitalizedString(user.lastName);
        });
        return res.send(allUsers);
    } catch (err) {
        return res.status(500).send({ message: TECHNICAL_ERROR });
    }
}

export async function getFullUsers(req, res, next) {
    try {
        let fullUsers = await usersService.getFullUsers();
        fullUsers = library.toJSONArray(fullUsers);
        fullUsers.forEach((fullUser) => {
            fullUser.firstName = library.getCapitalizedString(fullUser.firstName);
            fullUser.lastName = library.getCapitalizedString(fullUser.lastName);
        });
        return res.send(fullUsers);
    } catch (err) {
        return res.status(500).send({ message: TECHNICAL_ERROR });
    }
}

export async function getUserById(req, res, next) {
    try {
        let user = await usersService.getUserById(req.body.userId);
        user = library.toJSON(user);
        return res.send(user);
    } catch (err) {
        return res.status(500).send({ message: TECHNICAL_ERROR });
    }
}

export async function getFullUserById(req, res, next) {
    try {
        let fullUser = await usersService.getFullUserById(req.body.userId);
        fullUser = library.toJSON(fullUser);
        return res.send(fullUser);
    } catch (err) {
        return res.status(500).send({ message: TECHNICAL_ERROR });
    }
}

export async function updateUserDetails(req, res, next) {
    try {
        const userId = req.auth.user.id;
        let updatedUser = req.body;
        await usersService.updateUser(userId, updatedUser);
        updatedUser = await usersService.getFullUserById(userId);
        return res.send(updatedUser);
    } catch (err) {
        return res.status(500).send({ message: TECHNICAL_ERROR });
    }
}

export async function updateUserPassword(req, res, next) {
    try {
        const userId = req.auth.user.id;
        const userUpdates = { 'hashPassword': `${req.body.hashPassword}` };
        await usersService.updateUser(userId, userUpdates);
        return res.status(200).send();
    } catch (err) {
        return res.status(500).send({ message: TECHNICAL_ERROR });
    }
}