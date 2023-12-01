import './Display.css';

import React from 'react';

/** 計算結果やエラーを表示するコンポーネント */
export const Display = ({ result, error }) => {
    return (
        <>
            <div className="display">
                <div className="sub-display"></div>
                <div className="main-display">
                    <div className={error ? 'error' : 'result'}>
                        {error || result}
                    </div>
                </div>
            </div>
        </>
    );
}
