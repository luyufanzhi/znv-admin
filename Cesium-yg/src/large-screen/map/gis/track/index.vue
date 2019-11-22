<template>
    <wrap class="track" @click="clickTest">
        <div class="wrap">
            <div class="tit">
                粤东莞渔61009
            </div>

            <div class="info clearfix znv-info">
                <div class="row">
                    <label>经纬度</label>
                    <span>：</span>
                    <div class="txt loc">N1923E11052</div>
                </div>
                <div class="left fl">
                    <div class="row">
                        <label>经纬度</label>
                        <span>：</span>
                        <div class="txt loc">N1923E11052</div>
                    </div>
                    <div class="row">
                        <label>经纬度</label>
                        <span>：</span>
                        <div class="txt loc">N1923E11052</div>
                    </div>
                    <div class="row">
                        <label>经纬度</label>
                        <span>：</span>
                        <div class="txt loc">N1923E11052</div>
                    </div>
                </div>
                <div class="right fl">
                    <div class="row">
                        <label>经纬度</label>
                        <span>：</span>
                        <div class="txt loc">N1923E11052</div>
                    </div>
                    <div class="row">
                        <label>经纬度</label>
                        <span>：</span>
                        <div class="txt loc">N1923E11052</div>
                    </div>
                    <div class="row">
                        <label>经纬度</label>
                        <span>：</span>
                        <div class="txt loc">N1923E11052</div>
                    </div>
                </div>
            </div>

            <div class="btns-tip clearfix">
                <div :class="[ 'icon', 'tack', {
                    active: btnIndex === 0
                } ]" @click="btnsClick(0)">轨迹</div>
                <div :class="[ 'icon', 'name', {
                    active: btnIndex === 1
                } ]" @click="btnsClick(1)">点名</div>
                <div :class="[ 'icon', 'gz', {
                    active: btnIndex === 2
                } ]" @click="btnsClick(2)">跟踪</div>
                <div :class="[ 'icon', 'cj', {
                    active: btnIndex === 3
                } ]" @click="btnsClick(3)">处警</div>
            </div>

            <div class="btns">
                <el-button type="primary" class="btn" @click="enterBtn(0)" @keypress.enter="enterBtn(0)">基本信息</el-button>
                <el-button type="primary" class="btn" @click="enterBtn(1)" @keypress.enter="enterBtn(1)">证书信息</el-button>
                <el-button type="primary" class="btn" @click="enterBtn(2)" @keypress.enter="enterBtn(2)">核查信息</el-button>
                <el-button type="primary" class="btn" @click="enterBtn(3)" @keypress.enter="enterBtn(3)">其他信息</el-button>
            </div>

            <div class="loc sub">
                <div class="sub-tit">
                    位置信息 (202825)
                </div>
                <div class="table">
                    <div class="tr">
                        <div class="cell">北纬</div>
                        <div class="cell">最后定位终端</div>
                        <div class="cell">船艏向</div>
                    </div>
                    <div class="tr">
                        <div class="cell">19° 23′15.2448"</div>
                        <div class="cell">北斗终端（北斗星通）</div>
                        <div class="cell">0.0</div>
                    </div>
                    <div class="tr">
                        <div class="cell">东经</div>
                        <div class="cell">最后定位时间</div>
                        <div class="cell">航速（节）</div>
                    </div>
                    <div class="tr">
                        <div class="cell">110° 52′17.6664"</div>
                        <div class="cell">2019/03/18 15:28</div>
                        <div class="cell">0.0</div>
                    </div>
                </div>
            </div>

            <div class="pic sub">
                <div class="sub-tit">
                    照片
                </div>
                <div class="img">
                    <img src="/static/img/ship.jpg" alt="">
                </div>
            </div>

            <div class="ship-info sub">
                <div class="sub-tit">
                    船体信息
                </div>
                <div class="table">
                    <div class="tr">
                        <div class="cell">核定航区</div>
                        <div class="cell">核定船员</div>
                        <div class="cell">作业区域</div>
                    </div>
                    <div class="tr">
                        <div class="cell">-</div>
                        <div class="cell">13</div>
                        <div class="cell">C3类渔区</div>
                    </div>
                    <div class="tr">
                        <div class="cell">核定航区</div>
                        <div class="cell">核定船员</div>
                        <div class="cell">作业区域</div>
                    </div>
                    <div class="tr">
                        <div class="cell">-</div>
                        <div class="cell">13</div>
                        <div class="cell">C3类渔区</div>
                    </div>
                    <div class="tr">
                        <div class="cell">核定航区</div>
                        <div class="cell">核定船员</div>
                        <div class="cell">作业区域</div>
                    </div>
                    <div class="tr">
                        <div class="cell">-</div>
                        <div class="cell">13</div>
                        <div class="cell">C3类渔区</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 轨迹提示框 -->
        <gis-track :title="'xxxx轨迹'"></gis-track>
    </wrap>
</template>

<script>

import tip from 'common/mixins/tip'

// 组件
import GisTrack from '../../../components/tip/gis-track'
import Wrap from '../wrap'

// 地图相关
import CesiumCtl from '../../Model/CesiumCtl'
import LayersCtl from '../../Model/LayersCtl'
import Entites from '../../Model/Entites'
import Pick from '../../Event/Coordinate/pick'

export default {
    name: 'track',
    mixins: [ tip ],
    components: {
        'gis-track': GisTrack,
        wrap: Wrap,
    },
    data () {
        return {
            positions: [
                113.91816727562654, 22.48252907241863,
                113.91902908922545, 22.482539998566313
            ],
            count: 0,
            btnIndex: -1,
        }
    },

    created () {
        CesiumCtl.promise.then( ( viewer ) => {
            // this.test()
            // this.drawPolygon()
        } )
    },

    methods: {

        clickTest () {
            let positions = [
                // [ 113.91816727562654, 22.48252907241863 ],
                // [ 113.91902908922545, 22.482539998566313 ],
                [ 113.91990189403688, 22.481785312786837 ]
            ]

            this.positions.push.apply( this.positions, positions[ this.count ] )

            this.count++
        },

        drawPolygon () {

            let positions = [
                113.91816727562654, 22.48252907241863,
                113.91902908922545, 22.482539998566313,
                113.91990189403688, 22.481785312786837,
            ]

            let entity1 = new Cesium.Entity( {
                polygon: {
                    show: true,
                    height: 1,
                    outline: false,
                    material: Cesium.Color.CORNFLOWERBLUE,

                    hierarchy: new Cesium.CallbackProperty( () => {
                        return Cesium.Cartesian3.fromDegreesArray( positions )
                    }, false )
                }
            } )

            let entites = new Entites( {
                type: 'pick',
                detail: '坐标拾取'
            } )

            entites.add( entity1 )

            let pick = new Pick()
            pick.pick( ( event ) => {
                positions.push( event.lng )
                positions.push( event.lat )
            } ).attach()
        },

        test () {

            // lng: 113.91816727562654, lat: 22.48252907241863, height: -0.3033770858418813
            // lng: 113.91902908922545, lat: 22.482539998566313, height: -0.28809003852692844
            // lng: 113.91990189403688, lat: 22.481785312786837, height: -0.2901437008740004
            // let point = Point.c3ToFd( Point.toC3( event.position ) )

            let positions = [
                113.91816727562654, 22.48252907241863,
                113.91902908922545, 22.482539998566313
            ]

            let entity1 = new Cesium.Entity( {
                polyline: {
                    show: true,
                    height: 1,
                    width: 5,
                    outline: false,
                    material: Cesium.Color.CORNFLOWERBLUE,
                    positions: new Cesium.CallbackProperty( () => {
                        return Cesium.Cartesian3.fromDegreesArray( this.positions )
                    }, false )
                }
            } )

            let entity2 = new Cesium.Entity( {
                point : new Cesium.PointGraphics( {
                    color : new Cesium.Color( 1, 1, 0 ),
                    pixelSize : 10,
                    outlineColor : new Cesium.Color( 0, 1, 1 )
                } ),
                position : Cesium.Cartesian3.fromDegrees(
                    113.91816727562654,
                    22.48252907241863,
                    -0.3033770858418813 + .5
                )
            } )

            this.entites = new Entites( {
                type: 'pick',
                detail: '坐标拾取'
            } )
            this.entites.add( entity1 )
            this.entites.add( entity2 )

            let pick = new Pick()
            pick.pick( ( event ) => {
                this.positions.push( event.lng )
                this.positions.push( event.lat )
            } ).attach()

        },

        // btns 点击事件
        btnsClick ( index ) {
            this.btnIndex = index
            this.uTipShip( 'track' )
        },

        // 按钮组的点击事件
        enterBtn ( index ) {

        }
    }
}
</script>

<style lang="less" scoped>
.track {

    color: #fff;

    .setScroll( wrap );
    .wrap {
        .setWH();
        overflow-y: auto;
        background: rgba(7,32,69,1);
        border:1px solid rgba(47,184,253,1);
        box-shadow:0px 0px 32px 0px rgba(0,174,253,0.31);
        border-radius: 5px;
    }

    .tit {
        height: @h30;
        width: 100%;
        .setBg();
        background-image: url("../../images/title_bg.png");
        font-size: .px2vh( 16 )[@result];
        line-height: @h30;
        text-align: center;
        color: #fff;
    }

    .info {
        padding-top: @h40;
        // margin-bottom: @h40;

        .left, .right {
            width: 50%;
        }

        .row {

            label {
                width: .px2vw( 50 )[@result];
                .setEllipsis();
            }
            .txt {
                margin-left: .px2vw( 70 )[ @result ];
                height: .px2vh( 25 )[@result];
                .setEllipsis();
            }
        }
    }

    .btns-tip {
        // .setFlex();
        padding: 0 @w20;
        margin: .px2vh( 15 )[@result] 0;
        .setRelative();

        .icon {
            color: #fff;
            // flex: 1;
            text-align: center;
            height: @h20;
            font-size: .px2vh( 14 )[@result];
            line-height: @h20;
            vertical-align: baseline;
            float: left;
            width: 25%;
            .setRelative();
            text-indent: @w20 + .px2vw( 5 )[@result];
            cursor: pointer;

            &::before {
                content: "";
                position: absolute;
                left: 50%;
                top: 0;
                transform: translateX(-120%);
                height: @h20;
                width: @w20;
                .setBg();
            }

            &.tack::before {
                background-image: url("../../images/trajectory-nor.png");
            }
            &.tack.active::before {
                background-image: url("../../images/trajectory-pre.png");
            }
            &.name::before {
                background-image: url("../../images/call_the_roll-nor.png");
            }
            &.name.active::before {
                background-image: url("../../images/call_the_roll-pre.png");
            }
            &.gz::before {
                background-image: url("../../images/positioning-nor.png");
            }
            &.gz.active::before {
                background-image: url("../../images/positioning-pre.png");
            }
            &.cj::before {
                background-image: url("../../images/trajectory-nor.png");
            }
            &.cj.active::before {
                background-image: url("../../images/trajectory-pre.png");
            }
        }

        .icon.active {
            color: #00FFFF;
        }
    }

    .btns {
        .setFlex();
        padding: 0 @w20;
        margin: .px2vh( 15 )[@result] 0;

        .btn {
            width: .px2vw( 90 )[@result];
            height: .px2vh( 38 )[@result];
            background:linear-gradient(180deg,rgba(107,187,253,1),rgba(0,138,252,1),rgba(0,95,176,1));
            border-radius:2px;
            font-size: .px2vh( 18 )[@result];
            line-height: .px2vh( 38 )[@result];
            padding: 0;
            margin-top: .px2vh( 16 )[@result];
            margin-bottom: .px2vh( 16 )[@result];
            .setEllipsis();
        }
    }

    .sub {
        margin-bottom: @grap-16vh;
    }

    .sub-tit {
        width: 100%;
        height: @h40;
        background-image: linear-gradient( to right , rgba(7,32,69,1), #2C96ED, rgba(7,32,69,1) );
        text-align: center;
        font-size: .px2vh(18)[@result];
        line-height: @h40;
        // letter-spacing: 2px;
    }

    .pic {
        .img {
            width: 100%;
            padding: @grap-15vh @grap-16vw;
            img {
                .setWH();
                // width: .px2vw(396)[@result];
                // height: .px2vh(274)[@result];
            }
        }
    }

    .table {
        width: 100%;
        // padding-left: @grap-15vw;
        // padding-right: @grap-15vw;
        padding: @grap-15vh @grap-15vw;
        font-size: .px2vh(16)[@result];

        .tr {
            width: 100%;
            .setFlex();
            min-height: @h40;
            height: max-content;
            // line-height: @h40;
            background-color: #042E5E;

            .cell {
                flex: 1;
                text-align: left;
                padding: 0 .px2vh(7)[@result];
                .setEllipsis();
            }
        }

        .tr:nth-child(even) {
            background-color: #03376E;
        }
    }
}
</style>
