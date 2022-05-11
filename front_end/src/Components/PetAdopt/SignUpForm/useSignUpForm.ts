import { ENABLED_BUTTON_STYLE, DISABLED_BUTTON_STYLE, LOG_IN_WORDING, STATUS_OK, FIELD_LENGTH_ERROR_MESSAGE, PASSWORD_MATCH_ERROR_MESSAGE } from '../../../Utils/Constants/constants';
import * as authService from '../../../Services/authService';
import { useState } from 'react';
import { SignUpFormProps } from './ISignUpFormProps';
import { ActiveUser } from '../../../Interfaces/IActiveUser';

export function useSignUpForm({ onAuthMethodChange, onSuccessfulSignUp }: SignUpFormProps) {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const firstNameChangeHandler = (input: string) => {
        setFirstName(input);
    };

    const lastNameChangeHandler = (input: string) => {
        setLastName(input);
    };

    const emailChangeHandler = (input: string) => {
        setEmail(input);
    };

    const phoneNumberChangeHandler = (input: string) => {
        setPhoneNumber(input);
    };

    const passwordChangeHandler = (input: string) => {
        setPassword(input);
    };

    const confirmPasswordChangeHandler = (input: string) => {
        setConfirmPassword(input);
    };

    const getButtonStyles = () => {
        return isFormFilled() ? ENABLED_BUTTON_STYLE : DISABLED_BUTTON_STYLE;
    };

    const getButtonStatus = () => {
        return !isFormFilled();
    };

    const isFormFilled = () => {
        return firstName && lastName && email && phoneNumber && password && confirmPassword;
    };

    const signUpHandler = async (event: any) => {
        try {
            event.preventDefault();
            setIsLoading(true);
            if (firstName.length > 45 || lastName.length > 45 || email.length > 45 || phoneNumber.length !== 10) {
                throw FIELD_LENGTH_ERROR_MESSAGE;
            } else if (password !== confirmPassword) {
                throw PASSWORD_MATCH_ERROR_MESSAGE;
            }
            const signedUpUser: ActiveUser = await authService.signUp({
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
                confirmPassword
            });
            signedUpUser && onAuthMethodChange(LOG_IN_WORDING);
            onSuccessfulSignUp(STATUS_OK);
            resetSignUpFormValues();
            setIsLoading(false);
        } catch (err: any) {
            setErrorMessage(err);
            setIsLoading(false);
            setIsError(true);
            setTimeout(() => setIsError(false), 5000);
        }
    };

    const resetSignUpFormValues = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
        setConfirmPassword('');
    };

    return {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        confirmPassword,
        isLoading,
        isError,
        errorMessage,
        firstNameChangeHandler,
        lastNameChangeHandler,
        emailChangeHandler,
        phoneNumberChangeHandler,
        passwordChangeHandler,
        confirmPasswordChangeHandler,
        signUpHandler,
        getButtonStyles,
        getButtonStatus
    };
}