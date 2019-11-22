/**
 * @file 船舶-港澳
 */

import CesiumCtl from '@map/Model/CesiumCtl'
import Entites from '@map/Model/Entites'

let entites = new Entites ( {
    detail: '船舶-港澳.',
    opt: {
        billboardOpt: {
            image: '/static/img/large-screen/boat-pre.png',
            width: Entites.scaleW * 32,
            height: Entites.scaleH * 32,
            ...Entites.billboardOpt,
        }
    }
} )

let position = {
    "lng": "113.91822769069954",
    "lat": "22.48110818841796",
    "height": "-0.37613601998893303"
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
