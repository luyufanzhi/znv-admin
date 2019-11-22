<template>
	<div class="chart_box">
		<template>
			<div class="chart_box">
				<div class="left_chart">
					<template>
					  <div class="box">
					    <div class="chart-box" ref="leftchart">
					    	
					    </div>
					  </div>
					</template>
				</div>
				<div class="left_chart">
					<template>
					  <div class="box">
					    <div class="chart-box" ref="centerchart">
					    	
					    </div>
					  </div>
					</template>
				</div>
				<div class="left_chart">
					<template>
					  <div class="box">
					    <div class="chart-box" ref="rightchart">
					    	
					    </div>
					  </div>
					</template>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import echarts from "echarts";
	import optleftchart from './js/leftchart'
	import optcenterchart from './js/centerchart'
	import optrightchart from './js/rightchart'
	export default {
		created() {
			this.$nextTick(() => {
				this.leftchart = echarts.init(this.$refs.leftchart)
				this.centerchart = echarts.init(this.$refs.centerchart)
				this.rightchart = echarts.init(this.$refs.rightchart)
				this.drawEchart()
				// 自适应
				window.addEventListener('resize', () => {
					this.drawEchart()
					this.leftchart.resize()
					this.centerchart.resize()
					this.rightchart.resize()
				})
			})
		},
		methods: {
			drawEchart () {
	            let w = window.innerWidth / 1920
	            let h = window.innerHeight / 1080
	            this.leftchart.setOption( optleftchart( w, h ) )
	            this.centerchart.setOption( optcenterchart( w, h ) )
	            this.rightchart.setOption( optrightchart( w, h ) )
	        }
		}
	};
</script>

<style lang="scss" scoped>
		.chart_box {
		width: 100%;
		height: 21vh;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		.left_chart {
			height: 100%;
			border-radius: 5px;
			background-color: #0c223d;
			margin-right: 15px;
			flex: 1;
		}
	}

	
	.box,
	.chart-box {
		width: 100%;
		height: 100%;
	}
</style>