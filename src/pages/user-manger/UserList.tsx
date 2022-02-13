import React, { Fragment, useState } from 'react';
import styles from './index.less';
import { Input, Button, Space, Modal, Form } from 'antd';
import MyBreadcrumb from '@/components/MyBreadcrumb';
import UserListTable from './UserListTable';
import {connect,Dispatch} from 'umi'
import {exportExcel} from '@/utils/table'
import {ListItemType} from './model'
const { Search } = Input;
function UserList ({dispatch,list}:{dispatch: Dispatch,list: ListItemType[]}) {
  const [flag, setFlag] = useState(false);
  const [formValues,setFormValues] = useState({})
  const onSearch = (values:string):void => {
    // console.log(values)
    const action = {
      type: 'userList/getUserList',
      payload: {
        query: values,
        pagenum: 1,
        pagesize: 5
      }
    }
    dispatch(action)
  };
  const addUser = () => {
    setFlag(true);
  };
  const closeFlag = () => {
    setFlag(false);
  };
  const OkHandler = () => {
    //todo 点击OK 之后发生的事情 --- 
    dispatch({
      type: 'userList/addUser',
      payload: formValues
    })
    setTimeout(() => {
      closeFlag()
    },2000)
  };
  const getValues = (changeValues:Object,allValue:Object) => {
    setFormValues(allValue)
  }
  //todo 导出表格
  const exportTable = () => {
    const headers = [{
      title: 'ID',
      dataIndex: 'id',
      key:'id'
    },{
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    },{
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    }]
    exportExcel(headers,list,'2010用户列表.xlsx')
  }
  return (
    <Fragment>
      <MyBreadcrumb />
      <div className={styles.user_list}>
        {/* 上部分 */}
        <div className={styles.search_box}>
          <Space size={15}>
            <Search
              placeholder="请输入用户名"
              onSearch={onSearch}
              enterButton
            />
            <Button type="primary" onClick={addUser}>
              {' '}
              添加用户{' '}
            </Button>
            <Modal
              title="添加用户"
              visible={flag}
              onCancel={closeFlag}
              onOk={OkHandler}
            >
              <Form 
                labelCol={{ span: 6 }} 
                wrapperCol={{ span: 16 }}
                onValuesChange={getValues}  
              >
                <Form.Item
                  label="用户名"
                  name="username"
                  rules={[
                    {
                      required: true,
                      pattern: /^[a-zA-Z0-9_-]{4,16}$/,
                      message: '用户名格式为xxx',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="密码"
                  name="password"
                  rules={[
                    {
                      required: true,
                      pattern: /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
                      message: '密码格式为xxx',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="邮箱"
                  name="email"
                  rules={[
                    {
                      required: true,
                      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: '邮箱格式为xxx',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="电话"
                  name="mobile"
                  rules={[
                    {
                      required: true,
                      pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
                      message: '电话格式不正确',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form>
            </Modal>
            <Button type="primary"> 导入数据 </Button>
            <Button type="primary" onClick = {exportTable}> 导出为excel表格 </Button>
          </Space>
        </div>
        {/* 表格部分 */}
        <UserListTable />
      </div>
    </Fragment>
  );
}

export default connect(state => state.userList)(UserList)