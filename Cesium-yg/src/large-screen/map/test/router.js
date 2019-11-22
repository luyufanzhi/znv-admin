export default {
    path: 'test',
    component: () => import( '@map/test' ),
    children: [ {
        path: 'xxx',
        component: () => import( '@map/test/playerWithMap' )
    } ]
}
