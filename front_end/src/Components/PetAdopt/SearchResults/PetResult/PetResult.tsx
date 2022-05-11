import { NEEDS_A_HOME_WORDING, ADOPTED_WORDING, MORE_DETAILS_BUTTON_WORDING } from '../../../../Utils/Constants/constants';
import GeneralButton from '../../../General/Buttons/GeneralButton/GeneralButton';
import { PetResultProps } from './IPetResultProps';
import Row from '../../../General/Flexboxes/Row/Row';
import Col from '../../../General/Flexboxes/Column/Col';
import Sign from '../../../General/Signs/Sign';
import './PetResult.css';

function PetResult({ pet, onMoreDetailsRequest }: PetResultProps) {
    return (
        <Col styles='pet-result-container card'>
            <Col styles='pet-result-inner-container'>
                <Row styles='pet-result-image-container card'>
                    <img className="pet-result-image card" src={pet.image} alt="owned-pet" />
                </Row>
                <Row styles='pet-name-container'>
                    <Row styles='pet-name'>
                        <>{pet.name}</>
                    </Row>
                </Row>
                <Row styles='pet-buttons-container'>
                    <Row styles='pet-result-button-container'>
                        <Sign
                            wording={pet.adoptionStatus ? ADOPTED_WORDING : NEEDS_A_HOME_WORDING}
                            colorPrimary={pet.adoptionStatus ? '#721C24' : 'green'}
                            colorSecondary={pet.adoptionStatus ? '#F5C6CB' : 'white'}
                            borderRadius={6}
                        />
                    </Row>
                    <Row styles='pet-result-button-container'>
                        <GeneralButton
                            wording={MORE_DETAILS_BUTTON_WORDING}
                            isDisabled={false}
                            borderRadius={6}
                            onAction={(event: any) => onMoreDetailsRequest(event, pet)}
                        />
                    </Row>
                </Row>
            </Col>
        </Col>
    );
}

export default PetResult;