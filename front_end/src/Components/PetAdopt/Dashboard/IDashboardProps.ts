import { ActiveUser } from '../../../Interfaces/IActiveUser';
import { Pet } from '../../../Interfaces/IPet';

export interface DashboardProps {
    users: ActiveUser[],
    pets: Pet[],
    onChangePetInfo: Function,
}