import Row from '../../Components/General/Flexboxes/Row/Row';
import PetDetails from '../../Components/PetAdopt/SearchResults/PetDetails/PetDetails';
import { InspectedPetContextType } from '../../Contexts/InspectedPetContext/InspectedPetContextType';
import { useInspectedPet } from '../../Hooks/useInspectedPet';
import './PetPage.css';

function PetPage() {
    const { inspectedPet } = useInspectedPet() as InspectedPetContextType;

    return (
        <Row styles='pet-details-wrapper'>
            <PetDetails
                pet={inspectedPet}
            />
        </Row>
    );
};

export default PetPage;