import { ImageBubbleProps } from './IImageBubbleProps';
import React, { useMemo } from 'react';
import './ImageBubble.css';

function ImageBubble({ styles, borderRadius, imageURL }: ImageBubbleProps) {
    const classes = 'image-bubble ' + styles;
    const bubbleStyle = useMemo(() => ({ borderRadius: `${borderRadius}%` }), [borderRadius]);

    return (
        <div
            className={classes}
            style={bubbleStyle}>
            <img
                src={imageURL}
                alt="preview"
                className="image"
                style={bubbleStyle}
            />
        </div>
    );
}

export default React.memo(ImageBubble);