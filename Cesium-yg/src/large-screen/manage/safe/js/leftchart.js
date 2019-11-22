export default function ( w = 1, h = 1 ) {
    return {
        title: {
            text: "已确认总量",
            subtext: 256,
            itemGap:10* h,
            x: "center",
            y: 80* h,
  
            textStyle: {
              color: "rgba(255,255,255,1)",
              fontFamily: "微软雅黑",
              fontSize: 14* h,
              fontWeight: "normal"
            },
             subtextStyle: {
              color: "#2E90FF",
              fontFamily: "微软雅黑",
              fontSize: 16* h,
              fontWeight: "bolder"
            }
            
          },
          tooltip: {
            show: false,
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          visualMap: {
            show: false
          },
          series: [
            {
              name: "已确认",
              type: "pie",
            
              radius: ["50%", "75%"],
              center: ["50%", "50%"],
              startAngle: 270,
              data: [
                {
                  value: 90,
                  name: "自动确认（定位信号）",
                  itemStyle: {
                    normal: {
                      color: "#AA7BF0"
                    }
                  }
                },
                {
                  value: 80,
                  name: "船家确认（电话/app通知回复）",
                  itemStyle: {
                    normal: {
                      color: "#2edcff"
                    }
                  }
                },
                {
                  value: 86,
                  name: "管理确认 ",
                  itemStyle: {
                    normal: {
                      color: "#32d4a8"
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
                  length: 10* h,
                  length2: 10* h
                }
              },
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    formatter: function(params, ticket, callback) {
                      var name = params.name;
                      var num = params.percent.toFixed(0);
                      var val = params.value;
                      return "{a|" + name + "\r}{b|" + val + "\n}";
                    },
                    rich: {
                      a: {
                        color: "#fff",
                        fontSize: 14* h
                      },
                      b: {
                        fontWeight:"bolder",
                        fontSize: 14* h
                      }
                    },
                    position: "right",
                    distance: 3.0,
                    textStyle: {
                      color: "rgb(255, 255, 255)",
                      fontSize: 14* h,
                      lineHeight: 14* h,
                      fontStyle: "normal"
                    }
                  }
                },
                emphasis: {
                  label: {
                    show: true,
                    position: "bottom",
                    textStyle: {
                      fontSize: 14* h
                    }
                  }
                }
              },
              animationType: "scale",
              animationEasing: "elasticOut",
              animationDelay: function(idx) {
                return Math.random() * 200;
              }
            }
          ]
    }
}
