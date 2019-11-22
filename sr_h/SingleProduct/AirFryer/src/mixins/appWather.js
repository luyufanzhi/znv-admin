/**
 * App.vue 组件的 watch 函数
 * description:
 *      这里是监听设备上报的数据变化
 */

import Vue from 'vue';
import common from '@/common/common.js';
import Bus from '@/common/bus.js';
import $time from '@/asset/$time.js';
import recipes from '@/dictionary/recipes.js';

import { ERROR_NUM, CURRECIPES } from '@/dictionary/constant.js';
import { TIT_COLOR_MASK } from '@/dictionary/colors.js';

export default {
    watch: {

        /**
         * 监听设备上报状态值
         */
        status ( val ) {
            if ( !this.api.isReset ) {
                return;
            }

            if ( val !== 0 ) {
                this.go( '/home' );
            } else {
                Bus.$emit( 'cancelActive' );
            }

            switch ( val ) {
            case 0:
                $time.workTime = recipes[ common.getItem( CURRECIPES ) ].workTime * $time.MINUTES;
                break;
            case 2:     // 工作完成
                this.isShow.complete = true;
                $time.workTime = 0;
                break;
            }

            if ( this.isStartInterval && $time.timer != null ) {
                $time.clearInterval();
                $time.dividerAction();
            } else {
                $time.clearInterval();
            }
        },

        leftTime ( val ) {
            if ( this.isStartInterval ) {

                // 按照单位分来计算
                $time.workTime = val * $time.MINUTES;
            }
        },

        /**
         * 监听错误码
         */
        code ( val ) {
            if ( val && common.type( val ) === 'number' ) {
                this.api.addMessage( {
                    type: ERROR_NUM,
                    key: 1,
                    icon: 1,
                    msg: Vue.filter( 'code' )( val )
                } );
            }
        },

        /**
         * 监听设备是否报警
         */
        isError ( val ) {
            if ( val ) {
                this.go( '/home' );
            }
        },

        /**
         * 监听设备上报的菜谱
         */
        recipes ( val ) {
            if ( this.isWork ) {
                return;
            }

            if ( val === 0 ) {  // 跳转到 diy 页面
                console.log( 'val:', val );
                return this.go( '/cook/diy' );
            }

            this.go( '/cook/recipes' );
        },

        /**
         * 监听路由设置标题栏是否显示是否可以点击
         */
        $route ( val ) {
            if ( val.name === 'detail' || val.name === 'set' ) {
                this.api.setTitleVisible( false );
                this.api.setTitleEnable( false );
            } else {
                this.api.setTitleVisible( true );
                this.api.setTitleEnable( true );
            }
        },

        /**
         * 监听弹窗
         */
        isShow: {

            // 变化 title 栏颜色
            deep: true,
            handler ( val ) {
                for ( let key in val ) {
                    if ( val[ key ] && key !== 'isAction' &&
                            key !== 'iceCupTip' && key !== 'is12Tip' ) {
                        this.api.modifyTitleBar( TIT_COLOR_MASK );
                        return;
                    }
                }

                this.modifyTitleBar( this.$route.path );
            }
        }
    }
};
