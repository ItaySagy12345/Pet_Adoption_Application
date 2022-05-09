import { ENABLED_BUTTON_STYLE, DISABLED_BUTTON_STYLE } from '../../../Utils/Constants/constants';
import { AuthContextType } from '../../../Contexts/AuthContext/AuthContextType';
import { UseLogInFormProps } from './IUseLogInFormProps';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../Hooks/useAuth';

export function useLogInForm({ onAuthMethodChange }: UseLogInFormProps) {
    const { logInExistingUser } = useAuth() as AuthContextType;

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
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

    const logInHandler = (event: any) => {
        event.preventDefault();
        if (email.length > 45) return;
        logInExistingUser({ email, password });
        onAuthMethodChange(null);
        resetFormValues();
    };

    const resetFormValues = () => {
        setEmail('');
        setPassword('');
    };

    return {
        email,
        password,
        renderSuccessfulSignUpMessage,
        emailChangeHandler,
        passwordChangeHandler,
        logInHandler,
        getButtonStyles,
        getButtonStatus
    };
}