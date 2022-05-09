import { Pet } from "../../../../Interfaces/IPet";

export interface PetDataProps {
    pet: Pet;
    onMoreDetailsRequest: Function;
}