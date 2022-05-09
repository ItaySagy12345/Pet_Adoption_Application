import express from "express";
import * as authorize from '../middleware/authorize.js';
import * as usersController from "../controllers/usersController.js";
import * as updateUserMiddleware from '../middleware/updateUserMiddleware.js';
import * as updatePasswordMiddleware from '../middleware/updatePasswordMiddleware.js';

const router = express.Router();

router
    .route("/")
    .get(authorize.authorizeAdmin,
        usersController.getUsers);
router
    .route("/full")
    .get(authorize.authorizeAdmin,
        usersController.getFullUsers);

router
    .route("/:id/")
    .get(authorize.authorizeUser,
        usersController.getUserById);
router
    .route("/:id/password")
    .put(authorize.authorizeUser,
        updateUserMiddleware.updateUserPasswordDataValidation,
        updatePasswordMiddleware.matchNewPasswords,
        updatePasswordMiddleware.compareOldPasswords,
        updatePasswordMiddleware.encryptNewPassword,
        usersController.updateUserPassword);

router
    .route("/:id/userDetails")
    .put(authorize.authorizeUser,
        updateUserMiddleware.updateUserDetailsDataValidation,
        usersController.updateUserDetails);

router
    .route("/:id/full")
    .get(authorize.authorizeUser,
        usersController.getFullUserById);

export default router;