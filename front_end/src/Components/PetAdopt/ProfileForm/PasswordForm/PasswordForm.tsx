import {
    CONFIRM_NEW_PASSWORD_WORDING, CONFIRM_PASSWORD_WORDING, NEW_PASSWORD_WORDING,
    OLD_PASSWORD_WORDING, PASSWORD_WORDING, PEEP_PETS_TITLE_STYLES, UPDATE_PASSWORD_WORDING, UPDATE_SUCCESS_MESSAGE
} from "../../../../Utils/Constants/constants";
import Col from "../../../General/Flexboxes/Column/Col";
import Row from "../../../General/Flexboxes/Row/Row";
import GeneralButton from "../../../General/Buttons/GeneralButton/GeneralButton";
import PeepPetsTitle from '../../../General/Title/PeepPetsTitle';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { usePasswordForm } from './usePasswordForm';
import '../../../../Styles/general.css';
import './PasswordForm.css';

function PasswordForm() {
    const {
        oldPassword,
        newPassword,
        confirmNewPassword,
        isLoading,
        isError,
        errorMessage,
        isSuccessfulUpdate,
        oldPasswordChangeHandler,
        newPasswordChangeHandler,
        confirmNewPasswordChangeHandler,
        updatePasswordHandler
    } = usePasswordForm();

    return (
        <Col styles='password-form-container card'>
            <form className="password-form flex-col" onSubmit={updatePasswordHandler}>
                <Row styles='title-wrapper'>
                    <PeepPetsTitle
                        styles={PEEP_PETS_TITLE_STYLES}
                        wording={`${UPDATE_PASSWORD_WORDING} ㊙️`}
                    />
                </Row>
                <fieldset className="sign-up-fieldset"><legend>{OLD_PASSWORD_WORDING}</legend><input
                    required
                    type="password"
                    className="sign-up-input"
                    value={oldPassword}
                    maxLength={45}
                    placeholder={`${PASSWORD_WORDING}: `}
                    onChange={(event) => oldPasswordChangeHandler(event.target.value)}
                /></fieldset>
                <fieldset className="sign-up-fieldset"><legend>{NEW_PASSWORD_WORDING}</legend><input
                    required
                    type="password"
                    className="sign-up-input"
                    value={newPassword}
                    maxLength={45}
                    placeholder={`${PASSWORD_WORDING}: `}
                    onChange={(event) => newPasswordChangeHandler(event.target.value)}
                /></fieldset>
                <fieldset className="sign-up-fieldset"><legend>{CONFIRM_NEW_PASSWORD_WORDING}</legend><input
                    required
                    type="password"
                    className="sign-up-input"
                    value={confirmNewPassword}
                    maxLength={45}
                    placeholder={`${CONFIRM_PASSWORD_WORDING}: `}
                    onChange={(event) => confirmNewPasswordChangeHandler(event.target.value)}
                /></fieldset>
                <Row styles='password-form-button-wrapper'>
                    <GeneralButton
                        wording={UPDATE_PASSWORD_WORDING}
                        isDisabled={false}
                    />
                </Row>
                <Row styles="password-form-conditional-messaging-container">
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
        </Col>
    );
}

export default PasswordForm;