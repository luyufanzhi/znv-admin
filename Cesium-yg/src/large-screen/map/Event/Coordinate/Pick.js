/**
 * @file 坐标拾取
 * @detail 点击生成 entity 点, 获取坐标
 */

import Sensor from '../Sensor'
import CesiumCtl from '../../Model/CesiumCtl'
import Entites from '../../Model/Entites'
import {
    PickEvent, Point
} from './CoordinateEvent'

const onPick = Symbol( 'onPick' )
const onClick = Symbol( 'onClick' )

export default class Pick extends Sensor {
    static type = 'Pick'

    constructor ( container = [ ], option = { } ) {
        super( container, option )

        if ( typeof option.pick === 'function' ) {
            this.pick( option.pick )
        }

        this[ onClick ] = this[ onClick ].bind( this )

        this.entities = new Entites( {
            type: 'pick',
            detail: '坐标拾取'
        } )
    }

    /**
     * 注册事件
     */
    attach() {
        console.log( '>>> 注册坐标取点.' )
        CesiumCtl.click( this[ onClick ] )
        return this
    }

    /**
     * 删除事件
     */
    detach() {
        console.log( '<<< 注销坐标取点.' )
        this.remove()
        CesiumCtl.remove( this[ onClick ] )
        return this
    }

    /**
     * 依赖于地图点击事件
     * @param { Event } event 地图点击事件对象
     */
    [ onClick ] ( event ) {
        // 删除之前添加的点
        this.remove()
        // 获取坐标
        let c3 = Point.toC3( event.position );
        let point = Point.c3ToFd( c3 )
        let entity = new Cesium.Entity( {
            point : new Cesium.PointGraphics( {
                color : new Cesium.Color( 1, 1, 0 ),
                pixelSize : 10,
                outlineColor : new Cesium.Color( 0, 1, 1 )
            } ),
            position : Cesium.Cartesian3.fromDegrees( point.lng, point.lat, point.height + .5 )
        } )
        // 在点击位置添加 entity 点
        this.entities.add( entity )
        // 触发回调
        let pickEvent = new PickEvent( {
            point,
            c3,
        } )
        this[ onPick ]( pickEvent )
    }

    /**
     * 获取坐标点事件
     * @param {  } event
     */
    [ onPick ] ( event ) {
        this.trigger( event )
    }

    /**
     * 注册坐标获取事件
     * @param { Function } fn 回调事件
     */
    pick ( fn ) {
        this.on( PickEvent.type, fn )
        return this
    }

    remove () {
        this.entities.destory()
        return this
    }
}
