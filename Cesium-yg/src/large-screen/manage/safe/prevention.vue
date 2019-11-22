<template>
	<div>
		<chart-bar></chart-bar>
		<table-tab class="mt30" :tabs='tableTabs' v-model="activeIndexTable"></table-tab>
		<search class="mt20" :data="search" :model="ser_model" @search="getDateList()"></search>
		<div class="top_div">
			<template>
				<span class="left_span">
					<img @click="exportHandle()" class="export_img" src="../../../assets/img/ft_0506_02.jpg" />
					<txt class="ilm">添加</txt>
					<img @click="exportHandle()" class="export_img" src="../../../assets/img/0424_05.jpg" />
					<txt class="ilm">导出</txt>
				</span>
			</template>
		</div>
		<base-table class="mt30" :headers="headers" :datas='dataList0' :tableHeight="490" @handleRowClick="handleRowClick">
			<template slot-scope="scope" slot="detail">
				<span class="el-icon-document export_span">详情</span>
			</template>
			<template slot-scope="scope" slot="operation">
				<div class="ibutton">
					<el-button type="success" icon="el-icon-check">确认</el-button>
				</div>
			</template>
		</base-table>
		<pagination :pageNum="pageNum"
                    :pageSize='pageSize'
                    :total='total'
                    @handleCurrentChange='handleCurrentChange'
                    ></pagination>
        <custom-dialog :is-show.sync="isShowFormDialog" title="确认" width="430">
        <my-form
          :formItems="formItems"
          :model="formModel"
          @handleSubmit="handleSubmit"
          :rules="formRules"
        ></my-form>
      </custom-dialog>
	</div>
</template>
<script>
	import mixinViewModule from 'common/mixins/view-module'
	import TableTab from '@/base/tab/tableTab'
	import BaseTable from '@/base/baseTable/baseTable'
	import Search from '@/base/search/search'
	// echarts表单
	import chartBar from './prevention-chartBar.vue';
	import myForm from "base/myForm/myForm";
	import CustomDialog from "@/base/dialog/customDialog";
	export default {
		mixins: [mixinViewModule],
		data() {
			return {
				mixinViewModuleOptions: {
					getDataListURL: '/safe/prevention/page', //获取list数据
					getDataListIsPage: true, //分页
					exportURL: '/safe/prevention/export', //导出接口
				},
				dataForm: {
					notificationType: '', //通知类型
				},
				dataList: [],
				ser_model: {
					notificationType: "0",
				},
				activeIndexTable: 0,
				tableTabs: ['未确认', '已确认安全'],
				search: [],
				headers: [],
				isShowFormDialog: false,
				formModel: {
			        comfireWay: "自动确认",
			        remark: ""
			    },
				dataList0: [{
						shipName: "粤蛇渔18028",
						shipage: "5",
						shipUsername: "吴志伟",
						contact: "13658903411",
						shipRegistryPort: "蛇口",
						haven: "盐田",
						Longitude: "北纬19° 23′东经110° 52′",
						positionStatus: "正常",
					},
					{
						shipName: "粤蛇渔18028",
						shipage: "5",
						shipUsername: "吴志伟",
						contact: "13658903411",
						shipRegistryPort: "蛇口",
						haven: "盐田",
						Longitude: "北纬19° 23′东经110° 52′",
						positionStatus: "正常",
					},
					{
						shipName: "粤蛇渔18028",
						shipage: "5",
						shipUsername: "吴志伟",
						contact: "13658903411",
						shipRegistryPort: "蛇口",
						haven: "盐田",
						Longitude: "北纬19° 23′东经110° 52′",
						positionStatus: "正常",
					},
					{
						shipName: "粤蛇渔18028",
						shipage: "5",
						shipUsername: "吴志伟",
						contact: "13658903411",
						shipRegistryPort: "蛇口",
						haven: "盐田",
						Longitude: "北纬19° 23′东经110° 52′",
						positionStatus: "正常",
					},
					{
						shipName: "粤蛇渔18028",
						shipage: "5",
						shipUsername: "吴志伟",
						contact: "13658903411",
						shipRegistryPort: "蛇口",
						haven: "盐田",
						Longitude: "北纬19° 23′东经110° 52′",
						positionStatus: "正常",
					},
					{
						shipName: "粤蛇渔18028",
						shipage: "5",
						shipUsername: "吴志伟",
						contact: "13658903411",
						shipRegistryPort: "蛇口",
						haven: "盐田",
						Longitude: "北纬19° 23′东经110° 52′",
						positionStatus: "正常",
					}
				]
			}
		},
		methods: {
			handleSubmit() {},
			handleRowClick() {
		      this.isShowFormDialog = true;
		    },
			_initCreatedData() {
				this.search = [{
					name: "dataForm.notificationType",
					type: "text",
					placeholder: "船主/船主名"
				}]
				this.headers = [{
						label: "船名",
						name: "shipName",
					},
					{
						label: "船龄",
						name: "shipage"
					},
					{
						label: "船主姓名",
						name: "shipUsername"
					},
					{
						label: "联系方式",
						name: "contact"
					},
					{
						label: "船籍港",
						name: "shipRegistryPort"
					},
					{
						label: "避风港",
						name: "haven"
					},
					{
						label: "经纬度",
						name: "Longitude"
					},
					{
						label: "定位设备状态",
						name: "positionStatus"
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
				this.formItems = [
			        {
			          name: "comfireWay",
			          label: "确认方式：",
			          type: "select",
			          options: [
			            { value: "自动确认", label: "0" },
			            { value: "手动确认", label: "1" }
			          ]
			        },
			        {
			          name: "remark",
			          label: "备注：",
			          placeholder: "请输入备注"
			        }
			      ];
			    this.formRules = {};
			}
		},
		created() {
			this._initCreatedData()
			this.$nextTick( () => {
	            this.leftchart = echarts.init( this.$refs.leftchart )
	           /* this.centerchart = echarts.init( this.$refs.centerchart )
	            this.rightchart = echarts.init( this.$refs.rightchart )*/
	            this.drawEchart()
	            // 自适应
	            window.addEventListener( 'resize', () => {
	                this.drawEchart()
	                this.chart.resize()
	            } )
	        } )
		},
		components: {
			BaseTable,
			Search,
			TableTab,
			chartBar,
			myForm,
			CustomDialog
		}
	};
</script>
<style>
	.left_span {
		color: #FFFFFF;
		float: right;
		margin-left: 10px;
	}

	.top_div {
		margin-top: -1.0vh;
		margin-left: 1.0vh;
	}

	.export_img {
		color: #FFFFFF;
		width: 1.5vw;
		height: 1.5vw;
	}

	.export_span {
		font-size: 1.5vh;
		font-family: MicrosoftYaHeiLight;
		font-weight: 300;
		color: rgba(0, 252, 255, 1);
		line-height: 1.7vh;
	}

	.ibutton .el-button--success {
		color: #fff;
		background-color: #0087FF;
		border-color: #0087FF;
	}

	.ibutton .el-button--medium {
		padding: 0.8vh 0.5vw;
		font-size: 0.7vw;
		border-radius: 0.2vw;
	}

	.ibutton .el-button--success:focus,
	.el-button--success:hover {
		background: #0087FF;
	}

	.ifont {
		font-size: 1.5vw;
	}
</style>
