<template>
	<div id="temperaturePicker">
		<div class="container">
			<h2 v-if="title">{{title}}</h2>
			<div class="timebox">
				<mt-picker :slots="slots" :visibleItemCount="visibleItemCount" @change="onValuesChange"></mt-picker>
			</div>
			<div class="buttons">
				<div class="cancel" @touchstart.stop.prevent="cancel">取消</div>
				<div class="submit" @touchstart.stop.prevent="submit">确定</div>
			</div>
		</div>
	</div>
</template>

<script>

import Picker from 'mint-ui/lib/picker';
import 'mint-ui/lib/picker/style.css'
export default {
	props: ['defaultNo', 'title', "area", "stepone", "word"],
	created() {
		this.areaArr = this.area
		var numone = Number(this.stepone);
		for (var i = Number(this.areaArr[0]); i <= this.areaArr[1]; i += numone) {
			this.slots[0].values.push(i);
		}
	},
	mounted() {
		//设置初始值
		this.setDefaultTime();
		//存储所有的item选项，避免多次遍历
		let box = document.querySelector('.slot1');
		if (box == null || box.nodeType == null) {
			box = document.getElementsByClassName('slot1')[0];
		}
		// let box1 = document.querySelector('.slot3');
		this.itemmin = box.querySelectorAll('.picker-item');
		// this.items= box1.querySelectorAll('.picker-item');
	},
	methods: {
		onValuesChange(picker, values) {
			if (this.slots[0].values > 0 && this.slots[0].values < 5) {
				picker.setSlotValue(1, values[0]);
			}
			this.valueList = picker.getValues()[0];
			this.changeColor()
		},
		setDefaultTime() {
			//设置picker中默认选中的状态
			if (this.defaultNo) {
				var defaultIndexone = (this.defaultNo[0] - this.areaArr[0]) / this.stepone;
				// var defaultIndextwo = (this.defaultNo[1]-this.areaArr[2])/this.steptwo;
				this.slots[0].defaultIndex = defaultIndexone;
				// this.slots[2].defaultIndex = defaultIndextwo;
				return;
			}
			this.slots[0].defaultIndex = 0;
			// this.slots[2].defaultIndex = 0;
		},
		cancel() {
			this.$emit('cancel');
		},
		submit() {
			//将time传递给父组件
			this.$emit('submit', this.valueList);
		},
		changeColor() {
			//复位所有的字体颜色
			if (this.itemmin) {
				this.itemmin.forEach((item, index) => {
					item.style.color = 'rgba(0,0,0,.5)'
					item.innerHTML = item.innerHTML.replace(this.word[0], '')
				})
			}
			// 当前选中项的索引
			// if (!this.valueList[0]) return;
			var activeIndexmin = (this.valueList - this.areaArr[0]) / this.stepone;
			if (Number.isNaN(activeIndexmin)) return;
			this.itemmin[activeIndexmin].innerHTML = this.itemmin[activeIndexmin].innerHTML + this.word[0];


			if (activeIndexmin - 2 >= 0) {
				// 将选中的前两个字体颜色设置为0.3
				this.itemmin[activeIndexmin - 2].style.color = 'rgba(0,0,0,.3)';
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
					className: 'slot1',
					textAlign: 'right',
					defaultIndex: -1
				}, {
					divider: false,
					content: 'Min',
					className: 'slot2'
				},
			],
			itemmin: null,
			items: null,
			areaArr: null,
			defaultNum: null
		};
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#temperaturePicker {
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, .3);
	z-index: 100;
	top: 0;
	left: 0;
}

#temperaturePicker .container {
	z-index: 1000;
	position: fixed;
	text-align: center;
	bottom: 1rem;
	left: 1rem;
	right: 1rem;
	background: #f6f6f6;
	min-height: 10rem;
	border-radius: 1.5rem;
	-webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, .05), 0 -2px 8px rgba(0, 0, 0, .05);
	box-shadow: 0 2px 8px rgba(0, 0, 0, .05), 0 -2px 8px rgba(0, 0, 0, .05);
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	-webkit-animation: appear 400ms ease-in-out 0ms;
	animation: appear 400ms ease-in-out 0ms;
}

#temperaturePicker .container h2 {
	text-align: center;
	font-size: 1.8rem;
	font-weight: 400;
	letter-spacing: 1px;
	line-height: 1;
	padding: 14px 0;
	/*margin-bottom: 20px;*/
	border-bottom: 2px solid rgba(0, 0, 0, .1);
}

#temperaturePicker .container .timebox {
	padding: 16px 16px 0;
}

#temperaturePicker .container .buttons {
	padding: 1.6rem;
	overflow: hidden;
}



/*#temperaturePicker .container .buttons div {
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
}*/

#temperaturePicker .container .buttons div {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	border-radius: 4rem;
	box-sizing: border-box;
	font-size: 1.5rem;
	height: 4rem;
	line-height: 4rem;
	display: inline-block;
	vertical-align: top;
	color: #007dff;
	background-color: #f6f6f6;
	box-shadow: 1px 1px 1px #ffffff inset;
	border: 1px solid rgba(0, 0, 0, .1);
	outline: 0;
	overflow: hidden;
	position: relative;
	text-align: center;
}

#temperaturePicker .container .buttons div:first-child:not(:last-child) {
	width: 48%;
	box-sizing: border-box;
	display: inline-block;
	float: left;
}

#temperaturePicker .container .buttons div:last-child:not(:first-child) {
	width: 48%;
	box-sizing: border-box;
	display: inline-block;
	float: right;
}

#temperaturePicker .container .buttons div:first-child:last-child {
	width: 100%;
}

.picker-item {
	font-size: 1.6rem;
	padding: 0 10px;
	text-align: center;
	letter-spacing: -0.1rem;
	color: rgba(0, 0, 0, .5);
}

.picker-item.picker-selected {
	font-size: 1.7rem;
	color: #0079ff!important;
	line-height: 48px!important;
	height: 48px!important;
}

.picker-item.picker-selected+.picker-item+.picker-item {
	color: rgba(0, 0, 0, .3)!important;
}

.picker-center-highlight {
	height: 48px!important;
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