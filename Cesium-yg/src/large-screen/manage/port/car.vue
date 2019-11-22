<template>
	<div>
		<div class="left_box">
			<div>
				<span class="ifont12">查询条件</span>
				<span class="ispan1">清空条件</span>
				<my-form    :formItems="searchItems"  class="mt20"
						:model="searchModel"
						:formBtns="formBtns"
						@handleSubmit="handleSubmit"
						:itemSpace=16
						>
				<template slot-scope="scope" slot="color">
					<div class="color-box">
						<span v-for="(item, index) in colors" :key=index :class="{active:colorIndex==index}" @click="onChooseColor(item, index)">
							<i :style="{background: item.color}"></i>
						</span>
					</div>
				</template>
				</my-form>
			</div>
			<div class="car_all">
				<div class="car_left">
					<span class="center">225</span><br />
					<img class="car_src" src="../../../assets/img/0411_03.jpg" />
				</div>
				<div class="car_center">
					<span class="center">124</span><br />
					<img class="car_src" src="../../../assets/img/0411_05.jpg" />
				</div>
				<div class="car_right">
					<span class="center">101</span><br />
					<img class="car_src" src="../../../assets/img/0411_07.jpg" />
				</div>
			</div>
		</div>
		<div class="form_box">
			<div class="top_div">
				<template>
					<span class="font3">查询结果</span>
					<span class="total_t">{{total}}条</span>
				</template>
			</div>
			<div class="table_cnt">
				<template>
					<div class="els"></div>
					<table-tab class="mt30" :tabs='tableTabs' v-model="activeIndexTable"></table-tab>
					<div class="tab-con">
						<template v-if="activeIndexTable==2">
							<con class="pr mt20">
								<search :data="search" :model="ser_model" @search="handleSearch()"></search>
								<con class='por ilt cp'>
									<img-icon type='export' :w=28 :h=28 class="ilm"></img-icon>
									<txt class="ilm">导出</txt>
								</con>
							</con>
						</template>
						<base-table class="mt30" :headers="headers" :datas='dataList0' :tableHeight="667"></base-table>
					</div>
				</template>
			</div>
			<div style="margin-top:1.2vh">
				<div class="block">
					 <pagination :pageNum="pageNum"
						:pageSize='pageSize'
						:total='total'
						@handleCurrentChange='handleCurrentChange'
						></pagination>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import mixinViewModule from 'common/mixins/view-module'
	import TableTab from '@/base/tab/tableTab'
	import BaseTable from '@/base/baseTable/baseTable'
	import myForm from 'base/myForm/myForm'

	export default {
		mixins: [mixinViewModule],
		data() {
			return {
				activeIndexTable: 0,

				mixinViewModuleOptions: {
					getDataListURL: '/fishhingPort/car/page', //获取list数据
					getDataListIsPage: true, //分页
					exportURL: '/fishhingPort/car/export', //导出接口
				},
				dataForm: {
					carNumber: '', //车牌号
					dateType: '0'
				},
				ser_model: {
					name: "",
				},
				searchModel: {
					number: '',
					color: '',
					lastest: '',
					startTime: '',
					endTime:'',
					type: '',
					carType: "",
					minSpeed: "",
					maxSpeed: ""
				},
				colors: [
					{color:'#5E93FF',id: '1'},
					{color:'#3CD95E',id: '2'},
					{color:'#FFFF00',id: '3'},
					{color:'#000000',id: '4'}
				],
				colorIndex: 0,
				tableTabs: ['全部', '僵尸车', '涉鱼车辆管理'],
				headers: [{
						label: "照片",
						name: "picture",
						type: "image"
					},
					{
						label: "车牌号",
						name: "carNumber"
					},
					{
						label: "驶入时间",
						name: "entryTime"
					},
					{
						label: "驶出时间",
						name: "exitTime"
					},
					{
						label: "停放时间",
						name: "parkingTime"
					},
				],
				pickerOptions: {
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
				options_carType: [{
					value: '0',
					label: '车型1'
				}, {
					value: '1',
					label: '车型2'
				}],
				options_carStyle: [{
					value: '0',
					label: '类型1'
				}, {
					value: '1',
					label: '类型2'
				}],
				options_carColor: [{
					value: '0',
					label: '红'
				}, {
					value: '1',
					label: '黑'
				}],
				dataList: [],
				dataList0: [{
						picture: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556523310&di=4bc916e180a3fc78f86d8bdaa4c8caae&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.evtimes.cn%2Fuploads%2Fallimg%2F151001%2F14436582101622.jpg",
						carNumber: "粤B-T68X7",
						entryTime: "2019/04/01 09:00:00",
						exitTime: "2019/04/01 10:03:00",
						parkingTime: "03:20:00"
					},
					{
						picture: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556523310&di=4bc916e180a3fc78f86d8bdaa4c8caae&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.evtimes.cn%2Fuploads%2Fallimg%2F151001%2F14436582101622.jpg",
						carNumber: "粤B-T68X7",
						entryTime: "2019/04/01 09:00:00",
						exitTime: "2019/04/01 10:03:00",
						parkingTime: "03:20:00"
					},
					{
						picture: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556523310&di=4bc916e180a3fc78f86d8bdaa4c8caae&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.evtimes.cn%2Fuploads%2Fallimg%2F151001%2F14436582101622.jpg",
						carNumber: "粤B-T68X7",
						entryTime: "2019/04/01 09:00:00",
						exitTime: "2019/04/01 10:03:00",
						parkingTime: "03:20:00"
					},
					{
						picture: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556523310&di=4bc916e180a3fc78f86d8bdaa4c8caae&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.evtimes.cn%2Fuploads%2Fallimg%2F151001%2F14436582101622.jpg",
						carNumber: "粤B-T68X7",
						entryTime: "2019/04/01 09:00:00",
						exitTime: "2019/04/01 10:03:00",
						parkingTime: "03:20:00"
					},
					{
						picture: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556523310&di=4bc916e180a3fc78f86d8bdaa4c8caae&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.evtimes.cn%2Fuploads%2Fallimg%2F151001%2F14436582101622.jpg",
						carNumber: "粤B-T68X7",
						entryTime: "2019/04/01 09:00:00",
						exitTime: "2019/04/01 10:03:00",
						parkingTime: "03:20:00"
					},
					{
						picture: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556523310&di=4bc916e180a3fc78f86d8bdaa4c8caae&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.evtimes.cn%2Fuploads%2Fallimg%2F151001%2F14436582101622.jpg",
						carNumber: "粤B-T68X7",
						entryTime: "2019/04/01 09:00:00",
						exitTime: "2019/04/01 10:03:00",
						parkingTime: "03:20:00"
					},
					{
						picture: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556523310&di=4bc916e180a3fc78f86d8bdaa4c8caae&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.evtimes.cn%2Fuploads%2Fallimg%2F151001%2F14436582101622.jpg",
						carNumber: "粤B-T68X7",
						entryTime: "2019/04/01 09:00:00",
						exitTime: "2019/04/01 10:03:00",
						parkingTime: "03:20:00"
					}
				]
			};
		},
		methods: {
			onChooseColor(item, index) {
            	this.colorIndex = index
        	},
			_initCreatedData() {
				this.search = [
					{ name: "name", label: "车牌号码", type: "text", placeholder:'车牌号'},
				]
				this.searchItems = [
					{ name: "number", label: "车牌号码", type: "text" },
					{ name: "color", label: "车辆颜色", type: "slot" },
					{ name: "lastest", label: "", type: "radios",
						options: [
							{value: 'day', label:'最近一天'},
							{value: 'week', label:'最近一周'},
						]
					},
					{ name: "startTime", label: "开始时间", type: "date" },
					{ name: "endTime", label: "结束时间", type: "date" },
					{ name: "car", label: "车型", type: "select",
						options: [
							{value: '1', label:'小卡车'},
							{value: '2', label:'大卡车'},
						]
					},
					{ name: "carType", label: "车辆类型", type: "select",
						options: [
							{value: '1', label:'小汽车'},
							{value: '2', label:'大汽车'},
						]
					},
					{ name: "speed", label: "车速", type: "range" , min: 'minSpeed', max: 'maxSpeed' },
				]
				this.formBtns = [
					{text: '查询', class: 'mt30 full', }
				]
			},
			handleSubmit() {

			}
		},
		created() {
			this._initCreatedData()
		},
		components: {
			TableTab,
			BaseTable,
			myForm
		},
	};
</script>

<style lang="less" scoped>
	@h18: .px2vh(18)[@result];
    @h8: .px2vh(8)[@result];
	@h18: .px2vh(18)[@result];

	.left_box {
		width: 21.6vw;
		height: 74.3vh;
		overflow: hidden;
		float: left;
		border-right: 1px solid #0675d9;
	}

	.form_box {
		width: 73.0vw;
		float: right;
	}
	.color-box{
        padding-top:.6vh;
        span{
            display:inline-block;width:@h30;height:@h30;margin-right:@h8;vertical-align:center;position:relative;cursor:pointer;
            i{
                display:inline-block;width:@h18;height:@h18;.abs;
            }
            &.active{
                border:1px solid #42C3FF;
            }

        }
    }
</style>
<style scoped>
	.el-table__body-wrapper {
		background: #0f2a4c;
	}

	.el-table .cell {
		line-height: 6.6vh;
	}

	.el-tabs__header {
		margin: 0px 0 0px;
	}

	.el-tabs--card>.el-tabs__header {
		border-bottom: 1px solid #0675d9;
	}

	.el-tabs--card>.el-tabs__header .el-tabs__nav {
		border: 1px solid #0f2a4c;
	}

	.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
		border-bottom-color: rgb(15, 42, 76);
		border-left: 1px solid #0675d9;
		border-right: 1px solid #0675d9;
		border-top: 1px solid #0675d9;
	}

	.el-tabs--card>.el-tabs__header .el-tabs__item {
		border-bottom-color: #0675d9;
		border-left: 0px solid #0675d9;
		border-right: 0px solid #0675d9;
		border-top: 0px solid #0675d9;
	}

	.el-tabs__item.is-active {
		color: #FFFFFF;
	}

	.el-tabs__item {
		color: grey;
	}

	.el-tabs__item:hover {
		color: #FFFFFF;
	}

	.mod[data-v-788ef862] {
		padding: 0px !important;
	}

	span {
		color: #FFFFFF;
	}

	.el-pagination {
		display: flex;
		justify-content: flex-end;
	}

	.el-pagination,
	.el-pager li.btn-quicknext,
	.el-pager li.btn-quickprev,
	.el-pagination .btn-next,
	.el-pagination .btn-prev {
		color: #49d0ec !important;
		font-size: 1.6vh !important;
	}

	.el-pager li,
	.el-pagination .btn-next,
	.el-pagination .btn-prev {
		background: #0f2a4c !important;
	}

	.el-pager li.active {
		color: #ffffff !important;
	}

	.speed .el-input {
		width: 5.6vw;
	}

	.el-input--medium .el-input__inner {
		height: 3vh;
		line-height: 3vh;
	}

	.el-input__inner {
		background-color: #10335a;
		border: 1px solid #32aaff;
		color: #FFFFFF;
		box-shadow: 0px 0px 15px #13578f inset;
		border-radius: 2px;
		font-size: 1.3vh;
	}

	.el-radio__inner {
		width: 0.9vw;
		height: 0.9vw;
	}

	.el-date-picker__editor-wrap .el-input {
		width: 140px;
	}

	.el-date-picker__editor-wrap .el-input__inner {
		background-color: #FFFFFF;
		border: 1px solid #32aaff;
		color: #000000;
		box-shadow: 0px 0px 15px #edffff inset;
		border-radius: 2px;
		font-size: 1.3vh;
	}

	.el-form-item__label {
		font-size: 0.7vw;
		line-height: 0.7vw;
		height: 0.7vw;
		color: #72B2FF;
		text-align: justify;
		padding: 0px;
	}

	.el-form-item {
		margin-bottom: -1.7vh;
	}

	.el-form--inline .el-form-item {
		margin-top: 1vh;
	}

	.el-button--default {
		width: 19.7vw;
		height: 3.7vh;
		background: linear-gradient(180deg, rgba(107, 187, 253, 1), rgba(0, 138, 252, 1), rgba(0, 95, 176, 1));
		border-radius: 2px;
		margin-top: 15px;
	}

	.el-date-editor.el-input,
	.el-date-editor.el-input__inner {
		width: 14.6vw;
	}

	.available span {
		color: black;
	}

	.el-select-dropdown__item span {
		color: black;
	}

	.car_left {
		float: left;
		width: 5.9vw;
		height: 10.5vh;
		background: rgba(47, 184, 255, 1);
		border-radius: 5px;
		margin-left: 0.1vw;
	}

	.car_center {
		margin-left: 0.7vw;
		float: left;
		width: 5.9vw;
		height: 10.5vh;
		background: rgba(70, 214, 135, 1);
		border-radius: 5px;
	}

	.car_right {
		margin-left: 0.7vw;
		float: left;
		width: 5.9vw;
		height: 10.5vh;
		background: rgba(236, 183, 69, 1);
		border-radius: 5px;
	}

	.center {
		margin-top: 0.1vh;
		display: -webkit-box;
		-webkit-box-orient: horizontal;
		-webkit-box-pack: center;
		-webkit-box-align: center;
		display: -moz-box;
		-moz-box-orient: horizontal;
		-moz-box-pack: center;
		-moz-box-align: center;
		display: -o-box;
		-o-box-orient: horizontal;
		-o-box-pack: center;
		-o-box-align: center;
		display: -ms-box;
		-ms-box-orient: horizontal;
		-ms-box-pack: center;
		-ms-box-align: center;
		display: box;
		box-orient: horizontal;
		box-pack: center;
		box-align: center;
	}

	.car_src {
		width: 3.6vw;
		height: 7.6vh;
		margin-top: -2vh;
		margin-left: 1.5vw;
	}

	.car_color {
		width: 0.9vw;
		height: 0.9vw;
		cursor: pointer;
		margin-left: 0.2vw;
		margin-top: 0.2vw;
	}

	.car_all {
		margin-top: 8vh;
	}

	.border_style {
		width: 1.4vw;
		height: 1.4vw;
		float: left;
		margin-left: 1.0vw;
		border: 1px solid #5E93FF;
	}

	.el-table .cell {
	    line-height: 7.6vh !important;
	}

	.font12 {
		font-size: 1.2vw;
	}

	.font3 {
		font-size: 3vh;
	}

	.ispan1 {
		margin-bottom: 10px;
		font-size: 0.1vw;
		color: #1DE4E6;
		margin-left: 2px;
	}

	.top_div {
		margin-top:1.0vh;
		margin-left: 1.0vh;
	}

	.img_e {
		float: right;
		color: #FFFFFF;
		width: 1.5vw;
		height: 1.5vw;
	}

	.els {
		width: 1vh;
		height: 1vh;
		float: left;
	}

	.total_t {
		margin-left: 1px;
		font-size: 1.8vh;
	}

	.table_cnt {
		margin-top:2.0vh;
		margin-left: 1.0vh;
		margin-right: 2.0vh;
	}
</style>
