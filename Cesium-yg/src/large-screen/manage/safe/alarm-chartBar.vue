<template>
	<div class="chart_box">
		<template>
			<div class="box">
				<div class="chart-box" ref="barChart">

				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import echarts from "echarts";
	import alarmChartBar from './js/alarm-chartBar'
	export default {
		created() {
			this.$nextTick(() => {
				this.chart = echarts.init(this.$refs.barChart)
				this.drawEchart()
				// 自适应
				window.addEventListener('resize', () => {
					this.drawEchart()
					this.chart.resize()
				})
			})
		},
		methods: {
			drawEchart() {
				let w = window.innerWidth / 1920
				let h = window.innerHeight / 1080
				this.chart.setOption(alarmChartBar(w, h))
			}
		}
	};
</script>

<style lang="scss" scoped>
	.chart_box {
		width: 100%;
		height: 21vh;
		overflow: hidden;
		justify-content: space-between;
		border-radius: 5px;
		background-color: #0c223d;
		margin-right: 15px;
	}
	
	.box,
	.chart-box {
		width: 100%;
		height: 100%;
	}
</style>