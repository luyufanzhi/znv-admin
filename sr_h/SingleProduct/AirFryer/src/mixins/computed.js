/**
 * App.vue
 * 接收设备上报的信息, 计算属性
 * description:
 *      1. 这里是对设备上报的数据做异常处理
 *      2. 只接收 GET 属性
 */

import data from './data.js';
import common from '@/common/common.js';

/**
 * 处于不接收状态时, 所有的带有 PUT 属性的上报信息不接收
 * @param { String } key sid cook 下面的字段
 */
function getReport ( key, fn ) {
    let res = this.cook[ key ];
    let cache = this.cache[ key ];

    // 如果为 PUT 特性并且处于不接收的状态时候, 返回旧值
    if ( this.isNoGet && this.api.isReset ) {
        return cache;
    }
    if ( typeof fn === 'function' ) {
        res = fn( res, cache );
    }

    this.cache[ key ] = res;
    return res;
}

export default {

    // data 属性
    ...data.data,

    computed: {

        /**
         * 接收设备状态
         * REPORT/GET
         */
        status () {
            let { status } = this.cook;

            if ( common.type( status ) !== 'number' && this.api ) {
                console.error( '设备上报 status 不为 Number 类型:', status );
                this.api.deviceLog( '设备上报 status 不为 Number 类型:', status );

                // return 6;       // 设备上报错误返回异常
                return this.cache.status;
            } else {
                if ( status < 0 || status > 6 ) {
                    console.error( '设备上报 status 越界:', status );
                    this.api.deviceLog( '设备上报 status 越界:', status );

                    // return 6;       // 设备上报错误返回异常
                    return 1;
                }
            }

            this.cache.status = status;

            return status;
        },

        /**
         * 接收食谱 id
         * REPORT/GET/PUT
         */
        recipes () {
            let recipes = getReport.call( this, 'recipes', ( val, cache ) => {
                if ( val > 31 || val < 0 ) {
                    return cache;
                }
                return val;
            } );
            return recipes;
        },

        /**
         * 接收温度
         * 温度：单位℃，步长5℃
         * REPORT/GET/PUT
         */
        temperature () {
            let temperature = getReport.call( this, 'temperature' );
            return temperature;
        },

        /**
         * 接收搅拌开关
         * REPORT/GET/PUT
         */
        stirSwitch () {
            let stirSwitch = getReport.call( this, 'stirSwitch' );
            return !!stirSwitch;
        },

        /**
         * 接收预热开关
         * REPORT/GET/PUT
         */
        preheatSwitch () {
            let preheatSwitch = getReport.call( this, 'preheatSwitch' );
            return !!preheatSwitch;
        },

        /**
         * 接收工作时间
         * 工作时间：分。调节步长1分钟
         * REPORT/GET/PUT
         */
        workTime () {
            let workTime = getReport.call( this, 'workTime' );
            return workTime;
        },

        /**
         * 接收剩余时间
         * 剩余时间, 单位: 分
         * REPORT/GET
         */
        leftTime () {
            return this.cook.leftTime;
        },

        /**
         * 接收预约时间: 时
         * REPORT/GET/PUT
         */
        preTimeHour () {
            let preTimeHour = getReport.call( this, 'preTimeHour' );
            return preTimeHour;
        },

        /**
         * 接收预约时间: 分
         * REPORT/GET/PUT
         */
        preTimeMin () {
            let preTimeMin = getReport.call( this, 'preTimeMin' );
            return preTimeMin;
        },

        /**
         * 接收设备上报的错误码
         */
        code () {
            let { code } = this.faultDetection;
            return code;
        }
    }
};
