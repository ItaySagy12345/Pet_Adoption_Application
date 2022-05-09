import { PetDataProps } from './IPetDataProps';
import SymmetricalGrid from '../../../General/Grids/SymmetricalGrid/SymmetricalGrid';
import Row from '../../../General/Flexboxes/Row/Row';
import { MORE_DETAILS_BUTTON_WORDING } from '../../../../Utils/Constants/constants';
import GeneralButton from '../../../General/Buttons/GeneralButton/GeneralButton';
import './PetData.css';

function PetData({ pet, onMoreDetailsRequest }: PetDataProps) {
    return (
        <>
            <SymmetricalGrid styles='pet-data-grid' numOfColumns={3}>
                <div>{'Animal Type: '}{pet.animalType}</div>
                <div>{'ID: '}{pet.petId}</div>
                <div>{'Height: '}{pet.height}</div>
                <div>{'Weight: '}{pet.weight}</div>
                <div>{'Color: '}{pet.color}</div>
                <div>{'Breed: '}{pet.breed}</div>
                <div>{'Adoption Status: '}{pet.adoptionStatus}</div>
                <div>{'Hypoallergenic Status: '}{pet.hypoallergenicStatus}</div>
                <div>{'Dietary Restrictions: '}{pet.dietaryRestrictions}</div>
                <div>{'Bio: '}{pet.bio}</div>
            </SymmetricalGrid>
            <Row styles='pet-data-button-container'>
                <GeneralButton
                    wording={MORE_DETAILS_BUTTON_WORDING}
                    isDisabled={false}
                    onAction={() => onMoreDetailsRequest(pet)}
                />
            </Row>
        </>
    );
}

export default PetData;