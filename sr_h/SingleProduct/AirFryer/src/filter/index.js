import Vue from 'vue';
import dictionary from '../dictionary';

// import { TIME_SEC, TIME_MIN } from '../dictionary/unit.js'

function machIndex ( index, list ) {
    return list[ +index ];
}

for ( let key in dictionary ) {
    Vue.filter( key, val => machIndex( val, dictionary[ key ] ) );
}

// 按钮提示
Vue.filter( 'btnMsg', ( val, flag, isWork, status ) => {
    if ( !flag && isWork ) {
        return Vue.filter( 'status' )( status );
    }
    return val;
} );
