import React from 'react';
import style from './index.less';
import BasicInfo from './components/BasicInfo';

class Profile extends React.Component {
    update(props: any) {
        const handle = props.match.params.handle;
        this.setState({
            handle: handle,
        });
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
        handle: '',
    };

    render() {
        return (
            <>
                <div className={style.body}>
                    <div className={style.root}>
                        <BasicInfo handle={this.state.handle} />
                    </div>
                </div>
            </>
        );
    }
}

export default Profile;
