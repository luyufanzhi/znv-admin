
import Vue from 'vue'

import { SEND_PARAMS, isToday, preTimeTip, PRETIME_NUM } from '../dictionary/dictionary.js'

import $time from '../assets/time.js'

let { localStorage } = window;

export default {
    methods: {

        /* 下发 */
        sendWork() {

            let joyoung = this.api.sid.joyoung;

            joyoung.program = { val: Vue.prototype.oldProgram };
            joyoung.speed = { val: Vue.prototype.oldSpeed };
            this.api.send.joyoung( SEND_PARAMS );
        },

        /* 修改下发缓存和页面显示 */
        sendParam( key, val ) {
            this.$emit( 'sendParam', key, val );
        },

        sendTime( val ) {
            this.$emit( 'update:workTime', val );
            return val;
        },

        // LEFTTIME: 这是获取云端数组
        /* 获取历史数据 */
        getDevHistory() {
            // this.api.getDevHistory( { startTime: $time.getIOSTime( 40 * 1000 ), endTime: $time.getIOSTime( -30 * 1000 ), sid: 'joyoung', pageSize: 3 } );
        },

        /**
         * 设置 localstore
         */
        setItem( key, data ) {
            data = JSON.stringify( data );
            localStorage.setItem( key, data );
        },
        getItem( key ) {
            return localStorage.getItem( key );
        },

        /**
         * 设置预约
         */
        addPreTip( a, b, c ) {
            let msg;

            // TODO: 红色改成黄色
            try {
                msg = preTimeTip
                    .replace( /{{day}}/, isToday[ +a ] )
                    .replace( /{{hours}}/, $time.toString( b ) )
                    .replace( /{{minutes}}/, $time.toString( c ) );

                console.log( 'addMessage:', msg );

                this.api.addMessage( {
                    type: PRETIME_NUM,
                    key: 1,
                    icon: 1,
                    // color: 1,
                    msg,
                } );
            } catch ( error ) {
                console.log( 'addMessage Error!' )
            }
        },
    },
}