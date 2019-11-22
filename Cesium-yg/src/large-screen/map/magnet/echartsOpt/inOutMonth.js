/**
 * 进出港 月
 * @param { Number } w 设计稿的缩放比例
 * @param { Number } h
 */
export default function ( w = 1, h = 1 ) {
    return {
        // animation: false,
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: [ '#FFAB1A', '#9598FF', '#FF7765', '#AA7BF0' ],
        series : [
            {
                name: '进出船',
                type: 'pie',
                radius : '70%',
                center: ['25%', '50%'],
                data:[
                    {value:335, name:'进船'},
                    {value:310, name:'出船'},
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    normal: {
                        formatter: '{b|{b}}\n{c|{c}}',
                        position: 'inside',
                        rich: {
                            b: {
                                fontSize: 16 * h,
                                color: '#fff',
                            },
                            c: {
                               fontSize: 14 * h,
                               color: '#fff',
                               height: 20 * h
                            }
                        }
                    },
                }
            },
            {
                name: '进出报',
                type: 'pie',
                radius : '70%',
                center: ['75%', '50%'],
                data:[
                    {value:335, name:'进报'},
                    {value:310, name:'出报'},
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    normal: {
                        formatter: '{b|{b}}\n{c|{c}}',
                        position: 'inside',
                        rich: {
                            b: {
                                fontSize: 16 * h,
                                color: '#fff',
                            },
                            c: {
                               fontSize: 14 * h,
                               color: '#fff',
                               height: 20 * h
                            }
                        }
                    },
                }
            }
        ]
    }
}
