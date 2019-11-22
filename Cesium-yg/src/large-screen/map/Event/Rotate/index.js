/**
 * @file 地图旋转
 * @events rotate:start rotate:rotating rotate:end ( end是注销事件 )
 */

import Sensor from '../Sensor'
import CesiumCtl from '../../Model/CesiumCtl'
import {
    RotateStart, Rotating, RotateEnd, RotatePause
} from './RotateEvent'
// import Emitter from '../Emitter'

const onRotateStart = Symbol( 'onRotateStart' )
const onRotating = Symbol( 'onRotating' )
const onRotateEnd = Symbol( 'onRotateEnd' )
const onRotatePause = Symbol( 'onRotatePause' )

const onClick = Symbol( 'onClick' )

const START = 'start'
const ROTATING = 'rotating'
const END = 'end' // 注销, 不是旋转结束
const PAUSE = 'pause'

export default class Rotate extends Sensor {
    static type = 'Rotate'

    // $emitter = new Emitter()

    /**
     * @param { Array<Element> } container 触发事件的容器
     * @param { Object } option 配置信息
     */
    constructor ( container = [], option = {} ) {
        super( container, option )

        if ( CesiumCtl.viewer == null ) {
            return console.error( `<<< CesiumCtl.viewer 获取不到.` )
        }

        // this.viewer = CesiumCtl.viewer
        // this.scene = this.viewer.scene
        this.handler = new Cesium.DrawHandler( CesiumCtl.viewer, Cesium.DrawMode.Point )
        this.state = false

        // test
        // this.on( 'rotate:start', ( event ) => {
        //     console.log( 'event:', event )
        // } )

        // 这会改变地址
        this[ onRotating ] = this[ onRotating ].bind( this )
        this[ onClick ] = this[ onClick ].bind( this )
    }

    /**
     * 注册事件
     */
    attach () {
        // let handler = new Cesium.ScreenSpaceEventHandler( this.scene.canvas )
        let rotateStart = new RotateStart( {
            sensor: this
        } )

        // 点击地图如果是在旋转中, 则停止
        CesiumCtl.click( this[ onClick ] )

        // 许可要点击图层才能旋转
        console.log( '地图点击' )
        this[ onRotateStart ]( rotateStart )
        this.handler.drawEvt.addEventListener( ( event ) => { // 旋转中
            this[ onRotating ]( new Rotating( {
                sensor: this,
                nativeEvent: event
            } ) )
        } )
        this.handler.activate()
        return this
    }

    /**
     * 注销事件
     */
    detach () {
        let rotateEnd = new RotateEnd( {
            sensor: this
        } )
        this[ onRotateEnd ]( rotateEnd )
        CesiumCtl.remove( this[ onClick ] )
        return this
    }

    /**
     * 依赖于地图点击事件
     * @param { Event } event 地图点击事件对象
     */
    [ onClick ] ( event ) {
        if ( this.state !== ROTATING && this.state !== PAUSE ) {
            return
        }

        // 正在旋转
        if ( this.scene.camera._isFlyCircle ) {
            // console.log( '>>> Stop rotate.' )
            this.scene.camera._isFlyCircle = false
            this.state = PAUSE
            this[ onRotatePause ]( new RotatePause( {
                sensor: this
            } ) )
        } else {
            console.log( '>>> Reset rotate.' )
            this.handler.activate()
            this.scene.camera._isFlyCircle = true
        }
    }

    /**
     * 开始旋转
     * @param { RotateStart } event Cesuim 中的事件对象
     */
    [ onRotateStart ] ( event ) {
        console.log( '>>> onRotateStart.' )
        // event.setState( true )
        this.state = START
        this.trigger( event )
    }

    /**
     * 旋转中
     * @param { Rotating } event 事件对象
     */
    [ onRotating ] ( event ) {
        console.log( '>>> 旋转开始.' )
        window.setTimeout( () => this.state = ROTATING, 100 )
        this.scene.camera.flyCircle( event.nativeEvent.object.position, 5000 )
        this.trigger( event )
    }

    /**
     * 旋转结束
     * @param { RotateEnd } event 事件对象
     */
    [ onRotateEnd ] ( event ) {
        console.log( '<<< 注销旋转.' )
        // event.setState( false )
        this.state = END

        // 注销事件
        this.scene.camera._isFlyCircle = false
        this.handler.clear()
        this.handler.drawEvt.removeEventListener( this[ onRotating ] )
        this.trigger( event )
    }

    /**
     * 暂停旋转
     * @param { RotatePause }
     */
    [ onRotatePause ] ( event ) {
        console.log( '>>> onRotatePause.' )
        this.trigger( event )
    }
}
