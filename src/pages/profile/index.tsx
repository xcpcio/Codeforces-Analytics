import React from 'react';
import style from './index.less';

class Index extends React.Component {
    async update(props: any) {}

    //在组件已经被渲染到 DOM 中后运行
    async componentDidMount() {
        this.update(this.props);
    }

    //props中的值发生改变时执行
    componentWillReceiveProps(nextProps: any) {}

    constructor(props: any) {
        super(props);
    }

    state = {};

    render() {
        return (
            <>
                <div className={style.body}>
                    <div className={style.root}></div>
                </div>
            </>
        );
    }
}

export default Index;
