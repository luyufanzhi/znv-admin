
<template>
  <div :style="Style">
    <img v-if="ImageUrl&&!isLoadFail" class="image" :src="ImageUrl" @error="onError">
    <template v-else>
      <img  class="image" v-if="isNeedDefault" src="../../assets/icones/defaultTX.png" alt="">
    </template>
  </div>
</template>
<script type='text/ecmascript-6'>
import { isUndefined, isNumber,isString } from "common/js/utils";

export default {
  props: {
    isNeedDefault: {
      type: Boolean,
      default: true
    },
    b: {
      type: String,
    },
    padColor: {
      type: String
    },
    url: {
      type: String
    },
    h: {
      type: Number
    },
    w: {
      type: Number
    },
    br: {}
  },
  data() {
    return {
      isLoadFail: false
    };
  },
  computed: {
    Style() {
      let style = "";
      if (isUndefined(this.w)) {
        style += `width:100%;`;
      }else{
        style +=`width:${this.setAttValue(this.w, 'h')};`;
      }
      if (this.h) {
        style += `height:${this.setAttValue(this.h, 'h')};`;
      } else if (isUndefined(this.h)) {
        style += `height:100%;`;
      }
      if (this.br) {
        style += `border-radius: ${this.setAttValue(this.br)};overflow:hidden;`;
      }
      
      if (this.b) {
        style += `border: 1px solid ${this.b};`
      }
      return style;
    },
    ImageUrl() {
      let url = this.url
     
      
      return url
    }
  },
  methods: {
    onError() {
      this.isLoadFail = true;
      console.log('这张图片加载失败了')
    }
  }
};
</script>
<style scoped >

.image {
  display: block;
  width: 100%;
  height: 100%;
}
</style>