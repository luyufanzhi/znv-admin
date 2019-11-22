
export const pieConfig = function ( {sum, ais, beidou} ) {
    return {
        title: {
            text: sum,
            itemGap:10,
            x: "center",
            y: 'center',
            textStyle: {  
                color: "rgba(255,255,255,1)", 
                fontFamily: "微软雅黑",
                fontSize: 24,
                fontWeight: "bold"
            }
        },
        series: [
            {
              name: "数据统计",
              type: "pie",
              radius: ["40%", "60%"],
              center: ["50%", "50%"],
              startAngle: 270,
              data: [
                    {
                        value: ais,
                        name: "AIS",
                        itemStyle: {
                            normal: {
                            color: "#FCAD02"
                            }
                        }
                    },
                    {
                        value: beidou,
                        name: "北斗",
                        itemStyle: {
                            normal: {
                            color: "#04F8B6"
                            }
                        }
                    }
                ],
                label: {
                    normal: {
                      textStyle: {
                        color: "rgba(255, 255, 255, 1)"
                      }
                    }
                },
                labelLine: {
                    normal: {
                      lineStyle: {
                        color: "rgba(255, 255, 255, 1)"
                      },
                      smooth: 0,
                      length: 10,
                      length2: 10
                    }
                },
                animationType: "scale",
                animationEasing: "elasticOut",
                animationDelay: function(idx) {
                    return Math.random() * 100;
                }
            }
        ]
    }
}

export const barConfig = () => {
    return {
        color: ['#00AEFF','#04F8B6'],
        grid: {
            left: '1%',
            right: '2%',
            bottom: '8%',
            top: '12%',
            containLabel: true
        },
        tooltip : {
            trigger: 'axis'
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                splitLine: {
                    lineStyle: {
                      type: "dashed",
                      color: "rgba(238,238,238,0.2)",
                      width: 1
                    },
                    show: true
                },
                axisLine: {
                    lineStyle: {
                      color: "rgba(238,238,238,1)",
                      width: 1
                    }
                },
                axisTick: {
                    show: false
                },
                data: ['2:00','4:00','6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','22:00']
            },
            
        ],
        yAxis : [
            {
                type: "value",
                axisLine: {
                  lineStyle: {
                    color: "rgba(238,238,238,1)",
                    width: 1
                  }
                },
                splitLine: {
                  lineStyle: {
                    type: "dashed",
                    color: "rgba(238,238,238,0.2)",
                    width: 1
                  },
                  show: true
                },
                axisLabel: {
                  textStyle: {
                    color: "rgb(255, 255, 255)",
                    fontSize: 14
                  },
                  margin: 10
                },
                 axisTick: {
                    show: false
                },
                 splitNumber: 5,
                 max: 100
              }
        ],
        series : [
            {
                name:'进港',
                type:'bar',
                barWidth: 18,
                itemStyle: {
                    barBorderRadius: 5
                },
                data:[60, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
            },
            {
                name:'出港',
                type:'bar',
                barWidth: 18,
                data:[40, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
            }
        ]
    }
};
