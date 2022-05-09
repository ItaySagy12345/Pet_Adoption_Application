import Dashboard from "../../Components/PetAdopt/Dashboard/Dashboard";
import Row from "../../Components/General/Flexboxes/Row/Row";
import { useState, useEffect } from "react";
import { getFullUsers } from "../../Services/usersService";
import { getPets } from "../../Services/petService";
import { ActiveUser } from "../../Interfaces/IActiveUser";
import { Pet } from "../../Interfaces/IPet";
import '../widePage.css';

function DashboardPage() {
    const [usersData, setUsersData] = useState<ActiveUser[]>([]);
    const [petsData, setPetsData] = useState<Pet[]>([]);

    useEffect(() => {
        getUsersAndPetData();
    }, []);

    const getUsersAndPetData = async () => {
        const users: ActiveUser[] = await getFullUsers();
        const pets: Pet[] = await getPets();
        setUsersData(users);
        setPetsData(pets);
    };

    return (
        <Row styles='wide-page'>
            <Dashboard
                users={usersData}
                pets={petsData}
            />
        </Row>
    );
}

export default DashboardPage;