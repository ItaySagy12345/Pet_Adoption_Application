import ProfileForm from '../../Components/PetAdopt/ProfileForm/ProfileForm';
import Row from '../../Components/General/Flexboxes/Row/Row';
import '../../Styles/general.css';
import '../skinnyPage.css';

function ProfilePage() {
    return (
        <Row styles='skinny-page'>
            <ProfileForm />
        </Row>
    );
}

export default ProfilePage;
