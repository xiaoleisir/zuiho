
// import {
//   HomeFilled,
//   QqSquareFilled,
//   BugFilled,
//   CrownFilled
// } from '@ant-design/icons'

export const routes = [
  {
    path: '/',
    component: '@/pages/home',
    name: '首页',
    icon: 'HomeFilled'
  },
  {
    path: '/login',
    component: '@/pages/user/Login',
    headerRender: false,
    // 不展示页脚
    footerRender: false,
    // 不展示菜单
    menuRender: false,
  },
  {
    path: '/user',
    name: '用户管理',
    icon: 'QqSquareFilled',
    routes: [
      {
        path: '/user/list',
        component: '@/pages/user-manger/UserList',
        name: '用户列表',
      }
    ]
  },
  {
    path: '/root',
    name: '权限管理',
    icon: 'BugFilled',
    routes: [
      {
        path: '/root/root',
        component: '@/pages/root-manger/RootList',
        name: '角色列表'
      },
      {
        path: '/root/permission',
        component: '@/pages/root-manger/Permission',
        name: '权限列表'
      },
    ]
  },
  {
    path: '/good',
    name: '商品管理',
    icon: 'CrownFilled',
    routes: [
      {
        path: '/good/list',
        component: '@/pages/good-manger/GoodList',
        name: '商品列表'
      },
      {
        path: '/good/category-argument',
        component: '@/pages/good-manger/CategoryArgument',
        name: '分类参数'
      },
      {
        path: '/good/good-cate',
        component: '@/pages/good-manger/GoodCategory',
        name: '商品分类'
      },
    ]
  },
  {
    path: '/order',
    name: '订单管理',
    icon: 'FlagFilled',
    routes: [
      {
        path: '/order/list',
        component: '@/pages/order-manger/OrderList',
        name: '订单列表',
      }
    ]
  },
  {
    path: '/data',
    name: '数据统计',
    icon: 'SignalFilled',
    routes: [
      {
        path: '/data/list',
        component: '@/pages/data-statistics/List',
        name: '数据报表',
      }
    ]
  },
  {
    path: '*',
    component: '@/pages/404'
  }
]