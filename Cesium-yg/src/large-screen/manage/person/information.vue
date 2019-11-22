<template>
    <div>
        <con class="pr">
            <search :data="search" :model="ser_model" @search="handleSearch()"></search>
            <con class='por ilt cp'>
                <img-icon type='export' :w=26 :h=26 class="ilm"></img-icon>
                <txt class="ilm">导出</txt>
            </con>
        </con>

        <base-table class="mt30" 
                    :headers="headers" 
                    :datas='dataList' 
                    @checkDetail="checkDetail"
                    :tableHeight="800">
            
        </base-table>
        
        <pagination :pageNum="pageNum"
                    :pageSize='pageSize'
                    :total='total'
                    @handleCurrentChange='handleCurrentChange'
                    ></pagination>
    </div>
</template> 


<script>
import {getInformationList} from '@/api/api'
import viewModule from 'common/mixins/view-module'

export default {
    data() {
        return  {
            mixinViewModuleOptions: {
                getDataListCallBack: getInformationList, 
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
        checkDetail(row) {
            console.log(row)
        },
        handleCurrentChange(val) {
            console.log(val)
        },
        handleSearch() {
            console.log(this.ser_model)
        },
        _initCreatedData() {
            this.tableTabs = ['离线设备','设备列表（全部）']
            this.search =  [
                { name: "name",type: "text",placeholder: "姓名/船员编号"}
            ]
            this.headers = [
                { label: "照片", name: "avatar", type:'image', imageWidth: 56, imageHeight: 66, isNeedDefault: true},
                { label: "姓名", name: "name"},
                { label: "船员编号", name: "crewNo"},
                { label: "性别", name: "sex"},
                { label: "管理单位", name: "unit"},
                { label: "住址", name: "address" },
                { label: "查看详情", type: 'detail' },
            ]
        }
    },
    created() {
        this._initCreatedData()
    },
    components: {
    }
}
</script>
