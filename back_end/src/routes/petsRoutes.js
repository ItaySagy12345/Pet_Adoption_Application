import express from "express";
import * as petsController from "../controllers/petsController.js";
import * as authorize from "../middleware/authorize.js";
import * as petsMiddleware from '../middleware/petsMiddleware.js';
import multer from "multer";

const upload = multer({ dest: process.env.UPLOAD_FOLDER + "/" });
const router = express.Router();

router
    .route("/")
    .post(authorize.authorizeAdmin,
        upload.single("image"),
        petsMiddleware.convertPetFormDataTypes,
        petsMiddleware.addPetDataValidation,
        petsController.addPet)

    .get(authorize.authorizeAdmin,
        petsController.getPets);

router
    .route("/:id")
    .get(authorize.authorizeUser,
        petsController.getPetById)

    .put(authorize.authorizeAdmin,
        upload.single("image"),
        petsMiddleware.convertPetFormDataTypes,
        petsMiddleware.updatePetDataValidation,
        petsController.updatePet);

router
    .route("/:id/adopt")
    .put(authorize.authorizeUser,
        petsMiddleware.petActionDataValidation,
        petsMiddleware.isAlreadyAdopted,
        petsController.adoptPet);

router
    .route("/:id/foster")
    .put(authorize.authorizeUser,
        petsMiddleware.petActionDataValidation,
        petsMiddleware.isAlreadyFostered,
        petsController.fosterPet);

router
    .route("/:id/return")
    .put(authorize.authorizeUser,
        petsMiddleware.petActionDataValidation,
        petsMiddleware.isAlreadyReturned,
        petsController.returnPet);

router
    .route("/:id/save")
    .post(authorize.authorizeUser,
        petsMiddleware.petActionDataValidation,
        petsController.savePet)

    .delete(authorize.authorizeUser,
        petsMiddleware.petActionDataValidation,
        petsController.unSavePet);

router
    .route("/user/:id")
    .get(authorize.authorizeAdmin,
        petsController.getOwnedPetsByUserId);

router
    .route("/search/criteria")
    .get(authorize.authorizeUser,
        petsController.getPetsBySearchCriteria);

export default router;