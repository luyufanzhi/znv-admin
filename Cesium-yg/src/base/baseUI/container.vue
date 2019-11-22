<template>
  <div
    :class="setContainerClass()"
    :style="setContainerStyle()"
    @click="handleClick()"
  >
    <slot></slot>
  </div> 
</template>
<script type='text/ecmascript-6'>
export default {
  props: {
    
  },
  methods: {
    setContainerStyle() {
      let style = this.getBaseStyle();
      if (this.align) {
        style += `vertical-align: ${this.align}px !important;`;
      }
      if ("vertical-align" in this.$attrs) {
        style += `vertical-align: ${this.$attrs["vertical-align"]};`;
      }
      return style;
    },
    setContainerClass() {
      let className = ``;
      if ("center" in this.$attrs) {
        className += " center";
      }
      if ("block" in this.$attrs) {
        className += " block";
      }
      if ("noWrap" in this.$attrs) {
        className += " no-wrap";
      }
      return className;
    },
    handleMousedown(ev) {
      ev.preventDefault();
    },
    handleClick(ev) {
      this.$emit("onClick");
    }
  }
};
</script>
