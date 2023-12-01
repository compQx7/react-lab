import './Controller.css';

import React from 'react';

import { Value } from 'const/value';

import { CalcButton } from 'components/CalcButton/CalcButton';

/** 電卓操作（ボタン一式）コンポーネント */
export const Controller = () => {
    return (
        <>
            <div className="controller">
                {
                    [
                        Value.SEVEN, Value.EIGHT, Value.NINE, Value.DIVIDE,
                        Value.FOUR, Value.FIVE, Value.SIX, Value.MULTIPLY,
                        Value.ONE, Value.TWO, Value.THREE, Value.MINUS,
                        Value.CLEAR, Value.ZERO, Value.EQUAL, Value.PLUS,
                    ].map((value, index) => (
                        <CalcButton key={index} value={value} />
                    ))
                }
            </div>
        </>
    )
}
