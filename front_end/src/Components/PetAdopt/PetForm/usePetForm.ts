import { ADD_PET_WORDING, UPDATE_PET_WORDING, STATUS_OK, DATA_VALIDATION_ERROR } from "../../../Utils/Constants/constants";
import * as petService from '../../../Services/petService';
import { useState, useRef } from "react";
import { PetFormProps } from "./IPetFormProps";

export function usePetForm({ pet, formActionType, onChangePetInfo }: PetFormProps) {
    const [name, setName] = useState<string>(pet.name);
    const [adoptionStatus, setAdoptionStatus] = useState<string>(pet.adoptionStatus.toString());
    const [animalType, setAnimalType] = useState<string>(pet.animalType);
    const [breed, setBreed] = useState<string>(pet.breed);
    const [color, setColor] = useState<string>(pet.color);
    const [height, setHeight] = useState<number>(pet.height);
    const [weight, setWeight] = useState<number>(pet.weight);
    const [hypoallergenicStatus, setHypoallergenicStatus] = useState<string>(pet.hypoallergenicStatus.toString());
    const [dietaryRestrictions, setDietaryRestrictions] = useState<string>(pet.dietaryRestrictions);
    const [bio, setBio] = useState<string>(pet.bio);
    const [imageUpload, setImageUpload] = useState<string | undefined>(pet.image);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isSuccessfulUpdate, setIsSuccessfulUpdate] = useState<boolean>(false);
    const imageUploadRef = useRef<HTMLInputElement | null>(null);

    const nameChangeHandler = (input: string) => {
        setName(input);
    };

    const adoptionStatusChangeHandler = (input: string) => {
        setAdoptionStatus(input);
    };

    const animalTypeChangeHandler = (input: string) => {
        setAnimalType(input);
    };

    const breedChangeHandler = (input: string) => {
        setBreed(input);
    };

    const colorChangeHandler = (input: string) => {
        setColor(input);
    };

    const heightChangeHandler = (input: number) => {
        setHeight(input);
    };

    const weightChangeHandler = (input: number) => {
        setWeight(input);
    };

    const hypoallergenicStatusChangeHandler = (input: string) => {
        setHypoallergenicStatus(input);
    };

    const dietaryRestrictionsChangeHandler = (input: string) => {
        setDietaryRestrictions(input);
    };

    const bioChangeHandler = (input: string) => {
        setBio(input);
    };

    const imageUploadChangeHandler = (event: any) => {
        setImageUpload(URL.createObjectURL(event.target.files[0]));
    };

    const getPetIcon = () => {
        return formActionType === UPDATE_PET_WORDING ? `${pet.animalType === 'dog' ? '🐶' : pet.animalType === 'cat' ? '🐱' : '🐰'}` : '';
    };

    const getSubmitButtonWording = () => {
        return formActionType === ADD_PET_WORDING ? ADD_PET_WORDING : UPDATE_PET_WORDING;
    };

    const addOrEditPetHandler = async (event: any) => {
        try {
            event.preventDefault();
            setIsLoading(true);
            if (name === null || adoptionStatus === null || animalType === null || breed === null || color === null || height === null ||
                weight === null || hypoallergenicStatus === null || dietaryRestrictions === null || bio === null || imageUpload === null) {
                throw DATA_VALIDATION_ERROR;
            }
            const newOrUpdatedPet: any = {
                name,
                adoptionStatus,
                animalType,
                breed,
                color,
                height: `${height}`,
                weight: `${weight}`,
                hypoallergenicStatus,
                dietaryRestrictions,
                bio,
                image: imageUploadRef.current?.files?.[0]
            };
            if (formActionType === ADD_PET_WORDING) {
                const addPetConfirmation: string | number = await petService.addPet(newOrUpdatedPet);
                addPetConfirmation === STATUS_OK && handleSuccessfulSubmission();
            } else if (formActionType === UPDATE_PET_WORDING) {
                newOrUpdatedPet.petId = pet.petId;
                newOrUpdatedPet.userId = pet.userId;
                const updatePetConfirmation: string | number = await petService.updatePet(pet.petId, newOrUpdatedPet);
                updatePetConfirmation === STATUS_OK && handleSuccessfulSubmission();
            }
        } catch (err: any) {
            setErrorMessage(err);
            setIsLoading(false);
            setIsError(true);
            setTimeout(() => setIsError(false), 5000);
        }
    };

    const handleSuccessfulSubmission = () => {
        onChangePetInfo && onChangePetInfo();
        setIsLoading(false);
        setIsSuccessfulUpdate(true);
        formActionType === ADD_PET_WORDING && resetPetFormValues();
        setTimeout(() => setIsSuccessfulUpdate(false), 5000);
    };

    const resetPetFormValues = () => {
        if (imageUploadRef && imageUploadRef.current) {
            imageUploadRef.current.value = '';
        }
        setName('');
        setAdoptionStatus('0');
        setAnimalType('');
        setBreed('');
        setColor('');
        setHeight(0);
        setWeight(0);
        setHypoallergenicStatus('false');
        setDietaryRestrictions('');
        setBio('');
        setImageUpload('');
    };

    return {
        name,
        adoptionStatus,
        animalType,
        breed,
        color,
        height,
        weight,
        hypoallergenicStatus,
        dietaryRestrictions,
        bio,
        imageUpload,
        imageUploadRef,
        isError,
        isLoading,
        errorMessage,
        isSuccessfulUpdate,
        getPetIcon,
        nameChangeHandler,
        adoptionStatusChangeHandler,
        animalTypeChangeHandler,
        breedChangeHandler,
        colorChangeHandler,
        heightChangeHandler,
        weightChangeHandler,
        hypoallergenicStatusChangeHandler,
        dietaryRestrictionsChangeHandler,
        bioChangeHandler,
        addOrEditPetHandler,
        imageUploadChangeHandler,
        getSubmitButtonWording
    };
}