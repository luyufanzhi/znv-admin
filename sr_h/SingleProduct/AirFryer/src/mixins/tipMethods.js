/**
 * Tip.vue 中的提交事件
 */

import Bus from '@/common/bus.js';
import $time from '@/asset/$time.js';
import recipes from '@/dictionary/recipes.js';
import common from '@/common/common.js';

import { CURRECIPES, STARTWORK, KEEPHOT, PASSHOT, SUPPORT_TIME } from '@/dictionary/constant.js';

export default {
    methods: {

        /**
         * 预约提示提交事件
         */
        appointPickerSubmit ( [ h, m ] ) {

            let res;
            let isToday = $time.isToday( h, m );
            let pre = ( +this.hours ) * 60 + ( +this.minMinutes );

            res = ( +h ) * 60 + ( +m );

            // console.log( 'isToday', isToday, this.minMinutes, this.hours, this.workTime, h, m );
            if ( isToday ) {    // 今天

                if ( res - pre >= 0 ) {
                    return this.sendPre( h, m );
                }
                this.isShow.tips = STARTWORK;
            } else {            // 明天
                res += 24 * 60;

                if ( res - pre <= SUPPORT_TIME * 60 ) {
                    return this.sendPre( h, m );
                }
                this.isShow.warnBox = true;
            }

            this.isShow.appointPicker = false;
        },

        /**
         * 取消预约是 cancel 事件
         */
        confirmBoxCancel () {
            this.isShow.confirmBox = false;

            // 改变按钮状态
            Bus.$emit( 'cancelActive' );
        },

        /**
         * 取消预约 submit 事件
         */
        confirmBoxSubmit () {
            this.isShow.confirmBox = false;

            // 下发取消
            this.cancel();
        },

        /**
         * 再烹一下
         * 工作完成 cancel 事件
         */
        completeCancel () {
            this.isShow.complete = false;

            // 跳转到设定参数页面
            this.go( '/set', { tit: 1 } );
        },

        /**
         * 我知道了
         */
        completeSubmit () {
            this.isShow.complete = false;
            this.go( '/cook' );
        },

        /**
         * 是否保持预热 submit 事件
         */
        tipsSubmit () {
            switch ( this.isShow.tips ) {
            case KEEPHOT:

                // 下发保持预热
                this.keepWarn();
                break;
            case PASSHOT:

                // 下发跳过预热
                this.passWarn();
                break;
            case STARTWORK:
                this.startWork( recipes[ common.getItem( CURRECIPES ) ] );
                break;
            }

            // 改变按钮状态
            Bus.$emit( 'cancelActive' );
            this.isShow.tips = false;
        },

        /**
         * 保持预热提示以及跳过预热提示 cancel 事件
         */
        tipsCancel () {
            this.isShow.tips = false;

            // 改变按钮状态
            Bus.$emit( 'cancelActive' );
        }
    }
};
