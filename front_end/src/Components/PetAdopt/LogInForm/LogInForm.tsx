import { EMAIL_WORDING, PASSWORD_WORDING, SIGN_UP_WORDING, LOG_IN_WORDING, LOGIN_AUTH_PROMPT } from '../../../Utils/Constants/constants';
import { PEEP_PETS_TITLE_STYLES } from '../../../Utils/Constants/constants';
import { LogInFormProps } from './ILogInFormProps';
import { useLogInForm } from './useLogInForm';
import GeneralButton from '../../General/Buttons/GeneralButton/GeneralButton';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Col from '../../General/Flexboxes/Column/Col';
import Row from '../../General/Flexboxes/Row/Row';
import PeepPetsTitle from '../../General/Title/PeepPetsTitle';
import '../../../Styles/general.css';
import './LogInForm.css';

function LogInForm({ successfulSignUpMessage, onAuthMethodChange }: LogInFormProps) {
    const {
        email,
        password,
        isLoading,
        isError,
        errorMessage,
        renderSuccessfulSignUpMessage,
        emailChangeHandler,
        passwordChangeHandler,
        logInHandler,
        getButtonStyles,
        getButtonStatus
    } = useLogInForm({ onAuthMethodChange });

    return (
        <Col styles='log-in-form-container card'>
            <>
                {(renderSuccessfulSignUpMessage && successfulSignUpMessage) &&
                    <Row styles='new-user-greeting-container'>
                        <>{successfulSignUpMessage}</>
                    </Row>}
            </>
            <Row styles='title-container'>
                <PeepPetsTitle styles={PEEP_PETS_TITLE_STYLES} wording={LOG_IN_WORDING} />
            </Row>
            <form className="log-in-form flex-col" onSubmit={logInHandler}>
                <fieldset className="log-in-fieldset"><legend>{EMAIL_WORDING}</legend><input
                    required
                    type="email"
                    className="log-in-input"
                    value={email}
                    maxLength={45}
                    placeholder={`${EMAIL_WORDING}: `}
                    onChange={(event) => emailChangeHandler(event.target.value)}
                /></fieldset>
                <fieldset className="log-in-fieldset"><legend>{PASSWORD_WORDING}</legend><input
                    required
                    type="password"
                    className="log-in-input"
                    value={password}
                    maxLength={45}
                    placeholder={`${PASSWORD_WORDING}: `}
                    onChange={(event) => passwordChangeHandler(event.target.value)}
                /></fieldset>
                <Row styles='log-in-form-button-container'>
                    <GeneralButton
                        wording={LOG_IN_WORDING}
                        styles={getButtonStyles()}
                        isDisabled={getButtonStatus()}
                    />
                </Row>
                <Row styles='auth-wording-container'>
                    <div>{LOGIN_AUTH_PROMPT}</div>
                    <div className="peep-pets-link" onClick={() => onAuthMethodChange(SIGN_UP_WORDING)}>{SIGN_UP_WORDING}</div>
                </Row>
                <Row styles="login-form-conditional-messaging-container">
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

export default LogInForm;