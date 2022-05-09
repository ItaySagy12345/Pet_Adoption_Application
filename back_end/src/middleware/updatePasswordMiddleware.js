import { NEW_PASSWORD_INCONSISTENCY_ERROR, OLD_PASSWORD_INCONSISTENCY_ERROR } from '../library/constants.js';
import * as usersService from '../services/usersService.js';
import bcrypt from 'bcrypt';

export async function compareOldPasswords(req, res, next) {
    try {
        const userId = req.auth.user.id;
        const userOldHashPasswordData = await usersService.getPasswordByUserId(userId);
        const [userOldHashPassword] = Object.values(JSON.parse(JSON.stringify(userOldHashPasswordData))[0]);
        const isMatchingPassword = await bcrypt.compare(req.body.oldPassword, userOldHashPassword);
        if (!isMatchingPassword) {
            return res.status(400).send({ message: OLD_PASSWORD_INCONSISTENCY_ERROR });
        }
    } catch (err) {
        return res.status(500).send({ message: TECHNICAL_ERROR });
    }
    next();
}

export async function encryptNewPassword(req, res, next) {
    try {
        const saltRounds = await bcrypt.genSalt(3);
        req.body.hashPassword = await bcrypt.hash(req.body.newPassword, saltRounds);
        next();
    } catch (err) {
        return res.status(500).send({ message: TECHNICAL_ERROR });
    }
}

export function matchNewPasswords(req, res, next) {
    const { newPassword, confirmNewPassword } = req.body;
    if (newPassword !== confirmNewPassword) {
        return res.status(400).send({ message: NEW_PASSWORD_INCONSISTENCY_ERROR });
    }
    next();
}