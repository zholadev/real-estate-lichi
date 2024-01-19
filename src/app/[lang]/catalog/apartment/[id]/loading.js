import React from 'react';
import Skeleton from "react-loading-skeleton";

/**
 * @author Zholaman Zhumanov
 * @created 19.01.2024 - Zholaman Zhumanov
 * @param props
 * @returns {Element}
 * @constructor
 */
function Loading(props) {
    return (
        <div className={'container_lg page_top_size'}>
            <Skeleton containerClassName="loading-flex-1" style={{height: "30px", width: '30%', marginBottom: "40px"}}/>
            <div className="loading-container-flex mb-40">
                <Skeleton containerClassName="loading-flex-1" style={{
                    height: "100%",
                    minHeight: "280px",
                    width: '100%',
                    maxWidth: "877px",
                    marginBottom: "40px",
                    borderRadius: "7px"
                }}/>
                <div className="loading-container-flex-column">
                    <Skeleton style={{height: "20px", width: '50%', marginBottom: "20px"}}/>
                    <Skeleton style={{height: "10px", width: '60%', marginBottom: "20px"}}/>
                    <Skeleton style={{height: "10px", width: '70%', marginBottom: "20px"}}/>
                    <Skeleton style={{height: "10px", width: '40%', marginBottom: "20px"}}/>
                    <Skeleton style={{height: "10px", width: '80%', marginBottom: "20px"}}/>
                    <Skeleton style={{height: "10px", width: '70%', marginBottom: "20px"}}/>
                    <Skeleton style={{height: "10px", width: '40%', marginBottom: "20px"}}/>
                    <Skeleton style={{height: "10px", width: '80%', marginBottom: "20px"}}/>
                    <Skeleton style={{height: "10px", width: '30%', marginBottom: "20px"}}/>
                    <Skeleton style={{height: "50px", width: '320px', marginBottom: "20px"}}/>
                </div>
            </div>

            <Skeleton containerClassName="loading-flex-1" style={{height: "10px", width: '40%', marginBottom: "20px"}}/>
            <Skeleton containerClassName="loading-flex-1" style={{height: "10px", width: '60%', marginBottom: "20px"}}/>
            <Skeleton containerClassName="loading-flex-1" style={{height: "10px", width: '30%', marginBottom: "20px"}}/>
            <Skeleton containerClassName="loading-flex-1" style={{height: "10px", width: '70%', marginBottom: "20px"}}/>
            <Skeleton containerClassName="loading-flex-1" style={{height: "10px", width: '20%', marginBottom: "20px"}}/>
        </div>
    );
}

export default Loading;
