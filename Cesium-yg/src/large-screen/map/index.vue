<template>
    <div class="map" ref="modHome">

        <!-- 导航栏 -->
        <home-nav ref="nav"></home-nav>

        <!-- 切换模式 -->
        <change-mode></change-mode>

        <!-- 工具栏 -->
        <tool v-show="mapShow"></tool>

        <!-- 提示框 -->
        <tip></tip>
        <ship-focus></ship-focus>
        <ship-event></ship-event>

        <!-- 视角定位 -->
        <location v-show="uToolShow"></location>

        <!-- 用户栏 -->
        <user v-show="uToolShow"></user>

        <!-- 天气 -->
        <weather v-show="uToolShow"></weather>

        <!-- 警告图标 -->
        <el-badge :value="warnCount" type="warning" class="warn-tip" v-show="uToolShow">
            <div class="icon"></div>
        </el-badge>

        <!-- 地图容器 -->
        <znv-map layer></znv-map>

        <!-- 二级页面 -->
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
import mixins from 'common/mixins'
import tip from 'common/mixins/tip'
// import mapGetters from 'vuex'

/* 组件 */
// 首页各个部件
import Nav from '../components/nav' // 导航栏
import Tool from '../components/tool' // 工具栏
import Location from '../components/location' // 视角定位 ?
import Tip from '../components/tip' // 提示框
import User from '../components/user' // 用户
import Weather from '../components/weather' // 用户
import ChangeMode from '../components/change-mode' // 左上角的按钮
import Map from './map'

import CesiumCtl from '@map/Model/CesiumCtl'
// 地图事件
import Rotate from '@map/Event/Rotate'
import Pick from '@map/Event/Coordinate/pick'
import Fly from '@map/Event/Fly'
import Measurement from '@map/Event/Measurement'

// 提示框
import ShipFocus from '../components/tip/ship-focus' // 重点关注渔港提示框
import ShipEvent from '../components/tip/ship-event' // 渔船事件提示框

import '@/icons/iconfont.css' //iconfont

export default {
    name: 'loginPage',
    mixins: [ mixins, tip ],
    components: {
        'home-nav': Nav,
        tool: Tool,
        location: Location,
        tip: Tip,
        user: User,
        weather: Weather,
        'change-mode': ChangeMode,
        'ship-focus': ShipFocus,
        'ship-event': ShipEvent,
        'znv-map': Map,
    },
    props: [  ],

    data () {
        return {
            warnCount: 2, // 右上角警告数量
        }
    },

    computed: {
    },

    update () {
    },

    destroyed () {
        this.uToolShow( true )
        this.uMapShow( false )
        this.uNavShow( true )
    },

    created () {

        CesiumCtl.promise.then( () => {

            // 注册地图事件, 旋转, 滑行等...
            this.registerEvent()
        } )
    },

    mounted () {
    },

    watch: {

        '$route.name': {
            immediate: true,
            handler ( name ) {
                this.uTipShip( '' )
                if ( name === 'map' ) {
                    this.uToolShow( false )
                    this.uMapShow( false )
                    this.uNavShow( true )
                } else {
                    this.uToolShow( true )
                    this.uMapShow( true )
                    this.uNavShow( false )
                }
            }
        }
    },

    methods: {

        // 注册地图事件
        registerEvent () {
            CesiumCtl.register( new Rotate(), ( sensor ) => { // 旋转
                sensor.on( 'rotate:start', () => CesiumCtl.isAnimation = true )
                sensor.on( 'rotate:end', () => CesiumCtl.isAnimation = false )
            } )
            CesiumCtl.register( new Pick(), ( sensor ) => { // 坐标获取
                sensor.on( 'pick', ( event ) => {
                    let msg = `lng: ${event.lng}, lat: ${event.lat}, height: ${event.height}`
                    this.uTipMsg( msg )
                    this.uTipShow( true )
                } )
            } )
            CesiumCtl.register( new Fly(), ( sensor ) => { // 滑行
                sensor.fly( ( event ) => {
                    console.log( 'fly:', event )
                } )
            } )
            CesiumCtl.register( new Measurement(), ( sensor ) => { // 量算
                sensor.on( 'mea:dis', ( event ) => {
                    console.log( '>>> mea:dis:', event )
                } )
                sensor.on( 'mea:area', ( event ) => {
                    console.log( '>>> mea:area:', event )
                } )
            } )
        },
    }
};
</script>

<style lang="less">
.map {
    .setWH();
    .setRelative();
}
#cesiumContainer {
    width: 100%;
    height: 100%;
}
.mod-home {
    line-height: 1.5;
    .setRelative();
}

/* 磁贴层级 */
.magnet {
    z-index: @zIndex-magnet;
}

/* 警告框 开始 */
.warn-tip {
    // 38px
    @height: 1.7vw;
    .setWH( @height );
    position: absolute;
    right: 1vw;
    top: 5.8vh ;
    background:rgba(7,32,69,0.5);
    // border:1px solid rgba(0,252,255,1);
    border-radius:50%;
    z-index: @zIndex-tool;

    .icon {
        background-image: url("./images/alarm-nor.png");
        .setBg();
        .setWH();
    }
    .icon.active {
        background-image: url("./images/alarm-pre.png");
    }
}
/* 警告框 结束 */
</style>
