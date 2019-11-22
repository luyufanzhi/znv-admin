<template>
  <div id="confirm">
    <div class="container">
    	<div class="title"><slot>{{name}}</slot></div>
		<div class="buttons">
			<div class="cancel" @click="cancel">否</div>
			<div class="submit" @click="submit">是</div>
		</div>
	</div>
  </div>
</template>

<script>
export default {
  name: 'confirm',
  props:['name'],
  data () {
    return {
    }
  },
  methods:{
  	cancel(){
  		this.$emit("cancel")
  	},
  	submit(){
  		this.$emit("submit")
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.submit{
		color:red !important;
	}
#confirm {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, .3);
	z-index: 100;
}

#confirm .container {
	padding: 24px 1.6rem;
    z-index: 1000;
    position: fixed;
    text-align: left;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    background: #f6f6f6;
    min-height: 5rem;
    border-radius: 1.5rem;
    -webkit-box-shadow: 0 2px 8px rgba(0,0,0,.05), 0 -2px 8px rgba(0,0,0,.05);
    box-shadow: 0 2px 8px rgba(0,0,0,.05), 0 -2px 8px rgba(0,0,0,.05);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-animation: actionsheet 400ms ease-in-out 0ms;
    animation: actionsheet 400ms ease-in-out 0ms;
}

#confirm .container .title {
	font-size: 1.5rem;
	margin-bottom: 24px;
	text-align: center;
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

#confirm .container .buttons div:first-child:not(:last-child){
    width: 48%;
    box-sizing: border-box;
    display: inline-block;
    float: left;
}
#confirm .container .buttons div:last-child:not(:first-child){
    width: 48%;
    box-sizing: border-box;
    display: inline-block;
    float: right;
}
#confirm .container .buttons div:first-child:last-child{
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