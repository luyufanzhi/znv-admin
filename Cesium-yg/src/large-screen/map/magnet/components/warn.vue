<template>
    <!-- 告警统计 -->
    <div class="warn">
        <wrap :list="list" v-model="activeName" >
            <div class="warn-item" slot="warn">
                <div class="content warn" ref="map"></div>
                <date-nav class="date-nav" v-model="activeIndex"></date-nav>
            </div>
            <div class="warn-item" slot="list">
                <div class="content list">
                    <div class="table">
                        <div class="row th">
                            <div class="cell">类型</div>
                            <div class="cell">时间</div>
                            <div class="cell">船名</div>
                        </div>
                        <div class="tbody">
                            <div class="row tr" v-for="( item, index ) in 20" :key="index">
                                <div class="cell">证书过期</div>
                                <div class="cell">19:26:28</div>
                                <div class="cell">01:25:13</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </wrap>
    </div>
</template>

<script>
import Wrap from '../wrap'
import DateNav from 'dateNav'

import opt from '../echartsOpt/warnEchartsOpt'

// 插件
import echarts from 'echarts'

export default {
    name: 'warn',
    components: {
        'wrap': Wrap,
        'date-nav': DateNav
    },
    data () {
        return {
            list: [ {
                label: '告警统计',
                name: 'warn'
            }, {
                label: '告警列表',
                name: 'list'
            } ],

            activeName: 'warn',
            activeIndex: 0,
        }
    },

    created () {
        this.resize = this.resize.bind( this )
        this.$nextTick( () => {
            this.chart = echarts.init( this.$refs.map )
            this.drawEchart()
            // 自适应
            window.addEventListener( 'resize', this.resize )
        } )
    },

    destroyed () {
        window.removeEventListener( 'resize', this.resize )
    },

    methods: {
        /**
         * tab 栏的点击事件
         * @param { Vue } vm 栏选项的实例, index, value
         */
        tabClick ( vm ) {
            console.log( 'vm:', vm )
        },

        drawEchart () {
            let w = window.innerWidth / 1920
            let h = window.innerHeight / 1080
            this.chart.setOption( opt( w, h ) )
        },

        resize () {
            this.drawEchart()
            this.chart.resize()
        }
    }
}
</script>

<style lang="less" scoped>
.warn {

    .date-nav {
        position: absolute;
        right: .7vw;
        top: .8vh;
    }

    .content {
        .setWH();

        &.warn {
            padding-top: 3.91vh;
        }

        .table {
            display: flex;
            flex-direction: column;

            .setScroll( tbody );
            .tbody {
                overflow-y: auto;
                flex: 1;
            }

            .setWH();

            .row:not(.th):hover {
                background:rgba( 0,84,169,0.3 );
            }

            .row.th {
                background-color: transparent;
            }
            .row.active {
                background-color: rgba(0, 27, 59, .3);
            }
            .row {
                width: 100%;
                height: .px2vh( 32 )[@result];
                background-color: #001b3b;
                font-size: .px2vh( 16 )[@result];
                line-height: .px2vh( 32 )[@result];

                .cell {
                    width: 100% / 3;
                    text-align: left;
                    color: #fff;
                    float: left;
                    .setEllipsis ();
                    text-indent: .px2vh( 14 )[@result];
                }
            }
        }
    }
}
</style>
