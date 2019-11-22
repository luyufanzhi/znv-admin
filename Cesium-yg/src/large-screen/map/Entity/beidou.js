/**
 * @file 北斗
 */

import CesiumCtl from '@map/Model/CesiumCtl'
import Entites from '@map/Model/Entites'

let entites = new Entites ( {
    detail: '北斗.',
    opt: {
        billboardOpt: {
            image: '/static/img/large-screen/beidou.png',
            width: Entites.scaleW * 32,
            height: Entites.scaleH * 32,
            ...Entites.billboardOpt,
        }
    }
} )

let position = {
    "lng": "113.91810002913961",
    "lat": "22.481719176069355",
    "height": "-0.3719306193015672"
}

CesiumCtl.promise.then( () => {
    entites.add( new Cesium.Entity( {
        billboard: entites.opt.billboardOpt,
        position: Cesium.Cartesian3.fromDegrees(
            +position.lng,
            +position.lat,
            +position.height + 1
        )
    } ), true )
} )

export default entites
