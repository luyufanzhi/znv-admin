// import CESIUM_CONFIG from '@/config/cesium'
import z from 'zp-z'
import viewPosition from '@map/config/position'

const _resolve = Symbol( 'resolve' )

let count = 0

export default class MapCtl {

    constructor ( { detail = '' } = { } ) {
        Object.assign( this, {
            detail,
            callbacks: null, // 点击队列
            handler: null, // 点击
            isAnimation: false, // 地图是否处于动画( 飞行, 旋转 )
            viewer: null,
            sensor: {}, // 传感器
            id: `cesiumContainer-${count++}`,
        } )

        this.promise = new Promise( ( resolve, reject ) => {
            this[ _resolve ] = resolve // promise 中的 resolve
        } )
    }

    /**
     * @constructor
     * @param { String } container element selecter
     */
    init () {
        console.log( '>>> Cesium Init' )

        this.viewer = new Cesium.Viewer( this.id, {
            infoBox: true,
            selectionIndicator: true, // 绿色边框的开关
        } );

        this.viewer.imageryLayers.addImageryProvider( new Cesium.TiandituImageryProvider( {
            credit: new Cesium.Credit(
                '天地图全球影像服务 数据来源：国家地理信息公共服务平台 & 四川省测绘地理信息局'
            ),
            token: URL_CONFIG.TOKEN_TIANDITU
        } ) )

        this[ _resolve ]( this.viewer )
    }

    /**
     * 地图点击事件
     * @param { Funtion } fn 点击回调事件
     */
    click ( fn ) {
        if ( this.callbacks ) {
            this.callbacks.add( fn )
        } else {
            this.callbacks = z.Callback()
            this.callbacks.add( fn )

            this.handler = new Cesium.ScreenSpaceEventHandler( this.viewer.scene.canvas )

            this.handler.setInputAction( ( e ) => {
                this.callbacks.fire( e )
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK );
        }
    }

    /**
     * 注册自定义事件
     * @param { Sensor } sensor 传感器
     */
    register ( sensor, init ) {
        console.log( '>>> Register:', sensor.type )
        if ( this.sensor[ sensor.type ] == null ) {
            this.sensor[ sensor.type ] = sensor
        }
        if ( typeof init === 'function' ) {
            init( sensor )
        }
    }

    /**
     * 清除所有自定义事件
     */
    clear () {
        console.log( '>>> Clear all custom event' )
        let type
        for ( type in this.sensor ) {
            this.sensor[ type ].detach()
        }
    }

    /**
     * 注销点击事件
     * @param { Function } fn 要删除的事件
     */
    remove ( fn ) {
        if ( this.callbacks ) {
            this.callbacks.remove( fn )
        }
    }

    /**
     * 设置视角
     * @param { String } type
     */
    setView ( type ) {
        type = type == null ? 'DEF' : type;
        let opt = viewPosition[ type ];
        if ( opt ) {
            this.viewer.scene.camera.setView( opt );
        }
        return this;
    }
}
