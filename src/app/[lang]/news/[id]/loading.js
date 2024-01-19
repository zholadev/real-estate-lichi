import React from 'react';
import Skeleton from "react-loading-skeleton";

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
            <Skeleton style={{height: "15px", width: '100%', maxWidth: "600px", marginBottom: "40px"}}/>
            <Skeleton style={{height: "30px", width: '100%', maxWidth: "1200px", marginBottom: "40px"}}/>
            <Skeleton style={{height: "10px", width: '30%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '40%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '30%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '60%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '50%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '70%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '60%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '50%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '80%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '30%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '80%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '70%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '30%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '40%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '30%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '60%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '50%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '70%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '60%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '50%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '80%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '30%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '80%', marginBottom: "10px"}}/>
            <Skeleton style={{height: "10px", width: '70%', marginBottom: "10px"}}/>
        </div>
    );
}

export default Loading;
