import { useContext } from "react";
import { InspectedPetContext } from '../Contexts/InspectedPetContext/InspectedPetContext';

export function useInspectedPet() {
    return useContext(InspectedPetContext);
}