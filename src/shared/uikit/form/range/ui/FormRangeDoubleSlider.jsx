'use client'

import React, {useMemo, useState} from 'react';
import {Range} from 'react-range';
import {errorHandler} from "@/entities/errorHandler/errorHandler";

/**
 * @author Zholaman Zhumanov
 * @created 10.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function FormRangeDoubleSlider(props) {
    const {data, defaultMin, defaultMax} = props

    const getDataValues = useMemo(() => {
        try {
            return data.map(Number).sort((a, b) => a - b)
        } catch (error) {
            errorHandler("formRangeDoubleSlider", "getDataValues", error)
        }
    }, [data])

    const [values, setValues] = useState([parseFloat(getDataValues?.[0]), parseFloat(getDataValues[getDataValues.length - 1])]);

    const onChangeHandler = (e) => {
        console.log('e', e)
    }

    return (
        <>
            <Range
                step={1}
                min={getDataValues?.[0]}
                max={getDataValues[getDataValues.length - 1]}
                values={values}
                onChange={setValues}
                onFinalChange={onChangeHandler}
                renderTrack={({props, children}) => (
                    <div {...props} style={{...props.style, height: '3px', width: '100%', backgroundColor: "#000"}}>
                        {children}
                    </div>
                )}
                renderThumb={({props, index}) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '10px',
                            width: '10px',
                            borderRadius: '50%',
                            backgroundColor: '#000',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                height: '5px',
                                width: '5px',
                                backgroundColor: '#000',
                            }}
                        />
                    </div>
                )}
            />
            <div>{values?.[0]}{' '}{values?.[1]}</div>
        </>

    );
}

export default FormRangeDoubleSlider;
