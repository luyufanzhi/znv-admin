
const REG      = /\s/;
const ROOT     = './static/images/';
const UNIT_PNG = '.png';

// 模式切换的图片
export const modeUrls = getSrcForNames( [
    'icon_breaking_diy', 'icon_breaking_grain',
    'icon_breaking_grain', 'icon_breaking_Soup',
    'icon_breaking_Soup', 'icon_Porridge_nor',
    'icon_breaking_fruit', 'icon_breaking_Sauce',
    'icon_breaking_Warm', 'icon_breaking_grain',
    'icon_breaking_grain',
] );

// 底部菜单栏的默认图片
export const btnImgs = [
    getSrcForNames( 'icon_Power_off icon_Power_on' ),
    getSrcForNames( 'icon_Power_on' ),
    getSrcForNames( 'icon_Power_on' ),
    getSrcForNames( 'icon_Power_on' ),
];


function getSrcForNames( names ) {
    let arr;
    if ( Array.isArray( names ) ) {
        arr = names;
        names = names[ 0 ];
    } else {
        arr = names.split( REG );
    }

    if ( arr.length > 1 ) {
        return arr.map( el => ROOT + el + UNIT_PNG );
    }

    return ROOT + names + UNIT_PNG;
}