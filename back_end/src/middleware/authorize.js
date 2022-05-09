import jwt from 'jsonwebtoken';
import "dotenv/config";

const authorizationErrorMessage = "Error in Authorization";
const invalidTokenErrorMessage = "Invalid token";

export async function authorizeUser(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw invalidTokenErrorMessage;
        }
        const authorizedUser = jwt.verify(token, process.env.TOKEN_KEY);
        req.auth = authorizedUser;
        next();
    } catch (err) {
        return res.status(401).send({ message: authorizationErrorMessage });
    }
}

export async function authorizeAdmin(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw invalidTokenErrorMessage;
        }
        const authorizedUser = jwt.verify(token, process.env.TOKEN_KEY);
        req.auth = authorizedUser;
        authorizedUser.user.isAdmin ? next() : res.status(401).send({ message: 'Unauthorized entry' });
    } catch (err) {
        return res.status(401).send({ message: authorizationErrorMessage });
    }
}
