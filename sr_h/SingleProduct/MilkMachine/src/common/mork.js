

const mock = {
    "devId": "d32dd0e7-5015-4565-a995-ca416b317",
    "nodeType": "05A",
    "gatewayId": "758cfa12-7d95-45ff-b415-e02c87fd3bda",
    "devInfo": {
        "sn": "F0FE6B45B83B",
        "model": "CXW-200-JQ01TS.H",
        "devType": "05A",
        "manu": "027",
        "mac": "",
        "hiv": "1.0",
        "fwv": "8",
        "hwv": "2.0",
        "swv": "5015-4565-ca416B317d36",
        "protType": "1",
        "prodId": "103M"
    },

    "services": [{

        /* 总开关 */
        "st": "joyoung",
        "sid": "joyoung",
        "data": {
            // 0-待机 1-工作中 2-暂停 3-保温 4-休眠 5- 报警 6- 预约 7- 工作完成
            "status": 1,
            // 0-停止/取消 1-启动
            "action": 0,
            // 1-本地DIY 2-五谷豆浆(热) 3-五谷豆浆（冷）4-汤糊（热）5-汤糊（冷）
            // 6-杂粮粥 7-果汁 8-酱料 9-温热 10-点动 /清洗 11-云食谱
            "program": 3,
            // 单位: 秒
            /*  各功能选项缺省的制作时长如下：
                五谷豆浆（冷料理） 4分钟
                五谷豆浆（热料理） 30分钟
                汤湖（冷料理） 5分钟
                汤湖（热料理） 30分钟
                杂粮粥（热料理） 36分钟
                果汁（冷料理） 1分56秒
                酱料（冷料理） 6分钟
                温热 （直接加热到70度）  20分钟
                清洗   50秒
                DIY模式设定DIYTime之后会用设定的时间填充这个字段。 */
            "workTime": 0,
            // 剩余时间
            "leftTime": 0,
            /*  (预约时间-当前时间)<工作时间时，立即启动工作。
                只有热饮功能才可以被预约，预约的是烹饪完成时间。可预约未来24小时内的时间点。 */
            "preTimeHour": 0,
            "preTimeMin": 0,
            // 0-无杯 1-冷杯 2-热杯
            "cupStatus": 2,
            // 电机档位。缺省是5档
            "speed": 5,
            // 1-热饮 2-冷饮
            "taste": 2,
            /*  DIY的工作时间：秒。
                program = 1的时候有效。
                设定后传给worktime，供设备使用。
                0-60s步长5s，60s-120s步长10s，大于120s步长30s。 */
            // 0-360
            "DIYTime": 0,
        }
    }, {

        /* 故障码 */
        "st": "faultDetection",
        "ts": "20151212T121212Z",
        "sid": "faultDetection",
        "data": {
            // 0-12
            "code": 0,
            // 0-运行正常，无错误 1-设备运行异常
            "status": 0,
        }
    }],

    "status": "online"

}

export default mock;