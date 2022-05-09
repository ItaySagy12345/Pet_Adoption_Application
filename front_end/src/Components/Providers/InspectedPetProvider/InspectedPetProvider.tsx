import { useState } from "react";
import { InspectedPetContext } from '../../../Contexts/InspectedPetContext/InspectedPetContext';
import { InspectedPetProviderProps } from './IInspectedPetProviderProps';
import { useNavigate } from "react-router-dom";
import { Pet } from "../../../Interfaces/IPet";
import { PETS } from "../../../Utils/Constants/constants";

const inspectedPetInitializer = {
    petId: '',
    userId: '',
    animalType: '',
    name: '',
    adoptionStatus: 0,
    image: '',
    height: 0,
    weight: 0,
    color: '',
    hypoallergenicStatus: '',
    breed: '',
    dietaryRestrictions: '',
    bio: ''
};

function ActiveUserProvider({ children }: InspectedPetProviderProps) {
    const [inspectedPet, setInspectedPet] = useState<Pet>(localStorage.inspectedPet ? JSON.parse(localStorage.inspectedPet) : inspectedPetInitializer);
    const navigator = useNavigate();

    function updateInspectedPet(petToInspect: Pet) {
        localStorage.inspectedPet = JSON.stringify(petToInspect);
        setInspectedPet(petToInspect);
        navigator(PETS);
    }

    return (
        <InspectedPetContext.Provider value={{ inspectedPet, updateInspectedPet }}>
            {children}
        </InspectedPetContext.Provider>
    );
}

export default ActiveUserProvider;