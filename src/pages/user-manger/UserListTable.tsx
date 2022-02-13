import React,{useState,useEffect} from 'react'
import { Cascader,Table,Switch,Button,Space,TableColumnType,message,Popconfirm,Modal,Form,Input } from 'antd';
import {connect} from 'umi'
import {UserListStateType} from './model'
import {EditOutlined,DeleteOutlined,SettingOutlined} from '@ant-design/icons'


function UserListTable (props:any) {

  const [modifyModalFlag,setModifyModalFlag] = useState(false)
  const [formValues,setFormValues] = useState({})
  const [activeId,setActiveId] = useState(0)
  const [activeRid,setActiveRid] = useState(0)
  const [modifyRootModalFlag,setModifyRootModalFlag] = useState(false)
  const [username,setUsername] = useState('')
  const [roleName,setRoleName] = useState('')
  const [newRoleName,setNewRoleName] = useState('')

  //todo 点击分配角色按钮打开对话框的方法
  const openRootModal = (id:number,rid:number,username:string,role_name:string):void => {
    setActiveId(id)
    setActiveRid(rid)
    setUsername(username)
    setRoleName(role_name)
    setModifyRootModalFlag(true)
  } 
  //todo 关闭分配角色对话框的方法
  const closeRootModal = () => {
    setModifyRootModalFlag(false)
  } 
  //todo 点击分配角色对话框的确定按钮时执行的方法 
  const rootConfirm = () => {
    /* 
      1. 拿到id和rid,激活redux中方法
        activeId  activeRid
      2. 关闭对话框
    */
   props.dispatch({
     type: 'userList/modifyRoot',
     payload: {
       id: activeId,
       rid: 40
     }
   })
   closeRootModal()
  }
  //todo 分配角色对话框中的级联菜单选中之后执行的方法
  const selectRoot = (value:string):void => {
    setNewRoleName(value)
  }

  //todo 点击修改按钮出现对话框
  const openModifyModal = (id:number,username:string,email:string,phone:string) => {
    // console.log(username,phone,email)
    setFormValues({
      username,
      email,
      phone
    })
    setActiveId(id)
    setModifyModalFlag(true)
  }
  const closeModifyModal = () => {
    setModifyModalFlag(false)
    setFormValues({})
  }

  //todo 修改state
  const changeState = (uid:number,type:boolean):void => {
    //todo 通过dispatch激活model.ts中effects里面的方法
    props.dispatch({
      type: 'userList/modifyUserState',
      payload: {
        uid,
        type
      }
    })
  }

  //todo 点击删除按钮执行的方法
  const deleteHandler = (id:number,username:string) => {
    if (username === 'admin') {
      message.error('admin不允许删除')
      return;
    }
    //todo 如果不是admin，我们就可以删除它 --- model.ts中删除的方法已经写了
    props.dispatch({
      type: 'userList/deleteUser',
      payload: id
    })
  }

  //todo 取消删除用户执行的方法
  const cancelDeleteUser = () => {
    message.info('已取消删除')
  }

  //todo 点击修改之后出现的对话框中的确定按钮执行的方法
  const modifyConfirm = () => {
    //todo 激活modal.ts中的effects/modifyUserInfo
    const {email,phone} = formValues
    props.dispatch({
      type: 'userList/modifyUserInfo',
      payload: {
        id: activeId,
        email,
        phone 
      }
    })
    closeModifyModal()
  }
  //todo 点击修改之后出现的对话框中的取消按钮执行的方法
  const modifyCancel = () => {
    closeModifyModal()
  }

  //todo 点击分页页码时触发的方法
  const  pageChangeHandler = (page:number,pagesize:number):void => {
    // console.log('page',page)
    // console.log('pagesize',pagesize)
    props.dispatch({
      type: 'userList/getUserList',
      payload: {
        query: '',
        pagesize,
        pagenum: page
      }
    })
  } 


  const columns:TableColumnType<any>[] = [
    {
      title: 'ID',
      width: 50,
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
    },
    {
      title: '用户名',
      width: 50,
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 150,
    },
    {
      title: '电话',
      dataIndex: 'mobile',
      key: 'mobile',
      width: 150,
    },
    {
      title: '角色',
      dataIndex: 'role_name',
      key: 'role_name',
      width: 150,
    },
    {
      title: '状态',
      key: 'mg_state',
      width: 150,
      render: (o) => <Switch checked={o.mg_state}  onChange={() => { changeState(o.id,!o.mg_state) }} />
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (o) => <Space>
        {/* 
          修改按钮需求
            1. 点击修改按钮 弹出一个对话框
            2. 用户名不可修改
            3. 两个地方修改
              * 数据库修改 --  发请求
              * 本地model.ts中的state也要改掉
        */}
        <Button type="primary" icon={<EditOutlined />} onClick = {() => { openModifyModal(o.id,o.username,o.email,o.mobile) }} ></Button>
           {/* 点击编辑之后弹出的对话框 */}
        <Modal
          title = "修改用户"
          visible={modifyModalFlag}
          onOk = {modifyConfirm}
          onCancel = {modifyCancel}
          mask = {false}
        >
            <Form
              labelCol = {{span: 6}}
              wrapperCol = {{span: 16}}
            >
              <Form.Item   label="用户名">
                <Input disabled value={formValues.username}/>
              </Form.Item>
              <Form.Item   label="邮箱"
                rules = {[{required: true,pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}]}
              >
                <Input  value={formValues.email} onChange={(e) => {
                  // console.log('e',e.target.value)
                  setFormValues({
                    username: formValues.username,
                    email: e.target.value,
                    phone: formValues.phone
                  })
                }}/>
              </Form.Item>
              <Form.Item   label="手机号"
                rules = {[{required: true,pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/}]}
              >
                <Input value={formValues.phone} onChange={(e) => {
                  setFormValues({
                    username: formValues.username,
                    email: formValues.email,
                    phone: e.target.value
                  })
                }}/>
              </Form.Item>
            </Form>
        </Modal>
        {/* 
          删除按钮需要要求
            1. admin不允许删除，其他用户可以
              * 界面提示
            2. 删除两个地方
              * 数据库中删除当前所选用户
              * 界面也要删除当前所选用户
        */}
        <Popconfirm
          title = "此操作将永久删除该用户, 是否继续?"
          okText="确定"
          cancelText="取消"
          onConfirm = {() => { deleteHandler(o.id,o.username) }}
          onCancel = {cancelDeleteUser}
        >
          <Button type="primary" danger icon={<DeleteOutlined />}></Button>
        </Popconfirm>
        {/* 
          分配角色按钮 
        */}
        <Button 
          style={{background:'orange',borderStyle:'orange',color: 'white'}} 
          icon={<SettingOutlined />}
          onClick={() => {openRootModal(o.id,o.rid,o.username,o.role_name)}}
        ></Button>
        <Modal
          title = "分配角色"
          visible = {modifyRootModalFlag}
          onOk = {rootConfirm}
          onCancel = {closeRootModal}
          mask={false}
        >
          <Form
            labelCol={{span: 6}}
            wrapperCol={{span:16}}
          >
            <Form.Item label="当前用户: ">
              {username}
            </Form.Item>
            <Form.Item label="当前角色：">
              {roleName}
            </Form.Item>
            <Form.Item label="新角色">
              <Cascader
                placeholder="请选择新角色"
                options={[{
                  value: '管理员',
                  label: '管理员',
                  // disabled: true,
                  // children: [{
                  //   value: '管理员1',
                  //   label: '管理员1'
                  // }]
                },{
                  value: '客服',
                  label: '客服'
                },{
                  value: 'admin',
                  label: 'admin'
                }]}
                onChange={selectRoot}
              />
            </Form.Item>
          </Form>
        </Modal>
      </Space>,
    },
  ];
  
  useEffect(() => {
    //todo 走redux
    props.dispatch({
      type: 'userList/getUserList',
      payload: {
        query: '',
        pagenum: 1,
        pagesize: 5
      }
    })
  },[])

  return (
    <div style={{
      marginTop: '30px'
    }}>
      <Table 
        columns={columns} 
        dataSource={props.list} 
        scroll={{ x: 1500 }} 
        pagination={{
          position: ['bottomLeft'],
          total: props.totalPage,
          // current: 2,
          defaultPageSize: 5,
          hideOnSinglePage: true,
          onChange: pageChangeHandler
        }}
      />
   
    </div>
  );
}

export default connect(
  ({userList}:{userList:UserListStateType}) => userList
)(UserListTable)