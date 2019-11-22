<template>
  <div
    :class="setTextClass()"
    :style="setTextStyle()"
    @mousedown="handleMousedown($event)"
    @click="handleClick()"
  >
    {{getText()}}
    <i
      v-if="'btn' in this.$attrs"
      class="line"
      :class="{show:'show' in this.$attrs}"
      :style="`background-color: #${lineColor};`"
    ></i>
    <slot></slot>
  </div>
</template>
<script type='text/ecmascript-6'>
export default {
  props: {
    align: {},
    s: {},
    c: {},
    limit: {}
  },
  data() {
    return {};
  },
  methods: {
    getText() {
      if (this.limit && this.limit < this.text.length) {
        return this.text.substr(0, this.limit) + "...";
      }
      return this.text;
    },
    setPaddingValue(value, type) {
      if (value) {
        return `${this.setAttValue(value, type)}`;
      } else {
        return `0`;
      }
    },
    setMarginValue(value, type) {
      if (value) {
        if (value === "auto") {
          return value;
        } else {
          return `${this.setAttValue(value, type)}`;
        }
      } else {
        return `0`;
      }
    },
    setTextStyle() {
      let style = this.getBaseStyle();
      if (this.align) {
        style += `vertical-align: ${this.align}px !important;`;
      }
      if (this.s) {
        style += `font-size: ${this.setAttValue(this.s, 'w', 'font')};`;
      }
      if (this.c) {
        style += `color: ${this.getColor(this.c)}`
      }
      
      if ("vertical-align" in this.$attrs) {
        style += `vertical-align: ${this.$attrs["vertical-align"]};`;
      }

      return style;
    },
    setTextClass() {
      let className = `_text`;
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
      this.$emit("click");
    }
  }
};
</script>
<style scoped lang='less'>


._text {
  display: inline-block;
  font-size: 14px;
  white-space: normal;
  vertical-align: middle;
  color:#fff;

  &.ilt {
    display: inline-block;
    vertical-align: top;
  }

  &.white {
    color: #fff;
  }

  &.blackStroke {
    .txtStroke(1px, #000)
  }

}
</style>