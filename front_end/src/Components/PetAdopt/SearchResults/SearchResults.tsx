import { SearchResultsProps } from './ISearchResultsProps';
import { useInspectedPet } from '../../../Hooks/useInspectedPet';
import { InspectedPetContextType } from '../../../Contexts/InspectedPetContext/InspectedPetContextType';
import { NO_PETS_FOUND_MESSAGE } from '../../../Utils/Constants/constants';
import { Pet } from '../../../Interfaces/IPet';
import SymmetricalGrid from '../../General/Grids/SymmetricalGrid/SymmetricalGrid';
import PetResult from './PetResult/PetResult';
import Col from '../../General/Flexboxes/Column/Col';
import Row from '../../General/Flexboxes/Row/Row';
import '../../../Styles/general.css';
import './SearchResults.css';

function SearchResults({ pets }: SearchResultsProps) {
    const { updateInspectedPet } = useInspectedPet() as InspectedPetContextType;

    const moreDetailsRequestHandler = (pet: Pet) => {
        updateInspectedPet(pet);
    };

    return (
        <Col styles='search-results-grid-container card'>
            {pets ?
                <SymmetricalGrid styles='search-results-grid' numOfColumns={3}>
                    {pets.map((pet: Pet, index: number) => (
                        <Row styles='search-pet-result-wrapper'>
                            <PetResult
                                key={index}
                                pet={pet}
                                onMoreDetailsRequest={moreDetailsRequestHandler}
                            />
                        </Row>
                    ))}
                </SymmetricalGrid>
                :
                <Row styles='no-pets-found-message'>
                    <>{NO_PETS_FOUND_MESSAGE}</>
                </Row>}
        </Col >
    );
}

export default SearchResults;