import {
    NAV_BAR_WRAPPER_STYLES, NAV_BAR_TAB_STYLES, NAV_BAR_TAB_NAMES,
    AUTH_BAR_NAMES, ADMIN_BAR_NAMES, SETTINGS_BAR_NAMES, USER_GREETING_STYLES, ADD_PET_WORDING
} from '../../../Utils/Constants/constants';
import CompanyLogo from './CompanyLogo/CompanyLogo';
import NavBar from './NavBar/NavBar';
import AuthBar from './AuthBar/AuthBar';
import Row from '../../General/Flexboxes/Row/Row';
import { FaPaw } from "react-icons/fa";
import PeepPetsModal from '../../General/Modals/PeepPetsModal';
import SignUpForm from '../SignUpForm/SignUpForm';
import LogInForm from '../LogInForm/LogInForm';
import SettingsBar from './SettingsBar/SettingsBar';
import AdminBar from './AdminBar/AdminBar';
import { SIGN_UP_WORDING } from '../../../Utils/Constants/constants';
import PetForm from '../PetForm/PetForm';
import { useNavBarContents } from './useNavBarContents';
import './NavBarContents.css';

function NavBarContents() {
    const {
        SIGN_UP,
        LOG_IN,
        ADD_PET,
        activeUser,
        formInModal,
        successfulSignUpMessage,
        closeModalHandler,
        getUserGreeting,
        successfulSignUpHandler,
        authClickHandler,
        adminClickHandler,
        settingsClickHandler
    } = useNavBarContents();

    return (
        <Row styles={NAV_BAR_WRAPPER_STYLES}>
            <CompanyLogo />
            <NavBar
                styles={NAV_BAR_TAB_STYLES}
                names={NAV_BAR_TAB_NAMES}
            />
            <Row styles='icon-container'>
                <FaPaw></FaPaw>
            </Row>
            {activeUser.isAdmin ?
                <>
                    <AdminBar
                        styles={NAV_BAR_TAB_STYLES}
                        names={ADMIN_BAR_NAMES}
                        onAction={adminClickHandler}
                    />
                    <SettingsBar
                        styles={NAV_BAR_TAB_STYLES}
                        names={SETTINGS_BAR_NAMES}
                        greetingStyles={USER_GREETING_STYLES}
                        greeting={getUserGreeting()}
                        onAction={settingsClickHandler}
                    />
                </>
                :
                activeUser.userId ?
                    <SettingsBar
                        styles={NAV_BAR_TAB_STYLES}
                        names={SETTINGS_BAR_NAMES}
                        greetingStyles={USER_GREETING_STYLES}
                        greeting={getUserGreeting()}
                        onAction={settingsClickHandler}
                    />
                    :
                    <AuthBar
                        styles={NAV_BAR_TAB_STYLES}
                        names={AUTH_BAR_NAMES}
                        onAction={authClickHandler}
                    />}
            <PeepPetsModal
                content={formInModal === SIGN_UP ?
                    <Row styles='sign-up-form-wrapper card'>
                        <SignUpForm
                            formTitle={SIGN_UP_WORDING}
                            submitButtonWording={SIGN_UP_WORDING}
                            wordingContainer={true}
                            onSuccessfulSignUp={successfulSignUpHandler}
                            onAuthMethodChange={authClickHandler}
                        />
                    </Row>
                    :
                    formInModal === LOG_IN ?
                        <LogInForm
                            successfulSignUpMessage={successfulSignUpMessage}
                            onAuthMethodChange={authClickHandler}
                        />
                        :
                        formInModal === ADD_PET ?
                            <PetForm
                                formActionType={ADD_PET_WORDING}
                            />
                            :
                            null}
                onClose={closeModalHandler}
            />
        </Row>
    );
}

export default NavBarContents;