import React from 'react';
import { Skeleton, Row, Col, Statistic } from 'antd';
import style from './BasicInfo.less';
import { UserInfo, cf, UserStatus, host } from '@/model';
import {
    HandleLink,
    RatingSpan,
    ContributionSpan,
    TimeRender,
} from '@/components';
import { getNowTimeStamp } from '@/utils';

class AcAndSubmitCount extends React.Component {
    weekTimeSeconds = 60 * 60 * 24 * 7;
    monthTimeSeconds = 60 * 60 * 24 * 30;

    timer: any = null;

    clearTimer() {
        this.timer && clearTimeout(this.timer);
    }

    async fetch(handle: string) {
        this.clearTimer();
        const userStatus: UserStatus[] = (await cf.getUserStatus(
            handle,
        )) as UserStatus[];
        if (userStatus === null) {
            this.timer = setTimeout(() => {
                this.fetch(handle);
            }, 500);
        } else {
            const nowTimeStamp = getNowTimeStamp();
            let submitWeekly = 0;
            let submitMonthly = 0;
            let submitTotally = 0;
            let AcWeeklySet = new Set();
            let AcMonthlySet = new Set();
            let AcTotallySet = new Set();
            const getDiffSymbol = (diffTimeSeconds: number) => {
                if (diffTimeSeconds <= this.weekTimeSeconds) {
                    return 0;
                }
                if (diffTimeSeconds <= this.monthTimeSeconds) {
                    return 1;
                }
                return 2;
            };
            userStatus.forEach(status => {
                const diffTimeSeconds = Math.max(
                    0,
                    nowTimeStamp - status.creationTimeSeconds,
                );
                switch (getDiffSymbol(diffTimeSeconds)) {
                    case 0:
                        submitWeekly += 1;
                    case 1:
                        submitMonthly += 1;
                    default:
                        submitTotally += 1;
                        break;
                }
                if (status?.verdict === 'OK') {
                    const problemId = `${status.problem.contestId}-${status.problem.index}`;
                    switch (getDiffSymbol(diffTimeSeconds)) {
                        case 0:
                            AcWeeklySet.add(problemId);
                        case 1:
                            AcMonthlySet.add(problemId);
                        case 2:
                            AcTotallySet.add(problemId);
                            break;
                    }
                }
            });
            this.setState({
                loaded: true,
                submitWeekly: submitWeekly,
                submitMonthly: submitMonthly,
                submitTotally: submitTotally,
                AcWeekly: AcWeeklySet.size,
                AcMonthly: AcMonthlySet.size,
                AcTotally: AcTotallySet.size,
            });
        }
    }

    update(props: any) {
        const handle = props.handle;
        this.fetch(handle);
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
        submitWeekly: 0,
        submitMonthly: 0,
        submitTotally: 0,
        AcWeekly: 0,
        AcMonthly: 0,
        AcTotally: 0,
    };

    render() {
        return (
            <>
                {this.state.loaded === false && <Skeleton active />}

                {this.state.loaded === true && (
                    <Row>
                        <Col span={8}>
                            <Statistic
                                title="周AC"
                                value={this.state.AcWeekly}
                            />
                            <Statistic
                                title="周提交"
                                value={this.state.submitWeekly}
                            />
                        </Col>
                        <Col span={8}>
                            <Statistic
                                title="月AC"
                                value={this.state.AcMonthly}
                            />
                            <Statistic
                                title="月提交"
                                value={this.state.submitMonthly}
                            />
                        </Col>
                        <Col span={8}>
                            <Statistic
                                title="总AC"
                                value={this.state.AcTotally}
                            />
                            <Statistic
                                title="总提交"
                                value={this.state.submitTotally}
                            />
                        </Col>
                    </Row>
                )}
            </>
        );
    }
}

const NameAndCountryCity = ({ firstName, lastName, country, city }) => {
    const hasName = firstName != null || lastName != null;
    const hasCountry = country != null;
    const hasCity = city != null;
    const getCountryUrl = (country: string) => {
        return `${host}/ratings/country/${country}`;
    };
    const getCityUrl = (city: string, country: string) => {
        return `${getCountryUrl(country)}/city/${city}`;
    };
    return (
        <>
            {hasName && (
                <>
                    <span
                        style={{
                            fontSize: '1.2em',
                        }}
                    >
                        {`${firstName} ${lastName}`}
                    </span>
                </>
            )}
            {hasName && (hasCountry || hasCity) && <>,&nbsp;</>}
            {hasCity && (
                <span style={{ fontSize: '1.2em' }}>
                    <a href={getCityUrl(city, country)}>{city}</a>
                </span>
            )}
            {hasCity && hasCountry && <>&nbsp;</>}
            {hasCountry && (
                <span style={{ fontSize: '1.2em' }}>
                    <a href={getCountryUrl(country)}>{country}</a>
                </span>
            )}
        </>
    );
};

class BasicInfo extends React.Component {
    timer: any = null;

    clearTimer() {
        this.timer && clearTimeout(this.timer);
    }

    async fetch(handle: string) {
        this.clearTimer();
        const userInfo: UserInfo = (await cf.getUserInfo(handle)) as UserInfo;
        if (userInfo === null) {
            this.timer = setTimeout(() => {
                this.fetch(handle);
            }, 500);
        } else {
            this.setState({
                handle: handle,
                userInfo: userInfo,
                loaded: true,
            });
        }
    }

    update(props: any) {
        const handle = props.handle;
        this.fetch(handle);
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
        handle: '',
        userInfo: {},
    };

    render() {
        return (
            <>
                <div className={style.root}>
                    {this.state.loaded === false && <Skeleton active />}

                    {this.state.loaded === true && (
                        <>
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <div>
                                        <span style={{ fontSize: '3em' }}>
                                            <HandleLink
                                                handle={
                                                    this.state.userInfo
                                                        ?.handle || ''
                                                }
                                                rank={
                                                    this.state.userInfo?.rank ||
                                                    'unrated'
                                                }
                                            />
                                        </span>
                                    </div>
                                    <div>
                                        <NameAndCountryCity
                                            firstName={
                                                this.state.userInfo?.firstName
                                            }
                                            lastName={
                                                this.state.userInfo?.lastName
                                            }
                                            country={
                                                this.state.userInfo?.country
                                            }
                                            city={this.state.userInfo?.city}
                                        />
                                    </div>
                                    <div>
                                        {this.state.userInfo?.organization && (
                                            <span style={{ fontSize: '1.2em' }}>
                                                {this.state.userInfo
                                                    ?.organization &&
                                                    `From ${this.state.userInfo
                                                        ?.organization || ''}`}
                                            </span>
                                        )}
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <AcAndSubmitCount
                                        handle={this.state.handle}
                                    />
                                </Col>
                            </Row>

                            <Row gutter={[8, 8]}>
                                <Col span={16}>
                                    <div
                                        style={{
                                            marginLeft: '-22px',
                                            fontSize: '1.2em',
                                            fontFamily: 'Georgia',
                                        }}
                                    >
                                        <ul
                                            style={{
                                                paddingTop: '20px',
                                                lineHeight: '2.2em',
                                            }}
                                        >
                                            <li>
                                                Rating:&nbsp;
                                                <RatingSpan
                                                    rating={
                                                        this.state.userInfo
                                                            ?.rating || 0
                                                    }
                                                    rank={
                                                        this.state.userInfo
                                                            ?.rank || 'unrated'
                                                    }
                                                />
                                            </li>
                                            <li>
                                                maxRating:&nbsp;
                                                <RatingSpan
                                                    rating={
                                                        this.state.userInfo
                                                            ?.maxRating || 0
                                                    }
                                                    rank={
                                                        this.state.userInfo
                                                            ?.maxRank ||
                                                        'unrated'
                                                    }
                                                />
                                            </li>
                                            <li>
                                                Contribution:&nbsp;
                                                <ContributionSpan
                                                    contribution={
                                                        this.state.userInfo
                                                            ?.contribution || 0
                                                    }
                                                />
                                            </li>
                                            <li>
                                                Friend of:&nbsp;{' '}
                                                {this.state.userInfo
                                                    ?.friendOfCount || 0}
                                            </li>
                                            {this.state.userInfo?.email && (
                                                <li>
                                                    Email:{' '}
                                                    {this.state.userInfo.email}
                                                </li>
                                            )}
                                            <li>
                                                Last visit:&nbsp;{' '}
                                                <TimeRender
                                                    timeStamp={
                                                        this.state.userInfo
                                                            ?.lastOnlineTimeSeconds
                                                    }
                                                />
                                            </li>
                                            <li>
                                                Registered:&nbsp;{' '}
                                                <TimeRender
                                                    timeStamp={
                                                        this.state.userInfo
                                                            ?.registrationTimeSeconds ||
                                                        0
                                                    }
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                </Col>

                                <Col span={8}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            height: '100%',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <img
                                            src={
                                                this.state.userInfo
                                                    ?.titlePhoto || ''
                                            }
                                            alt="avatar"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </>
                    )}
                </div>
            </>
        );
    }
}

export { BasicInfo };
