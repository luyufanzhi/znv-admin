<template>
    <!-- 船舶统计 -->
    <div class="ship">
        <wrap :list="list" v-model="activeName" >
            <div class="ship-item" slot="ship" ref="map">

            </div>
        </wrap>
    </div>
</template>

<script>
import Wrap from '../wrap'

import opt from '../echartsOpt/shipEchartsOpt'

// 插件
import echarts from 'echarts'

export default {
    name: 'ship',
    components: {
        'wrap': Wrap
    },
    data () {
        return {
            list: [ {
                label: '船舶统计',
                name: 'ship'
            } ],

            activeName: 'ship'
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
.ship {
    .setWH();
}
</style>
