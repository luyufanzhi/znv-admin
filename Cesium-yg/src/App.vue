<template>
  <transition name="fade">
    <router-view id="app"></router-view>
  </transition>
</template>

<script>
  export default {
    name: "App",
    data () {
      return {
      };
    },
    mounted () {
    },
    watch: {
      // screenWidth: function () {
      //   this.resize();
      // },
      // screenHeight: function () {
      //   this.resize();
      // }
    },
    computed: {
    },
    methods: {
    }
  }
</script>

<style lang="less">
// @import url("~@less/index.less");

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
/* #app {
  width: 1920px;
  height: 1080px;
  transform-origin: left top;
} */
.v-modal {
  display: none!important;
}
</style>
