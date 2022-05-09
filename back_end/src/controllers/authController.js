import * as authService from "../services/authService.js";
import * as library from '../library/library.js';
import { nanoid } from "nanoid";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import "dotenv/config";

export async function signUp(req, res, next) {
    try {
        const newUser = req.body;

        //Delete raw password details:
        delete newUser.password;
        delete newUser.confirmPassword;

        //Give new user an ID:
        newUser.userId = `${nanoid(5)}`;

        //Add new user to DB:
        await authService.addUser(newUser);

        //Return newUser object back to client:
        return res.send(newUser);
    } catch (err) {
        return res.status(400).send({ message: err });
    }
}

export async function logIn(req, res, next) {
    try {
        const user = req.body;

        // Authentication: 
        const isMatchingPassword = await bcrypt.compare(user.password, user.hashPassword);
        if (!isMatchingPassword) {
            return res.status(401).send("Email or password is wrong!");
        }
        delete user.password;
        delete user.hashPassword;

        // Authorization:
        const token = jwt.sign(
            {
                user: {
                    id: user.userId,
                    isAdmin: user.isAdmin
                }
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: '24h'
            }
        );
        res.cookie("token", token, { httpOnly: true });

        return res.send({
            ...user,
            firstName: library.getCapitalizedString(user.firstName),
            lastName: library.getCapitalizedString(user.lastName),
            email: user.email.toLowerCase()
        });
    } catch (err) {
        return res.status(400).send({ message: err });
    }
}

export async function logOut(req, res, next) {
    return res.clearCookie("token").status(200).send();
}