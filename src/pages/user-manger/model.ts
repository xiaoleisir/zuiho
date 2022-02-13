import {Effect,ImmerReducer} from 'umi'
import {message} from 'antd'
import * as service from '@/service'
export interface ListItemType {
  readonly id: number,
  username: string,
  mobile: string,
  type: number,
  email: string,
  create_time: string,
  mg_state: boolean,
  role_name: string
}

export interface UserListStateType {
  list: ListItemType[],
  totalPage: number
}

interface UserListModelType {
  namespace: 'userList',
  state: UserListStateType,
  effects: {
    getUserList: Effect,
    addUser: Effect,
    modifyUserState: Effect,
    deleteUser: Effect,
    modifyUserInfo: Effect,
    modifyRoot: Effect
  },
  reducers: {
    GET_USER_LIST:ImmerReducer,
    ADD_USER: ImmerReducer,
    MODIFY_USERS_STATE: ImmerReducer,
    DELETE_USER: ImmerReducer,
    MODIFY_USER_INFO: ImmerReducer,
    MODIFY_ROOT: ImmerReducer
  }
}

const userListModel:UserListModelType = {
  namespace: 'userList',
  state: {
    list: [],
    totalPage: 1
  },
  effects: {
    *getUserList ({payload},{call,put}) {
      //type GET_USER_LIST
      // const r = yield call(service.userListReq,payload)
      // console.log( r )
      // yield put({
      //   type: 'GET_USER_LIST',
      //   payload: r
      // })
      yield put({
        type: 'GET_USER_LIST',
        payload: yield call(service.userListReq,payload)
      })

    },
    *addUser ({payload},{call,put}) {
      const r = yield call(service.addUserReq,payload)
      if (r.meta.status == 400) {
        message.error(r.meta.msg)
        return ;
      }
      if (r.meta.status == 201) {
        message.success(r.meta.msg)
      }
      yield put({
        type: 'ADD_USER',
        payload: r
      })
    },
    *modifyUserState ({payload},{call,put}) {
      //todo 发请求 
      const r = yield call(service.modifyUserStateReq,payload)
      // console.log('modifyUserState',r)
      if (r.meta.status == 200) {
        message.success(r.meta.msg)
      }
      //todo 激活reducers然后修改数据
      yield put({
        type: 'MODIFY_USERS_STATE',
        payload: r.data
      })
    },
    *deleteUser ({payload},{call,put}) {
      //todo 1 发请求
      const r = yield call(service.deleteUserReq,payload)
      // console.log('deleteUser',r)
      if ( r.meta.status === 200) {
        message.success(r.meta.msg )
      }
      //todo 2 修改本地， put激活reducers中的方法
      yield put({
        type: 'DELETE_USER',
        payload
      })
    },
    *modifyUserInfo ({payload},{call,put}) {
      //todo1 发请求
      const r = yield call(service.modifyUser,payload)
      console.log('r',r)
      if (r.meta.status == 200) {
        message.success(r.meta.msg)
      }
      //todo2 通过put将action发送给reducers
      yield put({
        type: 'MODIFY_USER_INFO',
        payload: r.data
      })
    },
    *modifyRoot ({payload},{call,put}) {
      const r = yield call(service.modifyRootReq,payload)
      console.log('r',r)
      if (r.meta.status == 400) {
        message.warn(r.meta.msg)
      }
      yield put({
        type: 'MODIFY_ROOT',
        payload: r.data
      })
    }
  },
  reducers: {
    GET_USER_LIST (state,{payload:{data:{users,total}}}) {
      // console.log('reducers',state)
      // console.log('reducers',action)
      state.totalPage = total
      state.list = users
    },
    ADD_USER (state,{payload}) {
      // console.log(payload)
      state.list.push(payload.data)
    },
    MODIFY_USERS_STATE ( state,{payload}) {
      //todo 修改list  [{},{},{}]
      console.log(payload)
      state.list.forEach( item => {
        if (item.id === payload.id) {
          item.mg_state = payload.mg_state
        }
      })
    },
    DELETE_USER (state,{payload}) {
      // console.log('激活了DELETE_USER',payload)
      state.list = state.list.filter((item:any) => item.id !== payload)
    },
    MODIFY_USER_INFO (state,{payload}) {
      state.list.forEach((item:any) => {
        if (item.id == payload.id) {
          item.email = payload.email 
          item.mobile = payload.mobile
        }
      })
    },
    MODIFY_ROOT (state,{payload}) {
      state.list.forEach((item:any) => {
        if (item.id === payload.id) {
          item.role_name = '管理员'
        }
      })
    }
  },
}

export default userListModel