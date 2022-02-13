//!!!  运行时配置

import React from 'react';
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';

import { createLogger } from 'redux-logger';
import { message } from 'antd';
import Tab from '@/components/Tab'



export const layout = ()  => {
  return {
    rightContentRender: () => <Tab/>,
    footerRender: () => <div> 底部 </div>,

  };
};
