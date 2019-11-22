import SensorEvent from '../SensorEvent'
import CesiumCtl from '../../Model/CesiumCtl'

// 坐标拾取事件对象
export class MeaDisEvent extends SensorEvent {
    static type = 'mea:dis'

    get distance () {
        return this.data.distance
    }
}

export class MeaAreaEvent extends SensorEvent {
    static type = 'mea:area'

    get area () {
        return this.data.area
    }
}

export class MeaHeightEvent extends SensorEvent {
    static type = 'mea:height'

    get height () {
        return this.data.height
    }
}
