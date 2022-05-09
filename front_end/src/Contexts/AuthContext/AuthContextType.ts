import { ActiveUser } from "../../Interfaces/IActiveUser";

export type AuthContextType = {
    activeUser: ActiveUser;
    updateActiveUser: (activeUser: ActiveUser) => void;
    logOutActiveUser: () => void;
};