import React from 'react'
import {Button} from 'antd'
import {
  getCookie
} from '@/utils/cookie'
import {history} from 'umi'
export default function Tab () {
  const username = getCookie('username')
  return (
    <div>
      当前操作用户是: {username} <Button type="ghost" danger onClick={() => { history.push('/login') }}> 退出 </Button>
    </div>
  )
}
