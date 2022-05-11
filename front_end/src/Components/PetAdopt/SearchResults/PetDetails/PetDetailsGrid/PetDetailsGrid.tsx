import { ADOPTION_STATUS_DICT, ADOPTION_STATUS_WORDING, ANIMAL_TYPE_WORDING, BIO_WORDING, BREED_WORDING, COLOR_WORDING, DIETARY_RESTRICTIONS_WORDING, HEIGHT_WORDING, HYPOALLERGENIC_STATUS_DICT, HYPOALLERGENIC_STATUS_WORDING, NAME_WORDING, PET_BIO_DEFAULT_PLACEHOLDER, WEIGHT_WORDING } from '../../../../../Utils/Constants/constants';
import SymmetricalGrid from '../../../../General/Grids/SymmetricalGrid/SymmetricalGrid';
import { PetDetailsGridProps } from './IPetDetailsGridProps';
import Row from '../../../../General/Flexboxes/Row/Row';
import Col from '../../../../General/Flexboxes/Column/Col';
import '../../../../../Styles/general.css';
import './PetDetailsGrid.css';

function PetDetailsGrid({ pet }: PetDetailsGridProps) {
    const petPropertiesArray = [
        { category: `😎 ${NAME_WORDING}: `, categoryValue: pet.name },
        { category: `💚 ${ADOPTION_STATUS_WORDING}: `, categoryValue: ADOPTION_STATUS_DICT[pet.adoptionStatus] },
        { category: `🐾 ${ANIMAL_TYPE_WORDING}: `, categoryValue: pet.animalType },
        { category: `🐺 ${BREED_WORDING}: `, categoryValue: pet.breed },
        { category: `🌈 ${COLOR_WORDING}: `, categoryValue: pet.color },
        { category: `👠 ${HEIGHT_WORDING}: `, categoryValue: pet.height },
        { category: `⚖️ ${WEIGHT_WORDING}: `, categoryValue: pet.weight },
        { category: `🍫 ${HYPOALLERGENIC_STATUS_WORDING}: `, categoryValue: HYPOALLERGENIC_STATUS_DICT[pet.hypoallergenicStatus] },
        { category: `🥫 ${DIETARY_RESTRICTIONS_WORDING}: `, categoryValue: pet.dietaryRestrictions }
    ];

    return (
        <Col styles="pet-details-info-container">
            <Col styles="pet-details-info-inner-container">
                <SymmetricalGrid styles='pet-detail-grid' numOfColumns={2}>
                    {petPropertiesArray.map(petDetail => (
                        <Row styles='pet-detail'>
                            <div className="category">
                                {petDetail.category}{petDetail.categoryValue}
                            </div>
                        </Row>
                    ))}
                </SymmetricalGrid>
                <Col styles='pet-details-bio-container card'>
                    <Row styles='pet-bio-wording'>
                        <>{`📖 ${BIO_WORDING}: `}</>
                    </Row>
                    <Row styles='pet-bio'>
                        <>{pet.bio ?? PET_BIO_DEFAULT_PLACEHOLDER}</>
                    </Row>
                </Col>
            </Col>
        </Col>
    );
}

export default PetDetailsGrid;