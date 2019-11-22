const REG = /\s/;
const ROOT = './static/images/';
const UNIT_PNG = '.png';

// 模式切换的图片
export const modeUrls = getSrcForNames([
    'icon_breaking_diy', 'icon_breaking_grain',
    'icon_breaking_grain', 'icon_breaking_Soup',
    'icon_breaking_Soup', 'icon_Porridge_nor',
    'icon_breaking_fruit', 'icon_breaking_Sauce',
    'icon_breaking_Warm', 'ic_cleaning_nor',
    'icon_breaking_grain',
]);

export const hotIndex = [2, 4, 6, 9];
export const iceIndex = [3, 5, 7, 8, 10];
export const hotImgs = hotIndex.map(el => modeUrls[el - 1]);
export const iceImgs = iceIndex.map(el => modeUrls[el - 1]);

// 底部菜单栏的默认图片
export const btnImgs = [
    getSrcForNames('icon_Weighing_nor'),
    hotImgs[0],
    iceImgs[0],
    modeUrls[0]
];
export const btnCancelImg = getSrcForNames('btn_delet');

// 开始暂停
export const start = getSrcForNames('icon_start');
export const pause = getSrcForNames('icon_suspend');

// 完成时的提示图标
export const completeIcon = getSrcForNames('image_complete');


function getSrcForNames(names) {
    let arr;
    if (Array.isArray(names)) {
        arr = names;
        names = names[0];
    } else {
        arr = names.split(REG);
    }

    if (arr.length > 1) {
        return arr.map(el => ROOT + el + UNIT_PNG);
    }

    return ROOT + names + UNIT_PNG;
}