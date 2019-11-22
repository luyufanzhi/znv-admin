// 图层路径
export const URLS = {
    XZMTGX: {
        url: '/iserver/services/3D-ShenZuoYuGangT/rest/realspace/datas/XZMTAX@SK_YG_2000/config',
        name: '现状码头岸线'
    },
    JYX: {
        url: '/iserver/services/3D-ShenZuoYuGangT/rest/realspace/datas/JYZ@SK_YG_2000/config',
        name:  '加油站'
    },
    HFBD: {
        url: '/iserver/services/3D-ShenZuoYuGangT/rest/realspace/datas/HFPT@SK_YG_2000/config',
        name: '海防坡堤'
    },
    YHXZQ: {
        url: '/iserver/services/3D-ShenZuoYuGangT/rest/realspace/datas/YHXZQ@SK_YG_2000/config',
        name: '渔获装卸区'
    }
        ,
    YDBJGHT: {
        url: '/iserver/services/3D-ShenZuoYuGangT/rest/realspace/datas/T2017YDBJGHT@SK_YG_2000/config',
        name: 'T2017年用地布局规划图_自制'
    },
    HYT: {
        url: '/iserver/services/3D-ShenZuoYuGangT/rest/realspace/datas/T2017HYT@SK_YG_2000/config',
        name: 'T2017年海域图'
    },
    // TEST: {
    //     url: '/iserver/services/3D-ChunFengSuiDao/rest/realspace/datas/Progress_Point@%E6%A1%A9%E5%8F%B7/config',
    //     name: 'TEST'
    // },
}

// 工具栏中的图层集合
// let key, names = []
// for ( key in URLS ) {
//     names.push( URLS[ key ].name )
// }
export const NAMES = [ /* ...names */ {
    txt: '现状',
    id: 'XZMTGX',
    nor: '/src/large-screen/map/images/weather-nor.png',
    pre: '/src/large-screen/map/images/weather-pre.png',
    isActive: false,
}, {
    txt: '加油',
    id: 'JYX',
    nor: '/src/large-screen/map/images/berth-nor.png',
    pre: '/src/large-screen/map/images/berth-pre.png',
    isActive: false,
}, {
    txt: '海防',
    id: 'HFBD',
    nor: '/src/large-screen/map/images/Hugh_v-nor.png',
    pre: '/src/large-screen/map/images/Hugh_v-pre.png',
    isActive: false,
}, {
    txt: '渔获',
    id: 'YHXZQ',
    nor: '/src/large-screen/map/images/shelter-nor.png',
    pre: '/src/large-screen/map/images/shelter-pre.png',
    isActive: false,
}, {
    txt: '用地',
    id: 'YDBJGHT',
    nor: '/src/large-screen/map/images/ship-nor.png',
    pre: '/src/large-screen/map/images/ship-pre.png',
    isActive: false,
}, {
    txt: '海域',
    id: 'HYT',
    nor: '/src/large-screen/map/images/ship-nor.png',
    pre: '/src/large-screen/map/images/ship-pre.png',
    isActive: false,
} ]

// 图层 IP 地址
export const IP = process.IP

// 图层根路径
export const ORIGIN = IP + '/iserver/services/3D-ShenZuoYuGangT/rest/realspace/datas/'

// 需要加载的图层
export default 'XZMTGX JYX HFBD YHXZQ YDBJGHT HYT'.split( ' ' )
