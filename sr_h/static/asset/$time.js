/**
 * 处理时间的对象
 */

const REG = /-|:|(\.\d*)/g;
const REG_UTC = /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/;

export const Time = class Time {
    constructor ( { delay = 1000 } ) {
        this.now = this.getNow();       // 创建的 $time 实例的时间
        this.delay = delay;             // 倒计时步长
        this.timer = null;              // 倒计时 ID
    }

    /**
     * 获取当前时间
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
        if ( val <= 0 ) {
            return '00';
        }
        return val > 9 ? val + '' : '0' + val;
    }

    /**
     * 某个时间点距当前时间差值
     * @param { Date } time 某个时间点
     * @return { Object } 返回一个保护剩余小时, 剩余分钟, 剩余秒数的对象
     */
    toTime ( time ) {
        let res = new Date( Math.abs( this.getNow().getTime() - time.getTime() ) );
        return {
            hours: res.getHours() - 8,
            minutes: res.getMinutes(),
            seconds: res.getSeconds()
        };
    }

    /**
     * 判断是否为今天
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
        return this;
    }

    /**
     * 开启定时器
     */
    setInterval ( fn ) {
        this.clearInterval( this.timer );
        this.timer = window.setInterval( _ => {
            if ( typeof fn === 'function' ) {
                fn( this );
            }
        }, this.delay );
        return this;
    }
};

export default new Time();
