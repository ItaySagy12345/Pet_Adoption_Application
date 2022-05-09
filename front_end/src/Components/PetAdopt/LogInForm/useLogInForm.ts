import { ENABLED_BUTTON_STYLE, DISABLED_BUTTON_STYLE, FIELD_LENGTH_ERROR_MESSAGE, PROFILE } from '../../../Utils/Constants/constants';
import * as authService from '../../../Services/authService';
import { AuthContextType } from '../../../Contexts/AuthContext/AuthContextType';
import { UseLogInFormProps } from './IUseLogInFormProps';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../Hooks/useAuth';
import { ActiveUser } from '../../../Interfaces/IActiveUser';
import { useNavigate } from "react-router-dom";

export function useLogInForm({ onAuthMethodChange }: UseLogInFormProps) {
    const { updateActiveUser } = useAuth() as AuthContextType;
    const navigator = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [renderSuccessfulSignUpMessage, setRenderSuccessfulSignUpMessage] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setRenderSuccessfulSignUpMessage(false);
        }, 5000);
    }, []);

    const emailChangeHandler = (input: string) => {
        setEmail(input);
    };

    const passwordChangeHandler = (input: string) => {
        setPassword(input);
    };

    const getButtonStyles = () => {
        return isFormFilled() ? ENABLED_BUTTON_STYLE : DISABLED_BUTTON_STYLE;
    };

    const getButtonStatus = () => {
        return !isFormFilled();
    };

    const isFormFilled = () => {
        return email && password;
    };

    const logInHandler = async (event: any) => {
        try {
            event.preventDefault();
            if (email.length > 45) {
                throw FIELD_LENGTH_ERROR_MESSAGE;
            }
            const loggedInUser: ActiveUser = await authService.logIn({ email, password });
            updateActiveUser(loggedInUser);
            onAuthMethodChange(null);
            resetFormValues();
            navigator(PROFILE);
        } catch (err: any) {
            setErrorMessage(err);
            setIsLoading(false);
            setIsError(true);
            setTimeout(() => setIsError(false), 5000);
        }
    };

    const resetFormValues = () => {
        setEmail('');
        setPassword('');
    };

    return {
        email,
        password,
        isLoading,
        isError,
        errorMessage,
        renderSuccessfulSignUpMessage,
        emailChangeHandler,
        passwordChangeHandler,
        logInHandler,
        getButtonStyles,
        getButtonStatus
    };
}