import Highlighter from 'react-highlight-words';
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import {
    Layout,
    Table,
    Input,
    Space,
    Button,
    Skeleton,
    Popconfirm,
    Tooltip,
} from 'antd';
import { HandleLink, RatingSpan } from '@/components/Rating';
import { Rating, Handle, User } from '@/pages/team';
import { CheckIcon } from '@/icons';
import moment from 'moment';
moment.locale('zh-cn');

function timeRender(timeStamp: number) {
    return (
        <Tooltip title={moment.unix(timeStamp).format('YYYY-MM-DD h:mm:ss')}>
            <span>{moment.unix(timeStamp).fromNow()}</span>
        </Tooltip>
    );
}

function ratingRender(item: Rating) {
    return <RatingSpan rating={item.rating} rank={item.rank} />;
}

class UserTable extends React.Component {
    update(props: any) {
        this.setState({
            tableData: props.tableData,
        });
    }

    //在组件已经被渲染到 DOM 中后运行
    componentDidMount() {
        this.update(this.props);
    }

    //props中的值发生改变时执行
    async componentWillReceiveProps(nextProps: any) {
        this.update(nextProps);
    }

    constructor(props: any) {
        super(props);
    }

    state = {
        searchText: '',
        searchedColumn: '',
        tableData: [],
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        this.handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            this.handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => (
            <SearchOutlined
                style={{ color: filtered ? '#1890ff' : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        const columns = [
            {
                title: '用户名',
                dataIndex: 'handle',
                key: 'handle',
                width: '10%',
                align: 'left',
                render: (handle: Handle) => (
                    <HandleLink handle={handle.handle} rank={handle.rank} />
                ),
            },
            {
                title: '头像',
                dataIndex: 'avatar',
                key: 'avatar',
                width: '5%',
                align: 'left',
                render: (avatar: string) => (
                    <img width="32" height="32" src={avatar} />
                ),
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                align: 'left',
                width: '15%',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: '组织',
                dataIndex: 'organization',
                key: 'organization',
                align: 'left',
                width: '15%',
                ...this.getColumnSearchProps('organization'),
            },
            {
                title: 'rating',
                dataIndex: 'rating',
                key: 'rating',
                align: 'left',
                width: '15%',
                sorter: (a: User, b: User) => a.rating.rating - b.rating.rating,
                render: ratingRender,
            },
            {
                title: 'maxRating',
                dataIndex: 'maxRating',
                key: 'maxRating',
                align: 'left',
                width: '15%',
                sorter: (a: User, b: User) =>
                    a.maxRating.rating - b.maxRating.rating,
                render: ratingRender,
            },
            {
                title: '注册时间',
                dataIndex: 'registrationTimeSeconds',
                key: 'registrationTimeSeconds',
                align: 'left',
                width: '10%',
                sorter: (a: User, b: User) =>
                    a.registrationTimeSeconds - b.registrationTimeSeconds,
                render: timeRender,
            },
            {
                title: '最后上线时间',
                dataIndex: 'lastOnlineTimeSeconds',
                key: 'lastOnlineTimeSeconds',
                align: 'left',
                width: '10%',
                sorter: (a: any, b: any) =>
                    a.lastOnlineTimeSeconds - b.lastOnlineTimeSeconds,
                render: timeRender,
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                align: 'left',
                width: '10%',
                render: (handle: string) => (
                    <>
                        <Tooltip title="查看详细资料">
                            <Button
                                size="small"
                                href={['profile', handle].join('/')}
                                icon={<CheckIcon />}
                            ></Button>
                        </Tooltip>
                    </>
                ),
            },
        ];
        return (
            <>
                <Table
                    style={{ marginTop: 10 }}
                    size="small"
                    columns={columns}
                    dataSource={this.state.tableData}
                    pagination={{
                        hideOnSinglePage: true,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        defaultPageSize: 15,
                        pageSizeOptions: ['10', '15', '30', '50', '100'],
                    }}
                />
            </>
        );
    }
}

export default UserTable;
