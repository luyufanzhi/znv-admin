<template>
  <div class="frame">
    <tit :tit="tit"></tit>
    <mod>
      <div >
       <chart-bar></chart-bar>
       <form-bar></form-bar>
      </div>
    </mod>
  </div>
</template>

<script>
import tit from "@/pages/share/title.vue";
import mod from "@/pages/share/mod.vue";
// echarts表单
import chartBar from "@/pages/report/chartBar.vue";
//表格
import formBar from "@/pages/report/formBar.vue";

export default {
  components: {
    tit,
    mod,
    chartBar,
    formBar
  },
  data() {
    return {
      tit: "船舶进出港报告"
    };
  }
};
</script>

<style lang="less" scoped>
.frame {
  width: 98%;
  margin: 0 auto;
  margin-top: 20vh;
}

</style>