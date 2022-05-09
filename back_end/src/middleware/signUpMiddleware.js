import * as authSchemas from '../schemas/authSchemas.js';
import * as authService from "../services/authService.js";
import bcrypt from 'bcrypt';
import Ajv from "ajv";

const ajv = new Ajv();
const validateSignUp = ajv.compile(authSchemas.signUpSchema.valueOf());

export function signUpDataValidation(req, res, next) {
    const validSignUp = validateSignUp(req.body);
    validSignUp ? next() : res.status(400).send({ message: validateSignUp.errors });
}

export async function verifyNewUser(req, res, next) {
    try {
        const existingUser = await authService.getUserByEmail(req.body.email);
        if (existingUser.length !== 0) {
            throw 'Already signed up';
        }
        next();
    } catch (err) {
        return res.status(400).json({ message: err });
    }
}

export function matchPasswords(req, res, next) {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).send({ message: "Passwords don't match" });
    }
    next();
}

export async function encryptPassword(req, res, next) {
    try {
        const saltRounds = await bcrypt.genSalt(3);
        req.body.hashPassword = await bcrypt.hash(req.body.password, saltRounds);
        next();
    } catch (err) {
        next(err);
    }
}