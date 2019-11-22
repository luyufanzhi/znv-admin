/**
 * 船舶统计
 * @param { Number } w 设计稿的缩放比例
 * @param { Number } h
 */
export default function ( w = 1, h = 1 ) {
    return {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },

        // legend: {
        //     orient: 'vertical',
        //     x: 'left',
        //     data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
        // },
        series: [
            {
                name:'访问来源',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '40%'],
                color: ['#dc4848','#2670df', '#56cadd'],

                label: {
                    normal: {
                        position: 'inner',
                        fontSize: 12 * h
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    { value:335, name:'港澳', /* selected:true */ },
                    { value:679, name:'外地周边' },
                    { value:1548, name:'本地深圳' }
                ]
            },
            {
                name:'访问来源2',
                type:'pie',
                radius: ['50%', '65%'],
                color: [ '#aa7bf0', '#9598ff', '#3aa0ff', '#ffab1a', '#ff7765' ],

                label: {
                    normal: {
                        formatter: '{b|{b}}\n{hr|}\n {c}  {per|{d}%}  ',
                        backgroundColor: 'transparent',
                        borderColor: '#fff',
                        borderWidth: 1,
                        borderRadius: 4,
                        rich: {
                            hr: {
                                borderColor: '#fff',
                                width: '100%',
                                borderWidth: .5,
                                height: 0
                            },
                            b: {
                                fontSize: 12 * h,
                                lineHeight: 19 * h,
                                height: 19 * w,
                                align: 'center',
                                color: '#fff',
                            },
                            c: {
                                color: '#fff'
                            },
                            per: {
                                color: '#fff',
                                backgroundColor: '#4371F7',
                                padding: [1, 2],
                                borderRadius: 2,
                                fontSize: 10 * h,
                                width: 29 * w,
                                height: 13 * h,
                                lineHeight: 19 * h,
                            },

                        }
                    }
                },
                data:[
                    {value:225, name:'捕捞渔船', /* label: { color: '#9598FF' } */},
                    {value:178, name:'其他', /* label: { color: '#34CC7C' } */},
                    {value:289, name:'辅助渔船', /* label: { color: '#3AA0FF' } */},
                    {value:503, name:'养殖船', /* label: { color: '#FFAB1A' } */},
                    {value:265, name:'公务船', /* label: { color: '#FF7765' } */},
                    // {value:356, name:'休闲渔船', /* label: { color: '#AA7BF0' } */},
                ]
            }
        ]
    }
}
