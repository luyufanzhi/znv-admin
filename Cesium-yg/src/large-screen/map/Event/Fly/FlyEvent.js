import SensorEvent from '../SensorEvent'
import CesiumCtl from '../../Model/CesiumCtl'

// 坐标拾取事件对象
export class FlyEvent extends SensorEvent {
    static type = 'fly'
}
