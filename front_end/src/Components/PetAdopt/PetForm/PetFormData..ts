import { NewPet } from "../../../Interfaces/INewPet";
import { UpdatedPet } from "../../../Interfaces/IUpdatedPet";

export function getAddPetFormData(newPet: NewPet) {
    const addPetFormData = new FormData();
    addPetFormData.append("name", newPet.name);
    addPetFormData.append("adoptionStatus", newPet.adoptionStatus);
    addPetFormData.append("animalType", newPet.animalType);
    addPetFormData.append("breed", newPet.breed);
    addPetFormData.append("color", newPet.color);
    addPetFormData.append("height", newPet.height);
    addPetFormData.append("weight", newPet.weight);
    addPetFormData.append("hypoallergenicStatus", newPet.hypoallergenicStatus);
    addPetFormData.append("dietaryRestrictions", newPet.dietaryRestrictions);
    addPetFormData.append("bio", newPet.bio);
    addPetFormData.append("image", newPet.image as any, newPet.image?.name as any);

    return addPetFormData;
}

export function getUpdatePetFormData(updatedPet: UpdatedPet) {
    const addPetFormData = new FormData();
    addPetFormData.append("petId", updatedPet.petId);
    updatedPet.userId && addPetFormData.append("userId", updatedPet.userId);
    addPetFormData.append("name", updatedPet.name);
    addPetFormData.append("adoptionStatus", updatedPet.adoptionStatus);
    addPetFormData.append("animalType", updatedPet.animalType);
    addPetFormData.append("breed", updatedPet.breed);
    addPetFormData.append("color", updatedPet.color);
    addPetFormData.append("height", updatedPet.height);
    addPetFormData.append("weight", updatedPet.weight);
    addPetFormData.append("hypoallergenicStatus", updatedPet.hypoallergenicStatus);
    addPetFormData.append("dietaryRestrictions", updatedPet.dietaryRestrictions);
    addPetFormData.append("bio", updatedPet.bio);
    addPetFormData.append("image", updatedPet.image as any, updatedPet.image?.name as any);

    return addPetFormData;
}