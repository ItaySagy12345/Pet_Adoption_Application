import { GeneralButtonProps } from './IGeneralButtonProps';
import React, { useCallback, useMemo } from 'react';
import Row from '../../Flexboxes/Row/Row';
import '../../../../Styles/general.css';
import './GeneralButton.css';

function GeneralButton({ styles, borderRadius, wording, isDisabled, type, onAction }: GeneralButtonProps) {
    const classes = `button ${!styles && 'general-button'} ` + styles;

    const onClick = useCallback((event) => onAction && onAction(event), [onAction]);
    const buttonStyle = useMemo(() => ({ borderRadius: `${borderRadius}px` }), [borderRadius]);

    return (
        <button
            className={classes}
            type={type ?? "submit"}
            style={buttonStyle}
            disabled={isDisabled}
            onClick={onClick}>
            <Row styles='button-wording-container'><>{wording}</></Row>
        </button>
    );
}

export default React.memo(GeneralButton);