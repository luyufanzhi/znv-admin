// import store from '@/store'
import test from './test/router'

let mapRouter = { // 首页, 显示三维地图, 左右磁贴
    // name: 'map',
    path: '/map',
    component: () => import( '@map' ),
    children: [ { // 显示三维地图, 磁贴列表
        path: '',
        name: 'map',
        component: () => import( '@map/magnet' )
    }, { // 铭感水域, 事件等
        path: 'gis:activeIndex?',
        name: 'gis',
        component: () => import( '@map/gis' ),
        // children: [  ]
    }, { // 轨迹跟踪
        path: 'track',
        name: 'track',
        component: () => import( '@map/gis/track' )
    }, { // 轨迹回放
        path: 'playback',
        name: 'playback',
        component: () => import( '@map/gis/track/playback' )
    } ],

    // beforeEnter ( to, from, next ) {
    //     store.commit( 'map/uMapShow', false )
    //     store.commit( 'map/uToolShow', true )
    //     store.commit( 'map/uNavShow', true )
    //     next()
    // }
}

let debug = process.env.NODE_ENV !== 'production', testRouter

if ( debug ) {
    mapRouter.children.push( test )
}

// 使用地址跳转, 使用 name 子路由不加载
export default [ mapRouter ]
