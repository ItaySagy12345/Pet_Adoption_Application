import * as authService from '../../../Services/authService';
import { AuthContext } from '../../../Contexts/AuthContext/AuthContext';
import { AuthProviderProps } from './IAuthProviderProps';
import { ActiveUser } from '../../../Interfaces/IActiveUser';
import { useNavigate } from "react-router-dom";
import { STATUS_OK } from "../../../Utils/Constants/constants";
import { useState } from "react";

const activeUserInitializer = {
    userId: '',
    isAdmin: false,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
};

function ActiveUserProvider({ children }: AuthProviderProps) {
    const [activeUser, setActiveUser] = useState<ActiveUser>(localStorage.activeUser ? JSON.parse(localStorage.activeUser) : activeUserInitializer);
    const navigator = useNavigate();

    async function logOutActiveUser() {
        const logOutConfirmation: number | undefined = await authService.logOut();
        if (logOutConfirmation === STATUS_OK) {
            localStorage.removeItem("activeUser");
            localStorage.removeItem("inspectedPet");
            setActiveUser(activeUserInitializer);
            navigator('/');
        }
    }

    function updateActiveUser(updatedUser: ActiveUser) {
        localStorage.activeUser = JSON.stringify(updatedUser);
        setActiveUser(updatedUser);
    }

    return (
        <AuthContext.Provider value={{ activeUser, updateActiveUser, logOutActiveUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default ActiveUserProvider;