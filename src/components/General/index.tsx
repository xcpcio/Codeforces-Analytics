import React from 'react';
import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
// dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
import { Tooltip } from 'antd';

export const TimeRender = ({ timeStamp }) => {
    return (
        <Tooltip title={dayjs.unix(timeStamp).format('YYYY-MM-DD h:mm:ss')}>
            <span>{dayjs.unix(timeStamp).fromNow()}</span>
        </Tooltip>
    );
};
