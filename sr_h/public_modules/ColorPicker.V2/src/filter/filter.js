import Vue from 'vue'
import dictionary from '../dictionary/dictionary.js'
import { TIME_SEC, TIME_MIN } from '../dictionary/unit.js'

function machIndex( index, list ) {
    return list[ +index ];
}

for ( let key in dictionary ) {
    Vue.filter( key, val => machIndex( val, dictionary[ key ] ) );
}

Vue.filter( 'workTimeToMin', val => {
    let min = Math.floor( val / 60 ), sec = val % 60, res;
    res = min > 0 ?
        " " + min + " " + TIME_MIN :
        " " + sec + " " + TIME_SEC;
    return res;
} )

Vue.filter( 'workTimeToString', val => {
    let min = Math.floor( val / 60 ), sec = val % 60, res;
    let strMin = " " + min + " " + TIME_MIN, strSec = " " + sec + " " + TIME_SEC;
    strSec = sec > 0 ? strSec : '';
    res = min > 0 ?
        strMin + strSec :
        strSec;
    return res;
} );

Vue.filter( 'speedToH', val => val == 10 ? 'H' : val );
