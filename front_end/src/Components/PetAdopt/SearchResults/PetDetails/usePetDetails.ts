import * as petService from '../../../../Services/petService';
import { SAVE_FOR_LATER_WORDING, UNSAVE_PET_WORDING } from '../../../../Utils/Constants/constants';
import { AuthContextType } from '../../../../Contexts/AuthContext/AuthContextType';
import { PetDetailsProps } from './IPetDetailsProps';
import { Pet } from '../../../../Interfaces/IPet';
import { useAuth } from '../../../../Hooks/useAuth';
import { useState } from 'react';
import { ActiveUser } from '../../../../Interfaces/IActiveUser';
import { InspectedPetContextType } from '../../../../Contexts/InspectedPetContext/InspectedPetContextType';
import { useInspectedPet } from '../../../../Hooks/useInspectedPet';

export function usePetDetails({ pet }: PetDetailsProps) {
    const { activeUser, updateActiveUser } = useAuth() as AuthContextType;
    const { updateInspectedPet } = useInspectedPet() as InspectedPetContextType;

    const getSaveUnSaveButtonWording = (): string => {
        return activeUser.savedPets?.filter((savedPet) => savedPet.petId === pet.petId).length === 1 ? UNSAVE_PET_WORDING : SAVE_FOR_LATER_WORDING;
    };

    const [saveUnSaveButtonWording, setSaveUnSaveButtonWording] = useState<string>(getSaveUnSaveButtonWording());

    const returnPetHandler = async () => {
        const updatedReturnedPet: Pet = await petService.returnPet(pet.petId);
        updateInspectedPet(updatedReturnedPet);
    };

    const adoptPetHandler = async () => {
        const updatedAdoptedPet: Pet = await petService.adoptPet(pet.petId);
        updateInspectedPet(updatedAdoptedPet);
    };

    const fosterPetHandler = async () => {
        const updatedFosteredPet: Pet = await petService.fosterPet(pet.petId);
        updateInspectedPet(updatedFosteredPet);
    };

    const saveAndUnSavePetHandler = async () => {
        if (saveUnSaveButtonWording === SAVE_FOR_LATER_WORDING) {
            const updatedUser: ActiveUser = await petService.savePet(pet.petId);
            updateActiveUser(updatedUser);
            setSaveUnSaveButtonWording(UNSAVE_PET_WORDING);
        } else {
            const updatedUser: any = await petService.unSavePet(pet.petId);
            updateActiveUser(updatedUser);
            setSaveUnSaveButtonWording(SAVE_FOR_LATER_WORDING);
        }
    };

    return {
        activeUser,
        saveUnSaveButtonWording,
        returnPetHandler,
        adoptPetHandler,
        fosterPetHandler,
        saveAndUnSavePetHandler
    };
}