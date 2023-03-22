import * as echarts from 'echarts';

export const Gradient = (calss: string) => {
    type EChartsOption = echarts.EChartsOption;
    let chartDom = document.querySelectorAll(calss);
    let option: EChartsOption;
    option = {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        grid: {
            top: '10%',
            left: '5%',
            right: '10%',
            bottom: '10',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Line 1',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(128, 255, 165)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(1, 191, 236)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [140, 232, 101, 264, 90, 340, 250]
            },
            {
                name: 'Line 2',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(0, 221, 255)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(77, 119, 255)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [120, 282, 111, 234, 220, 340, 310]
            },
            {
                name: 'Line 3',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(55, 162, 255)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(116, 21, 219)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [320, 132, 201, 334, 190, 130, 220]
            },
            {
                name: 'Line 4',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(255, 0, 135)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(135, 0, 157)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [220, 402, 231, 134, 190, 230, 120]
            },
            {
                name: 'Line 5',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                label: {
                    show: true,
                    position: 'top'
                },
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(255, 191, 0)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(224, 62, 76)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [220, 302, 181, 234, 210, 290, 150]
            }
        ]
    }
    chartDom.forEach((dom: any) => {
        echarts.init(dom).setOption(option);
        echarts.init(dom).resize()
    })
    //    document.getElementsByName('template-container')[0].onresize = ()=>{
    //     console.log(111111111111111)
    // }
};


