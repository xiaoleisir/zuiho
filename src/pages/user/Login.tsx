import React,{
  useEffect
} from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {connect} from 'umi'

//todo  样式模块化   css Module
import styles from './Login.less';

import {userStateType} from './model'


/* 
  !!! 针对antd组件库中的Form组件
    1. 只有Form组件可以拿到一次性全部表单的值
    2. 登录按钮上一定要有  htmlType = 'submit' 的属性 ， 只有他才可以激活 Form 组件身上的 onFinish 方法
    3. 你的input之类的表单组件必须放到  Form.Item 中

*/

const Login = (props) => {
  
  const onFinish = ({username,password}: any) => {
    // console.log('Received values of form: ', values);
    // 通过redux走login流程 通过dispatch来激活effects中的方法
    props.dispatch({
      // type: 命令空间/effects中的方法名
      type: 'user/login',
      payload: {username,password} 
    })
  };

  useEffect(() => {
    const h = document.documentElement.clientHeight 
    const login:Element|null = document.querySelector('.login___TI9qv')
    login.style.height = h + 'px'
  },[])

  return (
    <div className={styles.login}>
      <div className={styles.content}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ 
              required: true,
              pattern: /^[a-zA-Z0-9_-]{4,16}$/,
              message: '用户名必须为4-16位（字母，数字，下划线,-）',
             }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ 
              required: true, 
              // pattern: /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
              message: '密码最少6为，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符' 
            }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default connect(
  ({user}:{user:userStateType}) => {
    return user
  }
)(Login);



