export default class Labels {
    constructor ( labels ) {
        Object.assign( this, { labels } )
        // this.labels = vm.labelsData
    }

    get length () {
        return this.labels.length
    }

    get last () {
        return this.labels[ this.length - 1 ]
    }

    showIndex ( index ) {
        this.label( index ).show = true
    }

    show () {
        this.labels.forEach( ( label ) => label.labelShow = true )
        return this
    }

    hide () {
        this.labels.forEach( ( label ) => label.labelShow = false )
        return this
    }

    push ( opt ) {
        let index = this.labels.push( opt )
        return index
        // window.setTimeout( () => opt.label = this.label( length - 1 ), 1 )
        // return this
    }

    pop () {
        this.labels.pop()
        return this
    }

    remove () {}

    label ( index ) {
        return this.vm.$refs[ `label-${index}` ]
    }

    destroy () {
        this.labels.splice( 0 )
    }
}
