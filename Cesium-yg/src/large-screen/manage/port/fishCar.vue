<template>
	<div>
		<div class="top_div">
			<template>
				<span class="left_span">
					<img @click="addOrUpdateHandle()" class="export_img" src="../../../assets/img/0424_03.jpg" />
					<span @click="addOrUpdateHandle()"  class="export_span">&nbsp;&nbsp;新增涉鱼车辆</span>
					<img @click="exportHandle()" class="export_img" src="../../../assets/img/0424_05.jpg" />
					<span @click="exportHandle()"  class="export_span">&nbsp;&nbsp;导出</span>
				</span>
			</template>
		</div>
		<search class="mt20" :data="search" :model="ser_model" @search="getDateList()"></search>
		<base-table class="mt30" :headers="headers" :datas='dataList0' :tableHeight="690">
			<template slot-scope="scope" slot="detail">
				<span class="details"></span>
				<el-button type="text"><span class="export_span">详情</span></el-button>
			</template>
			<template slot-scope="scope" slot="operation">
				<el-button @click="addOrUpdateHandle(scope.row.id)" type="text"><span class="export_span">编辑</span></el-button>
				<el-button @click="deleteHandle(scope.row.id)" type="text"><span class="export_span">删除</span></el-button>
			</template>
		</base-table>
		<div class="bottom_div">
			<div class="block">
				<el-pagination @size-change="pageSizeChangeHandle" @current-change="pageCurrentChangeHandle" :current-page.sync="pageNum" :page-size="5" layout=" pager, next,slot" :total="50">
					<span>共{{total}}页</span>
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	import mixinViewModule from 'common/mixins/view-module'
	import BaseTable from '@/base/baseTable/baseTable'
	import Search from '@/base/search/search'
	export default {
		mixins: [mixinViewModule],
		data() {
			return {
				mixinViewModuleOptions: {
					getDataListURL: '/fishhingPort/fishCar/page', //获取list数据
					deleteURL: '/fishhingPort/fishCar/delete', //删除接口
					getDataListIsPage: true, //分页
					exportURL: '/fishhingPort/fishCar/export', //导出接口
				},
				dataForm: {
					carNumber: '', //车牌号
				},
				dataList: [],
				ser_model: {
					carNumber: "111",
				},
				search: [{
					name: "carNumber",
					type: "text",
					placeholder: "车牌号"
				}, ],
				headers: [],
				dataList0: [{
						picture: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556523310&di=4bc916e180a3fc78f86d8bdaa4c8caae&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.evtimes.cn%2Fuploads%2Fallimg%2F151001%2F14436582101622.jpg",
						carNumber: "粤B-T68X7",
						entryTime: "2019/04/01 09:00:00",
						exitTime: "2019/04/01 10:03:00",
						parkingTime: "03:20:00",
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
			}
		},
		methods: {
			_initCreatedData() {
				this.search = [{
					name: "carNumber",
					type: "text",
					placeholder: "车牌号"
				}, ]
				this.headers = [{
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
					{
						label: "查看详情",
						name: 'detail',
						type: "slot"
					},
					{
						label: "操作",
						name: 'operation',
						type: "slot"
					},
				]
			}
		},
		created() {
			this._initCreatedData()
		},
		components: {
			BaseTable,
			Search,
		}
	};
</script>
<style>
	.block .el-pagination {
		display: flex;
		justify-content: flex-end;
	}
	
	.block .el-pagination,
	.block .el-pager li.btn-quicknext,
	.block .el-pager li.btn-quickprev,
	.block .el-pagination .btn-next,
	.block .el-pagination .btn-prev {
		color: #49d0ec !important;
		font-size: 1.6vh !important;
	}
	
	.block .el-pager li,
	.block .el-pagination .btn-next,
	.block .el-pagination .btn-prev {
		background: #0f2a4c !important;
	}
	
	.block .el-pager li.active {
		color: #ffffff !important;
	}
	
	.details {
		display: inline-block;
		width: 1.3vw;
    	height: 2.4vh;
		background: url("/static/img/report/ico_details.png") no-repeat center bottom;
		float: left;
		margin-top: 17px;
		margin-right: 5px;
	}
	
	.left_span {
		color: #FFFFFF;
		float: right;
	}
	.top_div {
		margin-top:1.0vh;
		margin-left: 1.0vh;
	}
	.export_img {
		color: #FFFFFF;
		width: 1.5vw;
		height: 1.5vw;
	}
	.export_span {
		font-size: 1.5vh;
		display:inline-block
	}
	
	.bottom_div {
		margin-top:1.2vh
	}
</style>