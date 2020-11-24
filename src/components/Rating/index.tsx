import { host } from '@/model';
import React, { useEffect } from 'react';
import style from './index.less';

function getRankClassName(rank: string): string {
    switch (rank) {
        case 'unrated':
            return 'user-black';
        case 'newbie':
            return 'user-gray';
        case 'pupil':
            return 'user-green';
        case 'specialist':
            return 'user-cyan';
        case 'expert':
            return 'user-blue';
        case 'candidate master':
            return 'user-violet';
        case 'master':
            return 'user-orange';
        case 'international master':
            return 'user-orange';
        case 'grandmaster':
            return 'user-red';
        case 'international grandmaster':
            return 'user-red';
        case 'legendary grandmaster':
            return 'user-legendary';
        case 'headquarters':
            return 'user-admin';
    }
    return '';
}

export const HandleLink = ({ handle, rank }) => {
    return (
        <a
            className={[
                style['rated-user'],
                style[getRankClassName(rank)],
            ].join(' ')}
            href={`${host}/profile/${handle}`}
        >
            {handle}
        </a>
    );
};

export const RatingSpan = ({ rating, rank }) => {
    return (
        <span
            style={{ fontWeight: 'bold' }}
            className={style[getRankClassName(rank)]}
        >
            {rating}, {rank}
        </span>
    );
};
