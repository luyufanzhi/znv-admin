// import CesiumCtl from '@map/Model/CesiumCtl'

export default class ShipPoint {
    static type = '泊位管理'

    constructor ( {
        eventName,
        loc,
        type,
        detail
    } ) {
        Object.assign( this, {
            eventName, loc, type, detail
        } )
    }
}
