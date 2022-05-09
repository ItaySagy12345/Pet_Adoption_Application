import { Pet } from "../../../../Interfaces/IPet";

export interface PetResultProps {
    pet: Pet;
    onMoreDetailsRequest: Function;
    children?: JSX.Element | JSX.Element[];
}