import React from 'react';
import { Layout, Menu, Spin, Input, Radio, message, Button } from 'antd';
import Table from '@/components/UserTable';
import style from './index.less';
import { cf, UserCf } from '@/model';
import { getTeamRating } from '@/utils';

export interface Rating {
    rating: number;
    rank: string;
}

export interface Handle {
    handle: string;
    rank: string;
}

export interface User {
    key: number;
    lastOnlineTimeSeconds: number;
    rating: Rating;
    maxRating: Rating;
    handle: Handle;
    avatar: string;
    registrationTimeSeconds: number;
    organization: string;
}

async function fetch(handles: string[], _this: Index) {
    let tableData: User[] = [];
    let rating: number[] = [];
    for (let i = 0; i < handles.length; ++i) {
        const handle = handles[i];
        let user: UserCf = (await cf.getOne(handle)) as UserCf;
        if (user == null) continue;
        tableData.push({
            key: i,
            lastOnlineTimeSeconds: user.lastOnlineTimeSeconds,
            avatar: user.avatar,
            handle: {
                handle: user.handle,
                rank: user.rank || 'unrated',
            },
            rating: {
                rating: user.rating || 0,
                rank: user.rank || 'unrated',
            },
            maxRating: {
                rating: user.maxRating || 0,
                rank: user.maxRank || 'unrated',
            },
            registrationTimeSeconds: user.registrationTimeSeconds,
            name: `${user.firstName || ''} ${user.lastName || ''}`,
            action: user.handle,
            organization: user.organization || '',
        } as User);
        rating.push(user.rating || 0);
    }
    _this.setState({
        tableData: tableData,
        teamRating: getTeamRating(rating),
    });
}

class Index extends React.Component {
    async update(props: any) {
        let handles: string[] = props.match.params.handle_list.split(';');
        fetch(handles, this);
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
        tableData: [],
        teamRating: 0,
    };

    render() {
        return (
            <>
                <div className={style.body}>
                    <div className={style.root}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ float: 'left' }}>
                                Team Rating: {this.state.teamRating}
                            </div>
                            <div style={{ flex: '1' }}></div>
                            <div style={{ float: 'right' }}></div>
                        </div>

                        <Table tableData={this.state.tableData}></Table>
                    </div>
                </div>
            </>
        );
    }
}

export default Index;
