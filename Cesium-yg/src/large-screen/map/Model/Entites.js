/**
 * @file 二次封装 entity 类
 */

import CesiumCtl from './CesiumCtl'
import Emitter from '../Event/Emitter'
import { EntityClick } from './Class/EntitesClickEvent'
import { Point } from '../Event/Coordinate/CoordinateEvent'
import Vue from 'vue'

const entites = Symbol( 'entites' )
const states = Symbol( 'states' )
// const _visible = Symbol( 'visible' )
const _visible = '_visible' // Symbol 不能访问, 不能响应.

// let scaleW = ( window.innerWidth / 1920 ) || .5
// let scaleH = ( window.innerHeight / 1080 ) || .5
// let _w = 56 * scaleW
// let _h = 63 * scaleH

export default class Entites {

    static billboardOpt = {
        horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
        verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
    }

    static scaleW = ( window.innerWidth / 1920 ) || .5
    static scaleH = ( window.innerHeight / 1080 ) || .5

    /**
     * @constructor
     * @param { Object } 选项
     * @param { String } detail 描述
     * @param { Boolean } unVisible 是否不显示
     * @param { MapCtl } ctl 地图控制器, 主要需要的是 viwer
     * @param { Object } opt 选项
     */
    constructor ( { detail, unVisible, ctl = CesiumCtl, opt } ) {
        Object.assign( this, {
            detail, ctl, opt
        } )

        // entity 集合
        this[ entites ] = []

        // 历史状态
        this[ states ] = []

        // 显示状态
        // this[ _visible ] = false
        Vue.set( this, _visible, false )

        // 事情触发器
        this.$emitter = new Emitter()

        if ( unVisible ) {
            this.hide()
        }

        // 注册点击事件
        this.ctl.promise.then( () => {
            this.ctl.click( ( event ) => {
                var _entity = this.ctl.viewer.selectedEntity;
                // console.log( '_entity:', _entity, this.has( _entity ) )

                if ( this.has( _entity ) ) {

                    let point = Point.c3ToFd( Point.toC3( event.position ) )

                    this.$emitter.trigger( new EntityClick( {
                        entity: _entity,
                        nativeEvent: event,
                        lng: point.lng,
                        lat: point.lat,
                        height: point.height,
                    } ) )
                }
            } )
        } )
    }

    get visible () {
        return this[ _visible ]
    }

    forEach ( fn ) {
        this[ entites ].forEach( fn )
    }

    /**
     * 添加 entity 点
     * @param { Cesium.Entity } ens Entity 对象
     */
    add ( en, isUnVisible ) {
        // let entity = new Cesium.Entity( {
        //     point : new Cesium.PointGraphics( {
        //         color : new Cesium.Color( 1, 1, 0 ),
        //         pixelSize : 10,
        //         outlineColor : new Cesium.Color( 0, 1, 1 )
        //     } ),
        //     position : Cesium.Cartesian3.fromDegrees( fd.lng, fd.lat, fd.height + .5 )
        // } )

        this[ entites ].push( en )
        // this.show()
        this[ _visible ] = !isUnVisible
        if ( this[ _visible ] ) {
            this.ctl.viewer.entities.add( en )
        }
        return this
    }

    /**
     * entity 点的点击事件
     * @param { Function } fn 事件回调
     */
    click ( fn ) {
        this.$emitter.on( EntityClick.type, fn )
    }

    /**
     * 判断是否拥有 entity 点
     * @param { Cesium.Entity } entity
     * @return { Boolean }
     */
    has ( entity ) {
        return this[ entites ].includes( entity )
    }

    /**
     * 获取 Entity
     * @param { Number } index 索引
     */
    get ( index ) {
        return this[ entites ][ index ]
    }

    /**
     * 删除 entity 点
     * @param { Cesium.Entity } entity
     */
    remove ( entity ) {
        let index = this[ entites ].findIndex( ( item ) => item === entity )
        return this[ entites ].splice( index, 1 )
    }

    /**
     * 显示所有 entity 点
     */
    show () {
        this[ entites ].forEach( ( entity ) => {
            this.ctl.viewer.entities.add( entity )
        } )
        this[ _visible ] = true
        this[ states ].push( true )
        return this
    }

    /**
     * 隐藏所有 entity 点
     */
    hide () {
        this[ entites ].forEach( ( entity ) => {
            this.ctl.viewer.entities.remove( entity )
        } )
        this[ _visible ] = false
        this[ states ].push( false )
        return this
    }

    /**
     * 返回上次操作的显示状态
     */
    pre () {
        let state
        if ( state = this[ states ].splice( this[ states ].length - 1 ), 1 ) {
            this.show()
        } else {
            this.hide()
        }
        return this
    }

    /**
     * 显示隐藏
     */
    turn () {
        if ( this.visible ) {
            this.hide()
        } else {
            this.show()
        }
        return this
    }

    /**
     * 清除所有的 entity 点
     */
    destory () {
        this.hide()
        this[ entites ] = []
    }
}
