import { Pet } from "../../Interfaces/IPet";

export type InspectedPetContextType = {
    inspectedPet: Pet;
    updateInspectedPet: (inspectedPet: Pet) => void;
};