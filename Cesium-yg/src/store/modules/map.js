export default {
    namespaced: true,
    state: {

        /* 公用提示框, 测试用 */
        tipShow: false, // 控制提示框显示与否
        tipMsg: '', // 提示框信息
        tipTit: '',

        /* 重点关注提示框 */
        tipShip: '', // focus, event
        tipShipFocusOpt: {
            name: 'xxxxxx',
            No: '1234567',
            type: 'wg'
        },

        /* 其他 */
        toolShow: false, // 工具栏显示切换, 0: 默认不显示, 1: 显示工具栏
        navShow: true,
        mapShow: false,

        /* 图层 */
        layer: {
            water: false,
            ais: false,
        }
    },
    getters: {
        toolShow ( state ) {
            return state.toolShow
        },
        mapShow ( state ) {
            return state.mapShow
        },
        navShow ( state ) {
            return state.navShow
        },
        tipShip ( state ) {
            return state.tipShip
        },
        tipShipFocusOpt ( state ) {
            return state.tipShipFocusOpt
        },
        // tipShipEvent ( state ) {
        //     return state.tipShipEvent
        // }
    },
    mutations: {
        uTipShow ( state, val ) {
            state.tipShow = !!val
        },

        uTipMsg ( state, val ) {
            state.tipMsg = val
        },

        uTipTit ( state, val ) {
            state.tipTit = val
        },

        uTipShip ( state, val ) {
            state.tipShip = val
        },

        uTipShipFocusOpt ( state, { name = '', No = '', type='wg' } ) {
            Object.assign( state.tipShipFocusOpt, { name, No, type } )
        },

        uToolShow ( state, val ) {
            state.toolShow = val
        },

        uNavShow ( state, val ) {
            state.navShow = !!val
        },

        uMapShow ( state, val ) {
            state.mapShow = !!val
        }
    }
}
