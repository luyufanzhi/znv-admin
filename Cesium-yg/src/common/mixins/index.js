/**
 * @file 一些全局使用到的状态
 */

import { mapMutations, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters( {

            /**
             * 首页是否显示工具栏. 用户天气等工具栏.
             * @return { Number } 0: 默认状态, 不显示. 1: 显示.
             */
            toolShow: 'map/toolShow',

            /**
             * 是否显示导航栏
             * @return { Boolean }
             */
            navShow: 'map/navShow',

            /**
             * 首页地图工具栏.
             * @return { Boolean }
             */
            mapShow: 'map/mapShow',
        } )
    },

    methods: {
        ...mapMutations( {

            /*
                提示框还没确定样式, 显示内容.
            */

            /**
             * 首页提示框是否显示
             * @param { Boolean } val
             */
            uTipShow: 'map/uTipShow',

            /**
             * 首页提示框显示内容
             * @param { String } val
             */
            uTipMsg: 'map/uTipMsg',

            /**
             * 首页提示框标题
             * @param { String } val
             */
            uTipTit: 'map/uTipTit',

            /**
             * 首页是否显示工具栏. 用户天气等工具栏.
             * @param { Boolean } val
             */
            uToolShow: 'map/uToolShow',

            /**
             * 首页是否显示导航栏.
             * @param { Boolean } val
             */
            uNavShow: 'map/uNavShow',

            /**
             * 首页地图工具栏.
             * @param { Boolean } val
             */
            uMapShow: 'map/uMapShow',
        } )
    }
}
