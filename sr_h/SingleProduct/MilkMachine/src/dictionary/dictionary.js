// 故障码
export const faultDetection_status = ['运行正常，无错误', '设备运行异常'];
export const faultDetection_code = [
    '设备正常',
    'E00 麻烦您将杯盖再次彻底清洗后，再开始启动工作。',
    'E01 抱歉，因电压不稳，导致工作异常，需要等市电稳定后才能开始工作哦。',
    'E02 麻烦您再次确认上盖是否盖紧、旋到位。上盖盖好后，10秒内产品将继续运行。',
    'E03 抱歉，因电压不稳，导致工作异常，需要等市电稳定后才能开始工作哦。',
    'E04 抱歉，因电压不稳，导致工作异常，需要等市电稳定后才能开始工作哦。',
    'E05 测温出现异常，请您先断开电源，再重新通电开机工作。如未解决，请联系售后人员。',
    'E06 测温出现异常，请您先断开电源，再重新通电开机工作。如未解决，请联系售后人员。',
    'E07 通讯异常，请您先断开电源，再重新通电开机工作。如未解决，请联系售后人员。',
    'E08 电机自动启动保护，请断电1小时后再开机使用。如未解决，请联系售后人员。',
    'E09 请您将食材切成小块或增加水及其他液体，避免大块食材或过稠。',
    'E10 1、杯底干烧，请加水等液体；2、食材超量或过浓，请您清理干净杯底，并按照说明书要求重新添加食材。',
    'E11 请联系九阳售后人员处理。服务热线400-6186-999。',
    'E12 请联系九阳售后人员处理。服务热线400-6186-999。',
    'E13 麻烦您将杯盖再次彻底清洗后，再开始启动工作。',
    'E14 抽真空异常：请您确认摇臂、杯盖、投料盖、密封件均安装到位，并清洁干净。',
    'E15 您选择的是加热料理功能，请盖好杯盖，并将投料盖对位标识别旋至“非真空／热料理”位置，确认摇臂已扣合到位。',
    'E16 您放置的杯体与选择功能不匹配哦。冷杯和保鲜杯不能做热饮，请您更换为热杯。',
    'E17 您好，保鲜杯不能制做冷饮哦，请您更换为热杯或冷杯。',
    'E18 搅拌杯内温度较高，此时不能抽空哦。如需粉碎食材可选择“奶昔”键等不带真空的功能。',
    'E19 杯内食材温度过高，请更换为常温食材或加冷水后重新启动工作。',
    'E20 您好，如果您需要使用“真空果汁”或“真空保鲜”功能，请将投料盖对位标识旋至“真空／冷料理”状态。',
];

// 状态码
export const status = ['待机', '工作中', '暂停', '保温', '休眠', '报警', '预约', '工作完成'].map(el => el + '...');

// 食谱
export const program = [undefined, '自定义', '五谷浆', '五谷浆', '汤糊', '汤糊', '杂粮粥', '果汁', '酱料', '温热', '清洗', undefined];
export const programLetter = ['', '自定义', '五谷浆 · 热料理', '五谷浆 · 冷料理', '汤糊 · 热料理', '汤糊 · 冷料理', '杂粮粥 · 热料理', '果汁 · 冷料理', '酱料 · 冷料理', '温热 · 热料理', '清洗', ''];
export const cupStatus = ['无杯', '冷杯', '热杯'];

// 工作时间
export const MINUTE = 60;
export const HOUR = MINUTE * MINUTE;
export const DEFUALT = 0;
export const workTime = [
    DEFUALT,
    DEFUALT, 30 * MINUTE, 4 * MINUTE, 30 * MINUTE, 5 * MINUTE,
    36 * MINUTE, 1 * MINUTE + 58, 6 * MINUTE, 20 * MINUTE, 50,
    DEFUALT,
];

// bottomWord
export const btnMenu = ['预约', undefined, undefined, '自定义'];
export const btnCancelPre = '取消预约';
export const btnCanceWork = '取消制作';

export const cancelTxt = ['是否取消制作', '是否取消预约'];

// 模式
export const taste = [undefined, '热饮', '冷饮'];

// 冷饮热饮头文字
export const hotLetter = '热 · ';
export const iceLetter = '冷 · ';

// 是否今天
export const isToday = ['明天', '今天'];

// 提示内容
export const warnMsg = '{{mode}}不支持预约';
export const workingTip = '正在工作中, 请重新预约';
export const completeTip = '制作完成了，您可以享受美食了';
export const preTimeTip = '已预约, {{day}}{{hours}}时{{minutes}}分完成制作';
export const preTimeIs12 = '预约时间不能超过 12 个小时';

// 要下发的属性名
export const SEND_PARAMS = 'action status program preTimeHour preTimeMin speed DIYTime workTime';

// 下发警告信息的 type 值
export const PRETIME_NUM = 2;
export const ERROR_NUM = 1;
// program 上传 0 取的默认值
export const PROGRAM_ZERO = 9;

export default {
    faultDetection_status,
    faultDetection_code,
    status,
    program,
    cupStatus,
    workTime,
    isToday,
    programLetter,
}