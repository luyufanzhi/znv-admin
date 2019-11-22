export default function ( w = 1, h = 1 ) {
    return {
        grid:{
            x:66*h,
            y:20*h,
            x2:40*h,
            y2:60*h
        },
      tooltip: {
        trigger: "axis",
        backgroundColor: 'rgba(0,0,0,0.8)',
        axisPointer: {
          lineStyle: {
              color: "rgb(255, 255, 255)",
              width: 1
          }
      },
      formatter: '{a0}<span style="margin-left:10px;color:#ff7765">{c0}</span><br/>{a1}<span style="margin-left:10px;color:#3aa0ff">{c1}</span>'
      },
      toolbox: {
        show: false,
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: [
            "01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"
          ],
          axisLine: {
            lineStyle: {
              color: "rgb(255, 255, 255)",
              width: 1
            },
            show: true
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "rgb(57, 75, 96)",
              width: 1
            }
          },
          axisLabel: {
            textStyle: {
              color: "rgb(255, 255, 255)",
              fontSize: 16*h
            },
            margin: 10
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "rgb(255, 255, 255)",
              width: 1
            }
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "rgb(57, 75, 96)",
              width: 1
            },
            show: true
          },
          axisLabel: {
            textStyle: {
              color: "rgb(255, 255, 255)",
              fontSize: 14*h
            },
            margin: 10*h
          },
           axisTick: {
              show: false
          },
           splitNumber: 5,
           max: 500
        }
      ],
      dataZoom: [
        {
          type: "inside",
          show: "true",
          start:40,
          end: 60
        },
        {
          type: "slider",
          start: 40,
          end: 60,
          height: 6,
          bottom:10*h,
          showdetails:false,
          backgroundColor: "rgba(242,245,247,0)", // 背景颜色
          dataBackgroundColor: "rgba(49,163,255,0.2)", // 数据背景颜色
          borderColor: "rgba(242,245,247,0)", // 边框颜色。
          filterMode: "filter",
          fillerColor: "rgba(49,163,255,1)", // 选中范围的填充颜色。
          handleColor: "rgba(70,130,180,0)", // 手柄颜色
          handleIcon:
            "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
          handleSize: "100%",
          handleStyle: {
            color: "#fff",
            borderColor: "#ff0000",
            borderWidth: "0",
            shadowBlur: 3,
            shadowColor: "rgba(0, 0, 0, 0)",
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }
      ],
      series: [
        {
          name: "出港报告",
          type: "line",
           hoverAnimation:false,
          data: [
            230,140,250,160,270,280 ,333,144,251,160,270,380,290,300,330,280,280,390,100,210,222,333,160,270,
            210,
            230,
            300,
            395,
            400,
            310,
            120
          ],
          smooth: true,
           itemStyle: {
              normal: {
                  lineStyle: {
                      color: "#ff7765",
                      width: 2
                  },
                
              }
          },
          symbol:  'image://static/img/report/pointer_red.png',
          symbolSize: 12*h
        },
        {
          name: "进港报告",
          type: "line",
          hoverAnimation:false,
          data: [
            100,220,230,140,250,160,270,280,390,100,210,222,333,144,251,160,270,380,290,300,330,280,210,198,190,190,198,188,290,160,271
          ],
          smooth: true,
           itemStyle: {
              normal: {
                  lineStyle: {
                      color: "#3aa0ff",
                      width: 2
                  },
                
              }
          },
          symbol:  'image://static/img/report/pointer_blue.png',
          symbolSize: 12*h
        }
      ]        
    }
}
