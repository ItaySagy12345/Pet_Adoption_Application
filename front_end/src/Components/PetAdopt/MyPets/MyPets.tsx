import PetResult from '../SearchResults/PetResult/PetResult';
import { useInspectedPet } from '../../../Hooks/useInspectedPet';
import { InspectedPetContextType } from '../../../Contexts/InspectedPetContext/InspectedPetContextType';
import SymmetricalGrid from '../../General/Grids/SymmetricalGrid/SymmetricalGrid';
import { Pet } from '../../../Interfaces/IPet';
import { MyPetsProps } from './IMyPetsProps';
import '../../../Styles/general.css';
import './MyPets.css';

function MyPets({ pets }: MyPetsProps) {
    const { updateInspectedPet } = useInspectedPet() as InspectedPetContextType;

    const moreDetailsRequestHandler = (pet: Pet) => {
        updateInspectedPet(pet);
    };

    return (
        <SymmetricalGrid styles='my-pets-container' numOfColumns={3}>
            {pets.map((pet: Pet, index: number) => (
                <div className="pet card">
                    {<PetResult
                        key={index}
                        pet={pet}
                        onMoreDetailsRequest={moreDetailsRequestHandler}
                    />}
                </div>
            ))}
        </SymmetricalGrid>
    );
}

export default MyPets;