

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

    // getFullYear() {
    //     return tiem.now.getFullYear();
    // },
    // getDate() {
    //     return tiem.now.getDate();
    // },
    // getHours() {
    //     return time.now.getHours();
    // },
    // getMinutes() {
    //     return time.now.getMinutes();
    // },
    // getSeconds() {
    //     return time.now.getSeconds();
    // }
};

// let { getFullYear, getDate, getHours, getMinutes, getSeconds } = time.now;
// Object.assign( time, { getFullYear, getDate, getHours, getMinutes, getSeconds } );

export default obj;