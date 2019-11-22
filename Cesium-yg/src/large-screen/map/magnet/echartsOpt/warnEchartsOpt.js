/**
 * 告警统计
 * @param { Number } w 设计稿的缩放比例
 * @param { Number } h
 */
export default function ( w, h ) {
    return {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)",
            textStyle: {
                fontSize: 12 * h
            }
        },
        title : {
            text: '告警总数',
            subtext: ' 10',
            x:'center',
            y: 'center',
            // top: '50%',
            textStyle: {
                fontSize: 10 * h,
                color: '#fff'
            },
            subtextStyle: {
                fontSize: 20 * h,
                color: '#FF7765',
                lineHeight: 50 * h,
                fontWeight: 700
            },
        },
        calculable : true,
        series : [
            {
                name:'告警统计',
                label: {

                    normal: {
                        formatter: '{b|{b}} {c|{c}} ',
                        fontSize: 14 * h,
                        rich: {
                            b: {

                            },
                            c: {
                                fontSize: 18 * h,
                                color: '#F6FF00'
                            }
                        }
                    }
                },
                type:'pie',
                radius : [ 60 * w / 2, 110 * w / 2 ],
                center : ['50%', '50%'],
                roseType : 'area',
                data:[
                    {value:2, name:'年检过期'},
                    {value:2, name:'防台出港'},
                    {value:5, name:'设备离线告警'},
                    {value:2, name:'休伏出港'},
                    {value:5, name:'证书过期'},
                ]
            }
        ],
        color: [ '#aa7bf0','#2edcff', '#ff7765', '#2670df', '#34cc7c' ]
    }
}
