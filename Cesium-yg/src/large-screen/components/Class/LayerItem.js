export default class LayerItem {

    constructor ( { txt = '', name = '', nor = '', entites } = {} ) {
        Object.assign( this, {
            txt, name, nor, entites
        } )
    }

    get isActive () {
        return this.entites.visible
    }
}
