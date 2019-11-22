<template>
    <div>
        <top-items :items='topItems'></top-items>

        <table-tab class="mt30" :tabs='tableTabs' v-model="activeIndexTable"></table-tab>
        <search class="mt20" :data="search" :model="ser_model" @search="handleSearch(1)">></search>
        <base-table class="mt30" :headers="headers" :datas='tableData' :tableHeight="490"></base-table>
        
        <pagination :pageNum="pageNum"
                    :pageSize='pageSize'
                    :total='total'
                    @handleCurrentChange='handleCurrentChange'
                    ></pagination>
    </div>
</template>

<script>
import BaseTable from 'base/baseTable/baseTable'
import Search from 'base/search/search'
import TableTab from 'base/tab/tableTab'
import Pagination from 'base/pagination/pagination'
import {getDeviceList} from '@/api/api'
import TopItems from '@/components/topItems/topItems'

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
                                    items: [
                                        {
                                            type: 0,
                                            m: '0 0 0 50',
                                            text: '渔船总数',
                                            icon: {
                                                type: 'numbers',
                                                w: 54,
                                                h: 54,
                                            }
                                        },
                                        {
                                            type: 1,
                                            data: '118'
                                        }
                                    ],
                                },
                                {   
                                    innerBg: '#3FB2C5',
                                    items:[
                                        {
                                            type: 0,
                                            m: '0 0 0 34',
                                            icon: {
                                                type: 'beidou',
                                                w: 51,
                                                h: 64,
                                            }
                                        },
                                        {
                                            type: 1,
                                            m: '20 0 0 60',
                                            data:  [
                                                {text: '北斗在线数', minNo: '21', maxNo: '60'},
                                                {text: '北斗离线数', minNo: '39', maxNo: '60'},
                                            ]
                                        }
                                    ],
                                },
                                {   
                                    innerBg: '#2FB8FF',
                                    items: [
                                         {
                                            type: 0,
                                            m: '0 0 0 35',
                                            icon: {
                                                type: 'ais',
                                                w: 51,
                                                h: 64,
                                                m: "6 0 0 26"
                                            }
                                        },
                                        {
                                            type: 1,
                                            m: '20 0 0 60',
                                            data:  [
                                                {text: 'AIS在线数', minNo: '21', maxNo: '60'},
                                                {text: 'AIS离线数', minNo: '39', maxNo: '60'},
                                            ]
                                        }
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
        TopItems
    }
}
</script>

