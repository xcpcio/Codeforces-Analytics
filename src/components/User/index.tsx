import React from 'react';
import style from './index.less';

export const ContributionSpan = ({ contribution }) => {
    let symbol = '';
    if (contribution > 0) symbol = '+';
    if (contribution < 0) symbol = '-';
    let getSymbolClassName = contribution => {
        if (contribution <= 0) return style.negative;
        return style.positive;
    };
    return (
        <span
            style={{ fontWeight: 'bold' }}
            className={[
                style.contribution,
                getSymbolClassName(contribution),
            ].join(' ')}
        >
            {symbol}
            {contribution}
        </span>
    );
};
