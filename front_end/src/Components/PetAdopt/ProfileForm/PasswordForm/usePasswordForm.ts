import * as userService from "../../../../Services/userService";
import { useState } from "react";
import { AuthContextType } from "../../../../Contexts/AuthContext/AuthContextType";
import { useAuth } from "../../../../Hooks/useAuth";
import { PASSWORD_MATCH_ERROR_MESSAGE, STATUS_OK, UPDATE_FAILED_ERROR } from "../../../../Utils/Constants/constants";

export function usePasswordForm() {
    const { activeUser } = useAuth() as AuthContextType;
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>(UPDATE_FAILED_ERROR);
    const [isSuccessfulUpdate, setIsSuccessfulUpdate] = useState<boolean>(false);

    const oldPasswordChangeHandler = (input: string) => {
        setOldPassword(input);
    };

    const newPasswordChangeHandler = (input: string) => {
        setNewPassword(input);
    };

    const confirmNewPasswordChangeHandler = (input: string) => {
        setConfirmNewPassword(input);
    };

    const updatePasswordHandler = async (event: any) => {
        try {
            event.preventDefault();
            setIsLoading(true);
            if (newPassword !== confirmNewPassword) {
                throw PASSWORD_MATCH_ERROR_MESSAGE;
            }
            const updatePasswordConfirmation: any = await userService.updateUserPassword(activeUser.userId, {
                oldPassword,
                newPassword,
                confirmNewPassword,
            });
            if (updatePasswordConfirmation === STATUS_OK) {
                resetPasswordFormValues();
                setIsLoading(false);
                setIsSuccessfulUpdate(true);
                setTimeout(() => setIsSuccessfulUpdate(false), 5000);
            }
        } catch (err: any) {
            setErrorMessage(err);
            resetPasswordFormValues();
            setIsLoading(false);
            setIsError(true);
            setTimeout(() => setIsError(false), 5000);
        }
    };

    const resetPasswordFormValues = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    return {
        oldPassword,
        newPassword,
        confirmNewPassword,
        isLoading,
        isError,
        errorMessage,
        isSuccessfulUpdate,
        oldPasswordChangeHandler,
        newPasswordChangeHandler,
        confirmNewPasswordChangeHandler,
        updatePasswordHandler
    };
}