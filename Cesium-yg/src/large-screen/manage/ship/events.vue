<template>
    <div class="main-page">
        <div class="page-l fl">
            <div class='map-box pr'>
                <txt s=18 class="pol" w=168 h=39 bc="rgba(0,0,0,0.5)" p="0 0 0 10">定位识别</txt>
                <img-box url="static/img/manage/events_1.png"></img-box>
                <con class="pobr" w=138 h=39 bc="rgba(0,0,0,0.5)">
                    <con pl=9 class="ilm">
                        <img-icon type="tag-ais" class="ilm" w=12 h=13></img-icon>
                        <txt s=16 class="ilm">AIS</txt>
                    </con>
                    <con pl=9 class="ilm">
                        <img-icon type="tag-beidou" class="ilm" w=12 h=13></img-icon>
                        <txt s=16 class="ilm">北斗</txt>
                    </con>
                </con>
            </div>
            <div class='video-box mt15 pr'>
                <txt s=18 class="pol" w=168 h=39 bc="rgba(0,0,0,0.5)" p="0 0 0 10">进出口东侧视频</txt>
                <txt s=18 class="por blackStroke" h=39 r=10 p="0 0 0 10">2019/03/27 10:02:09 星期三</txt>
                <txt s=18 class="pobr blackStroke" h=39 r=10 p="0 0 0 10">进出口东侧 中目球机</txt>
                <img-box url="static/img/manage/dynamic.png"></img-box>
            </div>
        </div>
        <div class="page-r fl">
            <div class='chart-box'>
                <div class="pie-items">
                    <div class="item pr" v-for="(pie, index) in pieItems" :key=index>
                        <div class='inner'>
                            <div class="echart-pie" ref="echartPie"></div>
                            <con class="center pob" m="0 auto" r=0 b=18>
                                <img-icon class="ilm" :type="pie.icon" :w="pie.width||17" :h=20></img-icon>
                                <txt class="ilm" s=18>{{pie.title}}</txt>
                            </con>
                        </div>
                    </div>
                </div>

                <div class="bar mt10" ref="echartBar">
                </div>
            </div>
            <div class='table-box mt15'>
                <con class="pr">
                    <txt size=18>历史航次记录</txt>
                    <con class='por ilt cp'>
                        <img-icon type='export' :w=28 :h=28 class="ilm"></img-icon>
                        <txt class="ilm">导出</txt>
                    </con>
                </con>
                <table-tab class="mt30" :tabs='tableTabs' v-model="activeIndexTable"></table-tab>
                <base-table class="mt10" :headers="headers" :datas='dataList' :tableHeight="260">
                    <template slot-scope="scope" slot='status'>
                        正常
                    </template>
                </base-table>

            </div>
        </div>
    </div>
</template>

<script> 
import viewModule from 'common/mixins/view-module'
import TableTab from 'base/tab/tableTab'
import {getDeviceList} from '@/api/api'
import echarts from "echarts";
import { pieConfig,barConfig } from './events/pieConfig'

export default {
    data() {
        return  {
            mixinViewModuleOptions: {
                getDataListCallBack: getDeviceList, 
                getDataListIsPage: true, 
            },
            ser_model: {
                name: "",
            },
            total: 500,
            pageNum: 1,
            pageSize: 10,
            activeIndexTable: 0,
            pieItems: [
               { title: '进出港总数', icon: 'numbers', sum: '118', ais: '71', beidou: '47', width: 20},
               { title: '今日进港数', icon: 'into', sum: '44', ais: '18', beidou: '26'},
               { title: '今日出港数', icon: 'out', sum: '74', ais: '24', beidou: '50'},
            ]
        }
    },
    mixins: [viewModule],
    methods: {
        drawEchart () {
            
        },
        handleCurrentChange(val) {
            console.log(val)
        },
        handleSearch() {
            console.log(this.ser_model)
        },
        _initCreatedData() {
            this.titles = ['渔船定位设备管理'],
            this.tableTabs = ['全部','未填写进出港报告']
            this.search =  [
                { name: "name", type: "text",placeholder: "船员名"},
            ]
            this.headers = [
                { label: "渔船编号", name: "deviceId"},
                { label: "船名", name: "shipName"},
                { label: "时间", name: "registerTime", },
                { label: "定位设备", name: "deviceType"},
                { label: "状态", name: "status", type: 'slot'},
            ]

        }
    },
    created () {
        this.$nextTick( () => {
            this.pieItems.map((item,index) => {
                this.chart = echarts.init( this.$refs.echartPie[index] )
                let w = window.innerWidth / 1920
                let h = window.innerHeight / 1080
                this.chart.setOption( pieConfig({ sum: item.sum, ais: item.ais, beidou: item.beidou }) )
            })
            
            this.chartBar = echarts.init( this.$refs.echartBar )
            this.chartBar.setOption(barConfig())

        } )
        this._initCreatedData()
        console.log(this.getDataList)
    },
    components: {
        TableTab
    }
}
</script>

<style lang="less" scoped>
@h400: .px2vh(391) [@result];
@h195: .px2vh(195) [@result];
@h185: .px2vh(185) [@result];


.main-page{ 
    height: 100%;
    >div>div{
        height: @h400;border:1px solid @th-border;border-radius:2px;.shadow;
    }
    .page-l{
        width:39%; height: 100%; padding-right:@w15;
        .map-box{
            
        }
        .video-box{
            
        }
    } 
    .page-r{
        width:61%;
        .chart-box{
            border:0px;box-shadow:none;
            .pie-items{
                height:@h195;
                .item{
                    width:33.33%;float:left;padding-right:@w10;height:100%;
                    .inner{
                        height:100%;background:rgba(0,0,0,0.2);padding-bottom:@h30;
                        .echart-pie{
                            height:100%;width:100%;
                        }
                    }
                    &:last-child{
                        padding-right:0;
                    }
                }
            }
            .bar{
                height:@h185; background:rgba(0,0,0,0.2) !important;
            }
        }
        .table-box{
            padding: @h15 @w15;
        }
    } 
}
   
</style>

