import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import common from './modules/common'
import user from './modules/user'
import home from './cn/home'
import transform from './modules/transform'
import map from './modules/map'
import createLogger from "vuex/dist/logger";
import fullNav from './modules/fullNav'

Vue.use( Vuex )

let debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store( {
    modules: {
        common,
        user,
        transform,
        home,
        map,
        fullNav
    },
    mutations: {
        // 重置vuex本地储存状态
        resetStore( state ) {
            Object.keys( state ).forEach( ( key ) => {
                state[ key ] = cloneDeep( window.SITE_CONFIG[ 'storeState' ][ key ] )
            } )
        }
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
} )
