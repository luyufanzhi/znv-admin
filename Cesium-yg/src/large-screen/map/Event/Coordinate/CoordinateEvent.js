import SensorEvent from '../SensorEvent'
import CesiumCtl from '../../Model/CesiumCtl'

// 坐标
export class Point {

    constructor ( { lng, lat, height } ) {
        Object.assign( this, {
            lng, lat, height
        } )
    }

    // let point = Point.c3ToFd( Point.toC3( event.position ) )

    /**
     * 获取笛卡尔坐标
     * @param { Object } postion event.postion
     */
    static toC3 ( position ) {
        return CesiumCtl.viewer.scene.pickPosition( position )
    }

    /**
     * 将笛卡尔坐标装换为经纬度坐标
     * @param { Cesium.viewer.scene.pickPosition }
     */
    static c3ToFd ( position ) {
        let cartographic = Cesium.Cartographic.fromCartesian( position )
        let longitude = Cesium.Math.toDegrees( cartographic.longitude )  // 经度
        let latitude = Cesium.Math.toDegrees( cartographic.latitude )    // 纬度
        let height = cartographic.height // 高度
        // height = height > 0 ? height : 0;

        return new Point ( {
            lng: longitude,
            lat: latitude,
            height: height
        } )
    }
}

// 坐标拾取事件对象
export class PickEvent extends SensorEvent {
    static type = 'pick'

    get lng () {
        return this.data.point.lng
    }

    get lat () {
        return this.data.point.lat
    }

    get height () {
        return this.data.point.height
    }

    get x () {
        return this.data.c3.x
    }

    get y () {
        return this.data.c3.y
    }

    get z () {
        return this.data.c3.z
    }
}

// 坐标定位事件对象
export class LocEvent extends SensorEvent {
    static type = 'location'
}
