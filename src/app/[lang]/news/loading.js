import React from 'react';
import Skeleton from "react-loading-skeleton";
import styles from "@/styles/news-page.module.sass";

/**
 * @author Zholaman Zhumanov
 * @created 19.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function Loading(props) {
    return (
        <div className={'container_md page_top_size'}>
            <div className={styles['loading']}>
                <Skeleton style={{height: "10px", width: '300px', marginBottom: "40px"}}/>

                <Skeleton style={{height: "30px", width: '200px', marginBottom: "80px"}}/>

                <Skeleton
                    containerClassName={styles['loading_cards']}
                    count={4}
                    style={{
                        height: "300px",
                        width: '450px',
                        borderRadius: "7px"
                    }}
                />
            </div>
        </div>
    );
}

export default Loading;
