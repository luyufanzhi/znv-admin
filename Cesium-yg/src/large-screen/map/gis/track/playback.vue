<template>
    <!-- 轨迹回放 -->
    <div :class="[ 'gis-playback' ]">

        <wrap class="playback">
            <div class="wrap">
                <div class="tit">
                    轨迹查询
                </div>

                <div class="date znv-info">
                    <div class="row important">
                        <label>结束时间</label>
                        <span>：</span>
                        <div class="txt event-name">
                            <el-date-picker type="datetime" placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                ></el-date-picker>
                        </div>
                    </div>
                    <div class="row important">
                        <label>结束时间</label>
                        <span>：</span>
                        <div class="txt event-name">
                            <el-date-picker type="datetime" placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                ></el-date-picker>
                        </div>
                    </div>
                </div>

                <div class="btns">
                    <el-button type="primary" class="btn" @click="enterBtn(0)" @keypress.enter="enterBtn(0)">重置</el-button>
                    <el-button type="primary" class="btn" @click="enterBtn(1)" @keypress.enter="enterBtn(1)">查询</el-button>
                </div>

                <div class="test btns" v-if="isDebug && false">
                    <el-button type="primary" class="btn" @click="getData">绘制</el-button>
                    <el-button type="primary" class="btn" @click="addData">添加点</el-button>
                    <el-button type="primary" class="btn" @click="removeData">清除</el-button>
                </div>

                <div class="sub">
                    <div class="sub-tit">
                        轨迹查询结果
                    </div>

                    <div class="tab">
                        <div class="tab-list clearfix">
                            <div :class="[ 'tab-item', {
                                active: tabIndex === 0
                            } ]" @click="tabIndex = 0">定位终端AIS</div>
                            <div :class="[ 'tab-item', {
                                active: tabIndex === 1
                            } ]" @click="tabIndex = 1">定位终端北斗</div>
                        </div>
                        <div class="tab-tool">
                            <con class='ilt cp'>
                                <img-icon type='screenshot' :w=14 :h=14 class="ilm"></img-icon>
                                <txt class="ilm">截图</txt>
                            </con>
                            <con class='ilt cp'>
                                <img-icon type='edit' :w=14 :h=14 class="ilm"></img-icon>
                                <txt class="ilm">编辑</txt>
                            </con>
                        </div>
                        <div class="tab-content">
                            <div class="tab-wrap" v-show="tabIndex === 0">
                                <el-timeline :reverse="reverse">
                                    <el-timeline-item
                                        v-for="(activity, index) in activities"
                                        :key="index"
                                        :timestamp="activity.timestamp"
                                        color="#3189E4"
                                        size="large"
                                        placement="bottom">

                                        {{activity.content}}
                                    </el-timeline-item>
                                </el-timeline>
                            </div>
                            <div class="tab-wrap" v-show="tabIndex === 1">
                                <!-- <el-timeline :reverse="reverse">
                                    <el-timeline-item
                                        v-for="(activity, index) in activities"
                                        :key="index"
                                        :timestamp="activity.timestamp"
                                        color="#3189E4"
                                        size="large"
                                        placement="bottom">

                                        {{activity.content}}
                                    </el-timeline-item>
                                </el-timeline> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 轨迹回放的播放器 -->
            <gis-player ref="player" class="gis-player"
                ajax="/static/mork/playback.json"
                :labels="labelsData"
                @succee="succee"></gis-player>
        </wrap>

        <!-- 船位信息, label 标签 -->
        <!-- <znv-label ref="label"></znv-label> -->
        <znv-label v-for="( item, index ) in labelsData" :key="index"
            :point="item"></znv-label>
    </div>
</template>

<script>

import tip from 'common/mixins/tip'

// 组件
// import GisTip from '../../components/tip/gis-playback'
import Player from './player'
import Label from './label'
// import Arrow from 'arrow'
import Wrap from '../wrap'

// 地图相关
import CesiumCtl from '@map/Model/CesiumCtl'
import LayersCtl from '@map/Model/LayersCtl'
import Entites from '@map/Model/Entites'
import Pick from '@map/Event/Coordinate/pick'

// 轨迹功能相关
import TrackPoint from '../Class/TrackPoint'
import Track from '../Class/Track'
import TrackBack from '../Class/TrackBack'
import Labels from '../Class/Labels'

export default {
    name: 'playback',
    mixins: [ tip ],
    components: {
        // 'gis-tip': GisTip,
        'gis-player': Player,
        'znv-label': Label,
        // arrow: Arrow,
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

            // 时间线
            reverse: true,
            activities: [],

            tabIndex: 0,

            track: null,
            data: [],

            labelsData: [],

            state: 'undraw',

            isActive: false,

            isDebug: process.env.NODE_ENV !== 'production',
        }
    },

    created () {
        CesiumCtl.promise.then( ( viewer ) => {
        } )

        // this.$set( this, 'activities', this.$refs.player.track.points )
    },

    activated () {
        if ( this.track && this.state === 'draw' ) {
            this.track.draw()
        }
    },

    deactivated () {
        if ( this.track ) {
            if ( this.track.isDraw ) {
                this.state = 'draw'
            }
            this.track.remove()
        }
    },

    methods: {

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
                    outline: true,
                    outlineColor : new Cesium.Color( 255/255, 204/255, 0, 1 ),
                    material: new Cesium.Color( 1, 0, 0, .2 ),

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

        succee ( track ) {
            this.$set( this, 'activities', track.points )
        },

        // btns 点击事件
        btnsClick ( index ) {
            this.btnIndex = index
            this.uTipShip( 'playback' )
        },

        // 按钮组的点击事件
        enterBtn ( index ) {

        },

        // 测试, 模拟接受数据
        getData () {
            if ( this.track ) {
                return this.track.draw()
            }

            this.$axios.get( '/static/mork/playback.json' )
                .then( ( data ) => {

                    // 绘制时间线
                    data.data
                        .forEach( ( item ) => {
                            let point = new TrackPoint( item )
                            this.data.push( point )
                        } )

                    this.track = new Track( {
                        labels: new Labels( this )
                    } )

                    this.activities.push( this.data[ 0 ] )
                    this.track.addAction( this.data[ 0 ] ).then( () => {
                        this.track.draw()
                    } )
                } )
        },

        // 测试, 动态添加一个点
        addData () {

            if ( this.data[ ++this.count ] ) {
                this.activities.push( this.data[ this.count ] )
                this.track.addAction( this.data[ this.count ] )
            } else {
                // this.count = 0
                // this.removeData()
                // this.track.draw()
            }
        },

        // 测试, 删除 entity
        removeData () {
            // this.activities = []
            // this.data = []
            this.track.remove()
            // this.track.destroy()
        }
    }
}
</script>

<style lang="less" scoped>
@import "~@less/element/date.less";

.gis-playback {
    position: absolute;
    right: 0;
    bottom: 0;
    .setWH(0);
}

.playback {
    color: #fff;

    .date {
        padding-top: @h30;
    }

    .setScroll( wrap );
    .wrap {
        .setWH();
        overflow-y: auto;
        background: rgba(7,32,69,1);
        border:1px solid rgba(47,184,253,1);
        box-shadow:0px 0px 32px 0px rgba(0,174,253,0.31);
        border-radius: 5px;
        // margin-right: @grap-17vw;
        // margin-bottom:  @grap-14vh;
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

    .btns {
        .setFlex();
        padding: 0 .px2vw( 120 )[@result];;
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
            // margin-right: .px2vw( 11 )[@result];
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

    .tab {
        @import "~@less/element/time-line.less";

        .tab-content {
            padding: @h50 @w20 @h20 @w50;
        }

        .tab-wrap {
            .setWH();
        }

        .tab-list {
            padding: @grap-15vh @grap-15vw;
        }

        .tab-tool {
            padding: 0 @grap-15vw;

            /deep/ .ilm {
                font-size: .px2vh(14)[@result];
            }
        }

        .tab-item {
            float: left;
            color: #fff;
            font-size: .px2vh(16)[@result];
            width: .px2vw(118)[@result];
            height: .px2vh(30)[@result];
            line-height: .px2vh(30)[@result];
            text-align: center;
            // margin-right: @grap-15vw;
            cursor: pointer;
            &:last-child {
                margin-right: 0;
            }

            &.active {
                color: #fff;
                background-color: #4371F7;
                border-radius: 5px;
            }
        }
    }

    .test {

    }
}

.gis-player {
    position: absolute;
    left: 0;
    bottom: @grap-14vh;
    transform: translateX(-100%);
    z-index: @zIndex-magnet;
}
</style>
