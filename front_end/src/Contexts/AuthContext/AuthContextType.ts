import { ActiveUser } from "../../Interfaces/IActiveUser";
import { ExistingUser } from "../../Interfaces/IExistingUser";

export type AuthContextType = {
    activeUser: ActiveUser;
    updateActiveUser: (activeUser: ActiveUser) => void;
    logInExistingUser: (existingUser: ExistingUser) => void;
    logOutActiveUser: () => void;
};