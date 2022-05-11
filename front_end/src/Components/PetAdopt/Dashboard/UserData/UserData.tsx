import { UserDataProps } from './IUserDataProps';
import { useState } from 'react';
import PetResult from '../../SearchResults/PetResult/PetResult';
import Col from '../../../General/Flexboxes/Column/Col';
import Row from '../../../General/Flexboxes/Row/Row';
import { Pet } from '../../../../Interfaces/IPet';
import SymmetricalGrid from '../../../General/Grids/SymmetricalGrid/SymmetricalGrid';
import '../../../../Styles/general.css';
import './UserData.css';

function User({ user, onMoreDetailsRequest }: UserDataProps) {

    const moreDetailsRequestHandler = (event: any, pet: Pet) => {
        event.stopPropagation();
        onMoreDetailsRequest(pet);
    };

    return (
        <Col styles='user-data-details-container'>
            <Row styles='contact-details'>
                <div className="contact-detail">{`📧 ${user.email}`}</div>
                <div className="contact-detail">{`📞 ${user.phoneNumber}`}</div>
            </Row>
            <SymmetricalGrid styles='pets-grid' numOfColumns={2}>
                <>
                    {user.ownedPets?.map((pet, index) => (
                        <Row styles='pet-result-wrapper'>
                            <PetResult
                                key={index}
                                pet={pet}
                                onMoreDetailsRequest={moreDetailsRequestHandler}
                            />
                        </Row>
                    ))}
                </>
            </SymmetricalGrid>
        </Col>
    );
}

export default User;