import { renderHook, act } from '@testing-library/react';

import { Value } from 'const/value';

import { useCalculator } from '../useCalculator';

describe('基本仕様', () => {
    test('初期表示 result: 0, error: null', () => {
        const { result } = renderHook(() => useCalculator());

        expect(result.current.result).toBe(0);
        expect(result.current.error).toBeNull();
    });

    test('数字入力', () => {
        const { result } = renderHook(() => useCalculator());

        act(() => result.current.calculator(Value.ZERO));
        expect(result.current.result).toBe(0);

        act(() => result.current.calculator(Value.ONE));
        act(() => result.current.calculator(Value.TWO));
        act(() => result.current.calculator(Value.THREE));
        act(() => result.current.calculator(Value.FOUR));
        act(() => result.current.calculator(Value.FIVE));
        act(() => result.current.calculator(Value.SIX));
        act(() => result.current.calculator(Value.SEVEN));
        act(() => result.current.calculator(Value.EIGHT));
        act(() => result.current.calculator(Value.NINE));
        expect(result.current.result).toBe(123456789);
    });

    test('演算', () => {
        const { result } = renderHook(() => useCalculator());

        act(() => result.current.calculator(Value.ONE));
        act(() => result.current.calculator(Value.PLUS));
        act(() => result.current.calculator(Value.NINE));
        act(() => result.current.calculator(Value.EQUAL));
        expect(result.current.result).toBe(10);

        act(() => result.current.calculator(Value.MINUS));
        act(() => result.current.calculator(Value.TWO));
        act(() => result.current.calculator(Value.EQUAL));
        expect(result.current.result).toBe(8);

        act(() => result.current.calculator(Value.MULTIPLY));
        act(() => result.current.calculator(Value.THREE));
        act(() => result.current.calculator(Value.EQUAL));
        expect(result.current.result).toBe(24);

        act(() => result.current.calculator(Value.DIVIDE));
        act(() => result.current.calculator(Value.FOUR));
        act(() => result.current.calculator(Value.EQUAL));
        expect(result.current.result).toBe(6);
    });

    test('演算子入力 -> イコール入力', () => {
        const { result } = renderHook(() => useCalculator());

        act(() => result.current.calculator(Value.THREE));
        act(() => result.current.calculator(Value.PLUS));
        expect(result.current.result).toBe(3);
        act(() => result.current.calculator(Value.EQUAL));
        expect(result.current.result).toBe(6);

        act(() => result.current.calculator(Value.CLEAR));
        act(() => result.current.calculator(Value.THREE));
        act(() => result.current.calculator(Value.MINUS));
        expect(result.current.result).toBe(3);
        act(() => result.current.calculator(Value.EQUAL));
        expect(result.current.result).toBe(0);

        act(() => result.current.calculator(Value.CLEAR));
        act(() => result.current.calculator(Value.THREE));
        act(() => result.current.calculator(Value.MULTIPLY));
        expect(result.current.result).toBe(3);
        act(() => result.current.calculator(Value.EQUAL));
        expect(result.current.result).toBe(9);

        act(() => result.current.calculator(Value.CLEAR));
        act(() => result.current.calculator(Value.THREE));
        act(() => result.current.calculator(Value.DIVIDE));
        expect(result.current.result).toBe(3);
        act(() => result.current.calculator(Value.EQUAL));
        expect(result.current.result).toBe(1);
    });

    test('イコール入力 -> イコール入力', () => {
        const { result } = renderHook(() => useCalculator());

        act(() => {result.current.calculator(Value.FIVE)});
        act(() => {result.current.calculator(Value.PLUS)});
        act(() => {result.current.calculator(Value.TWO)});
        act(() => {result.current.calculator(Value.EQUAL)});
        expect(result.current.result).toBe(7);
        act(() => {result.current.calculator(Value.EQUAL)});
        expect(result.current.result).toBe(9);
    });

});

describe('エラーメッセージ検証', () => {
    test('入力時の桁オーバー & 計算後の桁オーバー', () => {
        const { result } = renderHook(() => useCalculator());

        act(() => {result.current.calculator(Value.NINE)});
        act(() => {result.current.calculator(Value.NINE)});
        act(() => {result.current.calculator(Value.NINE)});
        act(() => {result.current.calculator(Value.NINE)});
        act(() => {result.current.calculator(Value.NINE)});
        act(() => {result.current.calculator(Value.NINE)});
        act(() => {result.current.calculator(Value.NINE)});
        act(() => {result.current.calculator(Value.NINE)});
        act(() => {result.current.calculator(Value.NINE)});
        expect(result.current.result).toBe(999999999);
        act(() => {result.current.calculator(Value.NINE)});
        expect(result.current.result).toBe(999999999);
        act(() => {result.current.calculator(Value.PLUS)});
        act(() => {result.current.calculator(Value.ONE)});
        act(() => {result.current.calculator(Value.EQUAL)});
        expect(result.current.error).toBe('計算結果が有効桁数を超えています。');
    });

    test('0除算', () => {
        const { result } = renderHook(() => useCalculator());

        act(() => {result.current.calculator(Value.NINE)});
        act(() => {result.current.calculator(Value.DIVIDE)});
        act(() => {result.current.calculator(Value.ZERO)});
        act(() => {result.current.calculator(Value.EQUAL)});
        expect(result.current.error).toBe('0除算はできません。');
    });

});

describe('特殊操作（仕様外）', () => {
    test('演算子入力 -> 演算子入力', () => {
        const { result } = renderHook(() => useCalculator());

        act(() => {result.current.calculator(Value.EIGHT)});
        act(() => {result.current.calculator(Value.PLUS)});
        act(() => {result.current.calculator(Value.MINUS)});
        act(() => {result.current.calculator(Value.DIVIDE)});
        act(() => {result.current.calculator(Value.MULTIPLY)});
        expect(result.current.result).toBe(8);
        act(() => {result.current.calculator(Value.FOUR)});
        act(() => {result.current.calculator(Value.EQUAL)});
        expect(result.current.result).toBe(32);
    });

    test('計算後に数字入力', () => {
        const { result } = renderHook(() => useCalculator());

        act(() => {result.current.calculator(Value.EIGHT)});
        act(() => {result.current.calculator(Value.PLUS)});
        act(() => {result.current.calculator(Value.TWO)});
        act(() => {result.current.calculator(Value.EQUAL)});
        expect(result.current.result).toBe(10);
        act(() => {result.current.calculator(Value.THREE)});
        expect(result.current.result).toBe(3);
    });

    test('計算後に演算子入力', () => {
        const { result } = renderHook(() => useCalculator());

        act(() => {result.current.calculator(Value.SIX)});
        act(() => {result.current.calculator(Value.MULTIPLY)});
        act(() => {result.current.calculator(Value.SEVEN)});
        act(() => {result.current.calculator(Value.EQUAL)});
        expect(result.current.result).toBe(42);
        act(() => {result.current.calculator(Value.PLUS)});
        expect(result.current.result).toBe(42);
    });

});