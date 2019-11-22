
const REG = /-|:|(\.\d*)/g;
const REG_UTC = /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/;

let obj = {
    $time: null,
    $now: null,
    preCount: 2,
    nextCount: 2,
    delay: 1000,
    id: null,

    getNow() {
        obj.$time = new Date()
        return this;
    },

    toString( val ) {
        if ( val <= 0 ) return '00';
        return val > 9 ? val + '' : '0' + val;
    },

    toTime() {
        let res = new Date( ( obj.$now = new Date() ) - obj.$time );
        return {
            hours: res.getHours() - 8,
            minutes: res.getMinutes(),
            seconds: res.getSeconds(),
        };
    },

    setInterval( callback ) {
        window.clearInterval( obj.id );
        obj.id = window.setInterval( _ => {
            if ( typeof callback === 'function' ) {
                callback( obj );
            }
        }, obj.delay);
        return this;
    },

    clearInterval() {
        window.clearInterval( obj.id );
        return this;
    },

    toTimeSeconds( $time ) {
        let time = obj.toTime();
        return time.minutes * 60 + time.seconds;
    },

    addTime( hours, minutes, symbol = 1 ) {
        let res = new Date( ( hours * 60 * 60 + minutes * 60 ) * 1000 * symbol + new Date().getTime() );
        let obj = {
            hours: res.getHours(),
            minutes: res.getMinutes(),
        };
        obj.isToday = obj.hours > hours || ( obj.hours == hours && obj.minutes - minutes >= 0 );
        return obj;
    },

    toISOString( time ) {
        return time.replace( REG, '' );
    },

    getIOSTime( step ) {
        if ( typeof step === 'number' ) {
            return obj.toISOString( new Date( new Date().getTime() - step ).toISOString() );
        }
        return obj.toISOString( new Date().toISOString() );
    },

    toUTCString( str ) {
        return str.replace( REG_UTC, '$1-$2-$3T$4:$5:$6.000Z' );
    },

    isToday( hour, min ) {
        let t = new Date(), t2;
        t2 = t
                .toString()
                .replace( /\s(\d\d):/, ` ${ obj.toString( hour ) }:` )
                .replace( /:(\d\d):/, `:${ obj.toString( min ) }:` )
        t2 = new Date( t2 );
        return t2.getTime() - t.getTime() > 0;
    },
};

export default obj;