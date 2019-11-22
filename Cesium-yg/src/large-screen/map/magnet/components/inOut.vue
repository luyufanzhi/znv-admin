<template>
    <!-- 进出港统计 -->
    <div class="in-out">
        <wrap :list="list" v-model="activeName" >
            <div class="in-out-item" slot="in-out">
                <!-- 日 -->
                <div class="content" v-show="activeIndex === 0">
                    <div class="content-item t">
                        <div class="l item">
                            <div class="icon">
                                <img src="../../images/enter_the_eport.png" alt="">
                            </div>
                            <div class="detail">
                                <p class="txt znv-ellipsis">进港船数</p>
                                <count class="count" :value="inShipCount"></count>
                            </div>
                        </div>
                        <div class="r item second">
                            <div class="icon">
                                <img src="../../images/clearance.png" alt="">
                            </div>
                            <div class="detail">
                                <p class="txt znv-ellipsis">出港船数</p>
                                <count class="count" :value="outShipCount"></count>
                            </div>
                        </div>
                    </div>
                    <div class="content-item b">
                        <div class="l item">
                            <div class="icon">
                                <img src="../../images/report_into.png" alt="">
                            </div>
                            <div class="detail">
                                <p class="txt znv-ellipsis">进港报告数</p>
                                <count class="count" :value="inReportCount"></count>
                            </div>
                        </div>
                        <div class="r item second">
                            <div class="icon">
                                <img src="../../images/report_out.png" alt="">
                            </div>
                            <div class="detail">
                                <p class="txt znv-ellipsis">出港报告数</p>
                                <count class="count" :value="outReportCount"></count>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 月 -->
                <div class="content" v-show="activeIndex === 1">
                    <div class="chart" ref="month"></div>
                </div>

                <!-- 年 -->
                <div class="content" v-show="activeIndex === 2">
                    <div class="chart" ref="year"></div>
                </div>

                <date-nav class="date-nave" v-model="activeIndex"></date-nav>

                <div class="tit znv-ellipsis">
                    船籍港船舶在港数
                    <span class="count">356</span>
                </div>
            </div>
        </wrap>
    </div>
</template>

<script>
import Wrap from '../wrap'

import Echarts from 'echarts'
import optMonth from '../echartsOpt/inOutMonth'
import optYear from '../echartsOpt/inOutYear'

// 组件
import DateNav from 'dateNav'
import Count from 'count'

export default {
    name: 'in-out',
    props: [ 'selecedId' ],
    model: {
        prop: 'selecedId',
        event: 'change'
    },
    components: {
        'wrap': Wrap,
        'date-nav': DateNav,
        count: Count
    },
    data () {
        return {
            list: [ {
                label: '进出港统计',
                name: 'in-out'
            } ],

            activeName: 'in-out',

            inShipCount: 493, // 进港船数
            outShipCount: 367, // 出港船数
            inReportCount: 298, // 进港报告数
            outReportCount: 198, // 出港报告数

            activeIndex: 0, // 0: 日, 1: 月, 2: 年
            isResizeA: false,
            isResizeB: false,
        }
    },

    created () {
        this.activeIndex = this.selecedId
        this.resize = this.resize.bind( this )
        window.addEventListener( 'resize', this.resize )
    },

    destroyed () {
        window.removeEventListener( 'resize', this.resize )
    },

    watch: {
        activeIndex ( value ) {

            this.$emit( 'changeIndex', value )

            if ( !this.$refs.month || !this.$refs.year ) {
                return
            }

            // 有延迟队列, 在找不到元素的时候, echarts 默认 100px
            switch ( value ) {
                case 1: // 月
                    window.setTimeout( () => {
                        if ( !this.chartMonth ) {
                            this.chartMonth = echarts.init( this.$refs.month )
                            this.drawMonth()
                        }
                        this.resize()
                    }, 10 )
                    break
                case 2: // 年
                    window.setTimeout( () => {
                        if ( !this.charYear ) {
                            this.charYear = echarts.init( this.$refs.year )
                            this.drawYear()
                        }
                        this.resize()
                    }, 10 )
                    break

                default:
                    break
            }
        }
    },

    methods: {
        /**
         * tab 栏的点击事件
         * @param { Vue } vm 栏选项的实例, index, value
         */
        tabClick ( vm ) {
            console.log( 'vm:', vm )
        },

        dataNavClick ( index ) {
            console.log( 'index:', index )
        },

        drawMonth () {
            let w = window.innerWidth / 1920
            let h = window.innerHeight / 1080
            if ( this.chartMonth ) {
                this.chartMonth.setOption( optMonth( w, h ) )
            }
        },

        drawYear () {
            let w = window.innerWidth / 1920
            let h = window.innerHeight / 1080
            if ( this.charYear ) {
                this.charYear.setOption( optYear( w, h ) )
            }
        },

        resize () {

            // Fixed: 解决屏幕变化图标自适应显示动画的问题.
            switch ( this.activeIndex ) {
                case 0:
                    this.chartMonth = null
                    this.chartYear = null
                    break;
                case 1:
                    this.drawMonth()
                    this.chartMonth.resize()
                    this.chartYear = null
                    break;
                case 2:
                    this.drawYear()
                    this.charYear.resize()
                    this.chartMonth = null
                    break;

                default:
                    break;
            }
        },
    }
}
</script>

<style lang="less" scoped>
.in-out {

    .tit {
        position: absolute;
        left: 0;
        top: 0;
        color: #fff;
        font-size: .px2vh( 14 )[@result];
        line-height: 3.91vh;
        padding-left: .px2vw( 19 )[@result];

        .count {
            color: rgba(0, 249, 253, 1);
            font-weight: bold;
            background-size: .px2vh( 18 )[@result];
            line-height: 3.91vh;
            padding-left: .px2vw( 10 )[@result];
        }
    }

    .date-nav {
        position: absolute;
        right: .7vw;
        top: .8vh;
    }

    .content {
        .setWH();
        padding-top: 3.91vh;

        .content-item.t {
            .icon img {
                width: .px2vw(40)[@result];
                height: .px2vh(31)[@result];
            }
        }
        .content-item.b {
            .icon img {
                width: .px2vw(40)[@result];
                height: .px2vh(42.67)[@result];
            }
        }

        .content-item {
            width: 100%;
            height: 50%;

            .item {
                float: left;
                width: 50%;
                height: 100%;
            }

            .detail, .icon {
                float: left;
            }

            .item.second .icon {
                padding-left: .5vw;
            }

            .icon {
                padding-left: 1vw;
                height: 100%;
                line-height: 100%;
                vertical-align: middle;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;

                img {
                    // flex: 1;
                    // display: inline-block;
                    // margin: auto;
                    // width: 2.1vw;
                    // height: 2.84vh;
                }
            }

            .detail {
                .txt {
                    font-size: 1.42vh;
                    color: #fff;
                    text-align: center;
                    margin-top: 1vh;
                    margin-bottom: .8vh;
                }

                .count {
                    margin-left: 1vw;
                }
            }
        }
    }

    .chart {
        .setWH();
    }
}
</style>
