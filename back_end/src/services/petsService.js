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
            '${newPet.petId}',
            NULL,
            LOWER ('${newPet.animalType}'), 
            LOWER ('${newPet.name}'), 
            ${newPet.adoptionStatus},
            ${newPet.height},
            ${newPet.weight},
            LOWER ('${newPet.color}'), 
            ${newPet.hypoallergenicStatus},
            LOWER ('${newPet.breed}'), 
            LOWER ('${newPet.dietaryRestrictions}'), 
            LOWER ('${newPet.bio}'),
            '${newPet.image}'
        )`;

    return DBService.Query(SQL);
}

export async function getPets() {
    const SQL = `SELECT * FROM pets`;
    return DBService.Query(SQL);
}

export async function getPetById(petId) {
    const SQL = `SELECT * FROM pets WHERE petId = '${petId}'`;
    return DBService.Query(SQL);
}

export async function getOwnedPetsByUserId(userId) {
    const SQL = `SELECT * FROM pets WHERE userId = '${userId}'`;
    return DBService.Query(SQL);
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
        WHERE saved_pets.userId = '${userId}'
    `;

    return DBService.Query(SQL);
}

export async function updatePet(petToUpdate) {
    const fieldsToUpdate = Object.entries(petToUpdate);
    let queryParametersString = '';
    for (let queryParameterIndex = 0; queryParameterIndex < fieldsToUpdate.length; queryParameterIndex++) {
        const [tableColumn, value] = fieldsToUpdate[queryParameterIndex];
        value === '' ? queryParameterIndex++ : queryParametersString += `${tableColumn} = ${value === null ? 'NULL' : typeof value === 'number' ? value : `'${value}'`}${queryParameterIndex !== fieldsToUpdate.length - 1 ? ', ' : ''}`;
    }

    const SQL = `UPDATE pets SET ${queryParametersString} WHERE petId = '${petToUpdate.petId}'`;
    return DBService.Query(SQL);
}

export async function adoptPet(userId, petToAdoptId) {
    const SQL = `UPDATE pets SET userId = '${userId}', adoptionStatus = 1 WHERE petId = '${petToAdoptId}'`;
    return DBService.Query(SQL);
}

export async function fosterPet(userId, petToFosterId) {
    const SQL = `UPDATE pets SET userId = '${userId}', adoptionStatus = 2 WHERE petId = '${petToFosterId}'`;
    return DBService.Query(SQL);
}

export async function returnPet(petToReturnId) {
    const SQL = `UPDATE pets SET userId = NULL, adoptionStatus = 0 WHERE petId = '${petToReturnId}'`;
    return DBService.Query(SQL);
}

export async function savePet(userId, petId) {
    const SQL = `
        INSERT INTO saved_pets (
            userId, 
            petId
        ) VALUES (
            '${userId}',
            '${petId}'
        )`;
    return DBService.Query(SQL);
}

export async function unSavePet(userId, petId) {
    const SQL = `DELETE FROM saved_pets WHERE userId = '${userId}' AND petId = '${petId}'`;
    return DBService.Query(SQL);
}

export async function getPetsBySearchCriteria(searchCriteria) {
    const fieldsToCheck = Object.entries(searchCriteria);
    const dynamicFieldsDictionary = {
        "breed": (breed) => { return `breed LIKE '%${breed.slice(1, -1)}%'`; },
        "minHeight": (minHeight) => { return `height >= ${minHeight}`; },
        "maxHeight": (maxHeight) => { return `height <= ${maxHeight}`; },
        "minWeight": (minWeight) => { return `weight >= ${minWeight}`; },
        "maxWeight": (maxWeight) => { return `weight <= ${maxWeight}`; }
    };
    let queryParametersString = '';
    for (let queryParameterIndex = 0; queryParameterIndex < fieldsToCheck.length; queryParameterIndex++) {
        const [tableColumn, value] = fieldsToCheck[queryParameterIndex];
        let dynamicFieldsDictionaryFunc = dynamicFieldsDictionary[tableColumn];

        if (dynamicFieldsDictionaryFunc) {
            queryParametersString += `${dynamicFieldsDictionaryFunc(value)} ${queryParameterIndex !== fieldsToCheck.length - 1 ? 'AND ' : ''}`;
        } else {
            queryParametersString += `${tableColumn} = ${typeof value === 'number' ? value : `'${value}'`} ${queryParameterIndex !== fieldsToCheck.length - 1 ? 'AND ' : ''}`;
        }
    }

    const SQL = `SELECT * FROM pets ${queryParametersString !== '' ? `WHERE ${queryParametersString}` : ''}`;
    return DBService.Query(SQL);
}