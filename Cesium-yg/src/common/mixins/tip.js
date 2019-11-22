/**
 * @file 重点关注渔船
 */

import { mapMutations, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters( {
            tipShip: 'map/tipShip',
            tipShipFocusOpt: 'map/tipShipFocusOpt',
        } )
    },

    methods: {
        ...mapMutations( {
            uTipShip: 'map/uTipShip',
            uTipShipFocusOpt: 'map/uTipShipFocusOpt'
        } )
    }
}
