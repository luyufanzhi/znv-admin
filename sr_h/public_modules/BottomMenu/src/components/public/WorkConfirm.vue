<template>
  <div id="confirm">
    <div class="container">
    	<div class="title"><slot>确认启动</slot></div>
        <ul>
            <li>模式：{{area[0]}}</li>
            <li>
             <span>工作时间：</span>{{ area[ 1 ] }}</li>
        </ul>
		<div class="buttons">
			<div class="cancel" @click="cancel">取消</div>
			<div class="submit" @click="submit">开始制作</div>
		</div>
	</div>
  </div>
</template>

<script>
const MIN = "分",
  SEC = "秒";

export default {
  props: ["area"],
  name: "confirm",
  data() {
    return {
      data: []
    };
  },
  created() {
    this.data = this.area;
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    submit() {
      this.$emit("submit");
    }
  },

  filters: {
    time(value) {
      let sec = value % 1,
        res,
        flag = value >= 1;
      value -= sec;
      sec = Math.round(sec * 60);
      res = flag
        ? sec == 0 ? value + MIN : value + MIN + sec + SEC
        : (sec || 0) + SEC;
      return res;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#confirm {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
}
ul,
li {
  list-style: none;
}
ul {
  margin: 1.25rem 0;
  padding-left: 4.2rem;
}
li {
  /*font-weight: 700;*/
  line-height: 2.5rem;
  font-size: 15px;
  height: 2.5rem;
}

#confirm .container {
  padding: 0.9rem 0 1.6rem;
  z-index: 1000;
  position: fixed;
  text-align: left;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  background: #f6f6f6;
  min-height: 5rem;
  border-radius: 1.5rem;
  -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05),
    0 -2px 8px rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05), 0 -2px 8px rgba(0, 0, 0, 0.05);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-animation: actionsheet 400ms ease-in-out 0ms;
  animation: actionsheet 400ms ease-in-out 0ms;
}

#confirm .container .title {
  font-size: 1.8rem;
  text-align: center;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
#confirm .container .buttons {
  padding: 0 1.6rem;
}
#confirm .container .buttons div {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 4rem;
  box-sizing: border-box;
  font-size: 1.5rem;
  font-weight: 600;
  height: 4rem;
  line-height: 4rem;
  display: inline-block;
  vertical-align: top;
  color: #007dff;
  box-shadow: 0 0 1px #b8bbbf;
  outline: 0;
  overflow: hidden;
  position: relative;
  text-align: center;
}

#confirm .container .buttons div:first-child:not(:last-child) {
  width: 48%;
  box-sizing: border-box;
  display: inline-block;
  float: left;
}
#confirm .container .buttons div:last-child:not(:first-child) {
  width: 48%;
  box-sizing: border-box;
  display: inline-block;
  float: right;
}
#confirm .container .buttons div:first-child:last-child {
  width: 100%;
}

@keyframes actionsheet {
  0% {
    bottom: -100%;
  }
  to {
    bottom: 1rem;
  }
}
</style>