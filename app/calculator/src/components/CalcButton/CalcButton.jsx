import './CalcButton.css';

import React from 'react';
import { useContext } from 'react';

import { isNumber, isOperator, isEqual, isClear } from 'util/buttonTypeDetermination';
import { CalcContext } from 'context/calcContext';

/** 電卓ボタンのコンポーネント */
export const CalcButton = ({value}) => {
    const handleClick = useContext(CalcContext);

    return (
        <>
            <button className={applyButtonStyle(value)}
            onClick={() => {handleClick(value)}}
        >
                {value}
            </button>
        </>
    )
}

/** propsに応じてstyleを適用するヘルパー関数 */
const applyButtonStyle = (value) => {
    if (isNumber(value)) {
        return 'calc-btn num-btn';
    } else if (isOperator(value)) {
        return 'calc-btn ope-btn';
    } else if (isEqual(value)) {
        return 'calc-btn equal-btn';
    } else if (isClear(value)) {
        return 'calc-btn clear-btn';
    } else {
        return 'calc-btn';
    }
}