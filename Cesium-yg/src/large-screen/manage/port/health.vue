<template>
  <div class="main-page clearfix">
    <div class="left_bar fl">
      <!-- 区域列表 -->
      <ul class="area_list">
        <div class="h1">区域树</div>
        <li v-for="(item,key) in areaList">{{item.name}}</li>
      </ul>
      <!-- 操控按钮 -->
      <div class="rocker">
        <ul class="bg_rocker">
          <li class="leftup"></li>
          <li class="up"></li>
          <li class="rightup"></li>
          <li class="left"></li>
          <li class="center"></li>
          <li class="right"></li>
          <li class="leftdown"></li>
          <li class="down"></li>
          <li class="rightdown"></li>
        </ul>
        <ul class="rocker_btn">
          <li>
            <div class="btn_zoomIn"></div>
            <div class="btn_zoomOut"></div>
          </li>
          <li>
            <div class="btn_nearly"></div>
            <div class="btn_far"></div>
          </li>
          <li>
            <div class="btn_Saperture"></div>
            <div class="btn_Baperture"></div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 右边区域 -->
    <div class="right_bar fl">
      <div class="box">
        <ul class="fl w50">
          <h6 class="sub_tit">实时视频</h6>
          <div class="con_box">
            <img-box url="static/img/health/img1.png"></img-box>
          </div>
        </ul>
        <ul class="fl w50">
          <h6 class="sub_tit lf_border">地图</h6>
          <div class="con_box">
            <con class="por ilt cp name-btn" m="10 10 0 0">
              <img-icon type="addarea" :w="20" :h="20" class="ilm" ></img-icon>
              <txt class="ilm" @click="handleRowClick" >新增关注区域</txt>
            </con>
            <img-box url="static/img/health/img2.png"></img-box>
          </div>
        </ul>
      </div>

      <con class="pr mt20">
        <h1 class="tit">卫生任务</h1>
        <con class="por ilt cp">
          <con class="ilm">
            <img-icon type="addhealth" :w="19" :h="20" class="ilm" m="0 5 0 0"></img-icon>
            <txt class="ilm">新增卫生任务</txt>
          </con>
          <con class="ilm" m="0 10 0 10">
            <img-icon type="export" :w="28" :h="28" class="ilm"></img-icon>
            <txt class="ilm">导出</txt>
          </con>
        </con>
      </con>
      <base-table
        class="mt20"
        :headers="headers"
        :listLoading="dataListLoading"
        :datas="dataList"
        :tableHeight="250"
      >
        <template slot-scope="scope" slot="photo">
            <ul class="imgList"> 
              <li>
                <span class="front"></span>
                <img src="../../../assets/health/boat.png" width="100%" alt="">
              </li>
              <li>
                <span class="back"></span>
                <img src="../../../assets/health/boat.png" width="100%" alt="">
              </li>
            </ul>
        </template>
        <template slot-scope="scope" slot="operate">
          <el-button type="text" class="name-btn">已完成</el-button>
        </template>
      </base-table>

      <pagination
        :pageNum="pageNum"
        :pageSize="pageSize"
        :total="total"
        @handleCurrentChange="handleCurrentChange"
      ></pagination>

      <custom-dialog :is-show.sync="isShowFormDialog" title="新增关注区域" width="430">
        <my-form
          :formItems="formItems"
          :model="formModel"
          @handleSubmit="handleSubmit"
          :rules="formRules"
        ></my-form>
      </custom-dialog>
    </div>
  </div>
</template>

<script>
import { getHealthList } from "@/api/api";
import viewModule from "common/mixins/view-module";
import myForm from "base/myForm/myForm";
import CustomDialog from "base/dialog/customDialog";

export default {
  data() {
    return {
      areaList: [
        { name: "卸货A段" },
        { name: "卸货B段" },
        { name: "卸货c段" },
        { name: "边防站附近" }
      ],
      mixinViewModuleOptions: {
        getDataListCallBack: getHealthList, //获取list数据
        getDataListIsPage: true //分页
      },
      dataForm: {
        name: ""
      },
      formModel: {
        regionalName: "",
        regionalType: "卸货区"
      },
      isShowFormDialog: false
    };
  },
  mixins: [viewModule],
  methods: {
    handleRowClick() {
      this.isShowFormDialog = true;
      console.log(123);
    },
    handleSubmit() {},
    _initCreatedData() {
      this.headers = [
        {
          label: "照片",
          name: "photo",
          type: "slot",
          width:100
        },
        
        { label: "提交时间", name: "subTime" },
        { label: "提交人", name: "subName" },
        { label: "处理时间", name: "processTime" },
        { label: "处理人", name: "processName" },
        { label: "区域", name: "area" },
        { label: "状态", name: "state", class: "red" },
        { label: "操作", name: "operate", type: "slot" }
      ];
      this.formItems = [
        {
          name: "regionalName",
          label: "区域名称：",
          placeholder: "请输入关注区域名称"
        },
        {
          name: "regionalType",
          label: "区域类型：",
          type: "select",
          options: [
            { value: "卸货区", label: "卸货区" },
            { value: "1124", label: "AIS" }
          ]
        }
      ];
      this.formRules = {};
    }
  },
  created() {
    this._initCreatedData();
  },
  watch: {
    searchModel: {
      handler(value) {
        console.log(value);
      },
      deep: true
    }
  },
  components: {
    myForm,
    CustomDialog
  }
};
</script>

<style lang="less" scoped>
@h18: .px2vh(18) [ @result];
@h460: .px2vh(460) [ @result];
@h420: .px2vh(420) [ @result];
@h230: .px2vh(230) [ @result];
@h90: .px2vh(90) [ @result];
@h32: .px2vh(32) [ @result];
@h16: .px2vh(16) [ @result];
@h40: .px2vh(40) [ @result];
@h20: .px2vh(20) [ @result];
.main-page{
  margin:.px2vh(-20) [ @result];
  height: 77.5vh;
}
.clearfix{
				*zoom:1
			}
			.clearfix:after{
				visibility: hidden; 
			    display: block; 
			    font-size: 0; 
			    content: " "; 
			    clear: both; 
			    height: 0;
			}
.left_bar {
  width: 20%;
  .area_list {
    height: @h460;
    color: #ffffff;
    .h1 {
      font-size: @h18;
      padding: .px2vh(14) [ @result] 0;
      margin-left: @h18;
    }
    li {
      height: .px2vh(50) [ @result];
      line-height: .px2vh(50) [ @result];
      font-size: .px2vh(16) [ @result];
      cursor: pointer;
      padding-left: 60px;
      background: url("../../../assets/health/ico_area_nor.png") no-repeat 20px
        center;
      &:hover {
        background: #1999d7 url("../../../assets/health/ico_area_hover.png")
          no-repeat 20px center;
        color: #00fcff;
      }
    }
  }
  .rocker {
    width: 100%;
    height: ;
    border-top: 1px solid #0087ff;
    .bg_rocker {
      width: @h230;
      height: @h230;
      border-radius: 50%;
      background: #4371f7;
      margin: 0 auto;
      margin-top: @h20;
      margin-bottom: @h20;
      position: relative;
      background-size: @h230 @h230;
      overflow: hidden;
      li {
        cursor: pointer;
        position: absolute;
      }
      .leftup {
        background: url(../../../assets/health/cloud_leftup_nor.png) no-repeat
          center center;
        width: .px2vh(29) [ @result];
        height: .px2vh(29) [ @result];
        background-size: 100%;
        left: .px2vh(42) [ @result];
        top: .px2vh(42) [ @result];
        &:active {
          background: url(../../../assets/health/cloud_leftup_down.png)
            no-repeat center center;
          background-size: 100%;
        }
      }
      .up {
        background: url(../../../assets/health/cloud_up_nor.png) no-repeat
          center center;
        width: .px2vh(39) [ @result];
        height: .px2vh(26) [ @result];
        background-size: 100%;
        left: 50%;
        top: .px2vh(15) [ @result];
        transform: translate(-50%, 0);
        &:active {
          background: url(../../../assets/health/cloud_up_down.png) no-repeat
            center center;
          background-size: 100%;
        }
      }
      .rightup {
        background: url(../../../assets/health/cloud_rightup_nor.png) no-repeat
          center center;
        width: .px2vh(28) [ @result];
        height: .px2vh(29) [ @result];
        background-size: 100%;
        right: .px2vh(42) [ @result];
        top: .px2vh(42) [ @result];
        &:active {
          background: url(../../../assets/health/cloud_rightup_down.png)
            no-repeat center center;
          background-size: 100%;
        }
      }
      .left {
        background: url(../../../assets/health/cloud_left_nor.png) no-repeat
          center center;
        width: .px2vh(26) [ @result];
        height: .px2vh(39) [ @result];
        background-size: 100%;
        top: 50%;
        left: .px2vh(15) [ @result];
        transform: translate(0, -50%);
        &:active {
          background: url(../../../assets/health/cloud_left_down.png) no-repeat
            center center;
          background-size: 100%;
        }
      }
      .center {
        background: url(../../../assets/health/refresh_nor.png) no-repeat center
          center;
        width: .px2vh(118) [ @result];
        height: .px2vh(119) [ @result];
        background-size: .px2vh(118) [ @result] .px2vh(119) [ @result];
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        &:active {
          background: url(../../../assets/health/refresh_down.png) no-repeat
            center center;
          background-size: .px2vh(118) [ @result] .px2vh(119) [ @result];
        }
      }
      .right {
        background: url(../../../assets/health/cloud_right_nor.png) no-repeat
          center center;
        width: .px2vh(26) [ @result];
        height: .px2vh(39) [ @result];
        background-size: 100%;
        top: 50%;
        right: .px2vh(15) [ @result];
        transform: translate(0, -50%);
        &:active {
          background: url(../../../assets/health/cloud_right_down.png) no-repeat
            center center;
          background-size: 100%;
        }
      }
      .leftdown {
        background: url(../../../assets/health/cloud_leftdown_nor.png) no-repeat
          center center;
        width: .px2vh(29) [ @result];
        height: .px2vh(28) [ @result];
        background-size: 100%;
        left: .px2vh(42) [ @result];
        bottom: .px2vh(42) [ @result];
        &:active {
          background: url(../../../assets/health/cloud_leftdown_down.png)
            no-repeat center center;
          background-size: 100%;
        }
      }
      .down {
        background: url(../../../assets/health/cloud_down_nor.png) no-repeat
          center center;
        width: .px2vh(39) [ @result];
        height: .px2vh(26) [ @result];
        background-size: 100%;
        left: 50%;
        bottom: .px2vh(15) [ @result];
        transform: translate(-50%, 0);
        &:active {
          background: url(../../../assets/health/cloud_down_down.png) no-repeat
            center center;
          background-size: 100%;
        }
      }
      .rightdown {
        background: url(../../../assets/health/cloud_rightdown_nor.png)
          no-repeat center center;
        width: .px2vh(29) [ @result];
        height: .px2vh(28) [ @result];
        background-size: 100%;
        right: .px2vh(42) [ @result];
        bottom: .px2vh(42) [ @result];
        &:active {
          background: url(../../../assets/health/cloud_rightdown_down.png)
            no-repeat center center;
          background-size: 100%;
        }
      }
    }
    .rocker_btn {
      display: flex;
      justify-content: space-around;
      li {
        width: .px2vw(100) [ @result];
        background: url(../../../assets/health/box.png) no-repeat center center;
        background-size: 100% 100%;
        height: .px2vh(50) [ @result];
        overflow: hidden;
        div {
          float: left;
          width: 50%;
          height: 100%;
          cursor: pointer;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: .px2vh(24) [ @result] .px2vh(24) [ @result];
        }
      }
    }
  }
}
.right_bar {
  width: 80%;
  height: 100%;
  border-left: 1px solid #0087ff;
}
.btn_zoomIn {
  background: url(../../../assets/health/btn_zoomIn.png);
  &:hover {
    background: url(../../../assets/health/btn_zoomIn_hover.png);
  }
}
.btn_zoomOut {
  background: url(../../../assets/health/btn_zoomOut.png);
  &:hover {
    background: url(../../../assets/health/btn_zoomOut_hover.png);
  }
}
.btn_nearly {
  background: url(../../../assets/health/btn_nearly.png);
  &:hover {
    background: url(../../../assets/health/btn_nearly_hover.png);
  }
}
.btn_far {
  background: url(../../../assets/health/btn_far.png);
  &:hover {
    background: url(../../../assets/health/btn_far_hover.png);
  }
}
.btn_Saperture {
  background: url(../../../assets/health/btn_small_aperture.png);
  &:hover {
    background: url(../../../assets/health/btn_small_aperture_hover.png);
  }
}
.btn_Baperture {
  background: url(../../../assets/health/btn_big_aperture.png);
  &:hover {
    background: url(../../../assets/health/btn_big_aperture_hover.png);
  }
}
.imgList{
  width:100%;
  display:flex;
  justify-content: space-around;
  li{
    width:.px2vh(100) [ @result];
    position: relative;
    border:1px solid #0087ff;
    &+li{
      margin-left:15px;
    }
    span{
      display:block;
      position: absolute;
      width:.px2vh(30) [ @result];
      height: .px2vh(30) [ @result];;
      right:5px;
      bottom:5px;
      border-radius:50%;
      z-index: 100;
   
      &.front{
        background:url(../../../assets/health/before_processing.png) no-repeat center center;
        background-size:100%;
      }
      &.back{
        background:url(../../../assets/health/after_processing.png) no-repeat center center;
        background-size:100%;
      }
    }
  }
}

.name-btn {

  padding: 6px 10px;
  background: @btnGradient;
  color: #fff;
  text-align: center;
  border: 0px none;
  font-size: @h16;
  border-radius: 4px;
}
.tit {
  font-size: .px2vh(18) [ @result];
  color: #ffffff;
  font-weight: normal;
  margin-left: 15px;
}
.box {
  width: 100%;
  overflow: hidden;
  height: @h460;
}
.w50 {
  width: 50%;
}
.con_box {
  width: 100%;
  box-sizing: border-box;
  border: 5px solid #0087ff;
  position: relative;
  height: @h420;
}
.sub_tit {
  height: @h40;
  background: #09478d;
  color: #ffffff;
  font-size: .px2vh(18) [ @result];
  line-height: @h40;
  margin: 0;
  text-indent: 15px;
}
.lf_border {
  border-left: 1px solid #0087ff;
}
</style>

