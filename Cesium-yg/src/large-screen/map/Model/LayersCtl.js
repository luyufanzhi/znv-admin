/**
 * @file 图层集合
 */

import CesiumCtl from './CesiumCtl'
import Layer from './Class/Layer'
import {
    URLS, IP
} from '../config/layersName'

/**
 * 图层加载失败回调
 * @param { Error } 错误对象
 */
function error ( msg ) {
    let viewer = CesiumCtl.viewer
    // console.log( '图层加载失败:', msg )
    if ( viewer.cesiumWidget._showRenderLoopErrors ) {
        let title = '加载SCP失败，请检查网络连接状态或者url地址是否正确？';
        viewer.cesiumWidget.showErrorPanel( title, undefined, msg );
    }
}

let _resolve = null
let _promise = new Promise( ( resolve, reject ) => {
    _resolve = resolve
} )

let LayerCtl = {
    _layers: [],

    /**
     * 图层加载完成的 promise 对象
     */
    promise: _promise,

    /**
     * 添加图层到 _layers
     * @param  {...any} rest
     */
    push ( ...rest ) {
        this._layers.push( ...rest )
        return this
    },

    /**
     * 测试能否加载图层
     */
    // test () {
    //     this.all( [ 'TEST' ], () => {}, error )
    // },

    /**
     * 加载单个图层
     * @param { String } id 图层名 example: XZMTGX // 现状码头岸线
     */
    load ( id ) {
        return CesiumCtl.viewer.scene.addS3MTilesLayerByScp( ( IP + URLS[ id ].url ), {
            name: URLS[ id ].name
        } ).then( ( layer ) => {
            // this.push( layer )

            let prop = id
            // let _layers = []

            // 添加到 LayersCtl 下
            if ( this.hasOwnProperty( prop ) ) {
                prop = '_' + prop
            }

            this.push( this[ prop ] = new Layer( {
                id: id,
                name: URLS[ id ].name,
                layer,
            } ) )

            console.log( '>>> Layer load succeed:', layer.name )
        }, ( error ) => {
            console.log( '<<< Layer load fail:', error )
        } )
    },

    /**
     * 加载多个图层
     * @param { Array<String> } layersName 图层名的数组
     * @param { Fuction } done 图层加载完成的回调
     */
    all ( layersName, done ) {

        if ( this._layers.length ) {
            this._layers = []
        }

        let fns = layersName.map( ( item ) => {

            // console.log( '>>> LayerUrl:', IP + URLS[ item.url ] )
            return this.load( item )
        } )

        Cesium.when.all( fns, ( layers ) => {
            done( this._layers )
            _resolve( this._layers )
        }, error )

        return this.promise
    }
}

export default LayerCtl
