import React from 'react';
import style from './index.less';
import { GithubIcon } from '@/icons/';
import { Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { TextArea } = Input;

class Index extends React.Component {
    //在组件已经被渲染到 DOM 中后运行
    async componentDidMount() {}

    //props中的值发生改变时执行
    componentWillReceiveProps(nextProps: any) {}

    constructor(props: any) {
        super(props);
    }

    state = {
        handle: '',
        handleList: '',
    };

    render() {
        return (
            <>
                <div className={style.body}>
                    <div className={style.root}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ float: 'left' }}>
                                <span className={style.title}>
                                    Codeforces Analytics
                                </span>
                            </div>
                            <div style={{ flex: '1' }}></div>
                            <div style={{ float: 'right' }}>
                                <a
                                    className={[
                                        style.go,
                                        style['MuiButtonBase-root'],
                                        style['MuiIconButton-root'],
                                    ].join(' ')}
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://github.com/XCPCIO/Codeforces-Analytics"
                                    title="Github"
                                >
                                    <span
                                        className={style['MuiIconButton-label']}
                                    >
                                        <GithubIcon />
                                    </span>
                                    <span
                                        className={style['MuiTouchRipple-root']}
                                    ></span>
                                </a>
                            </div>
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <h1>User</h1>
                            <Input
                                placeholder="Handle"
                                prefix={<UserOutlined />}
                                allowClear={true}
                                onChange={e => {
                                    this.setState({
                                        handle: e.target.value,
                                    });
                                }}
                            />
                            <div style={{ float: 'right', marginTop: 5 }}>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        window.open(
                                            `/profile/${this.state.handle}`,
                                        );
                                    }}
                                >
                                    Go
                                </Button>
                            </div>
                        </div>

                        <div style={{ marginTop: 20 }}>
                            <h1>Team</h1>
                            <TextArea
                                onChange={e => {
                                    this.setState({
                                        handleList: e.target.value,
                                    });
                                }}
                                placeholder="Handle list, separated by ;. For example, tourist;petr;"
                                autoSize={{ minRows: 5 }}
                                allowClear={true}
                            />
                            <div style={{ float: 'right', marginTop: 5 }}>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        window.open(
                                            `/team/${this.state.handleList}`,
                                        );
                                    }}
                                >
                                    Go
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Index;
