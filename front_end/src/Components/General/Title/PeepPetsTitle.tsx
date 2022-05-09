import React from 'react';
import { PeepPetsTitleProps } from './IPeepPetsTitleProps';
import '../../../Styles/general.css';

function PeepPetsTitle({ styles, wording }: PeepPetsTitleProps) {
    return (
        <div className={styles}>{wording}</div>
    );
}

export default React.memo(PeepPetsTitle);