import Vue from 'vue';
import Router from 'vue-router';
import Cook from '@/components/Cook.vue';

import { tabBarListMsg } from '../dictionary';

let cookPages = tabBarListMsg.map( el => ( {
    path: el,
    name: el,

    /* eslint-disable no-undef */
    component ( resolve ) {
        require( [ `@/components/page/${el}.vue` ], resolve );
    }
} ) );

Vue.use( Router );

/* eslint-disable no-undef */
let router = new Router( {
    routes: [
        {
            path: '/',
            redirect: '/' + Cook.name
        },
        {   // 跳转到 Cook.vue
            path: '/' + Cook.name,
            name: Cook.name,
            component: Cook,
            children: [
                {
                    path: '',
                    redirect: 'recipes'
                },

                // 二级页面
                ...cookPages
            ]
        },
        {   // 跳转到开始制作页面
            path: '/home',
            name: 'home',
            component ( resolve ) {
                require( [ '@/components/Home.vue' ], resolve );
            }
        },
        {   // 跳转到详情页面
            path: '/detail',
            name: 'detail',
            component ( resolve ) {
                require( [ '@/components/Detail.vue' ], resolve );
            }
        },
        {   // 跳转到设置参数页面
            path: '/set',
            name: 'set',
            component ( resolve ) {
                require( [ '@/components/Set.vue' ], resolve );
            }
        }
    ]
} );

export default router;
