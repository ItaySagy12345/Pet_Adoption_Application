import {
    EMAIL_WORDING, PEEP_PETS_TITLE_STYLES, PERSONAL_BIO_PLACEHOLDER, PERSONAL_BIO_WORDING, PERSONAL_DETAILS_WORDING,
    PHONE_NUMBER_WORDING, UPDATE_SUCCESS_MESSAGE, UPDATE_USER_DETAILS_WORDING
} from '../../../../Utils/Constants/constants';
import GeneralButton from '../../../General/Buttons/GeneralButton/GeneralButton';
import Row from '../../../General/Flexboxes/Row/Row';
import Col from '../../../General/Flexboxes/Column/Col';
import PeepPetsTitle from '../../../General/Title/PeepPetsTitle';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useUserDetailsForm } from './useUserDetailsForm';
import '../../../../Styles/general.css';
import './UserDetailsForm.css';

function UserDetailsForm() {
    const {
        email,
        phoneNumber,
        personalBio,
        isLoading,
        isError,
        errorMessage,
        isSuccessfulUpdate,
        personalBioChangeHandler,
        emailChangeHandler,
        phoneNumberChangeHandler,
        updateUserDetailsHandler
    } = useUserDetailsForm();

    return (
        <Col styles='update-user-details-form-container card'>
            <form className="update-user-details-form flex-col" onSubmit={updateUserDetailsHandler}>
                <Row styles='email-phone-number-fields-wrapper'>
                    <Col styles='email-phone-number-fields-container'>
                        <Row styles='title-container'>
                            <PeepPetsTitle
                                styles={PEEP_PETS_TITLE_STYLES}
                                wording={`${PERSONAL_DETAILS_WORDING} 🧍`}
                            />
                        </Row>
                        <fieldset className="sign-up-fieldset"><legend>{EMAIL_WORDING}</legend><input
                            type="email"
                            className="sign-up-input"
                            value={email}
                            maxLength={45}
                            placeholder={EMAIL_WORDING}
                            onChange={(event) => emailChangeHandler(event.target.value)}
                        /></fieldset>
                        <fieldset className="sign-up-fieldset"><legend>{PHONE_NUMBER_WORDING}</legend><input
                            type="number"
                            className="sign-up-input"
                            value={phoneNumber}
                            maxLength={10}
                            placeholder={PHONE_NUMBER_WORDING}
                            onChange={(event) => phoneNumberChangeHandler(event.target.value)}
                        /></fieldset>
                    </Col>
                    <Col styles='personal-bio-container'>
                        <Row styles='title-container'>
                            <PeepPetsTitle
                                styles={PEEP_PETS_TITLE_STYLES}
                                wording={`${PERSONAL_BIO_WORDING} 🖋️`}
                            />
                        </Row>
                        <textarea
                            value={personalBio}
                            className="personal-bio-textarea"
                            maxLength={100}
                            placeholder={PERSONAL_BIO_PLACEHOLDER}
                            onChange={(event) => personalBioChangeHandler(event.target.value)}
                        />
                    </Col>
                </Row>
                <Row styles='update-contact-form-button-wrapper'>
                    <GeneralButton
                        wording={UPDATE_USER_DETAILS_WORDING}
                        isDisabled={false}
                    />
                </Row>
                <Row styles="user-details-form-conditional-messaging-container">
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

export default UserDetailsForm;