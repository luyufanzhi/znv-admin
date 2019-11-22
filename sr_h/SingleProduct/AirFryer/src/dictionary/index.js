// import { SPACE_RGE } from '../common/common.js';

// 食谱
const recipes = [
    'DIY', '浓情烤翅', '黄金薯条', '葡式蛋挞', '香烤板栗', '酱香排骨', '黄金煎饺', '童趣鸡米花', '盐烤带鱼', '蒜香大虾',
    '拧香秋刀鱼', '辣烤鱿鱼', '美味牛排', '孜然羊排', '香煎五花肉', '彩蔬串串', '香烤紫薯', '田园玉米', '椒盐娃娃菜', '黄金炸豆腐',
    '香炸花生米', '劲爆爆米花', '脆香腰果', '纸杯蛋糕', '奶香小餐包', '黄金馒头片', '黄油曲奇', '宝贝磨牙棒', '麦香油条', '黄金煎包',
    '飘香手抓饼', '香炸春卷'
];

// 状态
const status = [
    '待机', '烹饪中...', '结束', '预约中...', '预热中...', '预热保持...', '异常'
];

// 错误码
const code = [
    '正常', '传感器短路', '传感器开路'
];

// 错误码提示
export const codeMsg = [
    '',
    '请联系客服，电话：400-618-6999',
    '请联系客服，电话：400-618-6999'
];

// 按钮文字
export const btnMsg = [
    [ '取消制作', '取消预约' ],
    [ '修改参数', '保持预热' ],
    '跳过预热'
];

// cook.vue 中的 tab 栏数据
export const tabBarList = [ '食谱', 'DIY', '收藏' ];
export const tabBarListMsg = [ 'recipes', 'diy', 'collection' ];

// 预约的副标题
export const AppointPickerMsg = '制作时间为 {{workTime}} 分钟，请预约 {{hours}} 时 {{minutes}} 分后的时间';

// 取消预约提示
export const cancelPreTimeMsg = '是否取消预约？';
export const cancelWorkMsg = '是否取消制作？';

// 是否 保持预热 | 开始制作 提示
export const keepHotMsg = '即将保持预热 30 分钟，是否要执行？';
export const passHotMsg = '即将跳过预热， 是否要执行？';
export const workMsg = '预约时间小于工作时间，是否立即制作?';

// 修改参数 title 栏文本
export const setParamsMsg = [ '设定参数', '修改参数' ];

// params.vue 提示文本
export const paramsMsg = [
    '温度',
    [ '时长设定', '预计 {{hours}}:{{minutes}} 左右完成' ],
    '搅拌',
    '预热'
];

// 开始制作
export const startWorkMsg = '开始制作';

// 工作完成tis
export const finishMsg1 = '亲！{{mode}}已完成，您可以享受美食了～';
export const finishMsg2 = '也可以再烹一下';

// 预约
export const reservationMsg = '预约';

// 收藏
export const collectionMsg = [ '收藏', '取消收藏' ];

// 预约时间超过 12 个小时
export const preWarnMsg = '预约时间不能超过12个小时, 请重新预约．';

export default {
    recipes,
    status,
    code,
    codeMsg
};
