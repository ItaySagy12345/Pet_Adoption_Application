import * as userSchemas from '../schemas/userSchemas.js';
import Ajv from "ajv";

const ajv = new Ajv();
const validateUpdateUserDetails = ajv.compile(userSchemas.updateUserDetailsSchema.valueOf());
const validateUpdateUserPassword = ajv.compile(userSchemas.updateUserPasswordSchema.valueOf());

export function updateUserDetailsDataValidation(req, res, next) {
    const validUserDetailsUpdate = validateUpdateUserDetails(req.body); //Receives only updated user details:
    validUserDetailsUpdate ? next() : res.status(400).send({ message: validateUpdateUserDetails.errors });
}

export function updateUserPasswordDataValidation(req, res, next) {
    const validUserPasswordUpdate = validateUpdateUserPassword(req.body); //Receives all required password info:
    validUserPasswordUpdate ? next() : res.status(400).send({ message: validateUpdateUserPassword.errors });
}