import { RETURN_PET_WORDING, ADOPT_WORDING, FOSTER_WORDING } from '../../../../Utils/Constants/constants';
import GeneralButton from '../../../General/Buttons/GeneralButton/GeneralButton';
import PetDetailsGrid from './PetDetailsGrid/PetDetailsGrid';
import Col from '../../../General/Flexboxes/Column/Col';
import Row from '../../../General/Flexboxes/Row/Row';
import { usePetDetails } from './usePetDetails';
import { PetDetailsProps } from './IPetDetailsProps';
import '../../../../Styles/general.css';
import './PetDetails.css';

function PetDetails({ pet }: PetDetailsProps) {
    const {
        activeUser,
        saveUnSaveButtonWording,
        returnPetHandler,
        adoptPetHandler,
        fosterPetHandler,
        saveAndUnSavePetHandler
    } = usePetDetails({ pet });

    return (
        <Col styles='pet-details-container card'>
            <Col styles='pet-details-inner-container'>
                <Row styles='pet-details-image-container card'>
                    <img className="pet-details-image card" src={pet.image} />
                </Row>
                <Row styles='pet-details-grid-wrapper'>
                    <PetDetailsGrid pet={pet} />
                </Row>
                <Row styles='action-buttons-container'>
                    {pet.userId === activeUser.userId ?
                        <Row styles='pet-details-button-container'>
                            <GeneralButton
                                wording={RETURN_PET_WORDING}
                                isDisabled={false}
                                onAction={returnPetHandler}
                            />
                        </Row>
                        :
                        pet.userId ?
                            <Row styles='pet-details-button-container'>
                                <GeneralButton
                                    wording={saveUnSaveButtonWording}
                                    isDisabled={false}
                                    onAction={saveAndUnSavePetHandler}
                                />
                            </Row>
                            :
                            <>
                                <Row styles='pet-details-button-container'>
                                    <GeneralButton
                                        wording={ADOPT_WORDING}
                                        isDisabled={false}
                                        onAction={adoptPetHandler}
                                    />
                                </Row>
                                <Row styles='pet-details-button-container'>
                                    <GeneralButton
                                        wording={FOSTER_WORDING}
                                        isDisabled={false}
                                        onAction={fosterPetHandler}
                                    />
                                </Row>
                                <Row styles='pet-details-button-container'>
                                    <GeneralButton
                                        wording={saveUnSaveButtonWording}
                                        isDisabled={false}
                                        onAction={saveAndUnSavePetHandler}
                                    />
                                </Row>
                            </>}
                </Row>
            </Col>
        </Col>
    );
}

export default PetDetails;