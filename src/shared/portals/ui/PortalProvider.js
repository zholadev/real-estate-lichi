'use client'

import React from 'react';
import {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';

function PortalProvider({children}) {
    const portalRootRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Create a div element for the portal container
        const portalRoot = document.createElement('div');
        portalRoot.className = 'portal-root';

        // Append the portal container to the body element
        document.body.appendChild(portalRoot);

        portalRootRef.current = portalRoot;
        setMounted(true);

        // Cleanup function to remove the portal container when unmounting
        return () => {
            document.body.removeChild(portalRoot);
        };
    }, []);

    // Render the children into the portal container
    return mounted ? ReactDOM.createPortal(children, portalRootRef.current) : null;
}

export default PortalProvider;
