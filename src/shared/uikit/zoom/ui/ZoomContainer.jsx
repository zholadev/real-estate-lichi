import React from 'react';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

/**
 * @author Zholaman Zhumanov
 * @created 07.12.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function ZoomContainer(props) {
    const {children} = props

    return (
        <Zoom>{children}</Zoom>
    );
}

export default ZoomContainer;
