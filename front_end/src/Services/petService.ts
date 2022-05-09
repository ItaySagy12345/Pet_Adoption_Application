import * as PetFormData from '../Components/PetAdopt/PetForm/PetFormData.';
import { Pet } from '../Interfaces/IPet';
import { NewPet } from '../Interfaces/INewPet';
import { UpdatedPet } from '../Interfaces/IUpdatedPet';
import { API, PET_ROUTE } from '../Utils/Constants/constants';
import { PetSearch } from '../Interfaces/IPetSearch';

export async function addPet(newPet: NewPet) {
    try {
        const response = await API.post(`${PET_ROUTE}`, PetFormData.getAddPetFormData(newPet));
        const newlyAddedPet: Pet = response.data;
        return response.status;
    } catch (err: any) {
        throw err.response.data.message;
    }
}

export async function updatePet(petId: string, updatedPet: UpdatedPet) {
    try {
        const dataToSend = updatedPet.image ? PetFormData.getUpdatePetFormData(updatedPet) : updatedPet;
        const response = await API.put(`${PET_ROUTE}/${petId}`, dataToSend);
        const newlyUpdatedPet: Pet = response.data;
        return response.status;
    } catch (err: any) {
        throw err.response.data.message;
    }
}

export async function getPets() {
    try {
        const response = await API.get(`${PET_ROUTE}`);
        return response.data;
    } catch (err: any) {
        throw err.response.data.message;
    }
}

export async function getPetById(requestedPetId: string) {
    try {
        const response = await API.get(`${PET_ROUTE}/${requestedPetId}`);
        return response.data;
    } catch (err: any) {
        throw err.response.data.message;
    }
}

export async function adoptPet(petToAdoptId: string) {
    try {
        const response = await API.put(`${PET_ROUTE}/${petToAdoptId}/adopt`);
        return response.data;
    } catch (err: any) {
        throw err.response.data.message;
    }
}

export async function fosterPet(petToFosterId: string) {
    try {
        const response = await API.put(`${PET_ROUTE}/${petToFosterId}/foster`);
        return response.data;
    } catch (err: any) {
        throw err.response.data.message;
    }
}

export async function returnPet(petToReturnId: string) {
    try {
        const response = await API.put(`${PET_ROUTE}/${petToReturnId}/return`);
        return response.data;
    } catch (err: any) {
        throw err.response.data.message;
    }
}

export async function savePet(petToSaveId: string) {
    try {
        const response = await API.post(`${PET_ROUTE}/${petToSaveId}/save`);
        return response.data;
    } catch (err: any) {
        throw err.response.data.message;
    }
}

export async function unSavePet(petToUnSaveId: string) {
    try {
        const response = await API.delete(`${PET_ROUTE}/${petToUnSaveId}/save`);
        return response.data;
    } catch (err: any) {
        throw err.response.data.message;
    }
}

export async function getOwnedPetsByUserId(userId: string) {
    try {
        const response = await API.get(`${PET_ROUTE}/user/${userId}`);
        return response.data;
    } catch (err: any) {
        throw err.response.data.message;
    }
}

export async function getPetsBySearchCriteria(petSearchCriteria: PetSearch) {
    try {
        const response = await API.get(`${PET_ROUTE}/search/criteria`, { params: { petSearchCriteria } });
        return response.data;
    } catch (err: any) {
        throw err.response.data.message;
    }
}