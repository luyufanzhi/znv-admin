<template>
     <div class="chart_box">
          <div class="left_chart chart1 mr15">
            <line-chart></line-chart>
          </div>
          <div class="left_chart chart2 mr15">
            <out-chart></out-chart>
          </div>
          <div class="left_chart chart2">
            <in-chart></in-chart>
          </div>
        </div>
</template>

<script>
import lineChart from "@/pages/report/components/line_chart.vue";
import inChart from "@/pages/report/components/in_chart.vue";
import outChart from "@/pages/report/components/out_chart.vue";
    export default {
        name:"chartGroup",
        components: {
            lineChart,
            inChart,
            outChart
        }
    }
</script>

<style lang="scss" scoped>
.mr15{
  margin-right: 15px;
}
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
      
    }
    .chart1 {
      flex: 2;
    }
    .chart2 {
      flex: 1;
    }
  }
</style>