<template>
  <div class="box">
    <div id="inchart" class="chart-box" ref="shipIn">

    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import optShipIn from './echartsOpt/shipInCharts'
export default {
 
    created () {
        this.$nextTick( () => {
            this.chart = echarts.init( this.$refs.shipIn )
            this.drawEchart()
            // 自适应
            window.addEventListener( 'resize', () => {
                this.drawEchart()
                this.chart.resize()
            } )
        } )
    },
  methods: {
      drawEchart () {
            let w = window.innerWidth / 1920
            let h = window.innerHeight / 1080
            this.chart.setOption( optShipIn( w, h ) )
        }
  }
};
</script>

<style scoped>
.box,
.chart-box {
  width: 100%;
  height: 100%;
}
</style>