
export const pieConfig = function ( {text, percent, colors} ) {
    return {
        title: {
            text: text,
            itemGap:10,
            x: "center",
            y: 'center',
            textStyle: {  
                color: "rgba(255,255,255,1)", 
                fontFamily: "微软雅黑",
                fontSize: 14,
                fontWeight: "bold"
            }
        },
        series: [
            {
                type: "pie",
                radius: ["55%", "75%"],
                startAngle: 270,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                data: [
                        {
                            value: percent,
                            itemStyle: {
                                normal: {
                                    color: colors[0]
                                }
                            }
                        },
                        {
                            value: 1-percent,
                            itemStyle: {
                                normal: {
                                    color: colors[1]
                                }
                            }
                        }
                ],
                animationType: "scale",
                animationEasing: "elasticOut",
                animationDelay: function(idx) {
                    return Math.random() * 10;
                }
            }
        ]
    }
}

