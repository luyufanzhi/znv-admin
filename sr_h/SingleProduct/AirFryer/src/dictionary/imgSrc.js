
import recipes from './recipes.js';

// import { SPACE_RGE } from '../common/common.js';

const REG = /\s/;
const ROOT = './static/images/';
const UNIT_PNG = '.jpg';

// 模式切换的图片
export const recipesUrls = recipes.map( el => {
    return el.imgUrl = getSrcForNames( `recipes/${el.id}` );
} );

// 底部菜单栏的默认图片
export const btnImgs = [
    getSrcForNames( 'icon_Power_off', '.png' ),
    getSrcForNames( 'icon_Power_on', '.png' ),
    getSrcForNames( 'icon_Power_on', '.png' ),
    getSrcForNames( 'icon_Power_on', '.png' )
];

function getSrcForNames ( names, unit ) {
    let arr;
    if ( Array.isArray( names ) ) {
        arr = names;
        names = names[ 0 ];
    } else {
        arr = names.split( REG );
    }

    unit = unit || UNIT_PNG;

    if ( arr.length > 1 ) {
        return arr.map( el => ROOT + el + unit );
    }

    return ROOT + names + unit;
}
