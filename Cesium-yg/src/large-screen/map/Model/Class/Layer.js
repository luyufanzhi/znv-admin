/**
 * @file 图层
 */

import CesiumCtl from '../CesiumCtl'
import z from 'zp-z'
import getIds from '../methods/getIds'

// 图层显示隐藏历史记录, 不包括当前
const states = Symbol( 'states' )

export default class Layer {

    static Layers = new Cesium.Layers()

    [ states ] = []

    /**
     * 构造函数
     * 扩展属性
     * @param { Object } { name: 名字, detail: 详情, layer: 图层,
     *      visible: 默认显示隐藏 }
     */
    constructor ( { name, detail, layer, visible } ) {
        Object.assign( this, {
            name, detail, layer
        } )

        // 设置多选
        this.layer.multiChoose = true
        // 默认加载完成后显示图层, 根据配置修改显示状态
        // 加载后隐藏
        if ( visible === false ) {
            this.visible = false
        }
    }

    // 设置当前显示隐藏
    get visible () {
        return this.layer.visible
    }
    set visible ( val ) {
        this.layer.visible = !!val
    }

    // 撤销一次图层显示状态的改变
    pre () {
        // this[ setState ]( states.pup() )
        return this
    }

    // 显示图层
    show () {
        this[ states ].push( this.visible = true )
        return this
    }

    // 隐藏图层
    hide () {
        this[ states ].push( this.visible = false )
        return this
    }

    /**
     * 设置当前图层选中
     * 查询所有 id, 设置
     */
    selected () {
        // ( new Array( 21 ).fill( 1 ) ).forEach( ( _, id ) => {
            // console.log( 'xxxx' )
        //     this.layer.setSelection( id + 1 )

        getIds( this.layer, ( data = [] ) => {
            data.forEach( ( item ) => {
                // console.log( '>>> Get ids:', item )
                this.layer.setSelection( item.data.SmID )
            } )
        } )
    }

    /**
     * 图层点击事件
     * @param { Function } fn 点击的回调函数, 接收三个参数, layer: 当前图层, ids: 选中的块, e: 事件对象
     */
    click ( fn ) {
        if ( this._clickCallbacks ) {
            this._clickCallbacks.add( fn )
        } else {
            this._clickCallbacks = z.Callback()
            this._clickCallbacks.add( fn )

            // let viewer = CesiumCtl.viewer

            CesiumCtl.click( ( e ) => {
                // 多选的模式下有多个 id
                let ids = this.layer.getSelection()

                // 判断是否点击图层
                if ( !ids.length ) {
                    return;
                }

                this._clickCallbacks.fire( this, ids, e )
            } )
        }
    }

    /**
     * 注销事件
     * @param  { ...Function } fn 要删除的回调函数
     */
    off ( ...fn ) {
        this._clickCallbacks.remove( ...fn )
    }
}
