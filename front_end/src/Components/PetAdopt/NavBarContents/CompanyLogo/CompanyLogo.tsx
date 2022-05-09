import Row from '../../../General/Flexboxes/Row/Row';
import './CompanyLogo.css';

function CompanyLogo() {
    const COMPANY_NAME = 'PEEP PETS';

    return (
        <Row styles="company-logo-container">
            <div className="company-logo">{COMPANY_NAME}</div>
        </Row>
    );
}

export default CompanyLogo;