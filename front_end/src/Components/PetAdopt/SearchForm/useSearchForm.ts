import { useState } from 'react';
import { SearchFormProps } from './ISearchFormProps';
import { getPetsBySearchCriteria } from '../../../Services/petService';
import { Pet } from '../../../Interfaces/IPet';
import { PetSearch } from '../../../Interfaces/IPetSearch';

export function useSearchForm({ onSearchPets }: SearchFormProps) {
    const [animalType, setAnimalType] = useState<string>('');
    const [adoptionStatus, setAdoptionStatus] = useState<number | undefined>(undefined);
    const [breed, setBreed] = useState<string>('');
    const [minHeight, setMinHeight] = useState<string>('');
    const [maxHeight, setMaxHeight] = useState<string>('');
    const [minWeight, setMinWeight] = useState<string>('');
    const [maxWeight, setMaxWeight] = useState<string>('');
    const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const searchTypeChangeHandler = () => {
        setIsAdvancedSearch(!isAdvancedSearch);
    };

    const animalTypeChangeHandler = (input: string) => {
        setAnimalType(input);
    };

    const adoptionStatusChangeHandler = (input: number) => {
        setAdoptionStatus(input);
    };

    const breedChangeHandler = (input: string) => {
        setBreed(input);
    };

    const minHeightChangeHandler = (input: string) => {
        setMinHeight(input);
    };

    const maxHeightChangeHandler = (input: string) => {
        setMaxHeight(input);
    };

    const minWeightChangeHandler = (input: string) => {
        setMinWeight(input);
    };

    const maxWeightChangeHandler = (input: string) => {
        setMaxWeight(input);
    };

    const searchPetsHandler = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        const petSearchParams: PetSearch = getPetSearchParams({
            animalType,
            adoptionStatus,
            breed,
            minHeight: minHeight === '' ? null : +minHeight,
            maxHeight: maxHeight === '' ? null : +maxHeight,
            minWeight: minWeight === '' ? null : +minWeight,
            maxWeight: maxWeight === '' ? null : +maxWeight
        });
        const petSearchResults: Pet[] = await getPetsBySearchCriteria(petSearchParams);
        onSearchPets(petSearchResults);
        resetSearchFormValues();
        setIsLoading(false);
    };

    const getPetSearchParams = (searchParamsObject: PetSearch): PetSearch => {
        const filteredSearchParamsArray = Object.entries(searchParamsObject).filter(([searchParamKey, searchParamValue]) => searchParamValue !== '' && searchParamValue !== null);
        const filteredSearchParamsObject = Object.fromEntries(filteredSearchParamsArray);
        return filteredSearchParamsObject;
    };

    const resetSearchFormValues = () => {
        setAnimalType('');
        setAdoptionStatus(undefined);
        setBreed('');
        setMinHeight('');
        setMaxHeight('');
        setMinWeight('');
        setMaxWeight('');
    };

    return {
        animalType,
        adoptionStatus,
        breed,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
        isAdvancedSearch,
        isLoading,
        searchTypeChangeHandler,
        animalTypeChangeHandler,
        adoptionStatusChangeHandler,
        breedChangeHandler,
        minHeightChangeHandler,
        maxHeightChangeHandler,
        minWeightChangeHandler,
        maxWeightChangeHandler,
        searchPetsHandler
    };
}