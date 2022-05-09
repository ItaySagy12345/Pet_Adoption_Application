import Col from "../../General/Flexboxes/Column/Col";
import Row from "../../General/Flexboxes/Row/Row";
import dog1_image from '../../../Images/dog_1.jpg';
import PeepPetsTitle from "../../General/Title/PeepPetsTitle";
import { PEEP_PETS_TITLE_STYLES } from '../../../Utils/Constants/constants';
import '../../../Styles/general.css';
import './HomeInfo.css';

function HomeInfo() {
    const HOME_DESCRIPTION = "Welcome to Peep Pets. Here, we give you the opportunity to adopt a friendly pet. Scroll through and find your next best friend!";
    const TITLE_WORDING = "Adopt Your 🐶 Today!";

    return (
        <Col styles='home-info-container card'>
            <Col styles='home-info-inner-container'>
                <Row styles='home-info-title-container'>
                    <PeepPetsTitle styles={PEEP_PETS_TITLE_STYLES} wording={TITLE_WORDING} />
                </Row>
                <Row styles='home-main-image'>
                    <img className="home-main-image-src" src={dog1_image} alt="Fluffy Puppy" />
                </Row>
                <Row styles='home-description-container'>
                    <Row styles='home-description-inner-container'>
                        <>{HOME_DESCRIPTION}</>
                    </Row>
                </Row>
            </Col>
        </Col>
    );
}

export default HomeInfo;