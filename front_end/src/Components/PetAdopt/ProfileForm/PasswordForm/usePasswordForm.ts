import { useState } from "react";
import { AuthContextType } from "../../../../Contexts/AuthContext/AuthContextType";
import { useAuth } from "../../../../Hooks/useAuth";
import { updateUserPassword } from "../../../../Services/usersService";
import { BAD_REQUEST_ERROR_MESSAGE, PASSWORD_MATCH_ERROR_MESSAGE, STATUS_OK } from "../../../../Utils/Constants/constants";

export function usePasswordForm() {
    const { activeUser } = useAuth() as AuthContextType;
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<any>('');
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
            const updatePasswordConfirmation: any = await updateUserPassword(activeUser.userId, {
                oldPassword,
                newPassword,
                confirmNewPassword,
            });
            if (updatePasswordConfirmation === STATUS_OK) {
                resetPasswordFormValues();
                setIsLoading(false);
                setIsSuccessfulUpdate(true);
                setTimeout(() => setIsSuccessfulUpdate(false), 5000);
            } else {
                throw BAD_REQUEST_ERROR_MESSAGE;
            }
        } catch (err) {
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