/**
 * @file 模板
 */

import Sensor from '../Sensor'
import CesiumCtl from '../Model/CesiumCtl'

export default class Fly extends Sensor {
    static type = 'Fly'

    constructor ( container = [ ], option = { } ) {
        super( container, option )
    }

    /**
     * 注册事件
     */
    attach() {
        return this
    }

    /**
     * 删除事件
     */
    detach() {
        return this
    }
}
