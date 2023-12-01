import './Calculator.css';

import React from 'react';

import { CalcContext } from 'context/calcContext';
import { useCalculator } from 'hooks/useCalculator';

import { Controller } from 'components/Controller/Controller';
import { Display } from 'components/Display/Display';

/** 電卓コンポーネント */
export const Calculator = () => {
    const { result, error, calculator } = useCalculator();

    return (
        <CalcContext.Provider value={ calculator }>
            <div className="calculator">
                <Display result={result} error={error} />
                <Controller />
            </div>
        </CalcContext.Provider>
    );
}