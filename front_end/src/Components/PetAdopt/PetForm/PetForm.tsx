import {
    ADOPTION_STATUS_WORDING, ADOPTED_WORDING, NOT_ADOPTED_WORDING, ANIMAL_TYPE_WORDING, BREED_WORDING, COLOR_WORDING,
    HEIGHT_WORDING, WEIGHT_WORDING, HYPOALLERGENIC_STATUS_WORDING, NOT_HYPOALLERGENIC_WORDING, DIETARY_RESTRICTIONS_WORDING,
    BIO_WORDING, NAME_WORDING, HYPOALLERGENIC_WORDING, FOSTERED_WORDING, UPDATE_SUCCESS_MESSAGE
} from '../../../Utils/Constants/constants';
import ImageBubble from '../../General/ImageBubble/ImageBubble';
import GeneralButton from '../../General/Buttons/GeneralButton/GeneralButton';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Col from '../../General/Flexboxes/Column/Col';
import Row from '../../General/Flexboxes/Row/Row';
import { styled } from '@mui/material/styles';
import { PetFormProps } from './IPetFormProps';
import { usePetForm } from './usePetForm';
import '../../../Styles/general.css';
import './PetForm.css';

// MUI Styling
const Input = styled('input')({ display: 'none' });
const INPUT_OVERRIDE_STYLES = { backgroundColor: 'brown', '&:hover': { backgroundColor: 'white', color: 'brown', border: '1px solid brown' } };

PetForm.defaultProps = {
    pet: {
        name: '',
        adoptionStatus: '0',
        animalType: '',
        breed: '',
        color: '',
        height: 0,
        weight: 0,
        hypoallergenicStatus: '0',
        dietaryRestrictions: '',
        bio: '',
        imageUpload: ''
    },
};

function PetForm({ pet, formActionType, onChangePetInfo }: PetFormProps) {
    const {
        name,
        adoptionStatus,
        animalType,
        breed,
        color,
        height,
        weight,
        hypoallergenicStatus,
        dietaryRestrictions,
        bio,
        imageUpload,
        imageUploadRef,
        isError,
        isLoading,
        errorMessage,
        isSuccessfulUpdate,
        getPetIcon,
        nameChangeHandler,
        adoptionStatusChangeHandler,
        animalTypeChangeHandler,
        breedChangeHandler,
        colorChangeHandler,
        heightChangeHandler,
        weightChangeHandler,
        hypoallergenicStatusChangeHandler,
        dietaryRestrictionsChangeHandler,
        bioChangeHandler,
        addOrEditPetHandler,
        imageUploadChangeHandler,
        getSubmitButtonWording
    } = usePetForm({ pet, formActionType, onChangePetInfo });

    return (
        <Col styles='add-pet-form-container card' >
            <form className='add-pet-form flex-col' onSubmit={addOrEditPetHandler}>
                <Row styles='pet-image-upload-container'>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <label htmlFor="contained-button-file">
                            <Input
                                id="contained-button-file"
                                type="file"
                                accept="image/*"
                                ref={imageUploadRef}
                                onChange={imageUploadChangeHandler}
                            />
                            <Button
                                variant="contained"
                                component="span"
                                sx={INPUT_OVERRIDE_STYLES}>
                                {'Upload'}
                            </Button>
                        </label>
                    </Stack>
                    <Row styles='image-bubble-wrapper'>
                        <ImageBubble
                            styles='image-upload-preview'
                            borderRadius={50}
                            imageURL={imageUpload}
                        />
                    </Row>
                </Row>
                <Col styles='pet-info-container'>
                    <Row styles='pet-detail-single-container'>
                        <Row styles='pet-detail'>
                            <div className="single-category">{`${NAME_WORDING}:`}</div>
                            <div className="answer">
                                <input
                                    type="text"
                                    maxLength={45}
                                    value={name}
                                    className="pet-detail-input"
                                    placeholder={NAME_WORDING}
                                    onChange={(event) => nameChangeHandler(event.target.value)}
                                />
                            </div>
                        </Row>
                    </Row>
                    <Row styles='pet-detail-pair-container'>
                        <Row styles='pet-detail'>
                            <Row styles="category"><>{`💚 ${ADOPTION_STATUS_WORDING}:`}</></Row>
                            <div className="answer">
                                <select
                                    value={adoptionStatus.toString()}
                                    className="pet-detail-input"
                                    onChange={(event) => adoptionStatusChangeHandler(event.target.value)}>
                                    <option value={"0"}>{NOT_ADOPTED_WORDING}</option>
                                    <option value={"1"}>{ADOPTED_WORDING}</option>
                                    <option value={"2"}>{FOSTERED_WORDING}</option>
                                </select>
                            </div>
                        </Row>
                        <Row styles='pet-detail'>
                            <Row styles="category"><>{`${getPetIcon()} ${ANIMAL_TYPE_WORDING}:`}</></Row>
                            <div className="answer">
                                <input
                                    type="text"
                                    maxLength={45}
                                    value={animalType}
                                    className="pet-detail-input"
                                    placeholder={ANIMAL_TYPE_WORDING}
                                    onChange={(event) => animalTypeChangeHandler(event.target.value)}
                                />
                            </div>
                        </Row>
                    </Row>
                    <Row styles='pet-detail-pair-container'>
                        <Row styles='pet-detail'>
                            <Row styles="category"><>{`🐺 ${BREED_WORDING}:`}</></Row>
                            <div className="answer">
                                <input
                                    type="text"
                                    maxLength={45}
                                    value={breed}
                                    className="pet-detail-input"
                                    placeholder={BREED_WORDING}
                                    onChange={(event) => breedChangeHandler(event.target.value)}
                                />
                            </div>
                        </Row>
                        <Row styles='pet-detail'>
                            <Row styles="category"><>{`🌈 ${COLOR_WORDING}:`}</></Row>
                            <div className="answer">
                                <input
                                    type="text"
                                    maxLength={45}
                                    value={color}
                                    className="pet-detail-input"
                                    placeholder={COLOR_WORDING}
                                    onChange={(event) => colorChangeHandler(event.target.value)}
                                />
                            </div>
                        </Row>
                    </Row>
                    <Row styles='pet-detail-pair-container'>
                        <Row styles='pet-detail'>
                            <Row styles="category"><>{`👠 ${HEIGHT_WORDING} (cm):`}</></Row>
                            <div className="answer">
                                <input
                                    type="number"
                                    min="1"
                                    max="999"
                                    value={height}
                                    className="pet-detail-input"
                                    placeholder={HEIGHT_WORDING}
                                    onChange={(event) => heightChangeHandler(+(event.target.value))}
                                />
                            </div>
                        </Row>
                        <Row styles='pet-detail'>
                            <Row styles="category"><>{`⚖️ ${WEIGHT_WORDING} (kg):`}</></Row>
                            <div className="answer">
                                <input
                                    type="number"
                                    min="1"
                                    max="999"
                                    value={weight}
                                    className="pet-detail-input"
                                    placeholder={WEIGHT_WORDING}
                                    onChange={(event) => weightChangeHandler(+(event.target.value))}
                                />
                            </div>
                        </Row>
                    </Row>
                    <Row styles='pet-detail-pair-container'>
                        <Row styles='pet-detail'>
                            <Row styles="category"><>{`🍫 ${HYPOALLERGENIC_STATUS_WORDING}:`}</></Row>
                            <div className="answer">
                                <select
                                    value={hypoallergenicStatus.toString()}
                                    className="pet-detail-input"
                                    onChange={(event) => hypoallergenicStatusChangeHandler(event.target.value)}>
                                    <option value={"0"}>{HYPOALLERGENIC_WORDING}</option>
                                    <option value={"1"}>{NOT_HYPOALLERGENIC_WORDING}</option>
                                </select>
                            </div>
                        </Row>
                        <Row styles='pet-detail'>
                            <Row styles="category"><>{`🥫 ${DIETARY_RESTRICTIONS_WORDING}:`}</></Row>
                            <div className="answer">
                                <input
                                    type="text"
                                    maxLength={100}
                                    value={dietaryRestrictions}
                                    className="pet-detail-input"
                                    placeholder={DIETARY_RESTRICTIONS_WORDING}
                                    onChange={(event) => dietaryRestrictionsChangeHandler(event.target.value)}
                                />
                            </div>
                        </Row>
                    </Row>
                    <Row styles='pet-detail-bio-container'>
                        <Col styles='pet-detail-bio'>
                            <Row styles="category"><>{`📖 ${BIO_WORDING}:`}</></Row>
                            <textarea
                                maxLength={100}
                                value={bio}
                                className="pet-bio-textarea"
                                placeholder={BIO_WORDING}
                                onChange={(event) => bioChangeHandler(event.target.value)}
                            />
                        </Col>
                    </Row>
                </Col>
                <Row styles='add-pet-button-wrapper'>
                    <GeneralButton
                        wording={getSubmitButtonWording()}
                        isDisabled={false}
                    />
                </Row>
                <Row styles="pet-form-conditional-messaging-container">
                    <>
                        {isLoading &&
                            < Stack sx={{ color: 'silver' }} spacing={2} direction="row">
                                <CircularProgress color="inherit" />
                            </Stack>}
                        {isSuccessfulUpdate &&
                            < Alert severity="success">
                                {UPDATE_SUCCESS_MESSAGE}
                            </Alert>}
                        {isError &&
                            < Alert severity="error">
                                {errorMessage}
                            </Alert>}
                    </>
                </Row>
            </form>
        </Col >
    );
}

export default PetForm;