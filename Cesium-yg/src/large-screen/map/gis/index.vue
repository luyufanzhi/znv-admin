<template>
    <wrap class="gis">

        <colum-tab :data="list" v-model="active">

            <!-- 重点关注渔船 -->
            <div slot="slot-0" class="slot">
                <div class="select">
                    <search
                        :data="selectOpt"
                        :model="selectModel"
                        @handleSelectChange="selectChange"></search>
                </div>
                <base-table class="table"
                    :headers="headers"
                    :datas="datas"
                    @handleRowClick="handleRowClick"></base-table>
                <pagination
                    :pageSize="pageSize"
                    :total="total"
                    :pageNum="pageNum"></pagination>
            </div>

            <!-- 敏感水域 -->
            <div slot="slot-1">
                <div class="car clearfix"
                    v-for="( item, index ) in waterData" :key="index"
                    @click="waterClick( index )">

                    <div class="row clearfix">
                        <label for="">水域名称</label>
                        <span>：</span>
                        <div class="txt">{{ item.name }}</div>
                    </div>
                    <div class="row clearfix">
                        <label for="">经纬度</label>
                        <span>：</span>
                        <div class="txt">{{ item.loc }}</div>
                    </div>
                    <div class="row clearfix">
                        <label for="">起始时间</label>
                        <span>：</span>
                        <div class="txt">{{ item.time }}</div>
                    </div>
                    <div class="row clearfix">
                        <label for="">描述</label>
                        <span>：</span>
                        <div class="txt">{{ item.detail }}</div>
                    </div>
                </div>
            </div>

            <!-- 泊位管理 -->
            <div slot="slot-2" class="slot">
                <base-table class="table"
                    :headers="parkHeaders"
                    :datas="parkDatas"
                    @handleRowClick="parkHandleRowClick"></base-table>
                <pagination
                    :pageSize="parkPageSize"
                    :total="parkTotal"
                    :pageNum="parkPageNum"></pagination>
            </div>

            <!-- 事件 -->
            <div slot="slot-3" class="slot">
                <base-table class="table"
                    :headers="eventHeaders"
                    :datas="datas"
                    @handleRowClick="eventHandleRowClick"></base-table>
                <pagination
                    :pageSize="eventPageSize"
                    :total="eventTotal"
                    :pageNum="eventPageNum"></pagination>
            </div>
        </colum-tab>

    </wrap>
</template>

<script>
import mapGetters from 'vuex'
import mixins from 'common/mixins'
import tip from 'common/mixins/tip'

// 地图相关
import CesiumCtl from '../Model/CesiumCtl'
import Entites from '../Model/Entites'
import waterEn from '@map/entity/water'

// 数据类
import ShipPoint from '@map/gis/table/ShipPoint'
import ParkPoint from '@map/gis/table/ParkPoint'
import EventPoint from '@map/gis/table/EventPoint'

// 组件
import ColumTab from 'columTab'
import baseTable from 'baseTable'
import pagination from 'pagination'
import Tip from '../../components/tip'
import Search from 'search'
import Wrap from './wrap'

export default {
    name: 'gis',
    mixins: [ mixins, tip ],
    components: {
        'colum-tab': ColumTab,
        // 'tool': Tool,
        'base-table': baseTable,
        pagination,
        tip: Tip,
        search: Search,
        wrap: Wrap,
    },

    data () {
        return {

            // tab 栏
            list: [ {
                    name: '重点关注渔船',
                }, {
                    name: '敏感水域'
                }, {
                    name: '泊位管理'
                }, {
                    name: '事件'
            } ],

            // 敏感水域数据
            waterData: [ {
                name: 'MG001',
                loc: '北纬19\'23\'东经110\'52\'',
                time: '2019/03/05-2019/04/05',
                detail: '此处为事故多发地带, 伴有油污, 请渔船绕行.'
            }, {
                name: 'MG001',
                loc: '北纬19\'23\'东经110\'52\'',
                time: '2019/03/05-2019/04/05',
                detail: '此处为事故多发地带, 伴有油污, 请渔船绕行.'
            }, {
                name: 'MG001',
                loc: '北纬19\'23\'东经110\'52\'',
                time: '2019/03/05-2019/04/05',
                detail: '此处为事故多发地带, 伴有油污, 请渔船绕行.'
            }, {
                name: 'MG001',
                loc: '北纬19\'23\'东经110\'52\'',
                time: '2019/03/05-2019/04/05',
                detail: '此处为事故多发地带, 伴有油污, 请渔船绕行.'
            }, {
                name: 'MG001',
                loc: '北纬19\'23\'东经110\'52\'',
                time: '2019/03/05-2019/04/05',
                detail: '此处为事故多发地带, 伴有油污, 请渔船绕行.'
            }, {
                name: 'MG001',
                loc: '北纬19\'23\'东经110\'52\'',
                time: '2019/03/05-2019/04/05',
                detail: '此处为事故多发地带, 伴有油污, 请渔船绕行.'
            } ],

            // areaEn: new Entites( {
            //     detail: '敏感水域.'
            // } ),

            // tab 活动索引, 双向绑定.
            active: 0,

            // 重点关注渔船
            headers: [ { // 表头
                label: "船名",
                name: "shipName"
            }, {
                label: "渔船编号",
                name: "No"
            }, {
                label: "定位终端",
                name: "location"
            }, {
                label: "联系方式",
                name: "phone"
            } ],

            datas: [  ],
            listLoading: false,
            pageSize: 10,
            total: 20,
            pageNum: 2,
            selectOpt: [ {
                name: 'wg',
                type: 'select',
                // placeholder: '渔船编号/船长名',
                options: [ {
                    value: 'wg',
                    label: '违规'
                }, {
                    value: 'wg2',
                    label: '违规2'
                } ]
            } ],
            selectModel: {
                wg: 'wg'
            },

            // 泊位管理
            parkHeaders: [ {
                label: "泊位区域名称",
                name: "parkName"
            }, {
                label: "类型",
                name: "type"
            }, {
                label: '泊位数',
                name: 'parkCount'
            }, {
                label: '已占泊位数',
                name: 'parkCounted'
            } ],
            parkDatas: [],
            parkPageSize: 10,
            parkTotal: 30,
            parkPageNum: 2,

            // 事件
            eventHeaders: [ {
                label: "事件名称",
                name: "eventName"
            }, {
                label: "经纬度",
                name: "loc"
            }, {
                label: '类型',
                name: 'type'
            }, {
                label: '备注',
                name: 'detail'
            } ],
            eventDatas: [],
            eventPageSize: 10,
            eventTotal: 30,
            eventPageNum: 2,

            color: [ 87/255, 49/255, 46/255, .7 ],
            selectColor: [ 0, 0, 0, 1 ],
        }
    },

    computed: {
        // type () {
        //     return tipShipFocusOpt.type
        // }
    },

    created () {

        // 判断状态
        let activeIndex = this.$route.query.gisActive
        if ( activeIndex != null ) {
            this.active = +activeIndex
        }

        // 加载表格数据
        // this.$axios.get( '/static/mork/shipData.json' ).then( ( res ) => {
        //     console.log( 'restable:', res )
        //     res.data.forEach( ( item ) => {
        //         this.datas.push( new ShipPoint( null, item ) )
        //     } )
        //     this.listLoading = true
        // } )

        // 模拟用, 先添加点
        CesiumCtl.promise.then( ( viewer ) => {
            this.loadParkData()
            this.loadEventData()
            this.test()
            this.drawArea( this.waterData )
        } )
    },

    activated () {
        this.entites && this.entites.pre()
        this.areaEn && this.areaEn.pre()
    },

    deactivated () {
        this.entites && this.entites.hide()
        this.areaEn && this.areaEn.hide()
    },

    destroyed () {
    },

    watch: {
        // active ( val ) {
        //     if ( val === 1 ) { // 敏感水域
        //         waterEn.show()
        //     }
        // }
    },

    methods: {

        // 功能测试
        test () {
            let nor = '/static/img/large-screen/Panoramic_camera.png'
            let pre = '/static/img/large-screen/camera.png'

            // 22.476367466196237 113.91893439800903 624.7155039813528
            // 22.481683466450587 113.91860510032483 323.91071926817204
            let entity1 = new Cesium.Entity( {
                billboard: {
                    image: nor,
                    width: 20,
                    height: 20
                },
                position : Cesium.Cartesian3.fromDegrees(
                    113.91860510032483,
                    22.481683466450587,
                    323.91071926817204
                )
            } )

            // 22.475142055162454 113.92084385458583 624.7155039796627
            // 22.482255789898012 113.92210785582532 323.91071926513473
            let entity2 = new Cesium.Entity( {
                billboard: {
                    image: nor,
                    width: 20,
                    height: 20
                },
                position : Cesium.Cartesian3.fromDegrees(
                    113.92210785582532,
                    22.482255789898012,
                    323.91071926513473
                )
            } )

            this.entites = new Entites( {
                type: 'shipPoint',
                detail: '渔船位置'
            } )

            this.entites.add( entity1 )
            this.entites.add( entity2 )

            this.entites.click( ( { entity } ) => {
                console.log( 'entity:', entity )
                this.datas.unshift( new ShipPoint( entity, {
                    "shipName": "粤蛇船18028",
                    "No": "89022220",
                    "location": "xxxxxxxxx",
                    "phone": "13602629903"
                } ) )
            } )
        },

        // 获取数据绘制区域
        drawArea ( data ) {
            data.forEach( ( item ) => {

            } )

            let positions = [
                113.91935178526401, 22.4815807633645,
                113.91810002913961, 22.481719176069355,
                113.91822769069954, 22.48110818841796,
                113.91913547683357, 22.480926047508664
            ]

            let entity = new Cesium.Entity( {
                position : Cesium.Cartesian3.fromDegrees(
                    113.9186746624563, 22.481194205373082, -0.29403068066938814
                ),
                label: {
                    text: 'MG001',
                    fillColor: new Cesium.Color( 1, 1, 1, 1 ),
                    show: true,
                    backgroundColor: new Cesium.Color( 7, 32, 69, 0.5 ),
                    horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
                    verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                    // font: '300px',
                },
                polygon: {
                    show: true,
                    height: 1,
                    outline: true,
                    outlineColor : new Cesium.Color( 255/255, 204/255, 0, 1 ),
                    material: new Cesium.Color( ...this.color ),

                    hierarchy: new Cesium.CallbackProperty( () => {
                        return Cesium.Cartesian3.fromDegreesArray( positions )
                    }, false )
                }
            } )

            waterEn.add( entity, true )

            // CesiumCtl.viewer.selectedEntityChanged.addEventListener( () => {
            //     if ( !waterEn.has( CesiumCtl.viewer.selectedEntity ) ) {
            //         waterEn.forEach( ( item ) => {
            //             item.polygon.material = new Cesium.Color( ...this.color )
            //         } )
            //     }
            // } )

            // CesiumCtl.viewer.selectedEntity = entity
        },

        // 敏感水域点击事件
        waterClick ( index ) {
            let entity = CesiumCtl.viewer.selectedEntity = waterEn.get( 0 )
            // entity.polygon.material = new Cesium.Color( ...this.selectColor )
            // CesiumCtl.viewer.selectedEntity = this.entites.get( 0 )
            // console.log( 'entity:', entity )
        },

        // 加载泊位管理表格数据
        loadParkData () {
            this.$axios.get( '/static/mork/parkData.json' ).then( ( res ) => {
                res.data.forEach( ( item ) => {
                    this.parkDatas.push( new ParkPoint( item ) )
                } )
            } )
        },

        // 加载事件数据
        loadEventData () {

            this.$axios.get( '/static/mork/eventData.json' ).then( ( res ) => {
                res.data.forEach( ( item ) => {
                    this.eventDatas.push( new EventPoint( item ) )
                } )
            } )
        },

        // 重点关注行点击
        handleRowClick ( item, index ) {
            item.selected()

            // 提示框
            this.uTipShipFocusOpt( {
                name: item.shipName,
                No: item.No,
                type: this.selectModel.wg
            } )
            this.uTipShip( 'focus' )
        },

        // 重点关注类型变化
        selectChange ( val ) {
            this.selectModel.wg = val.wg
        },

        // 泊位管理行点击事件
        parkHandleRowClick ( val ) {

        },

        // 事件点击事件
        eventHandleRowClick ( val ) {
            this.uTipShip( 'event' )
        }
    }
}
</script>

<style lang="less" scoped>
.gis {
    @car-w: .px2vw( 398 )[ @result ];
    @car-h: .px2vh( 181 )[ @result ];
    padding-left: 2.1vw + @grap-14vw!important;

    // /deep/ .arrow {
    //     left: -2.1vw;
    // }

    .car {
        width: 100%;
        // height: @car-h;
        color: #72B2FF;
        cursor: pointer;

        background: rgba(15,69,133,1);
        border-radius: @radius-5;
        padding: @grap-15vh @grap-15vw;
        padding-bottom: 0;
        margin-bottom: @grap-6vh;

        .row {
            margin-bottom: @grap-15vh;

            label {
                display: inline-block;
                color: #72B2FF;
                float: left;
                // padding-right: 5px;
                // text-align: right;
                width: .px2vw( 80 )[ @result ];
                text-align: justify;
                text-align-last: justify;
                cursor: pointer;
            }
            span {
                float: left;
            }
            .txt {
                color: #fff;
                margin-left: .px2vw( 120 )[ @result ];
            }
        }
    }

    .select {
        height: .px2vh( 32 )[ @result ];
        margin-bottom: @grap-16vh;
    }

    .table {
        // height: .px2vh( 32 )[ @result ];
        flex: 1;
    }

    .page {
        height: .px2vh( 32 )[ @result ];
        margin-top: @grap-16vh;
    }

    .slot {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    /deep/ .el-button.btn_search {
        display: none;
    }

    /deep/ .happy-scroll-container {
        width: 100%!important;
        height: 100%!important;
    }

    /deep/ .happy-scroll-content {
        padding: 0!important;
    }
}
</style>
