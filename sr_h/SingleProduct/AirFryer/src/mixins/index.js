// import Vue from 'vue';

import common from '../common/common.js';
import send from './send.js';
import recipes from '@/dictionary/recipes.js';
import Bus from '@/common/bus.js';

// import $time from '@/asset/$time.js';

// import { TIT_COLOR_ON, TIT_COLOR_OFF } from '@/dictionary/colors.js';
import { CURRECIPES, SETITEM/* , SET$TIME */ } from '@/dictionary/constant.js';

export default {

    computed: {
        curRecipes: {
            get () {
                let res = common.getItem( CURRECIPES );
                return res == null ? this.recipes : +res;
            },
            set ( val ) {
                common.setItem( CURRECIPES, val );
            }
        },

        /**
         * 是否是预约
         * @return { Boolean } 上报预约状态
         */
        isPre () {
            return this.status === 3;
        },

        /**
         * 是否能够保持预热
         * @return { Boolean } 上报预热开关为开
         */
        isKeepHot () {
            if ( this.status === 0 ) {
                return false;
            }
            return this.preheatSwitch;
        },

        /**
         * 不接收设备上报的信息
         * 所有具有 PUT 属性都不接收
         * @return { Boolean } 待机状况 | 设备异常
         */
        isNoGet () {
            return this.status === 0 || this.status === 6;
        },

        /**
         * 设备是否异常
         * @return { Boolean } status异常 | 错误码不为 0
         */
        isError () {
            return this.status === 6 || this.code !== 0;
        },

        /**
         * 是否正在工作
         */
        isWork () {
            return this.status !== 0 && this.status !== 2 && this.status !== 6;
        },

        /**
         * 是否开始倒计时
         */
        isStartInterval () {
            return this.status === 1 || this.status === 5;
        }
    },

    methods: {

        /* 跳转页面, get 请求 */
        go ( href, query ) {
            href = common.hyphenate( href );
            this.$router.push( { path: href, query } );
        },

        /* 调整页面, post 请求 */
        post ( href, params ) {
            href = common.hyphenate( href );    // { group: 1, title: 123 }
            this.$router.push( { name: href, params } );
        },

        /**
         * 改变设备头部颜色
         */
        modifyTitleBar ( path ) {
            if ( /\/home|\/cook/.test( path ) ) {

                // 设置 title 栏颜色
                // return this.api.modifyTitleBar( TIT_COLOR_OFF );
            }

            // this.api.modifyTitleBar( TIT_COLOR_ON );
        },

        /**
         * 判断该菜谱是否处于制作中
         */
        isDisable ( $index ) {
            return this.status !== 0 && !this.isError &&
                $index !== this.recipes && this.status !== 2;
        },

        // 下发函数
        ...send.methods
    },

    /**
     * 路由变化
     */
    beforeRouteLeave ( to, from, next ) {
        this.modifyTitleBar( to.path );

        if ( /\/home/.test( to.path ) ) {
            this.api.modifyTitleStatus( recipes[ +this.curRecipes ].name );
        }

        // 从 params 离开的时候
        if ( /\/set|\/diy/.test( from.path ) ) {
            try {
                Bus.$emit( SETITEM );
            } catch ( e ) {
                console.error( '缓存设置信息出错' );
                this.api.deviceLog(
                    'getParamsData',
                    '缓存设置信息出错'
                );
            }
        }

        // if ( /\/set|\/detail/.test( from.path ) ) {
        //     console.log( 'lksjflakjf:' );
        //     this.api.setTitleVisible( true );
        //     this.api.setTitleEnable( true );
        // }

        next();
    }
};
