import * as userService from "../../Services/userService";
import * as petService from "../../Services/petService";
import Dashboard from "../../Components/PetAdopt/Dashboard/Dashboard";
import Row from "../../Components/General/Flexboxes/Row/Row";
import { useState, useEffect } from "react";
import { ActiveUser } from "../../Interfaces/IActiveUser";
import { Pet } from "../../Interfaces/IPet";
import '../widePage.css';

function DashboardPage() {
    const [usersData, setUsersData] = useState<ActiveUser[]>([]);
    const [petsData, setPetsData] = useState<Pet[]>([]);
    const [hasPetInfoChanged, setHasPetInfoChanged] = useState<boolean>(false);

    useEffect(() => {
        getUsersAndPetData();
    }, [hasPetInfoChanged]);

    const petInfoChangeHandler = () => {
        setHasPetInfoChanged(!hasPetInfoChanged);
    };

    const getUsersAndPetData = async () => {
        const users: ActiveUser[] = await userService.getFullUsers();
        const pets: Pet[] = await petService.getPets();
        setUsersData(users);
        setPetsData(pets);
    };

    return (
        <Row styles='wide-page'>
            <Dashboard
                users={usersData}
                pets={petsData}
                onChangePetInfo={petInfoChangeHandler}
            />
        </Row>
    );
}

export default DashboardPage;