/**
 * @file 量算
 * @events mea:dis mea:area mea:height
 * @detail 时间紧迫, 待优化
 */

import Sensor from '../Sensor'
import CesiumCtl from '../../Model/CesiumCtl'
import {
    MeaDisEvent, MeaAreaEvent, MeaHeightEvent
} from './MeaEvent'

export default class Measurement extends Sensor {
    static type = 'Measurement'

    constructor ( container = [ ], option = { } ) {
        super( container, option )

        // 初始化
        if ( !CesiumCtl.viewer.scene.pickPositionSupported ) {
            alert( '不支持深度拾取,量算功能无法使用(无法进行鼠标交互绘制)' );
            return;
        }

        this.clampMode = 0

        this.handlerDis = new Cesium.MeasureHandler(
            CesiumCtl.viewer,
            Cesium.MeasureMode.Distance,
            this.clampMode
        )
        this.handlerArea = new Cesium.MeasureHandler(
            CesiumCtl.viewer,
            Cesium.MeasureMode.Area,
            this.clampMode
        )
        this.handlerHeight = new Cesium.MeasureHandler(
            CesiumCtl.viewer,
            Cesium.MeasureMode.DVH
        )

        this._dis = this._dis.bind( this )
        this._isActiveDis = this._isActiveDis.bind( this )
        this._area = this._area.bind( this )
        this._isActiveArea = this._isActiveArea.bind( this )
        this._height = this._height.bind( this )
        this._isActiveHeight = this._isActiveHeight.bind( this )
    }

    /**
     * 注册事件
     */
    attach() {
        console.log( '>>> 注册量算功能.' )

        this.handlerDis.measureEvt.addEventListener( this._dis )
        this.handlerDis.activeEvt.addEventListener( this._isActiveDis )
        this.handlerArea.measureEvt.addEventListener( this._area )
        this.handlerArea.activeEvt.addEventListener( this._isActiveArea )
        this.handlerHeight.measureEvt.addEventListener( this._height )
        this.handlerHeight.activeEvt.addEventListener( this._isActiveHeight )

        return this
    }

    /**
     * 删除事件
     */
    detach() {
        console.log( '<<< 注销量算功能.' )

        this.handlerDis.measureEvt.removeEventListener( this._dis )
        this.handlerDis.activeEvt.removeEventListener( this._isActiveDis )
        this.handlerArea.measureEvt.removeEventListener( this._area )
        this.handlerArea.activeEvt.removeEventListener( this._isActiveArea )
        this.handlerHeight.measureEvt.removeEventListener( this._height )
        this.handlerHeight.activeEvt.removeEventListener( this._isActiveHeight )

        this.clear()

        return this
    }

    deactiveAll () {
        this.handlerDis && this.handlerDis.deactivate()
        this.handlerArea && this.handlerArea.deactivate()
        this.handlerHeight && this.handlerHeight.deactivate()
    }

    clear () {
        this.handlerDis && this.handlerDis.clear()
        this.handlerArea && this.handlerArea.clear()
        this.handlerHeight && this.handlerHeight.clear()
    }

    // 测量高度
    height () {
        this.deactiveAll()
        this.handlerHeight && this.handlerHeight.activate()
    }

    // 测量面积
    area () {
        this.deactiveAll()
        this.handlerArea && this.handlerArea.activate()
    }

    // 测量距离
    distance () {
        this.deactiveAll()
        this.handlerDis && this.handlerDis.activate()
    }

    // 改变贴地模式
    change ( value ) {
        if ( 0 === value ) {
            this.clampMode = 0;
            this.handlerArea.clampMode = 0;
            this.handlerDis.clampMode = 0;
        } else {
            this.clampMode = 1;
            this.handlerArea.clampMode = 1;
            this.handlerDis.clampMode = 1;
        }
    }

    // 测距事件
    _dis ( result ) {
        let dis = Number( result.distance )
        let distance = dis > 1000 ? ( dis / 1000 ).toFixed(2) + 'km' : dis.toFixed(2) + 'm'
        this.handlerDis.disLabel.text = '距离:' + distance

        this.trigger( new MeaDisEvent( {
            distance,
        } ) )
    }
    // 是否处在测距中
    _isActiveDis ( isActive ) {
        if ( isActive == true ) {
            CesiumCtl.viewer.enableCursorStyle = false;
            CesiumCtl.viewer._element.style.cursor = '';
        } else {
            CesiumCtl.viewer.enableCursorStyle = true;
        }
    }

    // 测量面积事件
    _area ( result ) {
        let mj = Number( result.area );
        let area = mj > 1000000 ? ( mj / 1000000 ).toFixed(2) + 'km²' : mj.toFixed(2) + '㎡'
        this.handlerArea.areaLabel.text = '面积:' + area

        this.trigger( new MeaAreaEvent( {
            area,
        } ) )
    }
    // 是否处在测量面积中
    _isActiveArea ( isActive ) {
        if ( isActive == true ) {
            CesiumCtl.viewer.enableCursorStyle = false;
            CesiumCtl.viewer._element.style.cursor = '';
        } else {
            CesiumCtl.viewer.enableCursorStyle = true;
        }
    }

    // 测量高度事件
    _height ( result ) {
        let distance = result.distance > 1000 ?
            (result.distance / 1000).toFixed(2) + 'km' :
            result.distance + 'm'
        let vHeight = result.verticalHeight > 1000 ?
            (result.verticalHeight / 1000).toFixed(2) + 'km' :
            result.verticalHeight + 'm'
        let hDistance = result.horizontalDistance > 1000 ?
            (result.horizontalDistance / 1000).toFixed( 2 ) + 'km' :
            result.horizontalDistance + 'm'

        this.handlerHeight.disLabel.text = '空间距离:' + distance
        this.handlerHeight.vLabel.text = '垂直高度:' + vHeight
        this.handlerHeight.hLabel.text = '水平距离:' + hDistance

        this.trigger( new MeaHeightEvent( {
            height,
        } ) )
    }
    // 是否处在测量高度重
    _isActiveHeight ( isActive ) {
        if ( isActive == true ) {
            CesiumCtl.viewer.enableCursorStyle = false;
            CesiumCtl.viewer._element.style.cursor = '';
        } else {
            CesiumCtl.viewer.enableCursorStyle = true;
        }
    }
}
