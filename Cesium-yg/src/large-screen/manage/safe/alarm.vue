<template>
	<div>
		<chart-bar></chart-bar>
		<div class="top_div">
			<template>
				<span class="left_span">
				<img @click="exportHandle()" class="export_img" src="../../../assets/img/0424_05.jpg" />
				<span @click="exportHandle()" class="export_span">&nbsp;&nbsp;导出</span>
				</span>
			</template>
		</div>
		<search class="mt20" :data="search" :model="ser_model" @search="getDateList()"></search>
		<base-table class="mt30" :headers="headers" :datas='dataList0' :tableHeight="490">
			<template slot-scope="scope" slot="detail">
				<span class="details"></span>
				<el-button @click="addOrUpdateHandle(scope.row.id,true)" type="text"><span class="export_span">详情</span></span></el-button>
			</template>
			<template slot-scope="scope" slot="operation">
				<el-button @click="addOrUpdateHandle(scope.row.id)" type="text"><span class="export_span">编辑</span></el-button>
				<el-button @click="deleteHandle(scope.row.id)" type="text"><span class="export_span">删除</span></el-button>
			</template>
			<template slot-scope="scope" slot="notificationType">
				<span v-if="scope.row.notificationType === '0'">证书过期</span>
				<span v-else-if="scope.row.notificationType === '1'">防台出港</span>
				<span v-else>年检过期</span>
			</template>
		</base-table>
		<div class="bottom_div">
			<div class="block">
				<el-pagination  :current-page.sync="pageNum" :page-size="5" layout=" pager, next,slot" :total="50">
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
	// echarts表单
	import chartBar from './alarm-chartBar.vue';
	export default {
		mixins: [mixinViewModule],
		data() {
			return {
				mixinViewModuleOptions: {
					getDataListURL: '/safe/alarm/page', //获取list数据
					deleteURL: '/safe/alarm/delete', //删除接口
					getDataListIsPage: true, //分页
					exportURL: '/safe/alarm/export', //导出接口
				},
				dataForm: {
					notificationType: '', //通知类型
				},
				dataList: [],
				ser_model: {
					notificationType: "0",
				},
				search: [],
				headers: [],
				dataList0: [{
						notificationType: "0",
						notificationTime: "2019/04/01 09:00:00",
						shipName: "粤蛇渔18029",
						number: "4419002016040005",
						contact: "13790888065",
					},
					{
						notificationType: "1",
						notificationTime: "2019/04/01 09:00:00",
						shipName: "粤蛇渔18029",
						number: "4419002016040005",
						contact: "13790888065",
					},
					{
						notificationType: "2",
						notificationTime: "2019/04/01 09:00:00",
						shipName: "粤蛇渔18029",
						number: "4419002016040005",
						contact: "13790888065",
					},
					{
						notificationType: "0",
						notificationTime: "2019/04/01 09:00:00",
						shipName: "粤蛇渔18029",
						number: "4419002016040005",
						contact: "13790888065",
					},
					{
						notificationType: "0",
						notificationTime: "2019/04/01 09:00:00",
						shipName: "粤蛇渔18029",
						number: "4419002016040005",
						contact: "13790888065",
					},
					{
						notificationType: "0",
						notificationTime: "2019/04/01 09:00:00",
						shipName: "粤蛇渔18029",
						number: "4419002016040005",
						contact: "13790888065",
					},
					{
						notificationType: "0",
						notificationTime: "2019/04/01 09:00:00",
						shipName: "粤蛇渔18029",
						number: "4419002016040005",
						contact: "13790888065",
					}
				]
			}
		},
		methods: {
			_initCreatedData() {
				this.search = [{
					name: "dataForm.notificationType",
					type: "select",
					placeholder: "通知类型"
				}, {
					name: "dataForm.shipName",
					type: "select",
					placeholder: "船名/船主名"
				},{
					name: "dataForm.rangTime",
					type: "startAndEndDateTime",
				},]
				this.headers = [{
						label: "通知类型",
						name: "notificationType",
						type: "slot"
					},
					{
						label: "通知时间",
						name: "notificationTime"
					},
					{
						label: "船名",
						name: "shipName"
					},
					{
						label: "鱼船编号",
						name: "number"
					},
					{
						label: "联系方式",
						name: "contact"
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
			chartBar
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
		color: #ffffff ;
	}
	
	.details {
		display: inline-block;
		width: 1.3vw ;
    	height: 2.4vh ;
		background: url("/static/img/report/ico_details.png") no-repeat center bottom;
		float: left;
		margin-top: 17px ;
		margin-right: 5px ;
	}
	
	.left_span {
		color: #FFFFFF ;
		float: right ;
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