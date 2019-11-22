<template>
	<div>
		<div style="height: 10px;">
			<template>
				<span class="left_span">
					<img  class="export_img" src="../../../assets/img/0424_03.jpg" />
					<span class="export_span">&nbsp;&nbsp;发布</span>
				</span>
			</template>
		</div>
		<table-tab class="mt30" :tabs='tableTabs' v-model="activeIndexTable"></table-tab>
		<search class="mt20" :data="search" :model="ser_model" @search="getDateList()"></search>
		<div class="top_div">
			<template>
				<span class="left_span">
				<img @click="exportHandle()" class="export_img" src="../../../assets/img/0424_05.jpg" />
				<span @click="exportHandle()" class="export_span">&nbsp;&nbsp;导出</span>
				</span>
			</template>
		</div>
		<base-table class="mt30" :headers="headers" :datas='dataList0' :tableHeight="490">
			<template slot-scope="scope" slot="detail">
				<span class="details"></span>
				<el-button @click="addOrUpdateHandle(scope.row.id,true)" type="text"><span class="export_span">详情</span></span></el-button>
			</template>
			<template slot-scope="scope" slot="operation">
				<el-button @click="addOrUpdateHandle(scope.row.id)" type="text"><span class="export_span">编辑</span></el-button>
				<el-button @click="deleteHandle(scope.row.id)" type="text"><span class="export_span">删除</span></el-button>
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
	import TableTab from '@/base/tab/tableTab'
	import BaseTable from '@/base/baseTable/baseTable'
	import Search from '@/base/search/search'
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
				activeIndexTable:0,
				tableTabs:['一般消息','安全消息'],
				search: [],
				headers: [],
				dataList0: [{
						id: "4419002016040005",
						type: "招聘",
						date: "2019/04/01 09:00:00",
						publisher: "李名",
					},
					{
						id: "4419002016040005",
						type: "招聘",
						date: "2019/04/01 09:00:00",
						publisher: "李名",
					},
					{
						id: "4419002016040005",
						type: "招聘",
						date: "2019/04/01 09:00:00",
						publisher: "李名",
					},
					{
						id: "4419002016040005",
						type: "招聘",
						date: "2019/04/01 09:00:00",
						publisher: "李名",
					},
					{
						id: "4419002016040005",
						type: "招聘",
						date: "2019/04/01 09:00:00",
						publisher: "李名",
					},
					{
						id: "4419002016040005",
						type: "招聘",
						date: "2019/04/01 09:00:00",
						publisher: "李名",
					},
					{
						id: "4419002016040005",
						type: "招聘",
						date: "2019/04/01 09:00:00",
						publisher: "李名",
					}
				]
			}
		},
		methods: {
			_initCreatedData() {
				this.search = [{
					name: "dataForm.notificationType",
					type: "select",
					placeholder: "消息类型"
				}]
				this.headers = [{
						label: "消息ID",
						name: "id",
					},
					{
						label: "消息类型",
						name: "type"
					},
					{
						label: "时间",
						name: "date"
					},
					{
						label: "发布人",
						name: "publisher"
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
			TableTab
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
		margin-top:-1.0vh;
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