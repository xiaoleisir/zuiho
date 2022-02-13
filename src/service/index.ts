//todo 写的就是数据请求
import request from '@/utils/request'
import {
  AxiosResponse
} from 'axios'
//todo 登录
interface LoginDataType {
  username: string,
  password: string
}
export const loginReq = (data:LoginDataType):Promise<AxiosResponse<any>> => {
  return request({
    url: 'login',
    method: 'POST',
    data,
  })
}

//todo 用户数据列表
export const userListReq = (data:{query:string,pagenum:number,pagesize:number}):Promise<AxiosResponse<any>> => {
  return request({
    url: 'users',
    data
  })
}
//todo 添加用户
export const addUserReq = (data:{username: string,password:string,email:string,mobile:string}):Promise<AxiosResponse<any>> => {
  return request({
    url: 'users',
    method: 'POST',
    data
  })
}

//todo 修改用户状态 
export const modifyUserStateReq = ({uid,type}:{uid:number,type:number}):Promise<AxiosResponse<any>> => {
  return request({
    url: `users/${uid}/state/${type}`,
    method: 'put'
  })
}

//todo 删除用户列表单个用户
export const deleteUserReq = (id:number):Promise<AxiosResponse<any>> => {
  return request({
    url: `users/${id}`,
    method: 'delete'
  })
}

//todo 修改单个用户
export const modifyUser = ({id,email,phone}:{id:number,email:string,phone:string}):Promise<AxiosResponse<any>> => {
  return request({
    url: `users/${id}`,
    method: 'put',
    data: {
      email,
      mobile: phone
    }
  })
}

//todo 分配角色数据请求
export const modifyRootReq = ({id,rid}:{id:number,rid:number}):Promise<AxiosResponse<any>> => {
  return request({
    url: `users/${id}/role`,
    method: 'put',
    data: {
      rid
    }
  })
}