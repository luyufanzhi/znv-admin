/**
 * @file 轨迹跟踪
 * @author PinghuaZhuang
 */

import CesiumCtl from '../../Model/CesiumCtl'
import Entites from '../../Model/Entites'
import TrackPoint from './TrackPoint'
// import Pick from '../../Event/Coordinate/pick'
import TWEEN from '@tweenjs/tween.js'

let nor = '/static/img/large-screen/Panoramic_camera.png'
let pre = '/static/img/large-screen/camera.png'
let start = ''
let end = ''

const points = Symbol( 'points' )
const isDraw = Symbol( 'isDraw' )
const animate = Symbol( 'animate' )
const timer = Symbol( 'timer' )
const promise = Symbol( 'promise' )

export default class Track {

    /**
     * @constructor
     * @param { Object } 选项
     * @param { Array<TrackPoint> } position 轨迹点集合
     * @param { Labels } labels 标签集合
     */
    constructor ( { positions = [], labels = [] } = {} ) {
        this[ points ] = [] // 绘制点集合
        this.points = [ ...positions ] // Array<lng,lat>
        this[ isDraw ] = false // 是否执行过 draw 函数
        this.$t = new TWEEN.Group()

        this.labels = labels // 标签集合

        this.scale = 60 // 1 分钟播放 1 秒

        this[ animate ] = this[ animate ].bind( this )

        // 动画添加点的 promise 对象
        this[ promise ] = new Promise( ( re ) => re() )

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
            sizeInMeters: true,
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

        // entity 集合
        this.billboards = new Entites( {
            detail: '图片集合.'
        } )
        this.corridor = new Entites( {
            detail: '走廊.'
        } )

        positions.forEach( ( point ) => { // 初始化点集合
            this.add( point )
        } )
    }

    get length () {
        return this.points.length
    }

    get isDraw () {
        return this[ isDraw ]
    }

    /**
     * 获取当前活动的索引
     */
    // get current () {
    //     return
    // }

    /**
     * 添加点, 并且绘制( 自动 ).
     * @param { TrackPoint } position
     */
    add ( position ) {
        this.points.push( position )
        this[ points ].push( position.lng )
        this[ points ].push( position.lat )

        this.addLabel( position, true )

        let billboard = this.drawEntity( position )
        billboard.show = this.isDraw
        this.billboards.add( billboard )

        if ( this.isDraw ) {
            position.labelShow = true
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
     * 动画添加点
     * @param { TrackPoint } position
     */
    addAction ( target ) {

        this[ promise ] = new Promise( ( re ) => {
            this[ promise ].then( () => {
                if ( this.length <= 0 ) {
                    this.add( target )
                    re()
                    return
                }

                let cur = this.points[ this.length - 1 ]
                let curData = new TrackPoint( { position: cur, timestamp: cur.timestamp } )

                let entity = new Cesium.Entity( { // 移动广告
                    billboard: this.billboardOpt,
                    position: new Cesium.CallbackProperty( () => {
                        return Cesium.Cartesian3.fromDegrees(
                            curData.lng, curData.lat, curData.height
                        )
                    }, false )
                } )
                this.addLabel( curData )

                this.billboards.add( entity )

                let startTime = 0, updateTime = 0
                // 使用 curData 避免保留的信息被修改覆盖
                let action = new TWEEN.Tween( curData, this.$t )
                    // TODO: 改为具体时间值, 而非固定时间
                    .to( target, ( target.time - curData.time ) / this.scale )
                    // .easing( TWEEN.Easing.Quadratic.Out )
                    .onUpdate( ( point ) => {
                        this[ points ].push( point.lng )
                        this[ points ].push( point.lat )
                        updateTime = new Date().getTime() - startTime
                        point.curTime = new Date( cur.time + updateTime * this.scale ).toISOString()
                    } )
                    // .repeat( Infinity )
                    .onComplete( () => {
                        console.log( '>>> Complete:', this.isDraw )
                        this.points.push( target )
                        // if ( this.isDraw ) {
                        //     // this.billboards.add( this.drawEntity( target ) )
                        // }
                        curData.curTime = target.timestamp
                        re()
                    } )
                    .onStop( () => {
                        console.log( '>>> Stop' )
                    } )
                    .start()
                startTime = new Date().getTime()
            } )
        } )

        return this[ promise ]
    }

    /**
     * 添加点动画
     */
    [ animate ] () {
        this[ timer ] = window.requestAnimationFrame( this[ animate ] )
        this.$t.update()
    }

    /**
     * 绘制渔船图标
     * @param { TrackPoint } point
     */
    drawEntity ( point ) {

        return new Cesium.Entity( {
            billboard: this.billboardOpt,
            // label: this.labelOpt,
            position: Cesium.Cartesian3.fromDegrees(
                point.lng,
                point.lat,
                point.height + 1
            )
        } )
    }

    /**
     * 绘制
     */
    draw () {
        if ( this.length < 1 ) {
            return console.warn( '<<< 不能绘制, 至少需要一个点位信息.' )
        }

        this.remove()
        this[ animate ]()

        let line = new Cesium.Entity( {
            corridor: {
                show: true,
                // height: 1,
                width: 5,
                outline: false,
                material: new Cesium.Color( 40 / 255, 148 / 255, 240 / 255, 1 ),
                positions: new Cesium.CallbackProperty( () => {
                    return Cesium.Cartesian3.fromDegreesArray( this[ points ] )
                }, false )
            }
        } )

        this.corridor.add( line )

        this.points.forEach( ( point, index ) => {
            // this.add( point )
            this.billboards.add( this.drawEntity( point ) )

            if ( 0 === index ) { // 起点

            } else if ( this.length - 1 === index ) { // 终点

            } else { // 中途

            }

            if ( 0 !== index ) { // 非起点

            }
        } )

        this.labels.show()

        this[ isDraw ] = true
    }

    /**
     * 删除 entity, 点位信息保留.
     */
    remove () {
        window.cancelAnimationFrame( this[ timer ] )
        this.billboards.destory()
        this.corridor.destory()
        this.labels.hide()
        this[ isDraw ] = false
    }

    /**
     * 清除所有
     */
    destroy () {
        this.remove()
        this.labels.destroy()
        this.points = []
        this[ points ] = []
    }
}
