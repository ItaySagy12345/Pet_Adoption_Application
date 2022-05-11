import {
    ENABLED_BUTTON_STYLE, ANIMAL_TYPE_WORDING, BREED_WORDING, ADOPTION_STATUS_WORDING, SEARCH_BUTTON_WORDING,
    SEARCH_FORM_WORDING, ADDITIONAL_OPTIONS_SEARCH_WORDING, MIN_HEIGHT_WORDING, MAX_HEIGHT_WORDING,
    MIN_WEIGHT_WORDING, MAX_WEIGHT_WORDING
} from '../../../Utils/Constants/constants';
import { useSearchForm } from './useSearchForm';
import Row from '../../General/Flexboxes/Row/Row';
import Col from '../../General/Flexboxes/Column/Col';
import PeepPetsTitle from '../../General/Title/PeepPetsTitle';
import GeneralButton from '../../General/Buttons/GeneralButton/GeneralButton';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { BUTTON_WORDING, PEEP_PETS_TITLE_STYLES } from '../../../Utils/Constants/constants';
import { SearchFormProps } from './ISearchFormProps';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import './SearchForm.css';

function SearchForm({ onSearchPets, onError }: SearchFormProps) {
    const {
        animalType,
        adoptionStatus,
        breed,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
        isAdvancedSearch,
        isLoading,
        searchTypeChangeHandler,
        animalTypeChangeHandler,
        adoptionStatusChangeHandler,
        breedChangeHandler,
        minHeightChangeHandler,
        maxHeightChangeHandler,
        minWeightChangeHandler,
        maxWeightChangeHandler,
        searchPetsHandler
    } = useSearchForm({ onSearchPets, onError });

    return (
        <Col styles='search-form-container card'>
            <Row styles='title-container'>
                <PeepPetsTitle
                    styles={PEEP_PETS_TITLE_STYLES}
                    wording={SEARCH_FORM_WORDING}
                />
            </Row>
            <form className="search-form flex-col" onSubmit={searchPetsHandler}>
                <Row styles='basic-search-container'>
                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel id="petType">{ANIMAL_TYPE_WORDING}</InputLabel>
                        <Select
                            labelId="petType"
                            value={animalType}
                            label={ANIMAL_TYPE_WORDING}
                            onChange={(event) => animalTypeChangeHandler(event.target.value)}>
                            <MenuItem value="">{"None"}</MenuItem>
                            <MenuItem value={"dog"}>{"Dog"}</MenuItem>
                            <MenuItem value={"cat"}>{"Cat"}</MenuItem>
                            <MenuItem value={"rabbit"}>{"Rabbit"}</MenuItem>
                        </Select>
                    </FormControl>
                    <Row styles='additional-options-button-container'>
                        <GeneralButton
                            wording={ADDITIONAL_OPTIONS_SEARCH_WORDING}
                            isDisabled={false}
                            type={BUTTON_WORDING}
                            onAction={searchTypeChangeHandler}
                        />
                    </Row>
                </Row>
                {isAdvancedSearch &&
                    <>
                        <FormControl sx={{ minWidth: 160 }}>
                            <InputLabel id="adoptionStatus">{ADOPTION_STATUS_WORDING}</InputLabel>
                            <Select
                                labelId="adoptionStatus"
                                value={adoptionStatus}
                                label={ADOPTION_STATUS_WORDING}
                                onChange={(event: any) => adoptionStatusChangeHandler(event.target.value)}>
                                <MenuItem value={undefined}>None</MenuItem>
                                <MenuItem value={0}>Needs a home</MenuItem>
                                <MenuItem value={1}>Adopted</MenuItem>
                            </Select>
                        </FormControl>
                        <fieldset className="search-fieldset"><legend>{BREED_WORDING}</legend><input
                            type="text"
                            className="search-input"
                            value={breed}
                            maxLength={45}
                            placeholder={`${BREED_WORDING}: `}
                            onChange={(event) => breedChangeHandler(event.target.value)}
                        /></fieldset>
                        <Col styles='height-weight-input-containers'>
                            <Row styles='height-weight-input-container'>
                                <fieldset className="search-fieldset"><legend>{MIN_HEIGHT_WORDING}</legend><input
                                    type="text"
                                    className="search-input"
                                    value={minHeight}
                                    maxLength={3}
                                    placeholder={`${MIN_HEIGHT_WORDING}: `}
                                    onChange={(event) => minHeightChangeHandler(event.target.value)}
                                /></fieldset>
                                <fieldset className="search-fieldset"><legend>{MAX_HEIGHT_WORDING}</legend><input
                                    type="text"
                                    className="search-input"
                                    value={maxHeight}
                                    maxLength={3}
                                    placeholder={`${MAX_HEIGHT_WORDING}: `}
                                    onChange={(event) => maxHeightChangeHandler(event.target.value)}
                                /></fieldset>
                            </Row>
                            <Row styles='height-weight-input-container'>
                                <fieldset className="search-fieldset"><legend>{MIN_WEIGHT_WORDING}</legend><input
                                    type="text"
                                    className="search-input"
                                    value={minWeight}
                                    maxLength={3}
                                    placeholder={`${MIN_WEIGHT_WORDING}: `}
                                    onChange={(event) => minWeightChangeHandler(event.target.value)}
                                /></fieldset>
                                <fieldset className="search-fieldset"><legend>{MAX_WEIGHT_WORDING}</legend><input
                                    type="text"
                                    className="search-input"
                                    value={maxWeight}
                                    maxLength={3}
                                    placeholder={`${MAX_WEIGHT_WORDING}: `}
                                    onChange={(event) => maxWeightChangeHandler(event.target.value)}
                                /></fieldset>
                            </Row>
                        </Col>
                    </>
                }
                <Row styles='search-form-button-container'>
                    <GeneralButton
                        wording={SEARCH_BUTTON_WORDING}
                        styles={ENABLED_BUTTON_STYLE}
                        isDisabled={false}
                    />
                </Row>
                {isLoading &&
                    < Stack sx={{ color: 'silver' }} spacing={2} direction="row">
                        <CircularProgress color="inherit" />
                    </Stack>}
            </form>
        </Col >
    );
}

export default SearchForm;