import * as userService from "../../../../Services/userService";
import { ActiveUser } from "../../../../Interfaces/IActiveUser";
import { useState, useEffect } from "react";
import { useAuth } from "../../../../Hooks/useAuth";
import { AuthContextType } from "../../../../Contexts/AuthContext/AuthContextType";
import { UPDATE_FAILED_ERROR } from "../../../../Utils/Constants/constants";

export function useUserDetailsForm() {
    const { activeUser, updateActiveUser } = useAuth() as AuthContextType;
    const [personalBio, setPersonalBio] = useState<string>(activeUser.personalBio ?? '');
    const [email, setEmail] = useState<string>(activeUser.email);
    const [phoneNumber, setPhoneNumber] = useState<string>(activeUser.phoneNumber);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>(UPDATE_FAILED_ERROR);
    const [isSuccessfulUpdate, setIsSuccessfulUpdate] = useState<boolean>(false);

    const emailChangeHandler = (input: string) => {
        setEmail(input);
    };

    const phoneNumberChangeHandler = (input: string) => {
        setPhoneNumber(input);
    };

    const personalBioChangeHandler = (input: string) => {
        setPersonalBio(input);
    };

    const updateUserDetailsHandler = async (event: any) => {
        try {
            event.preventDefault();
            setIsLoading(true);
            const updatedUser: ActiveUser = await userService.updateUserDetails(activeUser.userId, {
                email,
                phoneNumber,
                personalBio
            });
            updateActiveUser(updatedUser);
            setIsLoading(false);
            setIsSuccessfulUpdate(true);
            setTimeout(() => setIsSuccessfulUpdate(false), 5000);
        } catch (err: any) {
            setErrorMessage(err);
            setIsLoading(false);
            setIsError(true);
            setTimeout(() => setIsError(false), 5000);
        }
    };

    useEffect(() => {
        resetUserDetailsFormValues();
    }, [activeUser]);

    const resetUserDetailsFormValues = () => {
        setEmail(activeUser.email);
        setPhoneNumber(activeUser.phoneNumber);
        setPersonalBio(activeUser.personalBio ?? '');
    };

    return {
        email,
        phoneNumber,
        personalBio,
        isLoading,
        isError,
        errorMessage,
        isSuccessfulUpdate,
        personalBioChangeHandler,
        emailChangeHandler,
        phoneNumberChangeHandler,
        updateUserDetailsHandler
    };
}