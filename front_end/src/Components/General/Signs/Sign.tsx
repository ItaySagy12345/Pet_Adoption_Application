import React, { useMemo } from 'react';
import { SignProps } from './ISignProps';
import Row from "../Flexboxes/Row/Row";
import './Sign.css';

function Sign({ wording, styles, colorPrimary, colorSecondary, borderRadius }: SignProps) {
    const classes = 'sign ' + styles;

    const signStyle = useMemo(() => ({
        color: colorPrimary,
        backgroundColor: colorSecondary,
        border: `1px solid ${colorPrimary}`,
        borderRadius: `${borderRadius}px`
    }), [colorPrimary, colorSecondary, borderRadius]);

    return (
        <div
            className={classes}
            style={signStyle}>
            <Row styles='sign-wording-container'><>{wording}</></Row>
        </div>
    );
}

export default React.memo(Sign);