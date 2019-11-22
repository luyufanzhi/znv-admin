import Emitter from './Emitter'
import CesiumCtl from '../Model/CesiumCtl'

export default class Sensor {
    static type = 'sensor'

    constructor ( container, option ) {
        this.container = [ ...container ]
        this.option = { ...option }
        this.$emitter = new Emitter()
        this.viewer = CesiumCtl.viewer
        this.scene = CesiumCtl.viewer.scene
    }

    get type () {
        return this.constructor.type
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

    on ( type, ...fn ) {
        this.$emitter.on( type, ...fn )
        return this
    }

    off () {
        this.$emitter.off( type, ...fn )
        return this
    }

    trigger ( event ) {
        this.$emitter.trigger( event )
        return this
    }

    /**
     * 触发事件
     * @param { Element } element 触发对象, DOM 元素
     * @param { event } sensorEvent 事件对象
     */
    // trigger ( element, sensorEvent ) {
    //     const event = document.createEvent( 'Event' );
    //     event.detail = sensorEvent;
    //     event.initEvent( sensorEvent.type, true, true );
    //     element.dispatchEvent( event );
    //     // this.lastEvent = sensorEvent;
    //     return sensorEvent;
    // }
}
