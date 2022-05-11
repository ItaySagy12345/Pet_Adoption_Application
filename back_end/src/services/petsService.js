import * as DBService from './DBService.js';

export async function addPet(newPet) {
    const SQL = `
        INSERT INTO pets (
            petId,
            userId,
            animalType, 
            name, 
            adoptionStatus, 
            height, 
            weight, 
            color, 
            hypoallergenicStatus, 
            breed, 
            dietaryRestrictions, 
            bio,
            image
        ) VALUES (
            ?,
            ?,
            LOWER (?), 
            LOWER (?), 
            ?,
            ?,
            ?,
            LOWER (?), 
            ?,
            LOWER (?), 
            LOWER (?), 
            LOWER (?),
            ?
        )
    `;

    const SQL_PARAMS = [
        newPet.petId,
        null,
        newPet.animalType,
        newPet.name,
        newPet.adoptionStatus,
        newPet.height,
        newPet.weight,
        newPet.color,
        newPet.hypoallergenicStatus,
        newPet.breed,
        newPet.dietaryRestrictions,
        newPet.bio,
        newPet.image
    ];

    return DBService.QuerySecure(SQL, SQL_PARAMS);
}

export async function getPets() {
    const SQL = `SELECT * FROM pets`;
    return DBService.QuerySecure(SQL);
}

export async function getPetById(petId) {
    const SQL = `SELECT * FROM pets WHERE petId = ?`;
    const SQL_PARAMS = [petId];
    return DBService.QuerySecure(SQL, SQL_PARAMS);
}

export async function getOwnedPetsByUserId(userId) {
    const SQL = `SELECT * FROM pets WHERE userId = ?`;
    const SQL_PARAMS = [userId];
    return DBService.QuerySecure(SQL, SQL_PARAMS);
}

export async function getSavedPetsByUserId(userId) {
    const SQL = `
        SELECT 
            pets.petId, 
            pets.userId, 
            pets.animalType, 
            pets.name, 
            pets.adoptionStatus, 
            pets.height, 
            pets.weight, 
            pets.color, 
            pets.hypoallergenicStatus, 
            pets.breed, 
            pets.dietaryRestrictions, 
            pets.bio,
            pets.image
        FROM saved_pets
        JOIN pets
        ON pets.petId = saved_pets.petId
        WHERE saved_pets.userId = ?
    `;

    const SQL_PARAMS = [userId];

    return DBService.QuerySecure(SQL, SQL_PARAMS);
}

export async function updatePet(petToUpdate) {
    const fieldsToUpdate = Object.entries(petToUpdate);
    let queryParametersString = '';

    for (let queryParameterIndex = 0; queryParameterIndex < fieldsToUpdate.length; queryParameterIndex++) {
        const [tableColumn, value] = fieldsToUpdate[queryParameterIndex];
        if (value === '') {
            queryParameterIndex++;
        } else {
            queryParametersString += `${tableColumn} = ${value === null ? 'NULL' : typeof value === 'number' ? value : `'${value}'`}${queryParameterIndex !== fieldsToUpdate.length - 1 ? ', ' : ''}`;
        }
    }

    const SQL = `UPDATE pets SET ${queryParametersString} WHERE petId = ?`;
    const SQL_PARAMS = [petToUpdate.petId];

    return DBService.QuerySecure(SQL, SQL_PARAMS);
}

export async function adoptPet(userId, petToAdoptId) {
    const SQL = `UPDATE pets SET userId = ?, adoptionStatus = 1 WHERE petId = ?`;
    const SQL_PARAMS = [
        userId,
        petToAdoptId
    ];

    return DBService.QuerySecure(SQL, SQL_PARAMS);
}

export async function fosterPet(userId, petToFosterId) {
    const SQL = `UPDATE pets SET userId = ?, adoptionStatus = 2 WHERE petId = ?`;
    const SQL_PARAMS = [
        userId,
        petToFosterId
    ];

    return DBService.QuerySecure(SQL, SQL_PARAMS);
}

export async function returnPet(petToReturnId) {
    const SQL = `UPDATE pets SET userId = NULL, adoptionStatus = 0 WHERE petId = ?`;
    const SQL_PARAMS = [petToReturnId];

    return DBService.QuerySecure(SQL, SQL_PARAMS);
}

export async function savePet(userId, petId) {
    const SQL = `
        INSERT INTO saved_pets (
            userId, 
            petId
        ) VALUES (
            '${userId}',
            '${petId}'
        )
    `;

    const SQL_PARAMS = [
        userId,
        petId
    ];

    return DBService.QuerySecure(SQL, SQL_PARAMS);
}

export async function unSavePet(userId, petId) {
    const SQL = `DELETE FROM saved_pets WHERE userId = ? AND petId = ?`;
    const SQL_PARAMS = [userId, petId];

    return DBService.QuerySecure(SQL, SQL_PARAMS);
}

export async function getPetsBySearchCriteria(searchCriteria) {
    const fieldsToCheck = Object.entries(searchCriteria);
    const SQL_PARAMS = [];
    let queryParametersString = '';

    const dynamicFieldsDictionary = {
        "breed": (breed) => { return `breed LIKE '%${breed.slice(1, -1)}%'`; },
        "minHeight": (minHeight) => { return `height >= ${minHeight}`; },
        "maxHeight": (maxHeight) => { return `height <= ${maxHeight}`; },
        "minWeight": (minWeight) => { return `weight >= ${minWeight}`; },
        "maxWeight": (maxWeight) => { return `weight <= ${maxWeight}`; }
    };

    for (let queryParameterIndex = 0; queryParameterIndex < fieldsToCheck.length; queryParameterIndex++) {
        const [tableColumn, value] = fieldsToCheck[queryParameterIndex];
        let dynamicFieldsDictionaryFunc = dynamicFieldsDictionary[tableColumn];

        //Check if param is defined in dictionary:
        if (dynamicFieldsDictionaryFunc) {
            queryParametersString += `${dynamicFieldsDictionaryFunc(value)} ${queryParameterIndex !== fieldsToCheck.length - 1 ? 'AND ' : ''}`;
        }
        //Check if param is adoptionStatus (to include fostered pets):
        else if (tableColumn === 'adoptionStatus' && value === 1) {
            queryParametersString += `${'(adoptionStatus = 1 OR adoptionStatus = 2)'} ${queryParameterIndex !== fieldsToCheck.length - 1 ? 'AND ' : ''}`;
        }
        //Default:
        else {
            queryParametersString += `${tableColumn} = ? ${queryParameterIndex !== fieldsToCheck.length - 1 ? 'AND ' : ''}`;
            SQL_PARAMS.push(`${typeof value === 'number' ? value : `${value}`}`);
        }
    }

    const SQL = `SELECT * FROM pets ${queryParametersString !== '' ? `WHERE ${queryParametersString}` : ''}`;
    return DBService.QuerySecure(SQL, SQL_PARAMS);
}