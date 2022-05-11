import * as authSchemas from '../schemas/authSchemas.js';
import * as authService from "../services/authService.js";
import { DATA_VALIDATION_ERROR, EXISTING_USER_ERROR, NEW_PASSWORD_INCONSISTENCY_ERROR, TECHNICAL_ERROR } from '../utils/constants/constants.js';
import bcrypt from 'bcrypt';
import Ajv from "ajv";

const ajv = new Ajv();
const validateSignUp = ajv.compile(authSchemas.signUpSchema.valueOf());

export function signUpDataValidation(req, res, next) {
    const validSignUp = validateSignUp(req.body);
    validSignUp ? next() : res.status(400).send({ message: DATA_VALIDATION_ERROR });
}

export async function verifyNewUser(req, res, next) {
    try {
        const existingUser = await authService.getUserByEmail(req.body.email);
        if (existingUser.length !== 0) {
            return res.status(400).send({ message: EXISTING_USER_ERROR });
        }
        next();
    } catch (err) {
        return res.status(500).send({ message: TECHNICAL_ERROR });
    }
}

export function matchPasswords(req, res, next) {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).send({ message: NEW_PASSWORD_INCONSISTENCY_ERROR });
    }
    next();
}

export async function encryptPassword(req, res, next) {
    try {
        const saltRounds = await bcrypt.genSalt(3);
        req.body.hashPassword = await bcrypt.hash(req.body.password, saltRounds);
        next();
    } catch (err) {
        return res.status(500).send({ message: TECHNICAL_ERROR });
    }
}