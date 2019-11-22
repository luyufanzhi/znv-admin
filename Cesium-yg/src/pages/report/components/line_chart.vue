<template>
  <div class="box">
    <div id="J_chartLineBox" class="chart-box" ref="inOut"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import optShipInOut from './echartsOpt/shipInOut'
export default {
created () {
        this.$nextTick( () => {
            this.chart = echarts.init( this.$refs.inOut )
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
            this.chart.setOption( optShipInOut( w, h ) )
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