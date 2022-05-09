import { ActiveUser } from "../../../../Interfaces/IActiveUser";
import { Pet } from "../../../../Interfaces/IPet";

export interface EntityCardProps {
    entity: ActiveUser | Pet;
    onMoreDetailsRequest: Function;
}