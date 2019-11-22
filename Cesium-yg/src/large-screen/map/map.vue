<template>
    <!-- 地图容器 -->
    <div ref="map" :id="ctl.id" v-show="show" class="cesiumContainer" :style="{
        height: height,
        width: width
    }" oncontextmenu="event.preventDefault()"></div>
</template>

<script>
import mixins from 'common/mixins'

// 三维地图相关
import MapCtl from '@map/Model/Class/MapCtl'
import defCtl from '@map/Model/CesiumCtl'
import LayersCtl from '@map/Model/LayersCtl'
import Entites from '@map/Model/Entites'
import layersName from '@map/config/layersName'
// import './config/config'

export default {
    name: 'map',
    mixins: [ mixins ],
    props: {
        layer: {
            type: Boolean,
            default: false
        },
        ctl: {
            type: MapCtl,
            default () {
                return defCtl
            }
        },
        camera: {
            type: String,
            default: 'DEF'
        }
    },

    data () {
        return {
            height: 0, // 地图高度
            width: 0, // 地图宽度
            show: false
        }
    },

    created () {

        console.log( 'ctl:', this.ctl )

        this.$nextTick( () => {
            // 设置地图大小,
            this.setMapSize()

            // 自适应
            this.setMapSize = this.setMapSize.bind( this )
            // window.removeEventListener( 'resize', this.setMapSize )
            window.addEventListener( 'resize', this.setMapSize )
            // this.$refs.map.parentElement.addEventListener( 'resize', this.setMapSize )

            // 地图业务逻辑
            this.doMain()

            // 其他
            // this.logPointMsg()
        } )
    },

    destroyed () {
        window.removeEventListener( 'resize', this.setMapSize )
        // this.$refs.map.parentElement.removeEventListener( 'resize', this.setMapSize )
    },

    watch: {
        camera: {
            immediate: true,
            handler ( val ) {
                this.$nextTick( () => {
                    this.ctl.promise.then( () => this.ctl.setView( val ) )
                } )
            }
        }
    },

    methods: {

        // 业务逻辑
        doMain () {
            // 加载天地图
            this.ctl.init()

            // 加载图层
            this.layer && LayersCtl.all( layersName, ( layers ) => {
                console.log( '>>> All layer is loaded.' )
                console.log( 'layersCtl:', LayersCtl )

                // 点击图层显示信息
                layers.forEach( ( layer ) => {
                    // console.log( 'layer:', layer )
                    layer.click( ( _, ids ) => {
                        if ( this.ctl.isAnimation ) {
                            return
                        }

                        console.log( `${layer.name} id: ${ids}`, layer )

                        // 设置选中图块选中图层所在的图层
                        layer.selected()
                        // 弹出提示框
                        this.uTipMsg( layer.name )
                        this.uTipShow( true )
                    } )
                } )
            } )
        },

        // 打印视角信息
        logPointMsg () {
            // 点击视角信息
            this.ctl.click( ( e ) => {
                let scene = this.ctl.viewer.scene
                let ellipsoid = this.ctl.viewer.scene.globe.ellipsoid;
                let cartesian3 = new Cesium.Cartesian3(
                    scene.camera.position.x,
                    scene.camera.position.y,
                    scene.camera.position.z
                );

                let cartographic = ellipsoid.cartesianToCartographic( cartesian3 );

                let lat = Cesium.Math.toDegrees( cartographic.latitude );
                let lng = Cesium.Math.toDegrees( cartographic.longitude );
                let alt = cartographic.height;

                console.group( 'camera message' );
                console.log( 'scece-camera:::', scene.camera );
                console.log( 'scene-position:::', scene.camera.position );
                console.log( 'scece-heading:::', scene.camera.heading );
                console.log( 'scece-pitch:::', scene.camera.pitch );
                console.log( 'scece-roll:::', scene.camera.roll );
                console.log( 'lat-lng-height:::', lat, lng, alt );
                console.groupEnd();
            } )
        },

        // 设置地图大小
        setMapSize () {
            this.show = false
            this.$nextTick( () => {
                let { width, height } = this.$refs.map.parentElement.getBoundingClientRect()
                this.height = /* window.innerHeight */ height + 'px'
                this.width = /* window.innerWidth */ width + 'px'
                this.show = true
            } )
        },
    }
}
</script>

<style lang="less" scoped>
.cesiumContainer {
    .setWH();
    @import url("./style/cesium.less");
}
.home {
    .setWH();
}
</style>
