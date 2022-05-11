import * as userService from '../../Services/userService';
import MyPets from '../../Components/PetAdopt/MyPets/MyPets';
import GeneralButton from '../../Components/General/Buttons/GeneralButton/GeneralButton';
import { NO_OWNED_PETS_MESSAGE, NO_SAVED_PETS_MESSAGE, OWNED_PETS_WORDING, SAVED_PETS_WORDING } from '../../Utils/Constants/constants';
import { useState, useEffect } from 'react';
import { AuthContextType } from '../../Contexts/AuthContext/AuthContextType';
import { useAuth } from '../../Hooks/useAuth';
import { ActiveUser } from '../../Interfaces/IActiveUser';
import Row from '../../Components/General/Flexboxes/Row/Row';
import Col from '../../Components/General/Flexboxes/Column/Col';
import './MyPetsPage.css';
import '../widePage.css';

function MyPetsPage() {
    const { activeUser, updateActiveUser } = useAuth() as AuthContextType;
    const [togglePetsTab, setTogglePetsTab] = useState<boolean>(false);

    useEffect(() => {
        getUpdatedActiveUser();
    }, []);

    const getUpdatedActiveUser = async () => {
        const updatedActiveUser: ActiveUser = await userService.getFullUserById(activeUser.userId);
        updateActiveUser(updatedActiveUser);
    };

    return (
        <div className="wide-page">
            <Col styles='my-pets-page-container'>
                <Row styles='my-pets-page-options-container'>
                    <Row styles='toggle-pets-tab-title-container'>
                        <>{!togglePetsTab ? OWNED_PETS_WORDING : SAVED_PETS_WORDING}</>
                    </Row>
                    <Row styles='toggle-pets-tab-button-wrapper'>
                        <GeneralButton
                            wording={togglePetsTab ? OWNED_PETS_WORDING : SAVED_PETS_WORDING}
                            isDisabled={false}
                            borderRadius={5}
                            onAction={() => setTogglePetsTab(!togglePetsTab)}
                        />
                    </Row>
                </Row>
                {!togglePetsTab ?
                    <>
                        {activeUser.ownedPets && activeUser.ownedPets.length > 0 ?
                            <MyPets
                                pets={activeUser.ownedPets}
                            />
                            :
                            <Row styles='no-pets-message'>
                                <>{NO_OWNED_PETS_MESSAGE}</>
                            </Row>}
                    </>
                    :
                    <>
                        {activeUser.savedPets && activeUser.savedPets.length > 0 ?
                            <MyPets
                                pets={activeUser.savedPets}
                            />
                            :
                            <Row styles='no-pets-message'>
                                <>{NO_SAVED_PETS_MESSAGE}</>
                            </Row>}
                    </>}
            </Col>
        </div>
    );
}

export default MyPetsPage;