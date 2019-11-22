<template>
    <div>
        <top-items :items='topItems'></top-items>

        <con class="pr mt40">
            <search :data="search" :model="ser_model" @search="handleSearch()"></search>
            <con class='por ilt cp'>
                <con class="ilm" @onClick="isShowFormDialog=true">
                    <img-icon type='news' :w=24 :h=24 class="ilm" m="5 0 0 0"></img-icon>
                    <txt class="ilm">新建</txt>
                </con>
                <con class="ilm" m="0 0 0 10">  
                    <img-icon type='export' :w=28 :h=28 class="ilm"></img-icon>
                    <txt class="ilm">导出</txt>
                </con>
            </con>
        </con>
        
        <base-table class="mt30" :headers="headers" :datas='dataList' :tableHeight="530">
            <template slot-scope="scope" slot="nameList">
                <button type="primary" class="bluebtn" @click="onNameListClick(scope.row)">报名名单</button>
            </template>
            <template slot-scope="scope" slot="operate">
                <button type="primary" class="bluebtn" @click="onNameListClick(scope.row)">开课</button>
            </template>
        </base-table>
        
        <pagination :pageNum="pageNum"
                    :pageSize='pageSize'
                    :total='total'
                    @handleCurrentChange='handleCurrentChange'
                    ></pagination>

        <custom-dialog :is-show.sync="isShowDialog" width="80%" title="报名名单" :isShowTitleLine=true>
            <con class="pr">
                <search :data="search" :model="ser_model" @search="handleSearch()"></search>
                <con class='por ilt cp'>
                    <con class="ilm" m="0 0 0 10">
                        <img-icon type='export' :w=28 :h=28 class="ilm"></img-icon>
                        <txt class="ilm">导出</txt>
                    </con>
                </con>
            </con>
            <base-table class="mt20 nameList-table" :headers="nameListHeaders" :datas='nameListData' :tableHeight="490"></base-table>
        </custom-dialog>

        <custom-dialog :is-show.sync="isShowFormDialog" title='新建'>
                 <my-form :formItems="formItems"
                        :model="formModel"
                        @handleSubmit="handleSubmit"
                        :labelWidth=200
                        :rules='formRules'></my-form> 
        </custom-dialog>
    </div>
</template>

<script>
import viewModule from 'common/mixins/view-module';
import TableTab from 'base/tab/tableTab';
import { getTrainList, getTrainNameListList } from '@/api/api';
import TopItems from '@/components/topItems/topItems';
import CustomDialog from "base/dialog/customDialog";
import MyForm from 'base/myForm/myForm'

export default {
    data() {
        return  {
            mixinViewModuleOptions: {
                getDataListCallBack: getTrainList, 
                getDataListIsPage: true, 
            },
            ser_model: {
                name: "",
            },
            total: 500,
            pageNum: 1,
            pageSize: 10,
            activeIndexTable: 0,
            isShowDialog: false,
            nameListData: [],
            isShowFormDialog: false,
            formModel: {
                name: '',
                address: '',
                content: '',
                signEndTime: '',
                time: '',
                count: ""
            }
        }
    },
    mixins: [viewModule],
    methods: {
        handleSubmit() {

        },
        onAdd() {

        },
        onNameListClick() {
            this.isShowDialog = true
            getTrainNameListList().then(data => {
                console.log(data)
                this.nameListData = data
            })
        },
        handleCurrentChange(val) {
            console.log(val)
        },
        handleSearch() {
            console.log(this.ser_model)
        },
        _initCreatedData() {
            this.titles = ['渔船定位设备管理'],
            this.tableTabs = ['全部','即将过期','已过期']
            this.search =  [
                { name: "name", type: "text",placeholder: "培训课程"},
                { name: "type", type: "select",placeholder: "培训类型",
                    options: [
                        { value: '四级', label:'1' },
                        { value: '六级', label:'2' }
                    ]
                },
                { name: "time", type: "startAndEndDate",placeholder: "培训时间"},
                { name: "status", type: "select",placeholder: "状态", 
                    options: [
                        { value: '未开课', label:'1' },
                        { value: '已开课', label:'2' }
                    ]
                },
            ]
            this.headers = [
                { label: "培训课程", name: "course"},
                { label: "预报名截止时间", name: "time"},
                { label: "培训时间", name: "time2"},
                { label: "报名人数", name: "count", width: 50},
                { label: "地点", name: "address", },
                { label: "内容", name: "content", },
                { label: "培训类型", name: "type", },
                { label: "备注", name: "remark"},
                { label: "状态", name: "status", width: 50},
                { label: "名单详情", name: "nameList", type:'slot'},
                { label: "操作", name: "operate", type: 'slot'},
            ]

            this.formItems = [
                { name: "name", label: "名称", type: "text" },
                { name: "signEndTime", label: "预报名截止时间", type: "date" },
                { name: "time", label: "培训时间", type: "date" },
                { name: "address", label: "地点", type: "text" },
                { name: "content", label: "内容", type: "text" },
                { name: "count", label: "开课人数下限", type: "text" },
                { name: "type", label: "培训类型", type: "select" },
                { name: "remark", label: "备注", type: "select" },
            ]
            this.formRules = {
                startTime: [
                    { required: true, message: " ", trigger: "blur" }
                ],
                endTime: [
                    { required: true, message: " ", trigger: "blur" }
                ]
            }

            this.topItems = [
                                {   
                                    innerBg: '#2FB8FF',
                                    items: [
                                        {
                                            type: 2,
                                            percent: '0.54',
                                            m: '0 0 0 40',
                                            pieColor: ['#1A76FF','#BE39FF'],
                                            text: '课程状态'
                                        },
                                        {
                                            type: 3,
                                            m: '32 0 0 0',
                                            icon: {
                                                type:'test',
                                                w: 54,
                                                h: 54,
                                                m: '30 20 0 100'
                                            },
                                            data: [
                                                {text: '计划参加人数', number: '200'},
                                                {text: '实际参加人数', number: '108'},
                                            ]
                                        }
                                    ],
                                },
                                {   
                                    innerBg: '#ECB745',
                                    items: [
                                        {
                                            type: 2,
                                            percent: '0.74',
                                            m: '0 0 0 40',
                                            pieColor: ['#46D687','#32AAFF'],
                                            text: '培训类型'
                                        },
                                        {
                                            type: 3,
                                            m: '32 0 0 0',
                                            icon: {
                                                type:'result',
                                                w: 54,
                                                h: 54,
                                                m: '30 0 0 100'
                                                
                                            },
                                            data: [
                                                {text: '通过培训人数', number: '200'},
                                                {text: '未通过培训人数', number: '108'},
                                            ]
                                        }
                                    ]
                                }
            ]

            this.nameListHeaders = [
                { label: "照片", name: "photo", type:'image', imageWidth: 56,imageHeight:66},
                { label: "姓名", name: "name"},
                { label: "身份证", name: "idCard", width:240},
                { label: "出生日期", name: "birth"},
                { label: "性别", name: "sex"},
                { label: "民族", name: "nation"},
                { label: "籍贯", name: "native"},
                { label: "住址", name: "address"},
                { label: "联系方式", name: "telephone"},
               
            ]
        }
    },
    created() {
        this._initCreatedData()
    },
    components: {
        TableTab,
        TopItems,
        CustomDialog,
        MyForm
    }
}
</script>

<style lang="less" scoped>

/deep/ .nameList-table .el-table {
    tr, thead, th{
        background-color: transparent !important;
    }
}
</style>

