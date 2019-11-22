export default function ( w = 1, h = 1 ) {
    return {
    	 /**color: new echarts.graphic.LinearGradient(
                 0, 0, 0, 1,
                 [
                     {offset: 0, color: '#EDD968'},
                     {offset: 1, color: '#F98E21'}
                 ]
             ),**/
    	color: ['#EDD968'],
		tooltip : {
		 trigger: 'axis',
		 axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		     type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
		 }
		},
		grid: {
		 left: '3%',
		 right: '4%',
		 bottom: '3%',
		 containLabel: true
		},
		xAxis : [
		 {
		     type : 'category',
		     data : ['证书过期', '年检过期', '防台出港', '扶林出港', '设备离线告警'],
		     axisTick: {
		         alignWithLabel: true
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
		yAxis : [
		 {
		     type : 'value',
	    	 axisLabel: {
		            textStyle: {
		              color: "rgb(255, 255, 255)",
		              fontSize: 16*h
		            },
		            margin: 10
		         }
		 }
		],
		series : [
		 {
		     name:'数量',
		     type:'bar',
		     barWidth: '20%',
		     data:[6, 8, 10, 9, 4, 5, 2],
		 }
		]
    }
}
