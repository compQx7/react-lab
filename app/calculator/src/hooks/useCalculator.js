import { useState } from 'react';

import { Value } from 'const/value';
import { isNumber, isOperator, isEqual, isClear } from 'util/buttonTypeDetermination';

/**
 * 計算処理ロジック
 * 
 * @returns
 * result: 計算結果  
 * error: エラーメッセージ  
 * calculator: 電卓としての計算を行う関数
 */
export const useCalculator = () => {

    /** 被演算子（左） */
    const [leftOperand, setLeftOperand] = useState(0);
    /** 被演算子（右） */
    const [rightOperand, setRightOperand] = useState(null);
    /** 演算子 */
    const [operator, setOperator] = useState(null);
    /** 直前の入力値 */
    const [lastInput, setLastInput] = useState(null);
    /** 計算結果 */
    const [result, setResult] = useState(0);
    /** エラーメッセージ */
    const [error, setError] = useState(null);

    /** 
     * 入力値に応じてstateを更新する処理
     */
    const calculator = (currentInput) => {
        if (isNumber(currentInput)) {
            handleNumber(currentInput);
        } else if (isOperator(currentInput)) {
            handleOperator(currentInput);
        } else if (isEqual(currentInput)) {
            handleEqual(currentInput);
        } else if (isClear(currentInput)) {
            handleClear();
        }
    }

    /** 
     * 数字ボタン押下時の処理
     */
    const handleNumber = (currentInput) => {
        if (error || isEqual(lastInput)) {
            setLeftOperand(Number(currentInput));
            setRightOperand(null);
            setOperator(null);
            setResult(Number(currentInput));
            setError(null);
        } else if (operator === null) {
            const calcResult = leftOperand * 10 + Number(currentInput);
            if (isOverFlow(calcResult)) return;
            setLeftOperand(calcResult);
            setResult(calcResult);
        } else {
            const calcResult = (rightOperand === null ? 0 : rightOperand * 10) + Number(currentInput);
            if (isOverFlow(calcResult)) return;
            setRightOperand(calcResult);
            setResult(calcResult);
        }
        setLastInput(currentInput);
    }

    /** 
     * 演算子ボタン押下時の処理
     */
    const handleOperator = (currentInput) => {
        if (isOperator(lastInput)
            || isEqual(lastInput)
            || rightOperand === null) {
            setRightOperand(null);
            setOperator(currentInput);
            setLastInput(currentInput);
            return;
        }
        const calcResult = calculate(leftOperand, rightOperand, operator);
        if (isNaN(calcResult)) {
            setError(calcResult);
            return;
        }
        if (isOverFlow(calcResult)) {
            setError('計算結果が有効桁数を超えています。');
            return;
        }
        setLeftOperand(calcResult);
        setRightOperand(null);
        setResult(calcResult);
        setOperator(currentInput);
        setLastInput(currentInput);
    }

    /** 
     * イコールボタン押下時の処理
     */
    const handleEqual = (currentInput) => {
        if (isOperator(lastInput)) {
            const tmpRightOperand = leftOperand;
            const calcResult = calculate(leftOperand, tmpRightOperand, operator);
            if (isNaN(calcResult)) {
                setError(calcResult);
                return;
            }
            if (isOverFlow(calcResult)) {
                setError('計算結果が有効桁数を超えています。');
                return;
            }
            setRightOperand(tmpRightOperand);
            setLeftOperand(calcResult);
            setResult(calcResult);
        } else {
            const calcResult = calculate(leftOperand, rightOperand, operator);
            if (isNaN(calcResult)) {
                setError(calcResult);
                return;
            }
            if (isOverFlow(calcResult)) {
                setError('計算結果が有効桁数を超えています。');
                return;
            }
            setLeftOperand(calcResult);
            setResult(calcResult);
        }
        setLastInput(currentInput);
    }

    /** 
     * クリアボタン押下時の処理
     */
    const handleClear = () => {
        setLeftOperand(0);
        setRightOperand(null);
        setOperator(null);
        setResult(0);
        setError(null);
        setLastInput(null);
    }

    const isOverFlow = (value) => {
        return value > 999999999 ? true : false;
    }

    const calculate = (leftOperand, rightOperand, operator) => {
        switch (operator) {
            case Value.PLUS:
                return leftOperand + rightOperand;
            case Value.MINUS:
                return leftOperand - rightOperand;
            case Value.MULTIPLY:
                return leftOperand * rightOperand;
            case Value.DIVIDE:
                if (rightOperand === 0) {
                    return '0除算はできません。';
                }
                return leftOperand / rightOperand;
            default:
                return leftOperand;
        }
    }

    return {
        result,
        error,
        calculator,
    }
}