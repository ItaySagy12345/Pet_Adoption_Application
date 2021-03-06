import * as authService from "../services/authService.js";
import * as usersService from '../services/usersService.js';
import * as library from '../utils/library/library.js';
import * as authSchemas from '../schemas/authSchemas.js';
import Ajv from "ajv";
import { DATA_VALIDATION_ERROR, NON_EXISTING_USER_ERROR, TECHNICAL_ERROR } from "../utils/constants/constants.js";

const ajv = new Ajv();
const validateLogIn = ajv.compile(authSchemas.logInSchema.valueOf());

export function logInDataValidation(req, res, next) {
    const validLogIn = validateLogIn(req.body);
    validLogIn ? next() : res.status(400).send({ message: DATA_VALIDATION_ERROR });
}

export async function verifyExistingUser(req, res, next) {
    try {
        //Get logging-in user's ID:
        let existingUser = await authService.getUserByEmail(req.body.email);
        if (existingUser.length === 0) {
            return res.status(400).send({ message: NON_EXISTING_USER_ERROR });
        }
        [existingUser] = library.toJSON(existingUser);

        //Get full logging-in user profile with that ID:
        const fullExistingUser = await usersService.getFullUserById(existingUser);

        //Format existing user object before sending to controller:
        fullExistingUser.password = req.body.password;
        fullExistingUser.hashPassword = existingUser.hashPassword;
        req.body = fullExistingUser;

        next();
    } catch (err) {
        return res.status(500).send({ message: TECHNICAL_ERROR });
    }
}