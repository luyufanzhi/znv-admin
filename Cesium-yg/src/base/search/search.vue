<template>
    <div>
        <el-form :model="model" :inline="true" class="demo-form-inline ssss" @submit.native.prevent>
            <span v-for="(item, index) in data" :key="index" class="item">
                <template v-if="item.type==='text'">
                    <el-input   :placeholder=item.placeholder
                                @keyup.enter.native="_emitSearch"
                                v-model="model[item.name]" >
                    </el-input>
                </template>
                <template v-if="item.type==='textarea'">
                    <el-input   type="textarea"
                                :placeholder=item.placeholder
                                @keyup.enter.native="_emitSearch"
                                v-model="model[item.name]" >
                    </el-input>
                </template>
                <template v-else-if="item.type==='select'">

                    <el-select  v-model="model[item.name]" clearable filterable 
                                @change="selectedData(item.name)" 
                                :placeholder="item.placeholder" 
                                >
                        <template v-for="(option, optionIndex) in item.options" >
                            <el-option :label="option.key" :value="option.value" :key=optionIndex></el-option>
                        </template>
                    </el-select>
                </template>
                <template v-else-if="item.type==='date'">
                    <el-date-picker v-model="model.startTime"
                                    type="daterange"
                                    placeholder="选择开始日期时间"
                                    align="right"
                                    :value-format="item.format?item.format:'yyyy-MM-dd HH:mm:ss'"
                                    :picker-options="pickerOptions1"
                                    >
                    </el-date-picker>
                </template>
                <template v-else-if="item.type==='startAndEndDate'">
                	<el-date-picker
				      	v-model="model[item.name]"
				      	type="daterange"
				      	range-separator="~"
				      	start-placeholder="开始时间"
				      	end-placeholder="结束时间"
				      	:picker-options="pickerOptions1">
				    </el-date-picker>
                </template>
                <template v-else-if="item.type==='startAndEndDateTime'">
                	 <el-date-picker
                      v-model="model[item.name]"
                      type="datetimerange"
                      range-separator="~"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      :picker-options="pickerOptions1"
                    ></el-date-picker>
                </template>
            </span>
            <el-button class="btn_search" size="small" type="primary" v-if="isShowBtn" @click="onSubmit">搜索</el-button>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
import {isString} from "common/js/utils"

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    model: {
      type: Object,
      default: () => {}
    },
    isShowBtn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      toJSON: "",
      pickerOptions1: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      isShow: false,
      currentClass: ""
    };
  },
  methods: {
    onSubmit() {
      this._emitSearch();
    },
    _emitSearch() {
      for (var key in this.model) {
        let value = this.model[key];
        if(value && isString(value)) {
          this.model[key] = value ? value.trim() : value;
        }
      }
      this.$emit("search");
    },
    selectedData(name) {
      this.$emit('handleSelectChange', this.model[name])
    }
  }
};
</script>

<style lang="less" scoped>
@w65: .px2vw(65)[@result];
@w14: .px2vw(14)[@result];
@h38: .px2vh(38)[@result];
@h32: .px2vh(32)[@result];

/deep/ .el-form{
    .el-input__inner,.el-textarea__inner{
        background:transparent;
        border-radius:2px;
        border:1px solid rgba(50,170,255,1);
        color:#fff;
        padding-left:@w14;
        height:@h32;line-height:@h32;
    }
    
}

/deep/ .el-input {
  width: .px2vh(200)[@result];
  height: .px2vh(30)[@result];
}

/deep/ .el-select{
    .el-input__suffix{
        right: 0;left:auto;
        width:@w40;
        background:@btnGradient;
    }
}

/deep/ .el-date-editor{
    .el-input__prefix{
        right: 0;left:auto;
        width:@w40;
        background:@btnGradient;
    }
    .el-input__suffix{
        right: @w50;
        
    }
    &.el-range-editor{
      input{
        background: transparent;color:#fff;
      }
      .el-range-separator{
        color: #fff;
        line-height:@h20;
      }
      .el-range__icon{
        line-height: 0;
      }
    }
}

.item{
  margin-right:1%;display:inline-block;vertical-align:top;
}
.btn_search {
    background: linear-gradient(to bottom, rgba(107,187,253,0.5) 0%, rgba(0,138,252,0.5) 16%, rgba(0,95,176,0.5) 100%);
    border: 0;
    height: @h32;
    line-height: @h32;
    width: 100px;
    color: #ffffff;
    padding: 0;
    font-size: @h18;
    border-radius: 2px;
    &:hover{
      background: linear-gradient(to bottom,rgba(107,187,253,1),rgba(0,138,252,1),rgba(0,95,176,1));
    }
}


</style>

<style lang="less">
//下拉框样式
.manage ~ .el-select-dropdown {
  background:rgba(7,32,69,0.6);
  border:1px solid rgba(47,184,253,1);
  box-shadow:0px 0px 17px 0px rgba(0,174,255,0.31);
  margin-top: @h10;
  .popper__arrow {
    display:none;
  }
  .el-select-dropdown__item{
    color:#fff;
    &.hover, &:hover {
      background: #3D96D6;color:#fff;
    }
  }
  
}
</style>
