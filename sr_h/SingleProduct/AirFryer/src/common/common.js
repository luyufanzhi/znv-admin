// 返回的工具对象单例
let common = { name: 'common' };

// 字符转数组的风格符
export const SPACE_RGE = /\s+|,\s*|\|\s*|-\s*/;

/**
 * 判断是否为普通对象
 * 目标对象: 例如自己创建的对象, 不包括 DOM, Window, Array, Boolean, Symbol, Math, ...
 * @param { Anyting } obj 目标对象
 * @returns { Boolean } 返回是否为目标对象
 */
function isPlainObject ( obj ) {
    let key;

    if ( obj == null || typeof obj !== 'object' || obj.nodeType || common.isWindow( obj ) ) {
        return false;
    }

    for ( key in obj ) { }

    return key === undefined || Object.hasOwnProperty.call( obj, key );
}

/**
 * 判断是否为 window 对象
 * @param { Anyting } obj 目标对象
 * @returns { Boolean } 返回是否 window 对象的结果
 */
function isWindow ( obj ) {
    return obj != null && obj === obj.window;
}

/**
 * jQuery 中扩展对象函数, 默认为深拷贝, 具体传值参考 jQuery 文档
 * @returns { Object } 返回目标值
 */
common.extend = function ( ...rest ) {
    let src, copyIsArray, copy, name, options, clone,
        target = rest[ 0 ] || {},
        i = 1,
        length = rest.length,
        deep = true;

    // Handle a deep copy situation
    if ( typeof target === 'boolean' ) {
        deep = target;

        // skip the boolean and the target
        target = rest[ i ] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== 'object' && !( typeof obj === 'function' ) ) {
        target = {};
    }

    // extend jQuery itself if only one argument is passed
    if ( i === length ) {
        target = this;
        i--;
    }

    for ( ; i < length; i++ ) {

        // Only deal with non-null/undefined values
        if ( ( options = rest[ i ] ) != null ) {

            // Extend the base object
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                // Prevent never-ending loop
                if ( target === copy ) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if ( deep && copy && ( isPlainObject( copy ) ||
                    ( copyIsArray = Array.isArray( copy ) ) ) ) {

                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && Array.isArray( src ) ? src : [];

                    } else {
                        clone = src && isPlainObject( src ) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[ name ] = common.extend( deep, clone, copy );

                    // Don't bring in undefined values
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    return target;
};

common.extend( {

    isPlainObject,
    isWindow,
    SPACE_RGE,

    /* 判断是否为数组 */
    isArray: Array.isArray,

    /**
     * 获取对象类型
     * @param { Anyting } obj 目标对象
     * @returns { String } 返回对象类型
     */
    type: function ( obj ) {
        if ( obj == null ) {
            return obj + '';
        }
        return typeof obj;
    },

    /**
	 * 转换数据为对象
	 * @param { String } res 转换设备上报的字符数据为对象
	 */
    parse ( res ) {
        let data;
        try {
            data = JSON.parse( res );
        } catch ( err ) {

            res = res.replace( /:"{/g, ':{' );
            res = res.replace( /}",/g, '},' );
            res = res.replace( /}"}/g, '}}' );
            res = res.replace( /\\/g, '' );
            try {
                data = JSON.parse( res );
            } catch ( error ) {
                console.error( 'RES 数据解析失败：' + error.message );
            }
        }
        return data;
    },

    // 缓存函数的长度
    cacheLength: 100,

    /**
	 * jQuery 的缓存函数
	 */
    createCache () {
        let keys = [ ];

        function cache ( key, value ) {

            // Use (key + ' ') to avoid collision with native prototype properties (see Issue #157)
            if ( keys.push( key + ' ' ) > common.cacheLength ) {

                // Only keep the most recent entries
                delete cache[ keys.shift() ];
            }
            return ( cache[ key + ' ' ] = value );
        }
        return cache;
    },

    /**
     * 创建选项
     * @param { String } keys 属性名, 例如: "isSwitch isActive"
     * @returns { Object } 返回创建好的对象, 例如: { isSwitch: true, isActive: true }
     */
    createOption ( keys ) {
        let option = { };
        keys.split( SPACE_RGE ).forEach( el => option[ el ] = true );
        return option;
    },

    /**
     * 驼峰命名转 html 规范命名
     * @param { String } name 驼峰命名的字符串
     * @returns { String } 驼峰命名转换后的结果
     */
    hyphenate ( name ) {
        return name
            .replace( /([A-Z])/g, '-$1' )
            .toLowerCase()
            .replace( /^-/, '' );
    },

    /**
     * 函数防抖
     * @param { Function } func 需要函数防抖的函数
     * @param { Number } wait 防抖的时长
     * @param { Boolean } immediate 是否第一次不执行, 缺省 undefined, 为第一次执行
     * @returns { Function } 防抖后的函数
     */
    debounce ( func, wait, immediate ) {
        let timeout, args, context, timestamp, result;
        let now = new Date();

        let later = function () {
            let last = now - timestamp;

            if ( last < wait && last >= 0 ) {
                timeout = setTimeout( later, wait - last );
            } else {
                timeout = null;
                if ( !immediate ) {
                    result = func.apply( context, args );
                    if ( !timeout ) {
                        context = args = null;
                    }
                }
            }
        };

        return function () {
            context = this;
            args = arguments;
            timestamp = new Date();
            let callNow = immediate && !timeout;
            if ( !timeout ) {
                timeout = setTimeout( later, wait );
            }
            if ( callNow ) {
                result = func.apply( context, args );
                context = args = null;
            }

            return result;
        };
    },

    /**
     * 设置本地缓存
     */
    setItem ( key, val ) {
        if ( common.type( val ) !== 'string' ) {
            val = JSON.stringify( val );
        }
        window.localStorage.setItem( key, val );
        return this;
    },

    /**
     * 获取本地缓存
     */
    getItem ( key ) {
        let res = window.localStorage.getItem( key );
        let par;
        try {
            par = JSON.parse( res );
        } catch ( e ) {
            par = res;
        }
        par = par == null ? res : par;
        return res === null ? null : par;
    }
} );

export default common;
