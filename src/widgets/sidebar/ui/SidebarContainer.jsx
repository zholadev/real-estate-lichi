import React from 'react';
import styles from '@/styles/widget-sidebar-container.module.sass'

/**
 * @author Zholaman Zhumanov
 * @created 17.10.2023
 * @param props
 * @returns {Element}
 * @constructor
 */
function SidebarContainer(props) {
    const {active, toggle, children} = props

    return (
        <div className={`${styles['widget_sidebar_container']} ${active ? styles['active'] : ''}`}>
            <i className={styles['sidebar_close']} onClick={toggle}/>
            {children}
        </div>
    );
}

export default SidebarContainer;
