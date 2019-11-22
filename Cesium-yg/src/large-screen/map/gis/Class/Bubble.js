
// import CesiumCtl from '../../Model/CesiumCtl'

export default class Bubble {
    constructor ( scene, {
        el, x = 0, y = 0, vm = {}
    } = { } ) {
        Object.assign( this, { el, x, y, vm, scene } )

        this.scenePosition = new Cesium.Cartesian3()

        scene.postRender.addEventListener( () => {
            let windowPosition = new Cesium.Cartesian2()
            this.height = scene.canvas.height
            this.width = scene.canvas.width
            Cesium.SceneTransforms.wgs84ToWindowCoordinates(
                this.scene,
                this.scenePosition,
                windowPosition
            )
            this.setStyle( windowPosition )
        } )
    }

    setStyle ( windowPosition ) {
        // this.$el.style.left = ( windowPosition.x - this.x ) + 'px'
        // this.$el.style.top = ( windowPosition.y - this.y ) + 'px'
        this.vm.right = this.width - windowPosition.x + this.x
        this.vm.bottom = this.height - windowPosition.y + this.y
        // this.vm.bottom = 0
    }

    at ( position ) {
        this.scenePosition = Cesium.Cartesian3.clone( position )
        return this
    }
}
