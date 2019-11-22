/**
 * @file AIS
 */

import CesiumCtl from '@map/Model/CesiumCtl'
import Entites from '@map/Model/Entites'

let entites = new Entites ( {
    detail: 'AIS.',
    opt: {
        billboardOpt: {
            image: '/static/img/large-screen/ais.png',
            width: Entites.scaleW * 32,
            height: Entites.scaleH * 32,
            ...Entites.billboardOpt,
        }
    }
} )

let position = {
    "lng": "113.91935178526401",
    "lat": "22.4815807633645",
    "height": "-0.3762348133844449"
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
