<template>
    <div class="ship-label" :style="{
        right: right + 'px',
        bottom: bottom + 'px'
    }" v-show="show">{{ point.curTime }}</div>
</template>


<script>
import MapCtl from '@map/Model/Class/MapCtl'
import CesiumCtl from '@map/Model/CesiumCtl'
import Bubble from '@map/gis/Class/Bubble'
import TrackPoint from '@map/gis/Class/TrackPoint'

export default {
    props: {
        point: {
            type: TrackPoint
        },
        ctl:{
            type: MapCtl,
            default () {
                return CesiumCtl
            }
        }
    },

    data () {
        return {
            right: -1000,
            bottom: -1000,
            show: false,
        }
    },

    created () {

        this.ctl.promise.then( () => {
            this.bubble = new Bubble( this.ctl.viewer.scene, {
                vm: this
            } )

            if ( this.point ) { // 直接根据 point 添加
                this.bubble.at( this.point.position )
            }
        } )
    },

    watch: {
        'point.labelShow': {
            immediate: true,
            handler ( val ) {
                this.show = val
            }
        },

        'point.position' ( position ) {
            this.bubble.at( position )
        }
    }
}
</script>

<style lang="less" scoped>
.ship-label {
    position: absolute;
    z-index: @zIndex-view;
    // width: .px2vw(143)[@result];
    width: max-content;
    height: .px2vh(32)[@result];
    background:rgba(7,32,69,0.5);
    border:1px solid rgba(47,184,255,1);
    border-radius: .px2vh(16)[@result];
    font-size: .px2vh(14)[@result];
    line-height: .px2vh(32)[@result];
    color: #fff;
    text-align: center;
    transform: translateX(50%) translateY(100%);
    padding: 0 .px2vw(10)[@result];
}
</style>
