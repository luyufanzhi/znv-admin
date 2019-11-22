<template>
  <div class="main-page clearfix">
    <div class="left_bar fl">
      <!-- 区域列表 -->
      <ul class="equip_list">
        <div class="h1">设备树</div>
        <li v-for="(item,key) in equipList" :class="item.isPtz?'ptz':''">{{item.name}}</li>
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
          <div class="con_box add_winmask">
            <div class="win_mask">
              <div class="capture" @click="handleRowClick">
                <img src="static/img/rest/btn_capture.png" alt width="100%">
                <p>抓图</p>
              </div>
            </div>
            
            <video src="static/img/rest/scene1.mp4" width="100%" height="100%"  controls autoplay loop ref="video"></video>
          </div>
        </ul>
        <ul class="fl w50">
          <h6 class="sub_tit lf_border">伏休开始泊位图</h6>
          <div class="con_box">
            <img-box url="static/img/rest/img_2.png"></img-box>
          </div>
        </ul>
      </div>

      <con class="pr mt20">
        <h1 class="tit">告警事件</h1>
        <con class="por ilt cp">
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
        :tableHeight="230"
      >
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

      <custom-dialog
        :is-show.sync="isShowCaptureDialog"
        title="抓图"
        width="80%"
        :isShowTitleLine="true"
      >
        <div>
          <div class="btn_capture">
            <p class="edit">
              编辑
              <i></i>
            </p>
            <p>（将红色圈拖入截图中标记）</p>
          </div>

          <div class="box">
            <ul class="fl w50">
              <h6 class="sub_tit">实时截图</h6>
              <div class="con_box" ref='captureImg'>
                <img :url=captureImgUrl></img>
              </div>
            </ul>
            <ul class="fl w50">
              <h6 class="sub_tit lf_border">伏休开始泊位图</h6>
              <div class="con_box">
                <img-box url="static/img/rest/img_2.png"></img-box>
              </div>
            </ul>
          </div>
          <my-form
            :formItems="formItems"
            :model="formModel"
            @handleSubmit="handleSubmit"
            :rules="formRules"
            :formBtns="formBtns"
            class="mr40"
          ></my-form>
        </div>
      </custom-dialog>
    </div>
  </div>
</template>

<script>
import { getRestList } from "@/api/api";
import viewModule from "common/mixins/view-module";
import CustomDialog from "base/dialog/customDialog";
import myForm from "base/myForm/myForm";

export default {
  data() {
    return {
      equipList: [
        { name: "全景球机", isPtz: true },
        { name: "东区枪机", isPtz: false },
        { name: "中区枪机", isPtz: false },
        { name: "西区枪机", isPtz: false }
      ],
      mixinViewModuleOptions: {
        getDataListCallBack: getRestList, //获取list数据
        getDataListIsPage: true //分页
      },
      dataForm: {
        name: ""
      },
      isShowCaptureDialog: false,
      formModel: {
        remark: ""
      },
      captureImgUrl: "",
    };
  },
  mixins: [viewModule],
  methods: {
    handleRowClick() {
      this.isShowCaptureDialog = true;
      this._setCapture()
    },
    _setCapture() {
      let video = this.$refs.video;

      //let output = this.$refs.output;
      let canvas = document.createElement("canvas");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);

      // output.appendChild(canvas)

      var img = document.createElement("img");
      img.src = canvas.toDataURL("image/png");
      img.style.width = "100%"
      img.style.height = "100%"

      this.$nextTick(() => {
        this.$refs.captureImg.innerHTML = "";
        this.$refs.captureImg.appendChild(img)
      })
    },
    handleSubmit() {},
    _initCreatedData() {
      this.headers = [
        { label: "通知时间", name: "noticeTime" },
        { label: "描述", name: "describe" },
        { label: "触发事件责任人", name: "eventPerson" },
        { label: "查看详情", type: "detail" }
      ];
      this.formItems = [
        {
          name: "remark",
          label: "描述：",
          placeholder: "请输入通知描述"
        }
      ];
      this.formRules = {};
      this.formBtns=[
          {text:"取消",class:"inline"},
          {text:"保存",class:"inline"}

      ];
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
    CustomDialog,
    myForm
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
.main-page {
  margin: .px2vh(-20) [ @result];
  height: 77.5vh;
}
.clearfix {
  *zoom: 1;
}
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
.left_bar {
  width: 20%;
  .equip_list {
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
      background: url("../../../assets/rest/ico_camera_nor.png") no-repeat 20px
        center;
      &:hover {
        background: #1999d7 url("../../../assets/rest/ico_camera_hover.png")
          no-repeat 20px center;
        color: #00fcff;
      }
      &.ptz {
        background: url("../../../assets/rest/ico_PtzCamera_nor.png") no-repeat
          20px center;
        &:hover {
          background: #1999d7
            url("../../../assets/rest/ico_PtzCamera_hover.png") no-repeat 20px
            center;
          color: #00fcff;
        }
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
.imgList {
  width: 100%;
  display: flex;
  justify-content: space-around;
  li {
    width: .px2vh(100) [ @result];
    position: relative;
    border: 1px solid #0087ff;
    & + li {
      margin-left: 15px;
    }
    span {
      display: block;
      position: absolute;
      width: .px2vh(30) [ @result];
      height: .px2vh(30) [ @result];
      right: 5px;
      bottom: 5px;
      border-radius: 50%;
      z-index: 100;

      &.front {
        background: url(../../../assets/health/before_processing.png) no-repeat
          center center;
        background-size: 100%;
      }
      &.back {
        background: url(../../../assets/health/after_processing.png) no-repeat
          center center;
        background-size: 100%;
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
  border: 1px solid #0087ff;
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
.add_winmask {
  cursor: pointer;
  .win_mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
    display: none;
    z-index: 100;
    .capture {
      width: .px2vh(100) [ @result];
      height: .px2vh(126) [ @result];
      z-index: 101;
      position: absolute;
      bottom: 18px;
      left: 50%;
      transform: translate(-50%, 0);
      text-align: center;
      p {
        color: #ffffff;
        font-size: .px2vh(18) [ @result];
        line-height: 1;
        margin-top: 10px;
      }
    }
  }
  &:hover {
    .win_mask {
      display: block;
    }
  }
}
.btn_capture {
  overflow: hidden;
  margin-bottom:10px;
  p {
    float: left;
    line-height:.px2vh(40) [ @result];
    overflow: hidden;
    color:#777777;
    &:first-child {
      width: .px2vw(125) [ @result];
      height: .px2vh(40) [ @result];
      border: 1px solid #2fb8ff;
      font-size: .px2vh(16) [ @result];
      line-height: .px2vh(40) [ @result];
      color: #ffffff;
      border-radius:.px2vh(20) [ @result];
      text-indent:22px;
      box-shadow:inset 0 0 50px #074e81;
      position: relative;
      i{
          display:block;
          width:.px2vh(24) [ @result];
          height:.px2vh(24) [ @result];
          border-radius:50%;
          border:3px dashed #ff0000;
          cursor: pointer;
          position: absolute;
          top:50%;
          right:10px;
          transform:translate(0,-50%);
      }
    }
  }
}
.mr40{
    margin-right:.px2vw(-40) [ @result];
    margin-left:.px2vw(-20) [ @result];
    margin-top:15px;
}
.btn_win{
    display: inline-block;
    background:red !important;
}

</style>

