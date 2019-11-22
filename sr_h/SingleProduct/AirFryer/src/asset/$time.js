/**
 * @fileOverview 处理时间的对象
 * @author ZP
 * @version 1.0
 */

import Vue from 'vue';

const REG = /-|:|(\.\d*)/g;
const REG_UTC = /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/;
const MINUTES = 60;

export const Time = class Time {
    constructor ( {
        delay = 1000,
        divider = ':'
    } = { } ) {
        this.now = this.getNow();                   // 创建的 $time 实例的时间
        this.delay = delay;                         // 倒计时步长
        this.timer = -1;                            // 倒计时 ID
        this.dividerTimer = -1;                     // 分隔符倒计时 ID
        this.MINUTES = MINUTES;                     // 单位
        this.dividers = [ divider, ' ' ];           // 控制分隔符的切换
        Vue.set( this, '_flag', true );             // 单位秒
        Vue.set( this, 'workTime', 0 );             // 单位秒
        Vue.set( this, 'divider', divider );        // 分隔符
    }

    /**
     * 获取当前时间
     * @return { Date } 当前时间对象
     */
    getNow () {
        return new Date();
    }

    /**
     * 时间转换为字符串
     * 例如: 9分钟 => 09
     * @param { Number } val 传入要转换的时间
     * @return { String } 转换后的字符串
     */
    toString ( val ) {
        val = +val;
        if ( val <= 0 ) {
            return '00';
        }
        return val > 9 ? val + '' : '0' + val;
    }

    /**
     * 某个时间点距当前时间几个小时几分钟几秒, 总共差多少毫秒
     * @param { Date } time 某个时间点
     * @return { Object } 返回一个保护剩余小时, 剩余分钟, 剩余秒数的对象
     */
    toTime ( time ) {
        let res = new Date( Math.abs( this.getNow().getTime() - time.getTime() ) );
        return {
            hours: res.getHours() - 8,
            minutes: res.getMinutes(),
            seconds: res.getSeconds(),
            step: res                       // 总共差多少毫秒
        };
    }

    /**
     * 判断给定时间是否在今天内
     * @param { Number } hour 小时数
     * @param { Number } min 分钟数
     * @return { Boolean } 是否是今天内的时间
     */
    isToday ( hour, min ) {
        let t = this.getNow();
        let t2 = t
            .toString()
            .replace( /\s(\d\d):/, ` ${this.toString( hour )}:` )
            .replace( /:(\d\d):/, `:${this.toString( min )}:` );
        t2 = new Date( t2 );
        return t2.getTime() - t.getTime() > 0;
    }

    /**
     * 将设备获取到的时间值装换为 IOS 格式时间
     * @param { String } '20180101T181511Z' 时间格式字符串, 获取设备历史数据时候的格式
     * @return { String } '2018-01-01T18:15:11.000Z' 时间格式字符串
     */
    DevToIOSString ( str ) {
        return str.replace( REG_UTC, '$1-$2-$3T$4:$5:$6.000Z' );
    }

    /**
     * 将 IOS 格式时间转换为 设备获取到的时间值
     * @param { String } '2018-01-01T18:15:11.000Z' 时间格式字符串
     * @return { String } '20180101T181511Z' 时间格式字符串, 获取设备历史数据时候的格式
     */
    IOSToDevString ( time ) {
        return time.replace( REG, '' );
    }

    /**
     * 清除定时器自身的定时器
     */
    clearInterval () {
        window.clearInterval( this.timer );
        window.clearInterval( this.dividerTimer );
        this.divider = this.dividers[ 0 ];
        this._flag = false;
        return this;
    }

    /**
     * 开启定时器
     * @param { Function } fn 倒计时结束时执行的函数
     */
    setInterval ( fn ) {
        this.clearInterval( this.timer );
        this.timer = window.setInterval( () => {
            if ( this.workTime-- <= 1 ) {
                this.clearInterval();

                // 倒计时结束时执行
                if ( typeof fn === 'function' ) {
                    fn( this );
                }
            }
        }, this.delay );
        return this;
    }

    /**
     * 向上取 10 的整倍数
     * @example 11 => 20, 9 => 10
     * @param { Number } time 小时或者分钟
     * @return { Number } 取整后的时间
     */
    upperTime ( time ) {
        return Math.ceil( time / 10 ) * 10;
    }

    /**
     * 倒计时中间的冒号动画
     * 单位秒
     */
    dividerAction () {
        this.clearInterval();
        this.dividerTimer = window.setInterval( () => {
            this.divider = this.dividers[ +this._flag ];
            this._flag = !this._flag;
        }, this.delay );
    }
};

let $time = new Time();

export default $time;

export const time = {
    data () {
        return {
            time: $time
        };
    },

    computed: {
        m () {          // 倒计时: 分
            return $time.toString( Math.floor( $time.workTime / MINUTES ) );
        },
        s () {          // 倒计时: 秒
            return $time.toString( $time.workTime % MINUTES );
        },
        h () {          // 倒计时: 时
            return $time.toString( Math.floor( $time.workTime / MINUTES / MINUTES ) );
        },
        divider () {    // 倒计时中间的冒号
            return $time.divider;
        }
    }
};
