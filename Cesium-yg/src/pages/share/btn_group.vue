<template>
  <div class="btn_group">
    <el-input  v-model="input" placeholder="船名/船主" class="mr"></el-input>
    <el-select v-model="value1" filterable placeholder="请选择" class="mr">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>

    <el-date-picker
      v-model="value6"
      type="daterange"
      range-separator="~"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
    ></el-date-picker>
    <el-button class="btn_search ml16">搜索</el-button>
  </div>
</template>

<script>
export default {
 
  data() {
    return {
      
      input: "",
      options: [
        {
          value: "选项1",
          label: "进港报告"
        },
        {
          value: "选项2",
          label: "出港报告"
        }
      ],
      value1: "选项1",
      value6: ""
    };
  }
};
</script>


<style>

.el-input {
  width: 10.5vw;
}
.el-input--medium .el-input__inner {
  height: 3vh;
  line-height: 3vh;
}
.el-input__inner {
  background-color: #10335a;
  border: 1px solid #32aaff;
  color: #bbbbbb;
  box-shadow: 0px 0px 15px #13578f inset;
  border-radius: 2px;
  font-size: 1.3vh;
}
.el-range-editor--medium .el-range-input,.el-button--medium,.el-input--medium{
  font-size: 1.3vh;
}

.el-select .el-input.is-focus .el-input__inner,
.el-select .el-input__inner:focus,
.el-input__inner:hover,
.el-select:hover .el-input__inner {
  border: 1px solid #32aaff;
}
.el-select .el-input .el-select__caret {
  color: #ffffff;
}

.el-input__suffix {
  right: 0;
  border: 1px solid #32aaff;
  background: linear-gradient(to bottom, #5eadff 0%, #1275ff 16%, #0c4ca3 100%);
}
.el-input__icon {
  width: 40px;
}
.el-range-editor--medium.el-input__inner {
  height: 3vh;
}
.el-range-editor--medium .el-range__close-icon, .el-range-editor--medium .el-range__icon{
  line-height: 3vh;
}
.el-range-editor.el-input__inner {
  padding: 0;
}
.el-range-editor.el-input__inner input {
  background-color: transparent;
}
.el-date-editor .el-range-separator {
  color: #ffffff;
}
.el-date-editor .el-range-input {
  color: #bbbbbb;
}
.el-date-editor--daterange.el-input__inner{
  width: 22.4vw;
}
.btn_group .btn_search {
  background: linear-gradient(to bottom, #5eadff 0%, #1275ff 16%, #0c4ca3 100%);
  border: 0;
  height: 3vh;
  line-height: 3vh;
  width: 100px;
  color: #ffffff;
  padding: 0;
  border-radius: 2px;
}
.mr {
  margin-right: 1vw;
}
.ml16 {
  margin-left: 1.6vw;
}
</style>
<style scoped>

</style>

