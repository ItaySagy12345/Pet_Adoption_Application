import * as library from '../library/library.js';
import * as petsService from '../services/petsService.js';
import * as usersService from '../services/usersService.js';
import { v2 as cloudinary } from "cloudinary";
import { nanoid } from "nanoid";
import fs from "fs";

export async function addPet(req, res, next) {
    try {
        const newPet = req.body;

        //Pet image upload:
        const uploadResult = req.file && (await cloudinary.uploader.upload(req.file.path));
        req.file && uploadResult && fs.promises.unlink(req.file.path);

        //Generating petId:
        newPet.petId = `${nanoid(5)}`;

        //Add pet to DB:
        await petsService.addPet({
            ...newPet,
            image: uploadResult ? uploadResult.secure_url : null
        });

        //Fetch & format updated pet:
        let [addedPet] = await petsService.getPetById(newPet.petId);
        addedPet = library.toJSON(addedPet);

        return res.send(addedPet);
    } catch (err) {
        res.status(500).send({ message: err });
    }
}

export async function getPets(req, res, next) {
    try {
        let pets = await petsService.getPets();
        pets = library.toJSONArray(pets);
        pets.forEach((pet) => pet.name = library.getCapitalizedString(pet.name));
        return res.send(pets);
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}

export async function getPetById(req, res, next) {
    try {
        const petId = req.params;
        let pet = await petsService.getPetById(petId);
        pet = library.toJSON(pet);
        pet.name = library.getCapitalizedString(pet.name);
        return res.send(pet);
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}

export async function getOwnedPetsByUserId(req, res, next) {
    try {
        let ownedPets = await petsService.getOwnedPetsByUserId(req.body.userId);
        ownedPets = library.toJSONArray(ownedPets);
        ownedPets.forEach((pet) => pet.name = library.getCapitalizedString(pet.name));
        return res.send(ownedPets);
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}

export async function updatePet(req, res, next) {
    try {
        const petToUpdate = req.body;

        //Pet image upload:
        const uploadResult = req.file && (await cloudinary.uploader.upload(req.file.path));
        req.file && uploadResult && fs.promises.unlink(req.file.path);

        //Update and fetch updated pet:
        uploadResult && (petToUpdate.image = uploadResult.secure_url);
        await petsService.updatePet(petToUpdate);
        let [updatedPet] = await petsService.getPetById(petToUpdate.petId);
        updatedPet = library.toJSON(updatedPet);

        return res.send(updatedPet);
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}

export async function adoptPet(req, res, next) {
    try {
        const userId = req.auth.user.id;
        const petToAdoptId = req.params.id;
        await petsService.adoptPet(userId, petToAdoptId);
        let updatedAdoptedPet = await petsService.getPetById(petToAdoptId);
        [updatedAdoptedPet] = library.toJSON(updatedAdoptedPet);
        updatedAdoptedPet.name = library.getCapitalizedString(updatedAdoptedPet.name);
        return res.send(updatedAdoptedPet);
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}

export async function fosterPet(req, res, next) {
    try {
        const userId = req.auth.user.id;
        const petToFosterId = req.params.id;
        await petsService.fosterPet(userId, petToFosterId);
        let updatedFosteredPet = await petsService.getPetById(petToFosterId);
        [updatedFosteredPet] = library.toJSON(updatedFosteredPet);
        updatedFosteredPet.name = library.getCapitalizedString(updatedFosteredPet.name);
        return res.send(updatedFosteredPet);
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}

export async function returnPet(req, res, next) {
    try {
        const petToReturnId = req.params.id;
        await petsService.returnPet(petToReturnId);
        let updatedReturnedPet = await petsService.getPetById(petToReturnId);
        [updatedReturnedPet] = library.toJSON(updatedReturnedPet);
        updatedReturnedPet.name = library.getCapitalizedString(updatedReturnedPet.name);
        return res.send(updatedReturnedPet);
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}

export async function savePet(req, res, next) {
    try {
        const userId = req.auth.user.id;
        const petId = req.params.id;
        await petsService.savePet(userId, petId);
        const updatedUser = await usersService.getFullUserById(userId);
        return res.send(updatedUser);
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}

export async function unSavePet(req, res, next) {
    try {
        const userId = req.auth.user.id;
        const petId = req.params.id;
        await petsService.unSavePet(userId, petId);
        const updatedUser = await usersService.getFullUserById(userId);
        return res.send(updatedUser);
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}

export async function getPetsBySearchCriteria(req, res, next) {
    try {
        let searchCriteria = req.query.petSearchCriteria;
        searchCriteria = JSON.parse(searchCriteria);

        //Get and Format petResults:
        let petResults = await petsService.getPetsBySearchCriteria(searchCriteria);
        petResults = library.toJSONArray(petResults);
        petResults.forEach((petResult) => petResult.name = library.getCapitalizedString(petResult.name));

        return res.send(petResults.length !== 0 ? petResults : null);
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}