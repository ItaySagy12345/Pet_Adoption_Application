import { Pet } from "../../../Interfaces/IPet";

export interface SearchResultsProps {
    pets: Pet[] | null;
    errorMessage: string | null;
}