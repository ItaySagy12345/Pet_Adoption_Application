import Row from "../../Components/General/Flexboxes/Row/Row";
import HomeInfo from "../../Components/PetAdopt/HomeInfo/HomeInfo";
import HomeSlides from "../../Components/PetAdopt/HomeSlides/HomeSlides";
import '../skinnyPage.css';
import './HomePage.css';

function HomePage() {
    return (
        <Row styles='home-page skinny-page'>
            <HomeInfo />
            <HomeSlides />
        </Row>
    );
}

export default HomePage;