<template>
    <div>
        <top-items :items='topItems'></top-items>

        <table-tab class="mt30" :tabs='tableTabs' v-model="activeIndexTable"></table-tab>
        <search class="mt20" :data="search" :model="ser_model" @search="handleSearch(1)">></search>
        <base-table class="mt30" :headers="headers" :datas='dataList' :tableHeight="490"></base-table>
        
        <pagination :pageNum="pageNum"
                    :pageSize='pageSize'
                    :total='total'
                    @handleCurrentChange='handleCurrentChange'
                    ></pagination>
    </div>
</template>

<script>
import TableTab from 'base/tab/tableTab'
import Pagination from 'base/pagination/pagination'
import {getBoatList} from '@/api/api'
import TopItems from '@/components/topItems/topItems'
import viewModule from 'common/mixins/view-module'

export default {
    data() {
        return  {
            mixinViewModuleOptions: {
                getDataListCallBack: getBoatList, 
                getDataListIsPage: true, 
            },
            ser_model: {
                name: ""
            },
            tableData: [],
            total: 500,
            pageNum: 1,
            pageSize: 10,
            activeIndexTitle: 0,
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
            this.tableTabs = ['离线设备','设备列表（全部）']
            this.search =  [
                { name: "name",type: "text",placeholder: "船名/类型"}
            ]
            this.headers = [
                { label: "船名", name: "shipName"},
                { label: "检验登记号", name: "NO"},
                { label: "船舶类型", name: "shipType"},
                { label: "船体材料", name: "shipMaterial"},
                { label: "船籍港", name: "homePort"},
                { label: "船龄", name: "age" },
                { label: "船舶所有人", name: "allPerson"},
                { label: "总长（米）", name: "sumLength"},
                { label: "型宽（米）", name: "moldedWidth"},
                { label: "船长（米）", name: "shipLength"},
            ]
            this.topItems = [
                                {   
                                    innerBg: '#2670DF',
                                    items: [
                                        {
                                            type: 0,
                                            m: '0 0 0 50',
                                            text: '本地渔船',
                                            icon: {
                                                type: 'yc-local',
                                                w: 54,
                                                h: 47,
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
                                    items: [
                                        {
                                            type: 0,
                                            m: '0 0 0 50',
                                            text: '外地渔船',
                                            icon: {
                                                type: 'yc-foreign',
                                                w: 54,
                                                h: 47,
                                            }
                                        },
                                        {
                                            type: 1,
                                            data: '44'
                                        }
                                    ],
                                },
                                {   
                                    innerBg: '#ECB745',
                                    items: [
                                        {
                                            type: 0,
                                            m: '0 0 0 50',
                                            text: '港澳流动渔船',
                                            icon: {
                                                type: 'yc-hk',
                                                w: 54,
                                                h: 47,
                                            }
                                        },
                                        {
                                            type: 1,
                                            data: '74'
                                        }
                                    ],
                                }
            ]
        }
    },
    created() {
        this._initCreatedData()
    },
    components: {
        TableTab,
        Pagination,
        TopItems
    }
}
</script>

<style lang="less" scoped>

   @topbg1: #2670DF;
   @topbg2: #3FB2C5;
   @topbg3: #2FB8FF;


   .main-page{
       background:@bluebg;height:100%;width:100%;padding-top:1px;
       .wrapper{
           .top-items{
               margin:.px2vw( -10 )[@result];
               .item{
                   border-radius:5px;position:relative;width:33.33%;float:left;
                   padding:0 .px2vw(10)[@result];box-sizing:border-box;
                   .inner{
                       padding-top:.px2vw(20)[@result];background-color:@topbg1;height:.px2vh(130)[@result];
                       .t-r{
                            width:50%;
                        }
                        .t-l{
                            width: 50%;  
                        }
                        &:last-child{
                            margin-right:0;
                        }
                   }
                   
               }
            }
       }

   }

   
</style>
