/**
 * @file 滑行
 * @events fly
 * @detail 有点类似于跟谁鼠标滑行
 */

import Sensor from '../Sensor'
import CesiumCtl from '../../Model/CesiumCtl'
import {
    FlyEvent
} from './FlyEvent'

const onMousemove = Symbol( 'onMousemove' )
const onFly = Symbol( 'onFly' )

const state = Symbol( 'state' )

const READY = 'ready'
const END = 'end'
const FLY = 'fly'
// const PAUSE = 'pause'
const SCALE = 1000000;

export default class Fly extends Sensor {
    static type = 'Fly'

    constructor ( container = [ ], option = { } ) {
        super( container, option )

        // 滑行状态
        this.state = ''

        this[ onMousemove ] = this[ onMousemove ].bind( this )
        this.handler =new Cesium.ScreenSpaceEventHandler(
            CesiumCtl.viewer.scene.canvas
        )
    }

    /**
     * 注册事件
     */
    attach() {
        console.log( '>>> 开始滑行.' )

        this.handler.setInputAction(
            this[ onMousemove ],
            Cesium.ScreenSpaceEventType.MOUSE_MOVE
        )
        this.state = READY
        return this
    }

    /**
     * 删除事件
     */
    detach() {
        console.log( '<<< 注销滑行.' )

        this.handler.removeInputAction( Cesium.ScreenSpaceEventType.MOUSE_MOVE )
        this.state = END
        return this
    }

    /**
     * 依赖于地图鼠标的 mousemove 事件
     * @param { Event } event 事件对象
     */
    [ onMousemove ] ( event ) {

        let scene = CesiumCtl.viewer.scene;
        let mousePosition = scene.pickPosition( event.endPosition );
        let cartographic = Cesium.Cartographic.fromCartesian( mousePosition );
        let longitude = Cesium.Math.toDegrees( cartographic.longitude );
        let latitude = ( Cesium.Math.toDegrees( cartographic.latitude ) * SCALE - 15000) / SCALE;

        CesiumCtl.viewer.camera.flyTo( {
            destination: Cesium.Cartesian3.fromDegrees(
                longitude,
                latitude,
                1299.022495696321
            ),
            orientation: {
                heading: 0.06061424437391327,
                pitch: -0.6109960275561157,
                roll: 33.6143213755224224e-8
            }
        } );

        this[ onFly ]( new FlyEvent() )
    }


    /**
     * 滑行事件
     * @param { FlyEvent } event 滑行事件对象
     */
    [ onFly ] ( event ) {
        this.state = FLY
        this.trigger( event )
    }

    /**
     * 注册滑行中状态
     * @param { Function } fn 滑行回调函数
     */
    fly ( fn ) {
        this.on( 'fly', fn )
    }
}
