export default class LabelOpt {

    constructor ( point ) {
        Object.assign( this, {
            lng: point.lng,
            lat: point.lat,
            txt: point.content
        } )
    }
}
