
import { defineConfig } from 'umi';
import {routes} from './config/route'
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
  layout: {
    // 支持任何不需要 dom 的
    // https://procomponents.ant.design/components/layout#prolayout
    name: '后台管理系统',
    logo: 'https://ftp.bmp.ovh/imgs/2019/11/8dea885bcee7fb02.png',
    locale: true,
    layout: 'side',
  },
  dva: { 
    immer: true,
    hmr: true,
  },
});
