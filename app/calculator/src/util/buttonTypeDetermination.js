import { Value } from 'const/value';

/** 入力値が数値かどうか判定する */
export const isNumber = (value) => {
    return value === Value.ZERO ||
           value === Value.ONE ||
           value === Value.TWO ||
           value === Value.THREE ||
           value === Value.FOUR ||
           value === Value.FIVE ||
           value === Value.SIX ||
           value === Value.SEVEN ||
           value === Value.EIGHT ||
           value === Value.NINE;
}

/** 入力値が演算子かどうか判定する */
export const isOperator = (value) => {
    return value === Value.PLUS ||
           value === Value.MINUS ||
           value === Value.MULTIPLY ||
           value === Value.DIVIDE;
}

/** 入力値がイコールかどうか判定する */
export const isEqual = (value) => {
    return value === Value.EQUAL;
}

/** 入力値がクリアかどうか判定する */
export const isClear = (value) => {
    return value === Value.CLEAR;
}
