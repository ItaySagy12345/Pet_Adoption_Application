import { SUCCESSFUL_SIGN_UP_MESSAGE, STATUS_OK, SIGN_UP, LOG_IN, ADD_PET, LOG_OUT } from '../../../Utils/Constants/constants';
import { AuthContextType } from '../../../Contexts/AuthContext/AuthContextType';
import { useAuth } from '../../../Hooks/useAuth';
import { useState } from 'react';

export function useNavBarContents() {
    const { activeUser, logOutActiveUser } = useAuth() as AuthContextType;
    const [formInModal, setFormInModal] = useState<string | null>(null);
    const [successfulSignUpMessage, setSuccessfulSignUpMessage] = useState<string | null>(null);

    const getUserGreeting = () => {
        return activeUser.firstName ? `Hello ${activeUser.firstName}!` : '';
    };

    const closeModalHandler = () => {
        setFormInModal(null);
    };

    const successfulSignUpHandler = (signedUpConfirmation: number | null) => {
        signedUpConfirmation === STATUS_OK && setSuccessfulSignUpMessage(SUCCESSFUL_SIGN_UP_MESSAGE);
    };

    const authClickHandler = (authMethod: string | null) => {
        if (authMethod) {
            authMethod = authMethod.toLowerCase();
            authMethod === SIGN_UP && setFormInModal(SIGN_UP);
            authMethod === LOG_IN && setFormInModal(LOG_IN);
        } else {
            closeModalHandler();
        }
    };

    const adminClickHandler = (adminTask: string) => {
        adminTask = adminTask.toLowerCase();
        adminTask === ADD_PET && setFormInModal(ADD_PET);
    };

    const settingsClickHandler = (settingChoice: string) => {
        settingChoice = settingChoice.toLowerCase();
        settingChoice === LOG_OUT && logOutActiveUser();
    };

    return {
        SIGN_UP,
        LOG_IN,
        ADD_PET,
        activeUser,
        formInModal,
        successfulSignUpMessage,
        closeModalHandler,
        getUserGreeting,
        successfulSignUpHandler,
        authClickHandler,
        adminClickHandler,
        settingsClickHandler
    };
}