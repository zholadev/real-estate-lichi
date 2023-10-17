'use client'

import React, {useRef} from 'react';
import styles from "@/styles/ui-logo.module.sass";
import {gsap} from "gsap"

/**
 * @author Zholaman Zhumanov
 * @created 09.10.2023
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Logo(props) {
    const {theme, onClick} = props

    // const tlRef = useRef(null);
    //
    // const init = () => {
    //     const tl = gsap.timeline({
    //         ease: 'elastic.out(1, 0.8)',
    //         duration: 0.5,
    //         paused: true,
    //     });
    //
    //     tl.to('.icon', { rotation: 90 });
    //
    //     const animations = [
    //         {
    //             o: "#svg_bar_1",
    //             p: "M35.044,19.904243L39.044,12.095601L52.088,12.095601L52.072269,19.999922L35.044,19.904243Z",
    //         },
    //         {
    //             o: "#svg_bar_2",
    //             p: "M11.977,35.848501L16.0325,28.1285L52.014,28.1285L51.977,36.0325L11.977,35.848501Z",
    //         },
    //         {
    //             o: "#svg_bar_3",
    //             p: "M28.0555,52.133688L24.0555,44.001541L51.948,44.129623L51.910296,52.133688L28.0555,52.133688Z",
    //         },
    //     ];
    //
    //     animations.forEach((el, i) => {
    //         tl.to(el.o, { d: el.p, duration: 0.1 }, i * 0.1);
    //     });
    //
    //     return tl;
    // };
    //
    // const timeline = init();
    // tlRef.current = timeline;
    //
    // const handleLogoClick = (e) => {
    //     if (tlRef.current) {
    //         tlRef.current.play();
    //         tlRef.current.eventCallback('onComplete', () => {
    //             e.target.classList.toggle('--open');
    //             tlRef.current.reverse();
    //         });
    //     }
    //
    //     if (onClick) {
    //         onClick()
    //     }
    // };

    return (
        <div className={`${styles['ui_logo']} ${theme === 'light' ? styles['ui_logo_light'] : ''}`} onClick={onClick}>
            <div className={styles['ui_logo_items']}>
                <div className={styles['item']}/>
                <div className={styles['item']}/>
                <div className={styles['item']}/>
            </div>

            <div className={styles['ui_logo_text']}>
                <div>Meta</div>
                <div>Trust</div>
            </div>
        </div>
    );
}

export default Logo;
