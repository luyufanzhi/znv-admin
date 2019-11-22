<template>
    <div>
        <top-items :items='topItems'></top-items>

        <table-tab class="mt30" :tabs='tableTabs' v-model="activeIndexTable"></table-tab>
        <con class="pr mt20">
            <search :data="search" :model="ser_model" @search="handleSearch()"></search>
            <con class='por ilt cp'>
                <img-icon type='export' :w=28 :h=28 class="ilm"></img-icon>
                <txt class="ilm">导出</txt>
            </con>
        </con>
        
        <base-table class="mt30" :headers="headers" :datas='dataList' :tableHeight="490"></base-table>
        
        <pagination :pageNum="pageNum"
                    :pageSize='pageSize'
                    :total='total'
                    @handleCurrentChange='handleCurrentChange'
                    ></pagination>
    </div>
</template>

<script>
import viewModule from 'common/mixins/view-module'
import TableTab from 'base/tab/tableTab'
import {getPersonCertificateList} from '@/api/api'
import TopItems from '@/components/topItems/topItems'

export default {
    data() {
        return  {
            mixinViewModuleOptions: {
                getDataListCallBack: getPersonCertificateList, 
                getDataListIsPage: true, 
            },
            ser_model: {
                name: "",
            },
            total: 500,
            pageNum: 1,
            pageSize: 10,
            activeIndexTable: 0
        }
    },
    mixins: [viewModule],
    methods: {
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
                { name: "name", type: "text",placeholder: "船员名"},
            ]
            this.headers = [
                { label: "证书状态", name: "status", class: 'red'},
                { label: "身份证", name: "idCard"},
                { label: "姓名", name: "name", },
                { label: "证书种类", name: "kind"},
                { label: "证书等级", name: "level"},
                { label: "证书职务", name: "post" },
                { label: "签发机构", name: "organ"},
                { label: "签发官员", name: "official"},
                { label: "签发日期", name: "issueDate"},
                { label: "截止日期", name: "deathDate", class: 'red'}
            ]

            this.topItems = [
                                {   
                                    innerBg: '#2FB8FF',
                                    items: [
                                        {
                                            type: 0,
                                            m: '0 0 0 50',
                                            text: '全部',
                                            icon: {
                                                type: 'all',
                                                w: 54,
                                                h: 54,
                                            }
                                        },
                                        {
                                            type: 1,
                                            m: '32 0 0 30',
                                            data: '556'
                                        }
                                    ],
                                },
                                {   
                                    innerBg: '#ECB745',
                                    items: [
                                        {
                                            type: 0,
                                            m: '0 0 0 50',
                                            text: '即将过期',
                                            icon: {
                                                type: 'clock',
                                                w: 54,
                                                h: 52,
                                            }
                                        },
                                        {
                                            type: 1,
                                            m: '32 0 0 0',
                                            data: '23'
                                        }
                                    ],
                                },
                                {   
                                    innerBg: '#BFBFBF',
                                    items: [
                                        {
                                            type: 0,
                                            m: '0 0 0 28',
                                            text: '已过期',
                                            icon: {
                                                type: 'expired',
                                                w: 54,
                                                h: 54,
                                            }
                                        },
                                        {
                                            type: 1,
                                            m: '32 0 0 0',
                                            data: '12'
                                        }
                                    ]
                                }
            ]
        }
    },
    created() {
        this._initCreatedData()
    },
    components: {
        TableTab,
        TopItems
    }
}
</script>

