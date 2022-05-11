import * as petSchemas from '../schemas/petSchemas.js';
import * as petsService from '../services/petsService.js';
import Ajv from "ajv";
import { DATA_VALIDATION_ERROR, GENERAL_EXISTING_PET_OWNER_ERROR, REQUESTOR_EXISTING_PET_OWNER_ERROR, TECHNICAL_ERROR } from '../utils/constants/constants.js';

export function convertPetFormDataTypes(req, res, next) {
    const formData = req.body;
    formData.height && (formData.height = +formData.height);
    formData.weight && (formData.weight = +formData.weight);
    formData.hypoallergenicStatus && (formData.hypoallergenicStatus = +formData.hypoallergenicStatus);
    formData.adoptionStatus && (formData.adoptionStatus = +formData.adoptionStatus);
    next();
}

const ajv = new Ajv();
const validateNewPet = ajv.compile(petSchemas.newPetSchema.valueOf());
const validateUpdatePet = ajv.compile(petSchemas.updatePetSchema.valueOf());
const validateSaveUnSavePet = ajv.compile(petSchemas.saveUnSavePetSchema.valueOf());

export function addPetDataValidation(req, res, next) {
    const validPetAddition = validateNewPet(req.body); //Receives pet:
    validPetAddition ? next() : res.status(400).send({ message: DATA_VALIDATION_ERROR });
}

export function updatePetDataValidation(req, res, next) {
    const validPetUpdate = validateUpdatePet(req.body); //Receives pet:
    validPetUpdate ? next() : res.status(400).send({ message: DATA_VALIDATION_ERROR });
}

export function petActionDataValidation(req, res, next) {
    const validPetSaveUnSave = validateSaveUnSavePet(req.params); //Receives petId
    validPetSaveUnSave ? next() : res.status(400).send({ message: DATA_VALIDATION_ERROR });
}

//AdoptionStatus === 0 : Available
//AdoptionStatus === 1 : Adopted
//AdoptionStatus === 2 : Fostered

export async function isAlreadyAdopted(req, res, next) {
    try {
        const petToAdoptId = req.params.id;
        let petToAdoptData = await petsService.getPetById(petToAdoptId);

        // Check if pet is owned by you:
        if (petToAdoptData[0].userId === req.auth.user.id && petToAdoptData[0].adoptionStatus === 1) {
            return res.status(400).send({ message: REQUESTOR_EXISTING_PET_OWNER_ERROR });
        }

        // Check if pet is owned/fostered by someone else:
        else if (petToAdoptData[0].userId !== req.auth.user.id && petToAdoptData[0].adoptionStatus !== 0) {
            return res.status(400).send({ message: GENERAL_EXISTING_PET_OWNER_ERROR });
        }

        next();
    } catch (err) {
        return res.status(500).send({ message: TECHNICAL_ERROR });
    }
}

export async function isAlreadyFostered(req, res, next) {
    try {
        const petToFosterId = req.params.id;
        let petToFosterData = await petsService.getPetById(petToFosterId);

        // Check if pet is owned by you:
        if (petToFosterData[0].userId === req.auth.user.id &&
            (petToFosterData[0].adoptionStatus === 1 || petToFosterData[0].adoptionStatus === 2)) {
            return res.status(400).send({ message: REQUESTOR_EXISTING_PET_OWNER_ERROR });
        }

        // Check if pet is owned by someone else:
        if (petToFosterData[0].userId !== req.auth.user.id && petToFosterData[0].adoptionStatus !== 0) {
            return res.status(400).send({ message: GENERAL_EXISTING_PET_OWNER_ERROR });
        }

        next();
    } catch (err) {
        return res.status(500).send({ message: TECHNICAL_ERROR });
    }
}

export async function isAlreadyReturned(req, res, next) {
    try {
        const petToReturnId = req.params.id;
        let petToReturnData = await petsService.getPetById(petToReturnId);
        if (!petToReturnData[0].adoptionStatus) {
            return res.status(400).send({ message: PET_ALREADY_RETURNED_ERROR });
        }
        next();
    } catch (err) {
        return res.status(500).send({ message: TECHNICAL_ERROR });
    }
}