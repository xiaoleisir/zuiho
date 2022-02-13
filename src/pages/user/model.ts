//!!! 登录的操作可以放在user/model.ts 中

//todo  dva 数据流（redux 数据流）
import {
  Effect,
  ImmerReducer,
  Subscription,
  history
} from 'umi'

import {message} from 'antd'
import {
  setCookie
} from '@/utils/cookie'

import {
  loginReq
} from '@/service'

/* 
  ts的类型
    Effect,
    ImmerReducer,
    Subscription
*/



export interface userStateType {
  username: string
}

export interface UserModelType {
  namespace: 'user',
  state: userStateType,
  effects: {
    login: Effect
  },
  reducers: {
    LOGIN: ImmerReducer
  },
  subscriptions: {
    setup: Subscription
  }
}

const userModel:UserModelType = {
  namespace: 'user', //?   namespace   命名空间
  state: {
    username: 'lakers'
  }, //? 状态
  effects: {
    *login ({payload},{call,put}) {
      const r = yield call(loginReq,payload)
      if (r.meta.status == 400) {
        message.error(r.meta.msg)
        return 
      }
      //todo 密码是对的
      setCookie('email',r.data.email,7)
      setCookie('id',r.data.id,7)
      setCookie('mobile',r.data.mobile,7)
      setCookie('rid',r.data.rid,7)
      setCookie('token',r.data.token,7)
      setCookie('username',r.data.username,7)
      //todo 跳转页面   js 来跳转页面(命令式跳转  history.push/replace )
      history.push('/')
      put({
        type: 'LOGIN'
      })
    }
  }, //? 创建动作，发送数据请求
  reducers: {
    LOGIN () {}
  }, //? 修改数据
  subscriptions: { //? 异步操作  日期   通信连接等等 。。。
    setup () {}
  }
}


export default userModel