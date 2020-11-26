import React from 'react';
import { Skeleton } from 'antd';
import style from './Problem.less';
import { cf, UserStatus } from '@/model';

class Problem extends React.Component {
    async fetch(handle: string) {
        const userStatus: UserStatus[] = (await cf.getUserStatus(
            handle,
        )) as UserStatus[];
        if (userStatus == null) {
            setTimeout(() => {
                fetch(handle);
            }, 500);
        } else {
            let AcSet = new Set();
            let SubmitSet = new Set();
            userStatus.forEach(status => {
                const problemId = `${status.problem.contestId}${status.problem.index}`;
                if (status?.verdict === 'OK') {
                    AcSet.add(problemId);
                }
                SubmitSet.add(problemId);
            });
            const AcArr = Array.from(AcSet);
            const TriedArr = Array.from(
                Array.from(SubmitSet).filter(x => !AcSet.has(x)),
            );
            this.setState({
                loaded: true,
                AcArr: AcArr,
                TriedArr: TriedArr,
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
        AcArr: [],
        TriedArr: [],
    };

    render() {
        return (
            <>
                <div className={'am-panel am-panel-primary'}>
                    <div className={'am-panel-hd'}>Problem</div>
                    <div className={'am-panel-collapse am-collapse'}>
                        <div className={'am-panel-bd'}>
                            {this.state.loaded === false && (
                                <Skeleton active={true} />
                            )}

                            {this.state.loaded === true && (
                                <>
                                    <div className={style.title}>Solved: </div>
                                    <div
                                        style={{
                                            display: 'block',
                                            wordBreak: 'break-word',
                                            padding: '2px 5px',
                                        }}
                                    >
                                        {this.state.AcArr.map(x => {
                                            return (
                                                <>
                                                    <span>{x}</span>&nbsp;
                                                </>
                                            );
                                        })}
                                    </div>

                                    <div className={style.title}>Tried: </div>
                                    <div
                                        style={{
                                            display: 'block',
                                            wordBreak: 'break-word',
                                            padding: '2px 5px',
                                        }}
                                    >
                                        {this.state.TriedArr.map(x => {
                                            return (
                                                <>
                                                    <span>{x}</span>&nbsp;
                                                </>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export { Problem };
