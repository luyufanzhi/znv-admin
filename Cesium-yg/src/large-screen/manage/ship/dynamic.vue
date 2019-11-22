<template>
    <div class="main-page">
        <div class="table-l fl">
            <search :data="search" :model="dataForm" @search="getDataList()">></search>
            <base-table class="mt20"
                        :headers="headers"
                        :listLoading="dataListLoading"
                        :datas='dataList'
                        @handleRowClick="handleRowClick"
                        :tableHeight="700">
                <template  slot-scope="scope" slot="operate">
                    <el-button type="text" size="small">选择</el-button>
                </template>
            </base-table>

            <pagination :pageNum="pageNum"
                        :pageSize='pageSize'
                        :total='total'
                        @handleCurrentChange='handleCurrentChange'
                        ></pagination>

            <custom-dialog :is-show.sync="isShowFormDialog" title="粤蛇渔18029轨迹" width=430>
                <my-form    :formItems="formItems"
                            :model="formModel"
                            @handleSubmit="handleSubmit"
                            :rules='formRules'></my-form>
            </custom-dialog>

        </div>
        <div class="map-r fl">
            <txt s=16 m="73 0 15 0">轨迹回放视频</txt>
            <player-map ref='playerWithMap' ajax="/static/mork/playback.json"></player-map>
        </div>
    </div>
</template>

<script>
import {getDynamicList} from '@/api/api'
import viewModule from 'common/mixins/view-module'
import myForm from 'base/myForm/myForm'
import CustomDialog from 'base/dialog/customDialog'
import PlayerWithMap from 'playerWithMap'

export default {
    data() {
        return  {
            mixinViewModuleOptions: {
					getDataListCallBack: getDynamicList, //获取list数据
					getDataListIsPage: true, //分页
            },
            dataForm: {
                name: "",
            },
            formModel: {
               startTime: '',
               endTime: '',
               positionDevice: '1124',
            },
            isShowFormDialog: false
        }
    },
    mixins: [viewModule],
    methods: {
        handleRowClick() {
            this.isShowFormDialog = true
        },
        handleSubmit() {

        },
        _initCreatedData() {
            this.search =  [
                { name: "name", type: "text",placeholder: "渔船名/渔船编号"},
            ]
            this.headers = [
                { label: "船名", name: "shipName"},
                { label: "渔船编号", name: "shipNo"},
                { label: "定位设备", name: "positionDevice"},
                { label: "轨迹回放", name: "track", type:'icon', iconWidth: 32, iconHeight: 32},
            ]
            this.formItems = [
                { name: "startTime", label: "开始时间", type: "date" },
                { name: "endTime", label: "结束时间", type: "date" },
                { name: "positionDevice", label: "定位终端", type: "select" ,
                    options: [
                        {value: '112', label:'北斗'},
                        {value: '1124', label:'AIS'},
                    ]
                }
            ]
            this.formRules = {
                startTime: [
                    { required: true, message: " ", trigger: "blur" }
                ],
                endTime: [
                    { required: true, message: " ", trigger: "blur" }
                ]
            }
        }
    },
    created() {
        this._initCreatedData()
    },
    watch: {
        searchModel: {
            handler(value){
                console.log(value)
            },
            deep: true
        }
    },
    components: {
        myForm, CustomDialog,
        'player-map': PlayerWithMap
    }
}
</script>

<style lang="less" scoped>
    @h650: .px2vh(650)[@result];

    .table-l{
        width: 49%;
    }
    .map-r{
        width:51%;height:@h650;padding-left:1%;
    }


</style>
