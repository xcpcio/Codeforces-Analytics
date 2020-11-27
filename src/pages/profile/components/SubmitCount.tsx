import React from 'react';
import { Skeleton } from 'antd';
import { cf, UserStatus } from '@/model';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';

const today = new Date();
const INF = 0x3f3f3f3f;

function shiftDate(date: Date, numDays: number) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
}

const randomValues = getRange(365).map(index => {
    return {
        date: shiftDate(today, -index),
        count: getRandomInt(0, 4),
    };
});

function getRange(count: number) {
    return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface Count {
    date: Date;
    count: number;
    color: number;
}

function timeFormat(timeStamp: number) {
    let date = new Date(timeStamp * 1000);
    let y: number | string = date.getFullYear();
    let m: number | string = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d: number | string = date.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

class SubmitCount extends React.Component {
    timer: any = null;

    clearTimer() {
        this.timer && clearTimeout(this.timer);
    }

    async fetch(handle: string) {
        this.clearTimer();
        if (this.state.loaded === true) return;
        const userStatus: UserStatus[] = (await cf.getUserStatus(
            handle,
        )) as UserStatus[];
        if (userStatus == null) {
            this.timer = setTimeout(() => {
                this.fetch(handle);
            }, 1000);
        } else {
            let dateMap = new Map();
            for (let i = 0; i <= 365; ++i) {
                dateMap.set(
                    shiftDate(today, -i)
                        .toISOString()
                        .slice(0, 10),
                    0,
                );
            }
            let Min = INF;
            let Max = 0;
            userStatus.forEach(status => {
                const nowTime = timeFormat(status.creationTimeSeconds);
                if (dateMap.has(nowTime)) {
                    dateMap.set(nowTime, dateMap.get(nowTime) + 1);
                    Min = Math.min(Min, dateMap.get(nowTime));
                    Max = Math.max(Max, dateMap.get(nowTime));
                }
            });
            let SubmitCountArr = [];
            for (let i = 0; i <= 365; ++i) {
                const date = shiftDate(today, -i);
                const count = dateMap.get(date.toISOString().slice(0, 10));
                const getColor = (count: number) => {
                    if (count === 0) return 0;
                    const rate = (count * 1.0) / Max;
                    return Math.ceil(rate / 0.25);
                };
                // console.log(getColor(count));
                SubmitCountArr.push({
                    date: date,
                    count: count,
                    color: getColor(count),
                } as Count);
            }
            this.setState({
                loaded: true,
                SubmitCountArr: SubmitCountArr,
            });
        }
    }

    update(props: any) {
        const handle = props.handle || '';
        if (handle.trim() !== '') {
            this.fetch(handle);
        }
    }

    //在组件已经被渲染到 DOM 中后运行
    async componentDidMount() {
        this.update(this.props);
    }

    //props中的值发生改变时执行
    componentWillReceiveProps(nextProps: any) {
        this.update(nextProps);
    }

    constructor(props: any) {
        super(props);
    }

    state = {
        loaded: false,
        SubmitCountArr: [],
    };

    render() {
        return (
            <>
                {this.state.loaded === false && <Skeleton active={true} />}

                {this.state.loaded === true && (
                    <>
                        <CalendarHeatmap
                            startDate={shiftDate(today, -365)}
                            endDate={today}
                            values={this.state.SubmitCountArr}
                            classForValue={value => {
                                if (!value) {
                                    return 'color-empty';
                                }
                                return `color-github-${value.color}`;
                            }}
                            tooltipDataAttrs={value => {
                                return {
                                    'data-tip': `${value.date
                                        ?.toISOString()
                                        ?.slice(0, 10)}, ${
                                        value.count
                                    } commits`,
                                };
                            }}
                            showWeekdayLabels={true}
                            weekdayLabels={[
                                'Sun',
                                'Mon',
                                'Tues',
                                'Wed',
                                'Thur',
                                'Fri',
                                'Sat',
                            ]}
                        />
                        <ReactTooltip />
                    </>
                )}
            </>
        );
    }
}

export { SubmitCount };
