import CesiumCtl from '@map/Model/CesiumCtl'

export default class ShipPoint {
    static type = '重点关注渔船'

    constructor ( entity, {
        shipName,
        No,
        location,
        phone,
    } ) {
        Object.assign( this, {
            entity, shipName, No, location, phone
        } )
    }

    // 选中
    selected ( ctl = CesiumCtl ) {
        ctl.viewer.selectedEntity = this.entity
    }
}
