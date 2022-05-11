import { UPDATE_PET_WORDING, PEEP_PETS_TITLE_STYLES, PETS_WORDING, PET_FORM_WORDING, USERS_WORDING } from '../../../Utils/Constants/constants';
import { useState } from 'react';
import PeepPetsTitle from '../../General/Title/PeepPetsTitle';
import EntityCard from './EntityCard/EntityCard';
import { Pet } from '../../../Interfaces/IPet';
import Col from '../../General/Flexboxes/Column/Col';
import Row from '../../General/Flexboxes/Row/Row';
import { DashboardProps } from './IDashboardProps';
import PeepPetsModal from '../../General/Modals/PeepPetsModal';
import PetForm from '../PetForm/PetForm';
import './Dashboard.css';

function Dashboard({ users, pets, onChangePetInfo }: DashboardProps) {
    const [petToInspect, setPetToInspect] = useState<Pet>({} as Pet);
    const [formInModal, setFormInModal] = useState<string | null>(null);

    const openModalHandler = (pet: Pet) => {
        setFormInModal(PET_FORM_WORDING);
        setPetToInspect(pet);
    };

    const closeModalHandler = () => {
        setFormInModal(null);
    };

    return (
        <Row styles='dashboard-main-container'>
            <Col styles='dashboard-container'>
                <Row styles='dashboard-title-container'>
                    <PeepPetsTitle styles={PEEP_PETS_TITLE_STYLES} wording={USERS_WORDING} />
                </Row>
                <Col styles='dashboard-entries-container'>
                    {users.map((user, index) => (
                        <EntityCard
                            key={index}
                            entity={user}
                            onMoreDetailsRequest={openModalHandler}
                        />
                    ))}
                </Col>
            </Col>
            <Col styles='dashboard-container'>
                <Row styles='dashboard-title-container '>
                    <PeepPetsTitle styles={PEEP_PETS_TITLE_STYLES} wording={PETS_WORDING} />
                </Row>
                <Col styles='dashboard-entries-container'>
                    {pets.map((pet, index) => (
                        <EntityCard
                            key={index}
                            entity={pet}
                            onMoreDetailsRequest={openModalHandler}
                        />
                    ))}
                </Col>
            </Col>
            <PeepPetsModal
                content={formInModal === PET_FORM_WORDING ?
                    <PetForm
                        pet={petToInspect}
                        formActionType={UPDATE_PET_WORDING}
                        onChangePetInfo={onChangePetInfo}
                    />
                    :
                    null}
                onClose={closeModalHandler}
            />
        </Row>
    );
}

export default Dashboard;