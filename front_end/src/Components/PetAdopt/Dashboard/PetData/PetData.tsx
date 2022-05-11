import PetDetailsGrid from '../../SearchResults/PetDetails/PetDetailsGrid/PetDetailsGrid';
import GeneralButton from '../../../General/Buttons/GeneralButton/GeneralButton';
import Row from '../../../General/Flexboxes/Row/Row';
import { MORE_DETAILS_BUTTON_WORDING } from '../../../../Utils/Constants/constants';
import { PetDataProps } from './IPetDataProps';
import './PetData.css';

function PetData({ pet, onMoreDetailsRequest }: PetDataProps) {
    return (
        <>
            <Row styles="pet-data-pet-details-grid-wrapper">
                <PetDetailsGrid pet={pet} />
            </Row>
            <Row styles='pet-data-button-wrapper'>
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