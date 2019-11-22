// import CesiumCtl from '@map/Model/CesiumCtl'

export default class ShipPoint {
    static type = '泊位管理'

    constructor ( {
        parkName,
        type,
        parkCount,
        parkCounted
    } ) {
        Object.assign( this, {
            parkName, type, parkCount, parkCounted
        } )
    }
}
