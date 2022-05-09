
import {
    FIRST_NAME_WORDING, LAST_NAME_WORDING, EMAIL_WORDING, PHONE_NUMBER_WORDING, PASSWORD_WORDING,
    CONFIRM_PASSWORD_WORDING, LOG_IN_WORDING, SIGNUP_AUTH_PROMPT
} from '../../../Utils/Constants/constants';
import { useSignUpForm } from './useSignUpForm';
import { PEEP_PETS_TITLE_STYLES } from '../../../Utils/Constants/constants';
import { SignUpFormProps } from './ISignUpFormProps';
import GeneralButton from '../../General/Buttons/GeneralButton/GeneralButton';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Col from '../../General/Flexboxes/Column/Col';
import Row from '../../General/Flexboxes/Row/Row';
import PeepPetsTitle from '../../General/Title/PeepPetsTitle';
import '../../../Styles/general.css';
import './SignUpForm.css';

function SignUpForm({ formTitle, onAuthMethodChange, onSuccessfulSignUp, submitButtonWording, wordingContainer }: SignUpFormProps) {
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        confirmPassword,
        isLoading,
        isError,
        errorMessage,
        firstNameChangeHandler,
        lastNameChangeHandler,
        emailChangeHandler,
        phoneNumberChangeHandler,
        passwordChangeHandler,
        confirmPasswordChangeHandler,
        signUpHandler,
        getButtonStyles,
        getButtonStatus
    } = useSignUpForm({ formTitle, onAuthMethodChange, onSuccessfulSignUp, submitButtonWording, wordingContainer });

    return (
        <Col styles='sign-up-form-container'>
            <Row styles='title-container'>
                <PeepPetsTitle
                    styles={PEEP_PETS_TITLE_STYLES}
                    wording={formTitle}
                />
            </Row>
            <form className="sign-up-form flex-col" onSubmit={signUpHandler}>
                <fieldset className="sign-up-fieldset"><legend>{FIRST_NAME_WORDING}</legend><input
                    required
                    type="text"
                    className="sign-up-input"
                    value={firstName}
                    maxLength={45}
                    placeholder={`${FIRST_NAME_WORDING}: `}
                    onChange={(event) => firstNameChangeHandler(event.target.value)}
                /></fieldset>
                <fieldset className="sign-up-fieldset"><legend>{LAST_NAME_WORDING}</legend><input
                    required
                    type="text"
                    className="sign-up-input"
                    value={lastName}
                    maxLength={45}
                    placeholder={`${LAST_NAME_WORDING}: `}
                    onChange={(event) => lastNameChangeHandler(event.target.value)}
                /></fieldset>
                <fieldset className="sign-up-fieldset"><legend>{EMAIL_WORDING}</legend><input
                    required
                    type="email"
                    className="sign-up-input"
                    value={email}
                    maxLength={45}
                    placeholder={`${EMAIL_WORDING}: `}
                    onChange={(event) => emailChangeHandler(event.target.value)}
                /></fieldset>
                <fieldset className="sign-up-fieldset"><legend>{PHONE_NUMBER_WORDING}</legend><input
                    required
                    type="number"
                    className="sign-up-input"
                    value={phoneNumber}
                    max="9999999999"
                    placeholder={`${PHONE_NUMBER_WORDING}: `}
                    onChange={(event) => phoneNumberChangeHandler(event.target.value)}
                /></fieldset>
                <fieldset className="sign-up-fieldset"><legend>{PASSWORD_WORDING}</legend><input
                    required
                    type="password"
                    className="sign-up-input"
                    value={password}
                    maxLength={45}
                    placeholder={`${PASSWORD_WORDING}: `}
                    onChange={(event) => passwordChangeHandler(event.target.value)}
                /></fieldset>
                <fieldset className="sign-up-fieldset"><legend>{CONFIRM_PASSWORD_WORDING}</legend><input
                    required
                    type="password"
                    className="sign-up-input"
                    value={confirmPassword}
                    maxLength={45}
                    placeholder={`${CONFIRM_PASSWORD_WORDING}: `}
                    onChange={(event) => confirmPasswordChangeHandler(event.target.value)}
                /></fieldset>
                <Row styles='sign-up-form-button-container'>
                    <GeneralButton
                        wording={submitButtonWording}
                        styles={getButtonStyles()}
                        isDisabled={getButtonStatus()}
                    />
                </Row>
                {wordingContainer &&
                    <Row styles='auth-wording-container'>
                        <div>{SIGNUP_AUTH_PROMPT}</div>
                        <div
                            className="peep-pets-link"
                            onClick={() => onAuthMethodChange && onAuthMethodChange(LOG_IN_WORDING)}>
                            {LOG_IN_WORDING}
                        </div>
                    </Row>}
                <Row styles="signup-form-conditional-messaging-container">
                    <>
                        {isLoading &&
                            < Stack sx={{ color: 'silver' }} spacing={2} direction="row">
                                <CircularProgress color="inherit" />
                            </Stack>}
                        {isError &&
                            < Alert severity="error">
                                {errorMessage}
                            </Alert>}
                    </>
                </Row>
            </form>
        </Col>
    );
}

export default SignUpForm;