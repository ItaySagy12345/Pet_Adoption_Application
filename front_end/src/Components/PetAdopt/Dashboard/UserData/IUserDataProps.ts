import { ActiveUser } from "../../../../Interfaces/IActiveUser";

export interface UserDataProps {
    user: ActiveUser;
    onMoreDetailsRequest: Function;
}