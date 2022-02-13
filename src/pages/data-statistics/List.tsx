import React, { useEffect } from 'react';
//todo 1. 引入echarts
import * as echarts from 'echarts';
console.log(echarts)
//todo 2. 引入样式文件
import styles from './List.less';
export default function List() {
  useEffect(() => {
    //todo 3 获取dom元素
    const main: HTMLDivElement | null = document.querySelector('#main___SkFyh');
    // console.log('main',main)
    //todo 4 初始化echarts
    const myChart = echarts.init(main);
    //todo 5. 给myChart设置配置项
    // myChart.setOption(options)
    myChart.setOption({
      title: {
        text: '折线图堆叠'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['123', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '123',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
    });
  }, []);
  return (
    <div>
      <h3> Echarts 用法 </h3>
      <div id={styles.main}></div>
    </div>
  );
}
