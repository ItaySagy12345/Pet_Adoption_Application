import { ActiveUser } from "../../../../Interfaces/IActiveUser";
import { updateUserDetails } from "../../../../Services/usersService";
import { useState, useEffect } from "react";
import { useAuth } from "../../../../Hooks/useAuth";
import { AuthContextType } from "../../../../Contexts/AuthContext/AuthContextType";

export function useUserDetailsForm() {
    const { activeUser, updateActiveUser } = useAuth() as AuthContextType;
    const [personalBio, setPersonalBio] = useState<string>(activeUser.personalBio ?? '');
    const [email, setEmail] = useState<string>(activeUser.email);
    const [phoneNumber, setPhoneNumber] = useState<string>(activeUser.phoneNumber);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
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
            const updatedUser: ActiveUser = await updateUserDetails(activeUser.userId, {
                email,
                phoneNumber,
                personalBio
            });
            updateActiveUser(updatedUser);
            setIsLoading(false);
            setIsSuccessfulUpdate(true);
            setTimeout(() => setIsSuccessfulUpdate(false), 5000);
        } catch (err) {
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
        isSuccessfulUpdate,
        personalBioChangeHandler,
        emailChangeHandler,
        phoneNumberChangeHandler,
        updateUserDetailsHandler
    };
}