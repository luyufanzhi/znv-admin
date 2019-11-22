import common from './common.js'

const KEY       = 'hilink';
const METHODS   = 'getDevCacheAll setDeviceInfo modifyTitleStatus modifyTitleBar addMessage removeMessage jumpTo getDevHistory';
const CALLBACK  = 'callback';
const SPACE_RGE = /\s+|,\s*|\|\s*|-\s*/;
const NAME      = 'devCallback';
const ERROR 	= 'Cannot find module ';

// 控制是否模拟上报
let isReport    = true;

/**
 * api 接口
 * @param { String } name
 */
export default function ( services, name ) {
	if ( !common.isArray( services ) ) return null;

	name = name || NAME;

	const hilink = window.hilink;

	let api = {};

	let { parse, type, extend } = common, stringify = JSON.stringify;

	// catchFn: trycatch 模拟
	let catchFn;

	let sid, data, key, len, sendStr;

	// 缓存, 用来修改下发
	let cacheData = extend( [ ], services );

	extend( api, {
		_name: name || NAME,
		services,
		isReset: false,
		delay: 200,
		// 所有的回调函数集合
		callbacks: undefined,
		sid: { },

		/* 获取全局 */
		getDevCacheAll() {
			console.warn( 'getDevCacheAll' );
			catchFn( _ => hilink.getDevCacheAll( '0', '', name + '.getDevCacheAll' + CALLBACK ), 'getDevCacheAll', null );
		},

		/* 下发状态 */
		setDeviceInfo( data, keys ) {
			// param data: { switch: { on: 1 } }
			sendStr = stringify( api.convertData( data, keys ) );
			console.warn( `下发: ${ sendStr }` );
			catchFn( _ => hilink.setDeviceInfo( '0', sendStr, name + '.setDeviceInfo' + CALLBACK ), 'setDeviceInfo', data );
		},

		/* 设置标题栏 */
		modifyTitleStatus( data ) {
			// @param data: '热情模式'
			console.warn( `modifyTitleStatus: ${ data }` );
			catchFn( _ => hilink.modifyTitleStatus( data, name + '.modifyTitleStatus' + CALLBACK ), 'modifyTitleStatus' );
		},

		/* 设置标题栏颜色 */
		modifyTitleBar( color ) {
			// @param color: #00123456 ( 00 代表透明度 )
			console.warn( `modifyTitleBar: ${ color }` );
			catchFn( _ => hilink.modifyTitleBar( true, color, name + '.modifyTitleBar' + CALLBACK ), 'modifyTitleBar' );
		},

		/* 警告提示 */
		removeMessage( data ) {
			// @param data: { type: 2 }
			console.warn( `removeMessage: ${ stringify( data ) }` );
			catchFn( _ => hilink.removeMessage( stringify( data ), name + '.removeMessage' + CALLBACK ), 'removeMessage' );
		},
		addMessage( data ) {
			// @param data: { type: 2, key: 1, icon: 1, msg: '添加信息' }
			console.warn( 'addMessage:', stringify( data ) );
			catchFn( _ => hilink.addMessage( stringify( data ), name + '.addMessage' + CALLBACK ), 'addMessage' );
		},

		/* 拉起定时器 */
		jumpTo( url ) {
			// @param url: 'com.huawei.smarthome.timerPage'
			console.warn( 'jumpTo:', url );
			catchFn( _ => hilink.jumpTo( url, name + '.jumpTo' + CALLBACK ), 'jumpTo' );
		},

		/* 获取设备历史数据 */
		/*
			"{devid}",	//devid,string,请取”0”，表示当前设备，暂不支持其它取值
			" 0",	// pageNo,string, 缺省 0
			" 10",	// pageSize,string, 缺省 10
			" 20150501T010203Z", // startTime,string, 格式：20150501T010203Z
			" 20150601T010203Z",// endTime,string,
			" button1",	// sid,string, 为该设备的 service id，取值参见HiLink Profile定义
			" on",	// character,string, 为该设备的characteristicName，取值参见HiLink Profile定义
				"resultCallback"  //resultCallback，成功或失败时，将调用传入resultStr返回结果
		*/
		// 注意要传入的时间必须减去 8 小时.
		// { startTime: '20180131T090000Z', endTime: '20180131T110000Z', sid: 'joyoung', character: 'workTime' }
		getDevHistory( { pageNo = 0, pageSize = 10, startTime, endTime, sid, character = '' } ) {
			catchFn( _ => hilink.getDevHistory( 0, pageNo, pageSize, startTime, endTime, sid, character, name + '.getDevHistory' + CALLBACK ) );
		},

		/* 根据 sid 获去数据对象 */
		getSid( sid, target ) {

			target = target || services;
			return target[ target.findIndex( ele => ele.sid === sid ) ];
		},

		/* 设备用户级别打印信息 */
        deviceLog( tag, msg, flag ) {

            if ( window.hilink && type( window.hilink.printLog ) === 'function' ) {
                window.hilink.printLogDebug( !flag, 'H5_' + tag, JSON.stringify( msg ) );
            }
        },

		/* 下发成功, errcode === 0 */
		success: undefined,

		/* 下发失败, errcode !== 0 */
		error: undefined,

		/* 获取全局信息的时候调用 */
		callback: undefined,

		/* 提交 */
		commit( source, res ) {

			// 保存旧数据
			extend( cacheData, services );
			// 赋值, 页面更新
			extend( source, res );
		},

		commitAll( data ) {
			services.forEach( ( el, index ) => {
				sid = data.findIndex( ele => ele.sid === el.sid );
				if ( sid === -1 ) return;
				extend( cacheData[ index ], data[ sid ] );
				el.data && extend( el.data, data[ sid ].data );
			} );
		},

		/* 转换下发的数据 */
		convertData( res, keys ) {
			// return { switch: { on: 1 }
			let obj = res.data, data = { };

			if ( keys == null ) {
				// 根据 sid 下发
				for ( key in obj ) {
					data[ key ] = obj[ key ];
				}
			} else {
				// 单独下发属性值
				if ( keys.split ) keys = keys.split( SPACE_RGE );
				for ( key in obj ) {
					if ( keys.some( el => key === el ) ) {
						data[ key ] = obj[ key ];
					}
				}
			}

			return { [ res.sid ]: data };
		},
	} );

	/* 根据单独下发整个 sid */
	api.send = keys => {

		if ( keys == null ) {
			api.getDevCacheAll();
		} else {
			// key.split( SPACE_RGE ).forEach( el => {
			// 	console.log('el', api.sid, el );
			// 	api.setDeviceInfo( api.sid[ el ].data.data );
			// } );
			keys.split( SPACE_RGE ).forEach( el => api.setDeviceInfo( api.getSid( el ) ) );
		}
	}

	/* 添加 sid 和 send 属性 */
	services.forEach( ( el, index ) => {
		let val;

		sid   = el.sid;
		data = api.getSid( sid, cacheData );
		val = data.data;

		// api.sid[ sid ] = data.data;

		/* 监听变化, 单独下发 */
		api.sid[ sid ] = { };
		for ( key in val ) {

			( ( sid, key ) => {

				let obj = {
					get() {
						return api.getSid( sid, cacheData ).data[ key ];
					},
					set( val ) {

						// TODO: 值没改变不下发
						if ( type( val ) === 'object' ) {
							if ( val.keys === null || val.keys == null ) {
								// 修改缓存数据下发
								api.getSid( sid, cacheData ).data[ key ] = val.val;
								return;
							}
						} else {
							let obj = api.getSid( sid, cacheData );
							obj.data[ key ] = val;
							api.setDeviceInfo(  obj, key );
						}
					}
				};

				Object.defineProperty( api.sid[ sid ], key, obj );
			} )( sid, key );
		}

		if ( data ) {
			api.send[ sid ] = ( data => keys => api.setDeviceInfo( data, keys ) )( data );
		}
	} );

	/* try catch */
	catchFn = ( fn, name, data ) => {
		// data: { sid: 'switch', data:{ on: 1 } }
		try {
			fn();
		} catch ( error ) {
			console.warn('catch:', data ? name + ': ' + stringify( data ) : name );

			if ( isReport ) {		/* 模拟上报 */
				report( data );
			} else {				/* 网页调试 */
				localhostDebugger( data );
			}
		}
	}

	/* 添加全局对象 */
	api.callbacks = ( window[ name ] = {} );

	/* 设备上报 */
	window[ 'deviceEventCallback' ] = res => {
		data = parse( res );
		console.warn( `设备上报: ${ res }` );
		api.commit( api.getSid( data.sid ), data );
	}

	/* 添加回调函数 */
	METHODS.split( SPACE_RGE ).forEach( el => {
		key = el + CALLBACK;

		switch (el) {
			case 'getDevCacheAll':

				api.callbacks[ key ] = res => {
					console.warn( `Res: ${ res }` );
					data = parse( res );
					// api.commit( services, data.services );
					api.commitAll( data.services );
					api.isReset = true;

					type( api.callback ) === 'function' && api.callback( api.sid );
				};
				return;

			case 'getDevHistory':
				api.callbacks[ key ] = res => {
					console.warn( `getDevHistory: ${ stringify( res ) }` );
				};
				return;
		}

		/* 判断回调是否成功 */
		api.callbacks[ key ] = res => {
			res      = parse( res );
			let code = res.errcode;

			if ( 0 === code ) { 		// 成功
				console.warn( `下发成功, errorCode: `, res.errcode );
				type( api.success ) === 'function' && api.success( services );
				return;
			} else {					// 失败
				console.warn( `下发失败, errorCode: `, res.errcode );
				type( api.error ) === 'function' && api.error( services );

				switch (code) {
					case 10:			// 设备请求没有响应
						break;
					case 11:			// 设备已离线
						break;
					case 12:			// 设备数据参数校验非法，在设备控制参数校验失败时，返回APP或者云端
						break;
				}
			}
		}
	}, services );


	/* 模拟上报 */
	function report( data ) {
		const UNIT = '.json';

		let error = response => {
			console.error( ERROR + api._name + '_' + data.sid + UNIT );
			localhostDebugger( data );
		};

		if ( data !== null && data != null ) {

			import( '../json/' + api._name + '_' + data.sid + UNIT ).then( response => {
				console.warn( `模拟上报: ${ stringify( response ) }` );
				api.commit( api.getSid( data.sid ), response );
			}, error );
		} else if ( data === null ) {

			import( '../json/' + api._name + UNIT ).then( response => {
				data = response.services;
				console.warn( `模拟上报-All: ${ stringify( data ) }` );
				api.commitAll( data );
				api.isReset = true;

				callback( api.sid );
			}, error );
		}
	}

	function localhostDebugger( data ) {
		// 整个 sid 对象覆盖
		window.setTimeout( _ => {
			if ( data == null ) return;
			extend( api.getSid( data.sid ), data );
			api.isReset = true;
		}, api.delay );
	}

	function callback( data ) {
		type( api.callback ) === 'function' && api.callback( data );
	}

	return api;
};