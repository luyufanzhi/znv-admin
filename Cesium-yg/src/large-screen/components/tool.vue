<template>
    <ul :class="[ 'tool', {
        open: isOpen,
    } ]">
        <li :class="[ 'icon' ]" @click="openOrClose" ></li>
        <ul class="item-list clearfix">
            <li v-for="( item, index ) in data"  :key="index" :class="[ 'item', {
                active: item.isActive,
                hover: item.isHover,
            }, ...item.class ]"
                @mouseenter="item.isHover = true"
                @mouseleave="item.isHover = false"
                @click="itemClick( item )">

                <div :class="[ {
                    nor: !item.isActive,
                    pre: item.isActive,
                    hover: item.isHover,
                }, 'left-icon' ]"></div>
                {{ item.txt }}
                <img v-if="item.more && !( item.isActive || item.isHover )" class="more-icon" src="../map/images/drop_down_2.png">
                <img v-if="item.more && ( item.isActive || item.isHover )" class="more-icon" src="../map/images/drop_down_2-pre.png">

                <div  class="more" v-if="item.more" v-show="item.isActive || item.isHover">
                    <ul>
                        <li :class="[ 'more-item', {
                            active: m.isActive
                        } ]"
                        v-for="( m, i ) in item.more" :key="i"
                        @click.stop="setLayerVisible( m )">
                            <!-- <img v-if="m.isActive" :src="m.pre" alt=""> -->
                            <!-- <img v-else :src="m.nor" alt=""> -->
                            <img :src="m.nor" alt="">
                            {{ m.txt }}

                            <div class="m-s">
                                <ul v-if="m.more">
                                    <li class="m-s-item" :class="[ {
                                        active: $m.isActive
                                    } ]" v-for="( $m, $i ) in m.more" :key="$i"
                                        @click="setLayerVisible( $m )">
                                        {{ $m.txt }}
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </ul>
</template>

<script>
import CesiumCtl from '@map/Model/CesiumCtl'
import {
    URLS, NAMES
} from '@map/config/layersName'
import LayersCtl from '@map/Model/LayersCtl'

import LayerItem from './Class/LayerItem'

import waterEn from '@map/entity/water'
import aisEn from '@map/entity/ais'
import shipLocalEn from '@map/entity/ship-local'
import shipHkmEn from '@map/entity/ship-hkm'
import navigationEn from '@map/entity/navigation'
import beidouEn from '@map/entity/beidou'

let entityMap = {
    water: waterEn,
    ais: aisEn,
    shipHkm: shipHkmEn,
    shipLocal: shipLocalEn,
    navigation: navigationEn,
    beidou: beidouEn,
}

export default {
    name: 'tool',

    data () {
        return {
            width: '2.1vw',
            itemWidth: 0,
            isOpen: false,
            count: 8,
            iconImg: 'url("../map/images/tool_close.png")',
            data: [
                {
                    txt: '图层',
                    nor: '/static/img/large-screen/layer-nor.png',
                    pre: '/static/img/large-screen/layer-pre.png',
                    class: [ 'tc', 'more', 'line' ],
                    isActive: false,
                    isHover: false,
                    more: [ {
                        txt: '天气',
                        name: 'weather',
                        nor: '/src/large-screen/map/images/weather-nor.png',
                        isActive: false,
                    }, {
                        txt: '防台',
                        name: 'fangtai',
                        nor: '/src/large-screen/map/images/shelter-nor.png',
                        isActive: false,
                    }, {
                        txt: '船舶',
                        name: 'ship',
                        nor: '/src/large-screen/map/images/ship-nor.png',
                        isActive: false,
                        more: [
                            new LayerItem( {
                                txt: '本地',
                                name: 'shipLocal',
                                entites: shipLocalEn
                            } ),
                            new LayerItem( {
                                txt: '港澳',
                                name: 'shipHkm',
                                entites: shipHkmEn
                            } )
                        ]
                    }, new LayerItem( {
                        txt: '航标',
                        name: 'navigation',
                        nor: '/src/large-screen/map/images/hangbiao.png',
                        entites: navigationEn
                    } ), new LayerItem( {
                        txt: '敏感水域',
                        name: 'water',
                        nor: '/src/large-screen/map/images/mgsy.png',
                        entites: waterEn
                    } ), {
                        txt: '定位',
                        name: 'location',
                        nor: '/src/large-screen/map/images/dw.png',
                        isActive: false,
                        more: [
                            new LayerItem( {
                                txt: 'AIS',
                                name: 'ais',
                                entites: aisEn,
                            } ),
                            new LayerItem( {
                                txt: '北斗',
                                name: 'beidou',
                                entites: beidouEn
                            } )
                        ]
                    }, {
                        txt: '泊位',
                        name: 'park',
                        nor: '/src/large-screen/map/images/berth-nor.png',
                        isActive: false,
                    } ]
                },
                {
                    txt: '测距',
                    nor: '/static/img/large-screen/ranging-nor.png',
                    pre: '/static/img/large-screen/ranging-pre.png',
                    class: [ 'cj' ],
                    isActive: false,
                    isHover: false,
                    method: 'dis'
                },
                {
                    txt: '测面',
                    nor: '/static/img/large-screen/measuring_surface-nor.png',
                    pre: '/static/img/large-screen/measuring_surface-pre.png',
                    method: 'area',
                    isActive: false,
                    isHover: false,
                },
                {
                    txt: '坐标定位',
                    nor: '/static/img/large-screen/coordinates-nor.png',
                    pre: '/static/img/large-screen/coordinates-pre.png',
                    class: [ 'dw' ],
                    isActive: false,
                    isHover: false,
                },
                {
                    txt: '坐标获取',
                    nor: '/static/img/large-screen/tracking-nor.png',
                    pre: '/static/img/large-screen/tracking-pre.png',
                    class: [ 'hq' ],
                    isActive: false,
                    isHover: false,
                    method: 'pick',
                },
                {
                    txt: '飞行',
                    nor: '/static/img/large-screen/layer-nor.png',
                    pre: '/static/img/large-screen/layer-pre.png',
                    method: 'fly',
                    isActive: false,
                    isHover: false,
                },
                {
                    txt: '旋转',
                    nor: '/static/img/large-screen/rotating-nor.png',
                    pre: '/static/img/large-screen/rotating-pre.png',
                    class: [ 'fx' ],
                    isActive: false,
                    isHover: false,
                    method: 'rotate'
                },
                {
                    txt: '清除',
                    nor: '/static/img/large-screen/remove-nor.png',
                    pre: '/static/img/large-screen/remove-pre.png',
                    class: [ 'qc' ],
                    isActive: false,
                    isHover: false,
                    method: 'clear'
                },
            ]
        }
    },

    computed: {
        top () {
            return this.$parent.$refs.nav.bgHight + 20
        }
    },

    created () {
        CesiumCtl.promise.then( () => {
            // CesiumCtl.sensor
            // 注册事件, 高亮与否
        } )

        console.log( waterEn )
    },

    watch: {
        isOpen ( val ) {
            if ( val ) {
                this.width = 41 + 50 + this.count * 80 + ( this.count - 1 ) * 4
                this.iconImg = 'url("../map/images/tool_open.png")'
                // this.width = '43vw'
                // this.itemWidth = '11.72vw'
            } else {
                this.width =  41
                this.iconImg = 'url("../map/images/tool_close.png")'
                // this.width = '2.1vw',
                // this.itemWidth = 0
            }
        }
    },

    methods: {
        openOrClose () {
            this.isOpen = !this.isOpen

            if ( !this.isOpen ) {
                this.clear()
                this.data[ 0 ].isActive = false
                this.data[ 0 ].isHover = false
            }
        },

        /**
         * 工具栏点击
         */
        itemClick ( item ) {

            // 先注销所有事件
            this.clear()
            if ( item.txt !== '清除' ) {
                item.isActive = !item.isActive
            }

            if ( typeof this[ item.method ] === 'function' ) {
                this[ item.method ]( item )

            }
        },

        /**
         * 地图旋转
         */
        rotate ( item ) {
            if ( CesiumCtl.sensor.Rotate ) {
                CesiumCtl.sensor.Rotate.attach()
            }
        },

        /**
         * 坐标定位
         */
        pick () {
            if ( CesiumCtl.sensor.Pick ) {
                CesiumCtl.sensor.Pick.attach()
            }
        },

        /**
         * 清除所有自定义事件
         */
        clear () {
            CesiumCtl.clear()
            this.data.forEach( ( item, index ) => {
                if ( index !== 0 ) {
                    item.isActive = false
                }
            } )
        },

        /**
         * 图层点击
         */
        setLayerVisible ( item ) {
            if ( item.more ) {
                // item.isActive = !item.isActive
                return
            }

            // let entites = entityMap[ item.name ]
            let entites = item.entites

            if ( entites ) {
                entites.turn()
                // item.isActive = entites.visible
                // this.$forceUpdate()
            } else {
                item.isActive = !item.isActive
                console.error( `<<< ${item.txt} 点集未获取到.` )
            }
        },

        // 滑行
        fly ( item ) {
            if ( CesiumCtl.sensor.Fly ) {
                CesiumCtl.sensor.Fly.attach()
            }
        },

        // 测距
        dis ( item ) {
            if ( CesiumCtl.sensor.Measurement ) {
                CesiumCtl.sensor.Measurement.attach()
                CesiumCtl.sensor.Measurement.distance()
            }
        },

        // 测面
        area ( item ) {
            if ( CesiumCtl.sensor.Measurement ) {
                CesiumCtl.sensor.Measurement.attach()
                CesiumCtl.sensor.Measurement.area()
            }
        }
    }
}
</script>

<style lang="less">

@tool-height: 2.1vw; // 工具栏高度

@margin-r: 10px;
@margin-t: 7px;
@bgc: rgba(61, 150, 214, 1);
// @count: 7; // 选项个数

.tool {
    height: @tool-height;
    // .setWH( @tool-height );
    min-width: @tool-height;
    // width: @tool-height;

    float: left;
    border-radius: @tool-height;
    border: 1px solid @th-border;
    // overflow: hidden;
    color: #fff;
    position: absolute;
    left: 2vw;
    top: 11.72vh;
    // top: 80px;
    z-index: @zIndex-tool;
    background-color: @th-bg;
    // box-sizing: content-box;
    opacity: @opacity;
    transition: width .5s ease-in-out;
    font-size: 0;
    vertical-align: middle;
    cursor: pointer;

    @grap: 10px;
    @icon-w: 1.3vw;
    @icon-h: 2.13vh;

    .icon {
        background-image: url("../map/images/tool_close.png");
    }
    &.open .icon {
        background-image: url("../map/images/tool_open.png");
    }

    .item {
        height: @tool-height;
        line-height: @tool-height;
        display: none;
        font-size: 1.42vh;
        // font-size: .8vw;
        margin-right: @margin-r;
        // padding: 0 5px;
        .setRelative();
        // width: 0;
        // width: 11.72vw;
        float: left;

        img, .left-icon {
            display: inline-block;
            .setWH( @icon-w, @icon-h );
            transform: translateY(-2px);
            .setBg();
        }

        .left-icon {
            .setBg();
            transform: translateY(22%);
        }

        img.more-icon, .left-icon.more-icon {
            .setWH( .4vw, .53vh );
            margin-left: .5vw;
        }

        img.left-icon {
            margin-right: .5vw;
            margin-left: .5vw;
        }

        &.item:nth-child(1) .left-icon.nor {
            background-image: url("../map/images/layer-nor.png");
        }
        &.item.tc:nth-child(1) .left-icon.pre,
        &.item:nth-child(1) .left-icon.hover {
            background-image: url("../map/images/layer-pre.png");
        }

        &.item:nth-child(2) .left-icon.nor {
            background-image: url("../map/images/ranging-nor.png");
        }
        &.item:nth-child(2) .left-icon.pre,
        &.item:nth-child(2) .left-icon.hover {
            background-image: url("../map/images/ranging-pre.png");
        }

        &.item:nth-child(3) .left-icon.nor {
            background-image: url("../map/images/measuring_surface-nor.png");
        }
        &.item:nth-child(3) .left-icon.pre,
        &.item:nth-child(3) .left-icon.hover {
            background-image: url("../map/images/measuring_surface-pre.png");
        }

        &.item:nth-child(4) .left-icon.nor {
            background-image: url("../map/images/coordinates-nor.png");
        }
        &.item:nth-child(4) .left-icon.pre,
        &.item:nth-child(4) .left-icon.hover {
            background-image: url("../map/images/coordinates-pre.png");
        }

        &.item:nth-child(5) .left-icon.nor {
            background-image: url("../map/images/tracking-nor.png");
        }
        &.item:nth-child(5) .left-icon.pre,
        &.item:nth-child(5) .left-icon.hover {
            background-image: url("../map/images/tracking-pre.png");
        }

        &.item:nth-child(6) .left-icon.nor {
            background-image: url("../map/images/flight-nor.png");
        }
        &.item:nth-child(6) .left-icon.pre,
        &.item:nth-child(6) .left-icon.hover {
            background-image: url("../map/images/flight-pre.png");
        }

        &.item:nth-child(7) .left-icon.nor {
            background-image: url("../map/images/rotating-nor.png");
        }
        &.item:nth-child(7) .left-icon.pre,
        &.item:nth-child(7) .left-icon.hover {
            background-image: url("../map/images/rotating-pre.png");
        }

        &.item:nth-child(8) .left-icon.nor {
            background-image: url("../map/images/remove-nor.png");
        }
        &.item:nth-child(8) .left-icon.pre,
        &.item:nth-child(8) .left-icon.hover {
            background-image: url("../map/images/remove-pre.png");
        }

        .more {
            position: absolute;
            left: 0;
            top: @tool-height;
            // width: 100%;
            min-width: 100%;
            // min-width: .px2vw( 115 )[@result];
            width: max-content;
            padding-top: 5px;
            cursor: pointer;

            ul {
                border: 1px solid @th-border;
                background-color: @th-bg;
            }

            li {
                width: 100%;
                height: @tool-height;
                line-height: @tool-height;
                text-align: left;
                color: #fff;
                padding-right: .px2vw( 12 )[@result];;
                padding-left: .px2vw( 12 )[@result];
                box-sizing: border-box;

                img {
                    // margin: 0 10px;
                    width: .px2vw( 19 )[@result];
                    height:.px2vw( 19 )[@result];
                    margin-right: .px2vw( 12 )[@result];
                }
            }

            li.more-item.active {
                // color: @th-active;
                background-color: @bgc;
            }

            li.more-item:hover {
                background-color: @bgc;
            }
        }
    }

    .item.active, .item.hover {
        color: @th-active;
    }

    .item.line {
        padding-right: .5vw;
        // padding-left: .5vw;
    }

    .item.line::after {
        // content: "";
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        height: 2.3vh;
        transform: translateY(-50%);
        border-right: 1px solid @th-border;
    }

    .icon {
        .setWH( @tool-height );
        .setBg();
        // background-image: url("../map/images/tool_close.png");
        position: absolute;
        left: -1px;
        top: -1px;
    }

    .item:nth-child(1) {
        margin-left: @tool-height;
    }
    .item:last-child {
        margin-right: 15px;
    }

    .m-s {
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(100%);
        display: none;
        padding-left: @w10;
        min-width: 100%;
        width: max-content;

        .m-s-item:hover,
        .m-s-item.active {
            background-color: @bgc;
        }
    }
    .more-item:hover {
        .m-s {
            display: block;
        }
    }
    .more-item {
        .setRelative();
    }
}

.tool.open .item-list {
    >li.item {
        display: inline-block;
    }
    >li.item.line::after {
        content: "";
    }
}
</style>
