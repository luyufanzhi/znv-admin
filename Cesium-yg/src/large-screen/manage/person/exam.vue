<template>
    <div>
        <top-items :items='topItems'></top-items>

        <con class="pr mt30">
            <search :data="search" :model="ser_model" @search="handleSearch()"></search>
            <con class='por ilt cp'>
                <con class="ilm">
                    <img-icon type='release' :w=24 :h=22 class="ilm"></img-icon>
                    <txt class="ilm">发布考试</txt>
                </con>
                <con class="ilm" m="0 0 0 10">
                    <img-icon type='export' :w=28 :h=28 class="ilm"></img-icon>
                    <txt class="ilm">导出</txt>
                </con>
            </con>
        </con>
        
        <base-table class="mt20" :headers="headers" :datas='dataList' :tableHeight="490">
            <template slot-scope="scope" slot="nameList">
                <button type="primary" class="name-btn" @click="onNameListClick(scope.row)">报名名单</button>
            </template>
        </base-table>
        
        <pagination :pageNum="pageNum"
                    :pageSize='pageSize'
                    :total='total'
                    @handleCurrentChange='handleCurrentChange'
                    ></pagination>

        <custom-dialog :is-show.sync="isShowDialog" width="80%" title="报名名单" :isShowTitleLine=true>
            <con class="pr">
                <search :data="nameListSearch" :model="ser_model" @search="handleSearch()"></search>
                <con class='por ilt cp'>
                    <con class="ilm" m="0 0 0 10">
                        <img-icon type='export' :w=28 :h=28 class="ilm"></img-icon>
                        <txt class="ilm">导出</txt>
                    </con>
                </con>
            </con>
            <base-table class="mt20 nameList-table" :headers="nameListHeaders" :datas='nameListData' :tableHeight="650"></base-table>
        </custom-dialog>
    </div>
</template>

<script>
import viewModule from 'common/mixins/view-module';
import TableTab from 'base/tab/tableTab';
import { getTrainList, getTrainNameListList } from '@/api/api';
import TopItems from '@/components/topItems/topItems';
import CustomDialog from "base/dialog/customDialog";

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
            nameListData: []
        }
    },
    mixins: [viewModule],
    methods: {
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
            this.search =  [
                { name: "name", type: "text",placeholder: "考试课程"},
            ]
            this.nameListSearch =  [
                { name: "name", type: "text",placeholder: "姓名/身份证"},
            ]
            this.headers = [
                { label: "考试课程", name: "course"},
                { label: "考试时间", name: "time"},
                { label: "地点", name: "address", },
                { label: "单位", name: "company"},
                { label: "名单详情", name: "nameList", type:'slot'}
            ]

            this.topItems = [
                                {   
                                    innerBg: '#2FB8FF',
                                    items: [
                                        {
                                            type: 2,
                                            percent: '0.54',
                                            m: '0 0 0 40',
                                            pieColor: ['#1A76FF','#BE39FF'],
                                            text: '参与率'
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
                                    innerBg: '#46D687',
                                    items: [
                                        {
                                            type: 2,
                                            percent: '0.20',
                                            m: '0 0 0 40',
                                            pieColor: ['#FFAB1A','#BE39FF'],
                                            text: '合格率'
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
                                                {text: '通过培训人数', number: '80'},
                                                {text: '未通过培训人数', number: '20'},
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
                { label: "考试结果", name: "result"}
            ]
        }
    },
    created() {
        this._initCreatedData()
    },
    components: {
        TopItems,
        CustomDialog
    }
}
</script>

<style lang="less" scoped>
@h90: .px2vh(90)[@result];
@h32: .px2vh(32)[@result];
@h16: .px2vh(16)[@result];

.name-btn{
    height:@h32;background:@btnGradient;color:#fff;line-height:@h32;text-align:center;
    border:0px none;font-size:@h16;padding:0 @w10;
}
/deep/ .nameList-table .el-table {
    tr, thead, th{
        background-color: transparent !important;
    }
}
</style>

