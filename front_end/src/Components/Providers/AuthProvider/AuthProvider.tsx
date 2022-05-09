import { useState } from "react";
import { AuthContext } from '../../../Contexts/AuthContext/AuthContext';
import { logIn, logOut } from '../../../Services/authService';
import { AuthProviderProps } from './IAuthProviderProps';
import { ActiveUser } from '../../../Interfaces/IActiveUser';
import { useNavigate } from "react-router-dom";
import { ExistingUser } from "../../../Interfaces/IExistingUser";
import { PROFILE, STATUS_OK } from "../../../Utils/Constants/constants";

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

    async function logInExistingUser(loggingInUser: ExistingUser) {
        const loggedInUser: ActiveUser = await logIn(loggingInUser) as ActiveUser;
        localStorage.activeUser = JSON.stringify(loggedInUser);
        updateActiveUser(loggedInUser);
        navigator(PROFILE);
    }

    async function logOutActiveUser() {
        const logOutConfirmation: any = await logOut();
        if (logOutConfirmation === STATUS_OK) {
            localStorage.removeItem("activeUser");
            localStorage.removeItem("inspectedPet");
            updateActiveUser(activeUserInitializer);
            navigator('/');
        }
    }

    function updateActiveUser(updatedUser: ActiveUser) {
        localStorage.activeUser = JSON.stringify(updatedUser);
        setActiveUser(updatedUser);
    }

    return (
        <AuthContext.Provider value={{ activeUser, updateActiveUser, logInExistingUser, logOutActiveUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default ActiveUserProvider;