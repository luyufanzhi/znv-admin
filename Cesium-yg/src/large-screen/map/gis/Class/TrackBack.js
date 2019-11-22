/**
 * @file 轨迹回放, 播放, 暂停等功能, 添加动画
 * @author PinghuaZhuang
 */

// import MapCtl from '@map/Model/Class/MapCtl'
import CesiumCtl from '../../Model/CesiumCtl'
import Entites from '../../Model/Entites'
import Track from './Track'
import TWEEN from '@tweenjs/tween.js'
import TrackPoint from './TrackPoint'
import Emitter from '@map/Event/Emitter'

const STEP = Symbol( 'step' )
const INDEX = Symbol( 'index' )
const TIMER = Symbol( 'timer' )
const STOP = Symbol( 'stop' )
const PLAY = Symbol( 'play' )
const PAUSE = Symbol( 'pause' )
const SPEED = Symbol( 'speed' )
const COMPLETE = Symbol( 'complete' )

const animate = Symbol( 'animate' )
const onStart = Symbol( 'onStart' )
const onStop = Symbol( 'onStop' )
const onUpdate = Symbol( 'onUpdate' )
const onComplete = Symbol( 'onComplete' )

const _step = Symbol( 'step' )
const promise = Symbol( 'promise' )
const points = Symbol( 'points' )
const _state = Symbol( 'state' )

let nor = '/static/img/large-screen/ship.png'
let pre = '/static/img/large-screen/ship.png'
let start = '/static/img/large-screen/start.png'
let end = '/static/img/large-screen/end.png'

/**
 * @class 轨迹回放
 * 思路:
 *      每个区间都是一个补间, 执行完一个补间就执行下一个.
 *      有 2 个补间队列, 总的 A 队列, 所有的 B 队列.
 *
 *      暂停: 根据当前索引来创建当前补间. 新的补间队列.
 *      播放: 补间队列顺序执行.
 *      快进: 修改步长, 重新计算补间队列( 总的 )
 *      快退: ??? 1000s, 删除点. 不实现.
 *      停止: 清除定时, entities, 标签, 状态,
 */
export default class TrackBack /* extends Track */ {

    /**
     * @constructor
     * @param { Object } opt
     * @param { Number } step 播放间隔
     * @param { Array<TrackPoint> } positions 轨迹集合, 必传
     * @param { Labels } labels 标签集合.
     * @param { MapCtl } ctl 地图控制器
     */
    constructor ( {
        step = 1,
        positions = [],
        labels = {},
        ctl = CesiumCtl
    } = {} ) {
        if ( positions.length < 2 ) { // 至少需要 2 个轨迹点
            console.warn( '<<< 轨迹至少需要 2 个点.' )
            return
        }

        this.default = {
            step: step,
        }

        // 不做窗口变化自适应大小, 窗口改变大小需要刷新
        let scaleW = ( window.innerWidth / 1920 ) || .5
        let scaleH = ( window.innerHeight / 1080 ) || .5
        let _w = 56 * scaleW
        let _h = 63 * scaleH

        // 广告设置
        this.billboardOpt = {
            image: nor,
            width: _w,
            height: _h,
            // sizeInMeters: true,
            horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
            verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
        }
        // 标签设置
        this.labelOpt = {
            text: 'zxxx',
            fillColor: new Cesium.Color( 1, 1, 1, 1 ),
            show: true,
            showBackground: true,
            backgroundColor: new Cesium.Color( 7, 32, 69, 0.5 ),
            horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
            verticalOrigin : Cesium.VerticalOrigin.TOP,
            // pixelOffset: new Cesium.Cartesian2( 10, 10 )
        }

        // 动画添加点的 promise 对象
        this[ promise ] = new Promise( ( re ) => re() )

        this.billboards = new Entites( {
            detail: '图片集合.',
            ctl,
        } )
        this.corridor = new Entites( {
            detail: '走廊.',
            ctl,
        } )

        this.$t = new TWEEN.Group()
        this[ animate ] = this[ animate ].bind( this )

        this[ points ] = [] // 动态点集合
        this.points = [ /* positions[ 0 ] */ ] // 实际绘制的轨迹点数
        this.queA = [] // Array<TWEEN.Tween> 总的
        this.queB = [] // Array<TWEEN.Tween> 当前
        this.queC = [] // Array<TWEEN.Tween> 快退
        this.queD = [] // Array<TWEEN.Tween> 快退
        // this[ INDEX ] = 0 // 当前绘制到第一个点
        this[ _state ] = STOP
        this.Emitter = new Emitter()
        this.ctl = ctl

        // 标签集合
        this.labels = labels
        // 轨迹集合
        this.data = [ ...positions ]
        // 播放间隔, 设置项
        this[ _step ] = step
        this.end = new Date( this.data[ this.length - 1 ].timestamp )
        this.startTime = new Date( this.data[ 0 ].timestamp )
        this.totalTime = this.end.getTime() - this.startTime.getTime()
        // 实际计算步长
        // this[ STEP ] = step

        let startPoint = this.data[ 0 ]
        this[ points ].push( startPoint.lng, startPoint.lat )

        // 显示第一个点
        this.init()
    }

    get step () {
        return this[ _step ]
    }

    /**
     * 获取当前活动的索引
     * @return { Number }
     */
    get current () {
        return this.points.length
    }

    /**
     * 轨迹集合长度
     * @return { Number }
     */
    get length () {
        return this.data.length
    }

    /**
     * 总时长
     * @return { Number }
     */
    get time () {
        if ( this.length < 2 ) {
            return 0
        }
        return this.data[ this.length - 1 ].time - this.data[ 0 ].time
    }

    /**
     * 绘制渔船图标
     * @param { TrackPoint } point
     */
    drawEntity ( point ) {
        let billboard = {
            ...this.billboardOpt
        }

        if ( this.current === 1 ) { // 初始位置
            billboard.image = start
        } else if ( this.current === this.length ) { // 结束位置
            billboard.image = end
        }

        return new Cesium.Entity( {
            billboard,
            // label: this.labelOpt,
            position: Cesium.Cartesian3.fromDegrees(
                point.lng,
                point.lat,
                point.height + 1
            )
        } )
    }

    init () {
        if ( this.length < 2 ) {
            return console.warn( '<<< 不能绘制, 至少需要e2个点位信息.' )
        }

        this.reset()

        this.corridor.destory()
        let line = new Cesium.Entity( {
            corridor: {
                show: true,
                width: 5,
                outline: false,
                material: new Cesium.Color( 40 / 255, 148 / 255, 240 / 255, 1 ),
                positions: new Cesium.CallbackProperty( () => {
                    return Cesium.Cartesian3.fromDegreesArray( this[ points ] )
                }, false )
            }
        } )
        this.corridor.add( line )
    }

    /**
     * 根据 data 计算总的补间队列
     */
    updateA ( isUnChain ) {
        if ( this.length < 2 ) { // 至少需要 2 个轨迹点
            console.warn( '<<< 轨迹至少需要 2 个点.' )
            return
        }

        if ( this[ _state ] === STOP ) {
            this.labels.destroy()
        }

        this.queA = []
        // this[ INDEX ] = 0
        this.data.reduce( ( pre, cur, index ) => {
            let startTime = 0
            let prePoint = new TrackPoint( { position: pre, timestamp: pre.timestamp } )

            let billboard = {
                ...this.billboardOpt,
            }

            let entity = new Cesium.Entity( { // 移动广告
                billboard,
                position: new Cesium.CallbackProperty( () => {
                    return Cesium.Cartesian3.fromDegrees(
                        prePoint.lng, prePoint.lat, prePoint.height
                    )
                }, false )
            } )


            let tw = new TWEEN.Tween( prePoint, this.$t )
                .to( {
                    lng: cur.lng, lat: cur.lat
                }, ( cur.time - prePoint.time ) / this.step )
                // .easing( TWEEN.Easing.Quadratic.Out )
                .onUpdate( ( point ) => {
                    this[ onUpdate ]( point, startTime )
                } )
                // .repeat( Infinity )
                .onComplete( () => {
                    this[ onComplete ]( cur, prePoint )
                } )
                .onStop( () => {
                    this[ onStop ]()
                } )
                .onStart( () => {
                    this.addLabel( prePoint )
                    this.billboards.add( entity )
                    startTime = new Date().getTime()
                } )

            this.queA.push( tw )
            return cur
        } )

        !isUnChain && this.queA.reduce( ( pre, cur, index ) => {
            pre.chain( cur )
            return cur
        } )

        return this
    }

    /**
     * 根据 data 计算当前的补间队列
     */
    updateB () {

        let prePoint = this.labels.last
        let cur = this.data[ this.current ]

        this.updateA()
        this.queB = []

        let startTime = 0

        let tw = new TWEEN.Tween( prePoint, this.$t )
            .to( {
                lng: cur.lng, lat: cur.lat
            }, ( cur.time - prePoint.lastTime ) / this.step )
            // .easing( TWEEN.Easing.Quadratic.Out )
            .onUpdate( ( point ) => {
                this[ onUpdate ]( point, startTime, true )
            } )
            // .repeat( Infinity )
            .onComplete( () => {
                this[ onComplete ]( cur, prePoint )
            } )
            .onStop( () => {
                this[ onStop ]()
            } )
            .onStart( () => {
                // this.addLabel( prePoint )
                // this.billboards.add( pre )
                startTime = new Date().getTime()
            } )

        this.queB.push( tw )
        if ( this.queA[ this.current ] ) {
            tw.chain( this.queA[ this.current ] )
        }

        return this
    }

    /**
     * 添加标签
     * @param { TrackPoint } point
     * @param { Boolean } isUnShow 是否不显示标签
     */
    addLabel ( point, isUnShow ) {
        point.labelShow = !isUnShow
        this.labels.push( point )
        return this
    }

    /**
     * 根据已有数据播放动画
     */
    play ( isUnEmit ) {

        if ( this[ _state ] === PAUSE ) {
            this.updateB()
            if ( this.queB[ 0 ] ) {
                this.queB[ 0 ].start()
            }
        } else if ( this[ _state ] === STOP || this[ _state ] === COMPLETE ) {
            this.updateA()
            this.init()
            // this.reset()
            if ( this.queA[ 0 ] ) {
                this[ animate ]()
                this.queA[ 0 ].start()
            }
        }

        this[ _state ] = PLAY
        !isUnEmit && this.Emitter.trigger( {
            type: 'play',
            vm: this
        } )
    }

    /**
     * 暂停播放
     */
    pause ( isUnEmit ) {
        if ( this[ _state ] === COMPLETE ) {
            return
        }

        this.queA.forEach( ( item ) => {
            item.stop()
        } )
        this.queC.forEach( ( item ) => {
            item.stop()
        } )
        if ( this.queB[ 0 ] ) {
            this.queB[ 0 ].stop()
        }
        if ( this.queD[ 0 ] ) {
            this.queD[ 0 ].stop()
        }

        if ( this.labels.last ) {
            this.labels.last.lastTime = new Date( this.labels.last.curTime ).getTime()
        }

        this[ _state ] = PAUSE
        if ( !isUnEmit ) {
            this.Emitter.trigger( {
                type: 'pause',
                vm: this
            } )
        }
    }

    /**
     * 加速播放
     * @param { Number } val 秒
     */
    speed ( val ) {
        if ( this[ _state ] !== PLAY ) {
            // this.speed.isPauseSpeed = true
            // return
        }

        this[ _step ] = val
        if ( this[ _state ] !== STOP ) {
            this.pause( true )
        }
        // this[ _state ] = SPEED
        this.Emitter.trigger( {
            type: 'speed',
            vm: this
        } )

        if ( this[ _state ] !== COMPLETE ) {
            this.play()
        }
    }

    /**
     * 快退
     */
    back ( val ) {
        return
    }

    normalSpeed ( isBack ) {
        if ( !isBack ) {
            this.speed( this.default.step )
        } else {
            // this[ _step ] = this.default.step
            // this.backStart()
            // this.cancelAnimationFrame()
        }
        // if ( this.speed.isPauseSpeed ) {
        //     this.pause()
        //     this.speed.isPauseSpeed = false
        // }
    }

    complete () {
        this[ _state ] = COMPLETE
        this[ _step ] = this.default.step
        this.billboards.get( this.length - 1 ).billboard.image = end
        console.log( '>>> Complete.' )
        this.Emitter.trigger( {
            type: 'complete',
            vm: this
        } )
    }

    stop () {
        console.log( '<<< Stop.' )
        this.pause( true )
        this.reset()
        // this.updateA()
        // this.init()
        this[ _state ] = STOP
        this.Emitter.trigger( {
            type: 'stop',
            vm: this
        } )
    }

    /**
     * 注册事件
     */
    on ( type, fn ) {
        this.Emitter.on( type, fn )
    }

    /**
     * TWEENJS 动画
     */
    [ animate ] () {
        this[ TIMER ] = window.requestAnimationFrame( this[ animate ] )
        this.$t.update()
    }

    [ onComplete ] ( cur, prePoint ) {
        this.points.push( cur )
        prePoint.curTime = cur.timestamp
        if ( this.current === this.length ) {
            this.complete()
        }
    }

    [ onUpdate ] ( point, startTime, isB ) {
        this[ points ].push( point.lng )
        this[ points ].push( point.lat )
        let updateTime = new Date().getTime() - startTime
        let curTime
        if ( !isB ) {
            curTime = new Date( point.time + updateTime * this.step )
        } else {
            curTime = new Date( point.lastTime + updateTime * this.step )
        }
        point.curTime = curTime.toISOString()
        this.Emitter.trigger( {
            type: 'update',
            point: point,
            time: curTime.getTime()
        } )
    }

    [ onStop ] () {
        if ( this.default.step === this.step && !this.speed.isPauseSpeed ) {
            console.log( '>>> Pause.' )
        }
    }

    hide () {
        this.pause()
        this.corridor.hide()
        this.billboards.hide()
    }

    pre () {
        this.corridor.pre()
        this.billboards.pre()
    }

    /**
     * 删除
     */
    remove () {
        this.cancelAnimationFrame()
        this.billboards.destory()
        this.corridor.destory()
        this.points.splice( 0 )
        this[ points ] = []
        // this.labels.destroy()
    }

    reset () {
        this.cancelAnimationFrame()
        this.labels.destroy()

        let startPoint = this.data[ 0 ]
        this[ points ] = [ startPoint.lng, startPoint.lat ]
        this.points.splice( 0 )
        this.points.push( this.data[ 0 ] )
        this.billboards.destory()
        this.billboards.add( this.drawEntity( startPoint ) )
        this.addLabel( startPoint )
    }

    cancelAnimationFrame () {
        window.cancelAnimationFrame( this[ TIMER ] )
    }

    /**
     * 销毁
     */
    destroy () {
        this.remove()
        // this.data = []
        // this.points = []
        // this[ points ] = []
        // this[ points ] = []
        // this.queA = []
        // this.queB = []
        this.labels.destroy()
    }
}
