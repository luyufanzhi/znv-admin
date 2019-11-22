<template>
	<div id="countDown">
		<div class="container">
			<h2 v-if="title">{{title}}</h2>
			<div class="titleb" v-text="apre"></div>
			<p class="message" v-if="!area">{{showDay}}{{this.valueList[0]}}时{{this.valueList[1]}}分开始制作</p>
			<div class="timebox">
				<mt-picker :slots="slots" :visibleItemCount="visibleItemCount" :itemHeight="itemHeight"  @change="onValuesChange"></mt-picker>
			</div>
			<div class="buttons">
				<div v-if="isorderSure" class="cancel orders" @touchstart.stop.prevent="cancel">清除</div>
				<div class="cancel" @touchstart.stop.prevent="cancel" v-if="!isorderSure">取消</div>
				<div class="submit" @touchstart.stop.prevent="submit">确定</div>
			</div>
		</div>
	</div>
</template>

<script>
/**
 * Author: lizhuang lizhuang9@huawei.com 2017.10.24
 * 此组件依赖mint-ui的Picker组件，在项目根目录下运行“npm i mint-ui -S”安装依赖包
 * props接收5个参数：
 * defaultNo: 	（INT||Array）默认的倒计时分钟(如：180),或者是时间和分钟的数组，[时,分]
 * title： 		（String）Picker的标题
 * area：		（String）选项列表额范围，其实时间和结束时间"03:25;15:00";两个数据之间用";"分隔;缺省时默认为预约Picker
 * workTime：	（Array）预约功能下的工作时长，[时,分]
 * step: 		（INT）分钟步长，相邻值之间的间隔，默认为1
 * 两个自定义方法：
 * cancel：		取消按钮触发的事件
 * submit：		确认按钮触发的事件，传递值为当前选中数值(格式与defaultNo对应)
 */
import Picker from 'mint-ui/lib/picker';
import 'mint-ui/lib/picker/style.css'
export default {
	props: ['defaultNo',"area","step","title","word",'isorderSure'],
	components: {
		'mt-picker': Picker
	},
	created() {
		if (this.area) {
			let arr = this.area.split(";");
			let arr1 = arr[0].split(":");
			let arr2 = arr[1].split(":");
			this.areaArr = arr1.concat(arr2);
			this.areaArr = this.areaArr.map((item)=>{
				return Number(item)
			})
			this.minuteStep = Number(this.step) || 1;
			var num = Number(this.step) || 1;//step缺省时为1
			for (let i = Number(this.areaArr[0]); i <= this.areaArr[2]; i++) {
				this.slots[0].values.push(i);
			}
			for (let i = 0; i <= 59; i+=this.minuteStep) {
				let it = i >= 10 ? i : "0" + i;
				this.slots[1].values.push(it);
			}
			this.minuteArr = this.slots[1].values;//暂存分钟数组
		}else{
			this.areaArr = [0,23,0,59]
			for (let i = 0; i < 24; i++) {
				let item = i >= 10 ? i : "0" + i;
				this.slots[0].values.push(item);
			}
			for (var i = 0; i < 60; i++) {
				let item = i >= 10 ? i : "0" + i;
				this.slots[1].values.push(item);
			}
			this.minuteArr = this.slots[1].values;//暂存分钟数组
		}

		this.$nextTick(()=>{
			let wrapper = document.getElementsByClassName('picker-slot-wrapper');
			let height1 = wrapper[0].style.height;
			let height2 = wrapper[1].style.height;
			let slot = document.getElementsByClassName('picker-slot');
			let slot1 = slot[0];
			let slot2 = slot[1];
			slot1.style.height = height1;
			slot2.style.height = height2;
			wrapper[0].style.height = 'auto';
			wrapper[1].style.height = 'auto';
		})
	},
	mounted() {
		var style = window.getComputedStyle(document.getElementsByTagName('html')[0],null);
		var FONT_SIZE = style.fontSize.replace('px','');
		this.itemHeight = parseInt(3.6*FONT_SIZE);
		//设置初始值
		this.setDefaultTime();
		//存储所有的item选项，避免多次遍历
		let box1 = document.getElementsByClassName('countDown1');
		this.items1 = box1[0].getElementsByClassName('picker-item')
		var box2 = document.getElementsByClassName('countDown2');
		this.items2 = box2[0].getElementsByClassName('picker-item')
	},
	computed: {
		//将分钟转化“小时-分钟”的显示
		computedTimeArr(){
			if (typeof this.defaultNo === 'object') {
				return this.defaultNo
			}else {
				let hour = Math.floor(this.defaultNo/60);
				let minute = this.defaultNo % 60;
				return [hour,minute];
			}
		},
		showDay(){

			/*if (this.workTime) {
				var addWorkMinute = (minute+this.workTime[1])%60;
				var addWorkHour = (hour+this.workTime[0]+Math.floor((minute+this.workTime[1])/60))%24;
			}else{
				var addWorkMinute = minute;
				var addWorkHour = hour;
			}*/
			var date = new Date();
			var hour = date.getHours();
			var minute = date.getMinutes();
			if(hour > Number(this.valueList[0]) || hour == Number(this.valueList[0]) && minute > Number(this.valueList[1])) {
				return "明天"
			}else {
				return "今天"
			}
		}
	},
	methods: {
		onValuesChange(picker, values) {
			this.valueList = picker.getValues();
			this.areaPicker = picker;
			// console.log(this.valueList)
			if (this.flag && this.valueList[0] !== this.areaArr[0]) {
				// console.log('flag')
				picker.setSlotValue(1,0)
				this.flag = false;
			}
			if(!this.flag && this.valueList[0] === this.areaArr[0]) {
				picker.setSlotValue(1,0)
				this.flag = true;
			}
			if(this.area){
				this.judgeMaxHour(picker)
				// picker.setSlotValue(1,20)
			}

			this.changeColor()
		},
		judgeMaxHour(picker){
			if (this.valueList[0] == this.areaArr[0]) {
				var arr = [];
				for (var i = this.areaArr[1]; i <= 59; i+=this.minuteStep) {
					arr.push(i);
				}
				// this.slots[1].values = arr;
				this.flag = 1;
				picker.setSlotValues(1, arr)
				// this.getMinutes();
			}else if(this.valueList[0] == this.areaArr[2]){
				var arr = [];
				for (var i = 0; i <= this.areaArr[3]; i+=this.minuteStep) {
					arr.push(i);
				}
				// this.slots[1].values = arr;
				picker.setSlotValues(1, arr)

			}else{
				picker.setSlotValues(1, this.minuteArr)
				this.flag = 0;
				// this.slots[1].values = this.minuteArr;
				// picker.setSlotValue(1,40)
				// console.log(this.slots[1].defaultIndex)
				// this.getMinutes();
			}
		},
		deleteCount(){
			this.$emit('deleteCount');
		},
		cancel() {
			this.$emit('cancel');
		},
		submit() {
			if (typeof this.defaultNo === 'object') {
				var sendTime = [];
				sendTime[0] = Number(this.valueList[0]);
				sendTime[1] = Number(this.valueList[1]);
				if (this.workTime) {
					var date = new Date();
					var hour = date.getHours();
					var minute = date.getMinutes();
					var currentTime = hour*60 + minute;
					var workTime = this.workTime[0]*60+this.workTime[1];
					var beiginTime = this.showDay === "明天" ? (sendTime[0]+24)*60+sendTime[1] - workTime : sendTime[0]*60 + sendTime[1] - workTime;
					if (beiginTime-workTime>=currentTime) {
						if (sendTime[1] > this.workTime[1]) {
							sendTime[1] = sendTime[1] - this.workTime[1];
							sendTime[0] = sendTime[0] >= this.workTime[0] ? sendTime[0] - this.workTime[0] : sendTime[0] - this.workTime[0] + 24;
						}else {
							sendTime[1] = sendTime[1] - this.workTime[1] + 60;
							sendTime[0] = sendTime[0] - 1 >= this.workTime[0] ? sendTime[0] - this.workTime[0] - 1 : sendTime[0] - this.workTime[0] + 23;
						}
						sendTime[2] = this.showDay+(this.valueList[0] >= 10?this.valueList[0]:'0'+this.valueList[0])+'时'+(this.valueList[1] >= 10?this.valueList[1]:'0'+this.valueList[1])+'分'
					}else{
						sendTime = 'error'
					}
				}
			}else {
				var sendTime = this.valueList[0] * 60 + Number(this.valueList[1]);
			}
			//将time传递给父组件
			this.$emit('submit', sendTime);
		},
		setDefaultTime() {
			// console.log('setDefaultTime')
			//设置picker中默认选中的状态
			if (typeof this.defaultNo === "object") {
				// console.log(this.computedTimeArr)
				this.slots[0].defaultIndex = this.computedTimeArr[0] - this.areaArr[0];
				// console.log(this.areaArr[1]+"--this.areaArr[1]"+ this.computedTimeArr[1]+" this.computedTimeArr[1]")
				if (this.area) {
					// console.log(this.areaArr)
					if (this.computedTimeArr[0]==this.areaArr[0]) {
					this.slots[1].defaultIndex = (this.computedTimeArr[1] - this.areaArr[1])/this.minuteStep;
					}else {
						this.slots[1].defaultIndex = this.computedTimeArr[1]/this.minuteStep;
					}
				}else{
					this.slots[1].defaultIndex = this.computedTimeArr[1]
				}
				//  console.log("aaaa:"+this.slots[1].defaultIndex)
			}else if (!isNaN(Number(this.defaultNo))) {
				var defaultIndex = (this.computedTimeArr[1]-this.areaArr[2])/this.minuteStep;
				this.slots[1].defaultIndex = defaultIndex;
				this.slots[0].defaultIndex = this.computedTimeArr[0];
			}else {
				this.slots[0].defaultIndex = 0;
				this.slots[1].defaultIndex = 0;
			}
			// this.slots[1].defaultIndex=1
			//  console.log("default:"+this.slots[0].defaultIndex)
		},
		changeColor(){
			// console.log(this.valueList)
			//复位所有的字体颜色
			if (this.items1) {
				for (let i = 0; i < this.items1.length; i++) {
					let item = this.items1[i];
					item.style.color = 'rgba(0,0,0,.5)'
				}
			}
			if (this.items2) {
				for (let i = 0; i < this.items2.length; i++) {
					let item = this.items2[i];
					item.style.color = 'rgba(0,0,0,.5)'
				}
			}
			// 当前选中项的索引
			if (this.valueList[0] === undefined || this.valueList[1] === undefined) return;//防止报错
			var activeIndex1 = this.valueList[0] - this.areaArr[0];
			var items2Num = this.valueList[0] == this.areaArr[0] ? this.areaArr[1] : 0;
			var activeIndex2 = (this.valueList[1]-items2Num)/this.minuteStep;
			// this.items1[activeIndex].innerHTML = this.items1[activeIndex].innerHTML+this.word;
				// 将选中的前两个字体颜色设置为0.3
				if(this.items1[activeIndex1 - 2]){
					this.items1[activeIndex1 - 2].style.color = 'rgba(0,0,0,.3)'
				}
				// 将选中的前两个字体颜色设置为0.3
				if(this.items1[activeIndex2 - 2]){
					this.items2[activeIndex2 - 2].style.color = 'rgba(0,0,0,.3)'
				}

			let time=new Date();
			let h=time.getHours();
			let Minute=time.getMinutes();
			let a=this.items1[activeIndex1].innerHTML
			let b=this.items2[activeIndex2].innerHTML
			if(a>h){
				// TODO: 取出已预约
				this.days=0;
				this.apre='今天'+a+'时'+b+'分开始制作';
			}else if(a==h){
				if(b>=Minute){
					this.days=0;
					this.apre='今天'+a+'时'+b+'分开始制作';
				}else{
					this.days=1;
					this.apre='明天'+a+'时'+b+'分开始制作';
				}
			}else{
				this.days=1;
				this.apre='明天'+a+'时'+b+'分开始制作';
			}
		}
	},
	data() {
		return {
			valueList: [],
			visibleItemCount: 5,
			slots: [
				{
					flex: 1,
					values: [],
					className: 'countDown1',
					textAlign: 'center',
					defaultIndex: -1
				},
				{
					flex: 1,
					values: [],
					className: 'countDown2',
					textAlign: 'center',
					defaultIndex: -1
				}
			],
			apre:'',
		    days:0,
			items1:null,
			items2:null,
			areaArr:null,
			minuteArr:null,
			minuteStep:1,
			itemHeight:0,
			areaPicker:null,
			flag:0
		};
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#countDown {
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top:0;
	background-color: rgba(0, 0, 0, .3);
	z-index: 100;

}
.titleb{
	height: 40px;
	line-height: 40px;
	font-size: 13px;
	color: rgba(0, 0, 0, .5);
	margin: 0 20px;
	border-bottom: 1px solid rgba(0, 0, 0, .1);
}
#countDown .container {
    z-index: 1000;
    position: fixed;
    text-align: center;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    background: #f6f6f6;
    min-height: 10rem;
    border-radius: 1.5rem;
    -webkit-box-shadow: 0 2px 8px rgba(0,0,0,.05), 0 -2px 8px rgba(0,0,0,.05);
    box-shadow: 0 2px 8px rgba(0,0,0,.05), 0 -2px 8px rgba(0,0,0,.05);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-animation: appear 400ms ease-in-out 0ms;
    animation: appear 400ms ease-in-out 0ms;
}

#countDown .container h2 {
	text-align: center;
	font-size: 1.6rem;
	font-weight: 400;
	letter-spacing: 1px;
	line-height: 1.6rem;
	margin: 0;
	padding: 1.6rem 0;
	/*margin-bottom: 20px;*/
	border-bottom: .2rem solid #ccc;
}
#countDown .container .message {
	font-size:1.4rem;
	line-height: 3;
	color:rgba(0,0,0,.5)
}
#countDown .container .timebox {
	padding: 1.6rem 1.6rem 1.6rem;
}

#countDown .container .buttons {
    padding: 1.6rem;
    overflow: hidden;
}

#countDown .container .buttons div {
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
    box-shadow: 0 0 .1rem #b8bbbf;
    outline: 0;
    overflow: hidden;
    position: relative;
    text-align: center;
    box-sizing: border-box;
    display: inline-block;
}


#countDown .container .buttons .cancel{
    width: 48%;
    float: left;
}
#countDown .container .buttons .orders{
   color: red;
}
#countDown .container .buttons .submit{
    width: 48%;
    float: right;
}
#countDown .container .buttons div{
    width: 100%;
    margin-bottom: 1rem;
    letter-spacing: .2rem;
}
.picker-item{
/* 	 height: 3.6rem!important;
  line-height: 3.6rem!important; */
  font-size: 1.8rem;
  letter-spacing: .1rem;
  color: rgba(0,0,0,.5);
}
/* .picker-item::after{
	content: "°C";
	display: inline-block;
} */
.picker-item.picker-selected {
  font-size: 1.9rem;
  color: #0079ff!important;
  line-height: 4.8rem!important;
  height: 4.8rem!important;
}

.picker-item::after {
	font-size: 1.8rem;
	letter-spacing: .1rem;
	/*position: absolute;*/
	display:inline-block;
	margin-right: -0.5rem;
	/* bottom: 0;
	right: 0; */
	/*transform:translateX(100%);*/
}

.countDown1 .picker-item.picker-selected::after {
	content: "时";

}

.countDown2 .picker-item.picker-selected::after {
	content: "分";
/* 	font-size: 11px;
letter-spacing: 1px; */
}
.picker-item.picker-selected+.picker-item+.picker-item{
	color: rgba(0,0,0,.3)!important;
}
.picker-center-highlight:before, .picker-center-highlight:after{
	background-color: rgba(0,0,0,.1)!important;
}
.picker-center-highlight {
  height: 4.8rem!important;
}
 @keyframes appear {
      0% {
          bottom: -100%;
      }
      to {
          bottom: 2rem;
      }
  }
</style>