import { useState } from 'react';
import UserData from '../UserData/UserData';
import PetData from '../PetData/PetData';
import Col from '../../../General/Flexboxes/Column/Col';
import Row from '../../../General/Flexboxes/Row/Row';
import { isAUser, isAPet } from '../../../../Utils/Library/library';
import './EntityCard.css';
import { EntityCardProps } from './IEntityCardProps';

function EntityCard({ entity, onMoreDetailsRequest }: EntityCardProps) {
    const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false);

    return (
        <Col styles='entity-card-container card' onAction={() => setIsOpenDetails(!isOpenDetails)}>
            <Row styles='entity-name'>
                <>
                    {isAUser(entity) ? `🧍 ${entity.lastName}, ${entity.firstName}`
                        :
                        isAPet(entity) ? `🐾 ${entity.name}`
                            :
                            null}
                </>
            </Row>
            <>
                {isOpenDetails &&
                    <>
                        {isAUser(entity) ?
                            <UserData
                                user={entity}
                                onMoreDetailsRequest={onMoreDetailsRequest}
                            />
                            :
                            isAPet(entity) ?
                                <PetData
                                    pet={entity}
                                    onMoreDetailsRequest={onMoreDetailsRequest}
                                />
                                :
                                null}
                    </>}
            </>
        </Col >
    );
}

export default EntityCard;;