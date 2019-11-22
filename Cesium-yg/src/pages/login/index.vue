<template>
  <div class="login-page" :style="{
      transform: scale
    }">
    <div id="login">
			<div class="ring"></div>
			<ul id="container"></ul>
		</div>

    <!--<div class="logo-container">
        &lt;!&ndash; <div class="logo"></div>&ndash;&gt;
        <div class="logo-title">
          <span class="word">多维立体智能管控平台</span>
          &lt;!&ndash;<span class="word">多&nbsp;维&nbsp;立&nbsp;体&nbsp;智&nbsp;能&nbsp;管&nbsp;控&nbsp;平&nbsp;台</span>&ndash;&gt;
          &lt;!&ndash;<span class="english">MULTI-DIMENSIONAL INTELLIGENT CONTROL PLATFORM</span>&ndash;&gt;
        </div>
      </div>-->
    <div class="download" @click="download3DMapComponent">安装地图控件</div>
    <div class="download" @click="downloadVideoComponent">安装视频控件</div>
    <div class="login-form-container">
      <el-form ref="form" :model="form" class="login-form" :rules="rules2">
        <!--<div class="login-title">用户登录</div>-->
        <el-form-item prop="username" class="userNameInput">
          <el-input type="username"
                    placeholder="用户名"
                    v-model="form.username"
                    prefix-icon="icon-input-user">
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="passwordInput">
          <el-input type="password"
                    placeholder="密码"
                    auto-complete="new-password"
                    v-model="form.password"
                    prefix-icon="icon-input-pwd">
          </el-input>
          <div class="el-form-item__error" v-if="loginFailed">{{loginFailedMsg}}</div>
        </el-form-item>
        <el-form-item prop="checkPass" class="check-code">
          <el-input type="text"
                    placeholder="校验码"
                    v-model="form.yzm"
                    ref="code">
          </el-input>
          <div class="code-pic" @click="refreshCode" title="换一换">
            <s-identify :identifyCode="identifyCode"></s-identify>
          </div>
        </el-form-item>
        <el-form-item class="login-btn-item">
          <el-button class="login-btn" @click="login">登录</el-button>
        </el-form-item>
        <div class="remember-password">
          <div class="remember-btn" @click="isRemeberPwd=!isRemeberPwd">
            <span :class="`choose-pic ${isRemeberPwd?'is-choose':''}`"></span>
            <span>记住账户密码</span>
          </div>
        </div>
      </el-form>
    </div>
    <el-dialog
      top="320px"
      width="345px"
      custom-class="znv-dialog-style"
      title="提示"
      :visible.sync="dialogVisible">
      <img src="../../assets/public/ico-info.png" class="alert-icon">
      <span class="installOrNot">未安装视频控件，是否安装？</span>
      <div style="margin-top: 20px">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="downloadVideoComponent">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import $ from 'jquery';
  import Axios from "axios"
  import md5 from "@/libs/md5";
  import identify from '@/components/identifyNew';
  import { getUUID } from '@/utils'

  export default { // 组件
    name: "LoginPage",
    data: function () {
      return {

        screenWidth: "",
        screenHeight: "",

        dialogVisible: false,
        oldUserInfo: {},
        form: {
          username: '',
          password: '',
          yzm: '',
          uuid: ''
        },
        loginFailedMsg: "",
        loginFailed: false,
        isRemeberPwd: false,
        numberValidateForm: {
          age: ''
        },
        screenWidth: '',
        screenHeight: '',
        identifyCodes: "0123456789ahj",
        identifyCode: "",

        ruleForm2: {
          checkPass: ''
        },
        rules2: {
          // checkPass: [
          //   {validator: this.validatePass}
          // ],
          password: [
            {validator: this.validatePassword}
          ],
          username: [
            {validator: this.validateUsername}
          ]
        }
      }
    },
    created: function () {
      this.form.uuid = getUUID();
      this.isRemeberPwd = sessionStorage.getItem( 'isRemeberPwd' ) === 'true' ? true : false;
    },
    mounted: function () { // ajax获取数据

      this.$nextTick( () => {
        this.resize();
      } )
      // this.initTheme();
      window.onresize = function () {
        this.screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
        this.screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
      }.bind(this);

      var self = this;
      if (!self.checkNetviewInstall()) {
        self.dialogVisible = true;
      }
      self.identifyCode = "";
      self.makeCode(self.identifyCodes, 4);
      var userInfo = localStorage.userInfo;
      if (localStorage.isRemeberPwd === "1") {
        if (userInfo) {
          var userParam = JSON.parse(userInfo);
          self.form.username = userParam.userName;
          self.form.password = userParam.password;
          this.oldUserInfo = userParam;
        }
        self.isRemeberPwd = true;
      }
      ;
      $(document).keyup(function (event) {
        if (event.keyCode == 13) {
          self.login();
        }
      });

      /**
       * 添加动画
       */
      this.$nextTick( () => {
        this.createLis();
      } )
    },
    watch: {
      screenWidth: function () {
        this.resize();
      },
      screenHeight: function () {
        this.resize();
      },
      isRemeberPwd ( val ) {
        sessionStorage.setItem( 'isRemeberPwd', val )
      }
    },
    methods: {
      resize: function () {
        let contW = 1920;
        let contH = 1080;
        let cliWidth = document.documentElement.clientWidth || document.body.clientWidth;
        let cliHeight = document.documentElement.clientHeight || document.body.clientHeight;
        let w = cliWidth / contW;
        let h = cliHeight / contH;
        window.appPage = {};
        window.appPage.rateW = w;
        window.appPage.rateH = h;
        window.appPage.w = contW;
        window.appPage.h = contH;
        this.$store.commit( 'transform/SET_W', w )
        this.$store.commit( 'transform/SET_H', h )
      },
      isSpecificSymbol: function (str) {
        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]");
        return pattern.test(str);
      },
      validatePassword: function (rule, value, callback) {
        if (value === '') {
          this.$nextTick(function () {
            $('.passwordInput').removeClass('passwordInput').addClass('passwordInputAlert');
          });
          callback(new Error('密码不能为空'));
        } else if (value.length < 6) {
          this.$nextTick(function () {
            $('.passwordInput').removeClass('passwordInput').addClass('passwordInputAlert');
          });
          callback(new Error('密码不能少于6位'));
        } else {
          this.$nextTick(function () {
            $('.passwordInputAlert').removeClass('passwordInputAlert').addClass('passwordInput');
          });
          callback();
        }
      },
      validateUsername: function (rule, value, callback) {
        if (value === '') {
          this.$nextTick(function () {
            $('.userNameInput').removeClass('userNameInput').addClass('userNameInputAlert');
          });
          callback(new Error('用户名不能为空'));
        } else if (this.isSpecificSymbol(value)) {
          this.$nextTick(function () {
            $('.userNameInput').removeClass('userNameInput').addClass('userNameInputAlert');
          });
          callback(new Error('用户名不能包含特殊符号'));
        } else {
          this.$nextTick(function () {
            $('.userNameInputAlert').removeClass('userNameInputAlert').addClass('userNameInput');
          });
          callback();
        }
      },
      login: function () {
        var self = this;
        this.$refs.form.validate(function (valid) {
          if (valid) {
            self.$http({
              url: self.$http.adornUrl('/sys/login'),
              method: 'post',
              data: self.$http.adornData({
                'username': self.form.username,
                'password': md5(self.form.password),
                'uuid': self.form.uuid,
                'captcha': self.form.yzm
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                sessionStorage.setItem('access_token', data.token)
                // console.log( 'loginData:', data )
                self.$store.state.user.name = self.form.username
                // self.$router.replace({ name: 'home' })
                self.$router.replace( { name: 'map' } )
              } else {
                // self.getCaptcha()
                self.$message.error(data.msg)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      loginOut: function () {
        var self = this;
        Axios.post("/user/logout").then(function (res) {
          var res1 = res.data;
          if (res1.result === 0) {
            self.$router.push('/');
          } else {
            this.$message.warning(res1.remark);
          }
        })
      },
      downloadVideoComponent: function () {
        this.dialogVisible = false;
        window.open("./static/download/ZTENetviewVideoPlugin.exe");
      },
      download3DMapComponent: function () {
        window.open("./static/download/setup7.0.exe");
      },
      forgetPsd: function () {

      },
      randomNum: function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode: function () {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      makeCode: function (o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
        }
        // this.form.yzm = this.identifyCode;
        //  console.log(this.identifyCode);
      },
      validatePass: function (rule, value, callback) {
        // this.form.yzm = this.$refs.code.currentValue;
        if (this.form.yzm === '') {
          this.$nextTick(function () {
            $('.check-code').removeClass('check-code').addClass('check-codeAlert');
          });
          callback(new Error('请输入验证码'));
        } else if (this.form.yzm !== this.identifyCode) {
          this.$nextTick(function () {
            $('.check-code').removeClass('check-code').addClass('check-codeAlert');
          });
          callback(new Error('验证码错误'));
        } else {
          this.$nextTick(function () {
            $('.check-codeAlert').removeClass('check-codeAlert').addClass('check-code');
          });
          callback();
        }
      },
      checkNetviewInstall: function () {
        try {
          var vf = new ActiveXObject("NetViewPlayerAdv.NetViewPlay_web.1");
          return true;
        } catch (err) {
          return false;
        }
      },

      /**
       * 添加动画
       */
      createLis () {
        var oUl = document.getElementById("container");
        var str = "";
        for(var i = 0; i < 36; i++) {
          str += "<li class='circle-container'><span class='circle'></span></li>"
        }
        oUl.innerHTML = str;
      }
    },
    components: {
      's-identify': identify
    },
    computed: {
      scale () {
        let transform = this.$store.state.transform;
        if ( transform.w === -1 || transform.h === -1 ) {
          return 'none';
        }
        return `scale(${transform.w},${transform.h})`
      }
    }
  };
</script>

<style lang="scss">
  @import "../../common/style/mixin.scss";
  @import "../../assets/style/login-animation.css";
  @import "../../assets/style/login.css";
  .login-page {
    margin: 0;
    padding: 0;
    width: 1920px;
    height: 1080px;
    transform-origin: left top;
    // 解决动画黑点的问题
    color: transparent;
    /*background: url("../../assets/loginPage/newloginbg.png") no-repeat top left;*/
    @include znv_bg_img_cover(url("../../assets/loginPage/loginbggif.png"), url("../../assets/loginPage/loginbggif.png"));
    .innerWrapper{
      width: 100%;
      height: 100%;
      @include znv_innerbg_img(url("../../assets/loginPage/newlogininnerbg.png"), url("../../assets/loginPage/newlogininnerbg.png"));
      // background: transparent;
    }
    .alert-icon{
      vertical-align: middle;
    }
    .installOrNot {
      color: $color-font-1-dark;
      /*@include znv-font-color($color-font-1,$color-font-1-dark);*/
      font-size: 18px;
      font-family: "Microsoft YaHei";
    }
    .logo-container {
      position: absolute;
      top: 42px;
      left: 34px;
      width: 500px;
      height: 62px;
      .logo {
        display: inline-block;
        float: left;
        width: 82px;
        height: 62px;
        background: url("../../assets/loginPage/znv-logo.png");
      }
      .logo-title {
        display: inline-block;
        float: left;
        height: 100%;
        margin-left: 10px;
        color: #FFF;
        .word {
          display: block;
          height: 100%;
          font-size: 31px;
          line-height: 62px;
          font-family: "微软雅黑";
        }
        .english {
          display: block;
          margin-top: 5px;
          height: 10px;
          font-size: 14px;
          line-height: 10px;
          font-family: "MyriadPro-Regular";
        }
      }
    }
    .login-form-container {
      width: 650px;
      height: 427px;
      /*padding: 30px;*/
      position: absolute;
      top: 966px;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      /*background: url("../../assets/loginPage/login-container2.png") no-repeat top left;*/
    }
    .login-form {
      width: 100%;
      height: 100%;
      text-align: center;
      /*padding: 0 50px;*/
      .el-form-item{
        margin-bottom: 22px;
      }
      .userNameInput{
        width: 310px;
        display: inline-block;
        @include znv_bg_img(url("../../assets/loginPage/login_input_account.png"), url("../../assets/loginPage/login_input_account.png"));
        .el-form-item__error{
          margin-left: 60px;
          font-size:16px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(248,165,43,1);
        }
        .el-input__inner{
          border: 0px !important;
        }
      }
      .userNameInputAlert{
        width: 310px;
        display: inline-block;
        @include znv_bg_img(url("../../assets/loginPage/Login_input_Account_pre.png"), url("../../assets/loginPage/Login_input_Account_pre.png"));
        .el-form-item__error{
          margin-left: 60px;
          font-size:16px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(248,165,43,1);
        }
        .el-input__inner{
          border: 0px !important;
        }
      }
      .passwordInput{
        width: 310px;
        display: inline-block;
        margin-left: 14px;
        @include znv_bg_img(url("../../assets/loginPage/login_input_password.png"), url("../../assets/loginPage/login_input_password.png"));
        .el-form-item__error{
          margin-left: 60px;
          font-size:16px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(248,165,43,1);
        }
        .el-input__inner{
          border: 0px !important;
        }
      }
      .passwordInputAlert{
        width: 310px;
        display: inline-block;
        margin-left: 14px;
        @include znv_bg_img(url("../../assets/loginPage/Login_input_password_pre.png"), url("../../assets/loginPage/Login_input_password_pre.png"));
        .el-form-item__error{
          margin-left: 60px;
          font-size:16px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(248,165,43,1);
        }
        .el-input__inner{
          border: 0px !important;
        }
      }
    }
    .login-title {
      width: 100%;
      height: 35px;
      margin: 35px 0;
      text-align: center;
      color: #FFF;
      font-size: 31px;
      line-height: 35px;
    }
    .el-form-item__content {
      height: 50px;
      .el-input__inner {
        height: 44px;
        /*border: 1px solid #FFF;
        background-color: #46ADDD;*/
        border: 0px;
        background-color: transparent;
        /*background: url("../../assets/loginPage/login_input_account.png") no-repeat top left;*/
        box-shadow: 0 0 0;
        -webkit-box-shadow: 0 0 0;
        padding-left: 60px;
        font-size:20px;
        font-family:Adobe Heiti Std R;
        font-weight:normal;
        color:rgba(64,159,227,1);
      }
      .el-input__prefix {
        right: auto;
        left: 0;
      }
      .el-button--default:focus, .el-button--default:hover {
        /*background-color: #f19900;*/
        color: #fff;
      }
    }
    .icon-input-user {
      position: absolute;
      left: 20px;
      top: 0;
      width: 25px;
      height: 25px;
      margin: 10px;
      /*background: url("../../assets/loginPage/user.png");*/
      @include znv_bg_img(url("../../assets/loginPage/icon_Account.png"), url("../../assets/loginPage/icon_Account.png"));
    }
    .icon-input-pwd {
      position: absolute;
      left: 20px;
      top: 0;
      width: 25px;
      height: 25px;
      margin: 10px;
      /*background: url("../../assets/loginPage/pwd.png");*/
      @include znv_bg_img(url("../../assets/loginPage/icon_Password.png"), url("../../assets/loginPage/icon_Password.png"));
    }
    .check-code {
      padding-left: 0;
      width: 100%;
      height: 44px;
      .el-form-item__error{
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(248,165,43,1);
        margin-left: 135px;
      }
      .el-input {
        float: left;
        width: 36%;
        margin-left: 81px;
        @include znv_bg_img(url("../../assets/loginPage/login_input_checkcode.png"), url("../../assets/loginPage/login_input_checkcode.png"));
        input{
          font-size: 20px;
          letter-spacing: 10px;
        }
      }
      .el-input__inner {
        padding: 0;
        text-align: center;
        border: 0px !important;
      }
    }
    .check-codeAlert {
      padding-left: 0;
      width: 100%;
      height: 44px;
      .el-form-item__error{
        font-size:16px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(248,165,43,1);
        margin-left: 135px;
      }
      .el-input {
        float: left;
        width: 36%;
        margin-left: 81px;
        @include znv_bg_img(url("../../assets/loginPage/Login_input_Checkcode_pre.png"), url("../../assets/loginPage/Login_input_Checkcode_pre.png"));
        input{
          font-size: 20px;
          letter-spacing: 10px;
        }
      }
      .el-input__inner {
        padding: 0;
        text-align: center;
        border: 0px !important;
      }
    }
    .code-pic {
      display: inline-block;
      float: left;
      margin-left: 19px;
      width: 36%;
      cursor: pointer;
      @include znv_bg_img(url("../../assets/loginPage/Img_jiaoyanma_bg.png"), url("../../assets/loginPage/Img_jiaoyanma_bg.png"));
    }
    .remember-password {
      /*width: 150px;
      height: 30px;*/
      margin-bottom: 20px;
      cursor: pointer;
      .remember-btn {
        display: inline-block;
        /*float: left;*/
        width: 150px;
        height: 100%;
        line-height: 30px;
        font-size: 18px;
        color: #FFF;
      }
      .choose-pic {
        display: inline-block;
        float: left;
        /*margin: 5px;*/
        width: 26px;
        height: 26px;
        background: url("../../assets/loginPage/btn_gou_h.png");
        &.is-choose {
          background: url("../../assets/loginPage/btn_gou.jpg");
        }
      }
    }
    .login-btn-item {
      height: 52px;
      width: 78%;
      margin: 0 auto;
    }
    .login-btn {
      width: 100%;
      height: 52px;
      /*background-color: #F5BE01;*/
      @include znv_innerbg_img(url("../../assets/loginPage/btn_login_new.png"), url("../../assets/loginPage/btn_login_new.png"));
      border-radius: 4px;
      border: 0px !important;
      color: #fff;
      font-size: 20px;
    }
    .download {
      float: right;
      height: 25px;
      line-height: 25px;
      margin-top: 10px;
      margin-right: 10px;
      color: #FFF;
      font-size: 16px;
      padding: 0;
      position: relative;
      margin-left: 40px;
      cursor: pointer;
      &:hover {
        color: #2FB8FD;
      }
      &:before {
        content: " ";
        position: absolute;
        left: -30px;
        width: 25px;
        height: 25px;
      }
    }
    .download:first-of-type{
      &:before{
        @include znv_bg_img(url("../../assets/loginPage/icon_map.png"), url("../../assets/loginPage/icon_map.png"));
      }
    }
    .download:nth-of-type(2){
      &:before{
        @include znv_bg_img(url("../../assets/loginPage/icon_video.png"), url("../../assets/loginPage/icon_video.png"));
      }
    }
    .el-form-item.is-error .el-input__inner {
      border-color: #ff9393;
    }
    .el-form-item__error {
      color: #ff9393;
    }
    .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
      border-color: #fff;
    }
  }
</style>
