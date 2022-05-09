import * as usersService from '../services/usersService.js';
import bcrypt from 'bcrypt';

export async function compareOldPasswords(req, res, next) {
    const userId = req.auth.user.id;
    const userOldHashPasswordData = await usersService.getPasswordByUserId(userId);
    const [userOldHashPassword] = Object.values(JSON.parse(JSON.stringify(userOldHashPasswordData))[0]);
    const isMatchingPassword = await bcrypt.compare(req.body.oldPassword, userOldHashPassword);
    if (!isMatchingPassword) {
        return res.status(401).send({ message: "Old password is wrong" });
    }
    next();
}

export async function encryptNewPassword(req, res, next) {
    try {
        const saltRounds = await bcrypt.genSalt(3);
        req.body.hashPassword = await bcrypt.hash(req.body.newPassword, saltRounds);
        next();
    } catch (err) {
        next(err);
    }
}

export function matchNewPasswords(req, res, next) {
    const { newPassword, confirmNewPassword } = req.body;
    if (newPassword !== confirmNewPassword) {
        return res.status(400).send({ message: "Passwords don't match" });
    }
    next();
}