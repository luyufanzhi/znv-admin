/**
 * 进出港 年
 * @param { Number } w 设计稿的缩放比例
 * @param { Number } h
 */
export default function ( w, h ) {
    return {
        // animation: false,
        grid: {
            top: 10,
            left: 50,
            bottom: 30,
            // right: 0
        },
        xAxis: {
            type: 'category',
            data: [ 0, 2, 4, 6, 8, 10, 12 ],
            boundaryGap : false,
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dash',
                    color: '#6c7d92'
                },
                interval: 0,
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        color: [ '#FF7765', '#FFAB1A', '#3AA0FF', '#34cc7c' ],
        yAxis: {
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dash',
                    color: '#6c7d92'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            }
        },
        series: [ {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
            symbol: 'none',
            markLine: {
                silent: true,
                symbol: 'none',
                data: [ {
                    xAxis: 3,
                } ],

                // 这个设置与官网不符合
                itemStyle:{
                    normal: {
                        lineStyle: {
                            type:'solid',
                            color:'#fff'
                        },
                        label:{
                            show: false,
                        }
                    }
                }
            }
        } ]
    }
}
