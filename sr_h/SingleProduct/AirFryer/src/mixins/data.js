/**
 * App.vue data 返回的数据
 */

export default {
    data () {
        return {

            // 缓存旧值
            cache: {
                recipes: 99,
                temperature: undefined,
                stirSwitch: undefined,
                preheatSwitch: undefined,
                workTime: undefined,
                preTimeHour: undefined,
                preTimeMin: undefined,
                status: 0
            },

            // 控制弹窗是否显示
            isShow: {
                appointPicker: false,
                confirmBox: false,
                complete: false,
                tips: false,
                warnBox: false
            }
        };
    }
};
