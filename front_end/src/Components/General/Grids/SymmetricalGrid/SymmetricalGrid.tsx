import { GridProps } from './ISymmetricalGridProps';
import { useCallback, useMemo } from 'react';

function SymmetricalGrid({ numOfColumns, styles, children, onAction }: GridProps) {
    const classes = styles;

    const onClick = useCallback((event) => onAction && onAction(event), [onAction]);
    const gridStyle = useMemo(() => ({ display: "grid", gridTemplateColumns: `repeat(${numOfColumns}, 1fr)` }), [numOfColumns]);

    return (
        <div
            style={gridStyle}
            className={classes}
            onClick={onClick}>
            {children}
        </div >
    );
}

export default SymmetricalGrid;