<template>
    <div>
       <chart-bar></chart-bar>
       <form-bar></form-bar>
    </div>
</template>

<script>
import BaseTable from 'base/baseTable/baseTable'
import Search from 'base/search/search'
import TableTab from 'base/tab/tableTab'
import Pagination from 'base/pagination/pagination'
import {getDeviceList} from '@/api/api'


// echarts表单
import chartBar from "@/pages/report/chartBar.vue";
//表格
import formBar from "@/pages/report/formBar.vue";

export default {
    data() {
        return  {
            ser_model: {
                name: "111",
            },
            tableData: [],
            total: 500,
            pageNum: 1,
            pageSize: 10,
            activeIndexTable: 0
        }
    },
    methods: {
        handleCurrentChange(val) {
            console.log(val)
        },
        handleSearch() {
            console.log(this.ser_model)
        },
        _getList() {
            getDeviceList().then(data => {
                this.tableData = data
            })
        },
        _initCreatedData() {
            this.titles = ['渔船定位设备管理'],
            this.tableTabs = ['离线设备','设备列表（全部）']
            this.search =  [
                { name: "name", type: "text",placeholder: "渔船编号/船长名"},
            ]
            this.headers = [
                { label: "船名", name: "shipName"},
                { label: "终端ID", name: "deviceId"},
                { label: "终端技术类型", name: "deviceType"},
                { label: "终端厂商", name: "deviceManufacturer"},
                { label: "SIM卡号", name: "simNo"},
                { label: "是否停用", name: "enableStatus" },
                { label: "注册时间", name: "registerTime"},
                { label: "离线时长", name: "offTime"},
                { label: "备注", name: "remrak"},
            ]

            this.topItems = [
                                {   
                                    innerBg: '#2670DF',
                                    leftText: '渔船总数',
                                    rightType: 0, 
                                    leftIcon: {
                                        type: 'numbers',
                                        w: 54,
                                        h: 54,
                                        m: "12 0 0 26"
                                    }, 
                                    rightData: '118'
                                },
                                {   
                                    innerBg: '#3FB2C5',
                                    rightType: 1, 
                                    leftIcon: {
                                        type: 'beidou',
                                        w: 51,
                                        h: 64,
                                        m: "6 0 0 26"
                                    }, 
                                    rightData: [
                                        {text: '北斗在线数', minNo: '21', maxNo: '22'},
                                        {text: '北斗在线数', minNo: '21', maxNo: '22'},
                                    ]
                                },
                                {   
                                    innerBg: '#2FB8FF',
                                    rightType: 1,
                                    leftIcon: {
                                        type: 'ais',
                                        w: 51,
                                        h: 64,
                                        m: "6 0 0 26"
                                    }, 
                                    rightData: [
                                        {text: 'AIS在线数', minNo: '21', maxNo: '22'},
                                        {text: 'AIS在线数', minNo: '21', maxNo: '22'},
                                    ]
                                }
            ]
        }
    },
    created() {
        this._initCreatedData()
        this._getList()
        
    },
    components: {
        BaseTable,
        Search,
        TableTab,
        Pagination,
        chartBar,formBar
    }
}
</script>

