import React,{useState,useEffect} from 'react';
import styles from './MyBreadcrumb.less';
import { Breadcrumb } from 'antd';
import {Link,useLocation} from 'umi'
export default function MyBreadcrumb() {
  const [title,setTitle] = useState('')
  const [subTitle,setSubTitle] = useState('')
  const {pathname} = useLocation()
  const obj:any = {
    '/user/list': {
      title: '用户管理',
      subTitle: '用户列表'
    },
    '/root/root': {
      title: '权限管理',
      subTitle: '角色列表'
    },
    '/root/permission': {
      title: '权限管理',
      subTitle: '权限列表'
    },
  }

  useEffect(() => {
    for (let key in obj) {
      if (key === pathname) {
        setTitle(obj[key].title)
        setSubTitle(obj[key].subTitle)
      }
    }
  })

  return (
    <div className={styles.breadcrumb_container}>
      <Breadcrumb>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>
          {title}
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/good/list"> {subTitle} </Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}
