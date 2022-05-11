import { AUTHORIZATION_ERROR, INVALID_TOKEN_ERROR } from '../utils/constants/constants.js';
import jwt from 'jsonwebtoken';
import "dotenv/config";

export async function authorizeUser(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send({ message: INVALID_TOKEN_ERROR });
        }
        const authorizedUser = jwt.verify(token, process.env.TOKEN_KEY);
        req.auth = authorizedUser;
        next();
    } catch (err) {
        return res.status(401).send({ message: TECHNICAL_ERROR });
    }
}

export async function authorizeAdmin(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send({ message: INVALID_TOKEN_ERROR });
        }
        const authorizedUser = jwt.verify(token, process.env.TOKEN_KEY);
        req.auth = authorizedUser;
        authorizedUser.user.isAdmin ? next() : res.status(401).send({ message: AUTHORIZATION_ERROR });
    } catch (err) {
        return res.status(401).send({ message: TECHNICAL_ERROR });
    }
}
