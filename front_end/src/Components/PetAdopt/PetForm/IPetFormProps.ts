import { Pet } from "../../../Interfaces/IPet";

export interface PetFormProps {
    pet: Pet;
    formActionType: string;
    onChangePetInfo?: Function;
}