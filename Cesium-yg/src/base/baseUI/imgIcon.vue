<template>
  <div :style="getIconStyle()" @click="onClick">
    <i :class="[ 'icon', type || '' ]"></i>
  </div>
</template>
<script type='text/ecmascript-6'>
import { isUndefined } from "common/js/utils";
import base from 'base/mixins/base'
export default {
  props: {
    type: {
      required: true
    }
  },
  data() {
    return {};
  },
  mixins: [base],
  methods: {
    getIconStyle() {
      let style = this.getBaseStyle();
      if (isUndefined(this.w)) {
        style += `width:100%;`;
      }else{
        style += `width:${this.setAttValue(this.w)};`;
      }
      if (this.h) {
        style += `height:${this.setAttValue(this.h)};`;
      } else if (isUndefined(this.h)) {
        style += `height:100%;`;
      }
      return style;
    }
  }
};
</script>
<style scoped lang='less'>

.r90 {
  transform: rotate(90deg);
}
.r180{
  transform: rotate(180deg);
}

.icon {
  display: block;
  width: 100%;
  height: 100%;
  background-size: 100% auto;
  background-repeat: no-repeat;

  &.ais{
    background-image: url('../../assets/icones/ais.png')
  }
  &.beidou{
    background-image: url('../../assets/icones/beidou.png')
  }
  &.numbers{
    background-image: url('../../assets/icones/numbers.png')
  }
  &.track{
    background-image: url('../../assets/icones/track.png')
  }
  &.clock{
    background-image: url('../../assets/icones/clock.png')
  }
  &.expired{
    background-image: url('../../assets/icones/expired.png')
  }
  &.all{
    background-image: url('../../assets/icones/all.png')
  }
  &.export{
    background-image: url('../../assets/icones/export.png')
  }
  &.screenshot{
    background-image: url('../../assets/icones/edit.png')
  }
  &.edit{
    background-image: url('../../assets/icones/edit.png')
  }
  &.into{
    background-image: url('../../assets/icones/into.png')
  }
  &.out{
    background-image: url('../../assets/icones/into.png'); .r180;
  }
  &.detail{
    background-image: url('../../assets/icones/detail.png'); 
  }
  &.test{
    background-image: url('../../assets/icones/test.png'); 
  }
  &.result{
    background-image: url('../../assets/icones/result.png'); 
  }
  &.n_report{
    background-image: url('../../assets/icones/n_report.png'); 
  }
  &.n_alarm{
    background-image: url('../../assets/icones/n_alarm.png'); 
  }
  &.n_berth{
    background-image: url('../../assets/icones/n_berth.png'); 
  }
  &.n_certificate{
    background-image: url('../../assets/icones/n_certificate.png'); 
  }
  &.n_culture{
    background-image: url('../../assets/icones/n_culture.png'); 
  }
  &.n_data{
    background-image: url('../../assets/icones/n_data.png'); 
  }
  &.n_event{
    background-image: url('../../assets/icones/n_event.png'); 
  }
  &.n_exam{
    background-image: url('../../assets/icones/n_exam.png'); 
  }
  &.n_health{
    background-image: url('../../assets/icones/n_health.png'); 
  }
  &.n_information{
    background-image: url('../../assets/icones/n_information.png'); 
  }
  &.n_land{
    background-image: url('../../assets/icones/n_land.png'); 
  }
  &.n_regulatory{
    background-image: url('../../assets/icones/n_regulatory.png'); 
  }
  &.n_release{
    background-image: url('../../assets/icones/n_release.png'); 
  }
  &.n_rest{
    background-image: url('../../assets/icones/n_rest.png'); 
  }
  &.n_sailors_c{
    background-image: url('../../assets/icones/n_sailors_c.png'); 
  }
  &.n_training{
    background-image: url('../../assets/icones/n_training.png'); 
  }
  &.n_typhoon{
    background-image: url('../../assets/icones/n_typhoon.png'); 
  }
  &.n_sensitive{
    background-image: url('../../assets/icones/n_sensitive.png'); 
  }
  &.release{
    background-image: url('../../assets/icones/release.png'); 
  }
  &.addarea{
    background-image: url('../../assets/icones/add.png'); 
  }
  &.addhealth{
    background-image: url('../../assets/icones/addhealth.png'); 
  }
  &.open_nav{
    background-image: url('../../assets/icones/open_nav.png'); 
  }
  &.close_nav{
    background-image: url('../../assets/icones/open_nav.png'); .r180;
  }
  &.tag-ais{
    background-image: url('../../assets/icones/tag-ais.png'); 
  }
  &.tag-beidou{
    background-image: url('../../assets/icones/tag-beidou.png'); 
  }
  &.close{
    background-image: url('../../assets/icones/close.png'); 
  }
  &.set{
    background-image: url('../../assets/icones/set.png'); 
  }
  &.yc-foreign{
    background-image: url('../../assets/icones/yc-foreign.png'); 
  }
  &.yc-hk{
    background-image: url('../../assets/icones/yc-hk.png'); 
  }
  &.yc-local{
    background-image: url('../../assets/icones/yc-local.png')
  }
  &.news{
    background-image: url('../../assets/icones/news.png')
  }
     &.newReport{
     background-image: url('../../assets/icones/newReport.png');
   }

}


</style>
