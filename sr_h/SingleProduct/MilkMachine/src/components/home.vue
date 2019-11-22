<template>
    <div class="home">

        <div class="txt test" style="display: none" @click="test">
            <h1 class="txt">
                {{ 'speed: ' + speed + ' program: ' + program + ' DIYTime: ' + DIYTime + ' workTime: ' + workTime + ' action: ' + action + ' leftTime: ' + leftTime + ' preTimeHour: ' + joyoung.preTimeHour + ' preTimeMin: ' + preTimeMin + ' faultDetectionCode:' + faultDetectionCode }}
            </h1>
            <h1 class="txt">
                + 解决用户体验的问题以及云食谱去除
            </h1>
        </div>

        <!-- 主题显示 开始 -->
        <div id="top">
            <div class="inner">

                <!-- 中间主体 -->
                <keep-alive>
                    <component
                        :is="curView"
                        :joyoung="joyoung"
                        :isShow="isShow"
                        :workTime.sync="workTime"
                        @sendParam="sendParam">

                    </component>
                </keep-alive>

                <!-- 底部选择栏 -->
                <div :class="[ 'choose', 'clearfix', { diy: isChooseDIY } ]">
                    <div class="item" v-for="( item, $index ) in chooseData" :key="$index"
                        @click="chooseClick( $index )">

                        <div class="tit">{{ item.tit }}</div>
                        <div class="txt">
                            <span class="info">{{ item.txt }}</span>
                            <span class="unit">{{ item.unit }}</span>
                        </div>
                    </div>
                    <div class="line"></div>
                </div>

            </div>
        </div>
        <!-- 主题显示 结束 -->

        <!-- 底部按钮 开始 -->
        <div id="bottom">

            <!-- 按钮组件 -->
            <ButtomMenu :opt=" opt "
                        :words="words" >
            </ButtomMenu>

            <!-- 提示框 开始 -->
            <Tip :is-show="isShow"
                :joyoung="joyoung"
                :workTime.sync="workTime"
                :old-speed.sync="oldSpeed"
                @canclePreActive="canclePreActive"
                @sendParam="sendParam"></Tip>

        </div>
        <!-- 底部按钮 结束 -->

    </div>
</template>

<script>

import Vue from 'vue'
import mixin from '../common/mixins.js'

// dictionary
import {
    btnMenu, hotLetter, iceLetter, SEND_PARAMS, btnCancelPre, btnCanceWork, ERROR_NUM, PRETIME_NUM, programLetter,
    preTimeTip, isToday, warnMsg,
} from '../dictionary/dictionary.js'

import { btnImgs, hotIndex, iceIndex, hotImgs, iceImgs, btnCancelImg } from '../dictionary/imgSrc.js'
import { TIT_COLOR_ON, TIT_COLOR_MASK } from '../dictionary/colors.js'
import { def } from '../config/def.config.js'

import mork from '../common/mork.js'
// api
import apiFn from '../common/api.js'
import common from '../common/common.js'
import $time from '../assets/time.js'

/* 组件 */
import On from './On.vue'
import Tip from './Tip.vue'
import ButtomMenu from 'BottomMenu'

export default {
    name: "home",
    mixins: [ mixin ],
    components: {
        On,
        Tip,
        ButtomMenu,
    },

    data() {
        return {
            mork,
            joyoung: {},
            curView: On,
            workTime: 0,
            show: false,
            oldSpeed: 5,
            isStatus3: true,

            // 冷饮, 热饮 arrow 的 index 值
            hotCupIndex: 0,
            iceCupIndex: 0,

            // 控制开关
            isShow: {
                preTime     : false,        // 预约提示栏
                preTip      : false,        // 预约确定提示
                DIYSpeed    : false,        // DIY 档位选择
                DIYTime     : false,        // DIY 时间选择
                warnTip     : false,        // 提示
                iceCupTip   : false,        // 冷杯不能制作提示
                is12Tip     : false,        // 预约时间是否超过 12 个小时
                isWorking   : false,        // 正在工作中提示
                complete    : false,        // 工作完成
                confirm     : false,        // 是否取消
                workConfirm : false,        // 是否开始制作
                isAction    : false,        // 倒计时是否开始
                // flag        : false,        // 决定剩余时间是否覆盖工作时间
            },

            // 选择栏
            chooseData: [{
                tit: '转速',
                txt: undefined,
                unit: '档'
            }, {
                tit: '制作时间',
                txt: undefined,
                unit: '秒'
            }],

            // 底部菜单
            bottomList: {
                data: [
                    {       // 预约
                        imgUrl: btnImgs[ 0 ],
                        ungroup: true,
                        callback: ( index, item ) => {

                            // 点击吧其他 select 的选择框去除
                            this.bottomList.data.forEach( el => {
                                el.isUnArrow = true;
                            } );

                            if ( 1 === this.program ) {     // DIY 不支持预约
                                this.isShow.warnTip = true;
                                return;
                            }

                            if ( 0 === this.program ) {     // 点击预约默认选中热五谷
                                this.program = 2;
                            }

                            item.isActive = true;
                            if ( 1 !== this.program ) {     // 计算 workTime 时间
                                this.workTime = Vue.filter( 'workTime' )( this.program );
                            }

                            // 判断是否为冷杯
                            if ( ( this.cupStatus === 1 || this.cupStatus === 0 ) && this.program !== 1 ) {
                                this.isShow.iceCupTip = true;
                                this.isShow.warnTip = true;
                                return;
                            } else {
                                this.isShow.iceCupTip = false;
                            }
                            this.isShow.preTime = true;
                        },
                    }, {    // 热杯
                        imgUrl: btnImgs[ 1 ],
                        arrow: hotIndex.map( el => Vue.filter( 'program' )( el ) ),
                        arrowCallback: ( index, item ) => {

                            item.imgUrl = hotImgs[ index ];
                            let $index = hotIndex[ index ];
                            this.arrowCallback( $index );
                        },
                        callback: ( index, item ) => {

                            if ( index !== this.bottomList.curIndex ) {
                                item.isUnArrow = false;
                            }

                            this.cupStatus = 2;
                            this.arrowCallback( hotIndex[ this.hotCupIndex ] );
                        },
                    }, {    // 冷杯
                        imgUrl: btnImgs[ 2 ],
                        arrow: iceIndex.map( el => Vue.filter( 'program' )( el ) ),
                        arrowCallback: ( index, item ) => {

                            item.imgUrl = iceImgs[ index ];
                            let $index = iceIndex[ index ];
                            this.arrowCallback( $index );
                        },
                        callback: ( index, item ) => {

                            if ( index !== this.bottomList.curIndex ) {
                                item.isUnArrow = false;
                            }

                            this.cupStatus = 1;
                            this.arrowCallback( iceIndex[ this.iceCupIndex ] );
                        },
                    }, {    // 自定义
                        imgUrl: btnImgs[ 3 ],
                        callback: ( index, item ) => {

                            this.program = 1;
                        },
                    }
                ],

                curIndex: 0,
                switch: true,
            },
            cancelList: {
                data: [{
                    imgUrl: btnCancelImg,
                    callback: ( index, item ) => {

                        // 取消保温
                        if ( 3 === this.status ) {
                            this.api.sid.joyoung.status = { val: 0 };
                            this.api.sid.joyoung.action = { val: 0 };
                            this.api.send.joyoung();
                            return;
                        }
                        this.isShow.confirm = true;
                    },
                }],
                curIndex: 1,
                switch: true,
            }
        };
    },

    computed: {

        /* 按钮文字 */
        words() {
            return [
                3 === this.status ?
                    '取消保温' :
                    6 === this.status ? btnCancelPre : ( ( this.action && 3 !== this.status ) ? btnCanceWork : btnMenu[ 0 ]  ),
                Vue.filter( 'program' )( hotIndex[ this.hotCupIndex ] ),
                Vue.filter( 'program' )( iceIndex[ this.iceCupIndex ] ),
                btnMenu[ 3 ]
            ];
        },

        /* 按钮选项 */
        opt() {
            let res;
            if ( 6 === this.status ) {
                res = this.cancelList;
            } else if ( 3 === this.status && this.isStatus3 ) {
                this.isStatus3 = false;
                res = this.cancelList;
            } else if ( this.action && 3 !== this.status && 5 !== this.status ) {
                res = this.cancelList;
            } else {
                res = this.bottomList;
            }

            return res;
        },

        /* program 模式 */
        program: {
            get() {
                let res = this.joyoung.program;

                if ( res <= 0 || res > 11 ) {
                    res = Vue.prototype.oldProgram || 3;
                    this.sendParam( 'program', res );
                }

                if ( 11 === res ) {
                    console.log( '设备不支持云食谱!' );
                    res = Vue.prototype.oldProgram;
                }

                Vue.prototype.oldProgram = res;


                if ( 1 !== res ) {
                    this.oldSpeed = 5;

                    this.workTime = Vue.filter( 'workTime' )( res );
                } else {

                    // // 解决设备不使用 DIYTime 字段的问题
                    // this.joyoung.DIYTime = this.leftTime;

                    this.workTime = this.DIYTime;
                    this.bottomList.curIndex = 4;
                }


                try {
                    this.api.modifyTitleStatus( Vue.filter( 'programLetter' )( res ) );
                } catch ( error ) { }
                this.initBtnActive( res );
                return res;
            },
            set( val ) {
                this.sendParam( 'program', val );
            },
        },

        /* 杯模式 */
        cupStatus: {
            get() {
                return this.joyoung.cupStatus;
            },
            set( val ) {
                this.sendParam( 'cupStatus', val );
            },
        },

        /* 预约时间 */
        preTimeHour() {
            return this.joyoung.preTimeHour;
        },
        preTimeMin() {
            return this.joyoung.preTimeMin;
        },

        /* 剩余时间 */
        leftTime() {
            let res = this.joyoung.leftTime;

            // 又要不能显示其他时候的 leftTime 又要显示正确的 DIYTime
            if ( 1 === this.program && 1 === this.status ) {
                this.joyoung.DIYTime = res;
            }

            return res;
        },


        // 工作状态
        status() {

            let res = this.joyoung.status;

            if ( 7 === res ) {

                this.isShow.confirm = false;
                this.isShow.complete = true;
            } else if ( 1 === res ) {

                this.isStatus3 = true;
                this.isShow.isAction = false;
                $time.clearInterval();
            } else if ( 5 === res ) {

                console.log( 'status 报警!' );
                this.isShow.isAction = false;
                $time.clearInterval();
                this.sendParam( 'action', 0 );
            }

            if ( 1 !== res ) {
                this.sendParam( 'action', 0 );
            }

            if ( 5 !== res ) {
                this.api.removeMessage( { type: ERROR_NUM } );
            }

            if ( 6 !== res ) {
                this.api.removeMessage( { type: PRETIME_NUM } );
            } else {

                let preTimeHour = this.getItem( 'preTimeHour' ), preTimeMin = this.getItem( 'preTimeMin' );
                let msg;
                console.log( `loacl=> hour: ${ preTimeHour } minutes: ${ preTimeMin }` );
                this.api.deviceLog( 'localPre', `preTimeHour: ${ preTimeHour }, preTimeMin: ${ preTimeMin }` );

                if ( null == preTimeHour || null == preTimeMin )  {

                    let t = $time.addTime( this.preTimeHour, this.preTimeMin );
                    this.addPreTip( +t.isToday, t.hours, t.minutes );

                } else {

                    this.addPreTip( +$time.isToday( preTimeHour, preTimeMin ), preTimeHour, preTimeMin );
                }
            }
            return res;
        },
        action() {
            let res = this.joyoung.action;

            if ( 1 === res ) {

                if ( 3 !== this.status && 5 !== this.status ) {
                    this.sendParam( 'status', 1 );
                }

                if ( 5 === this.status ) return 0;
            }
            return res;
        },

        // 档位
        speed() {
            // this.sendParam( 'speed', this.oldSpeed );
            Vue.prototype.oldSpeed = this.oldSpeed;

            return this.chooseData[ 0 ].txt = Vue.filter( 'speedToH' )( this.oldSpeed );
        },
        // DIY 时间, 监听变化, 在 On 页面改变
        DIYTime() {
            let res = this.joyoung.DIYTime;

            this.chooseData[ 1 ].txt = res;
            return res;
        },

        // chooseDIY
        isChooseDIY() {
            return ( 1 === this.action && 3 !== this.status ) || 1 !== this.program || 6 === this.status || 3 === this.status;
        },

        // 错误码处理
        faultDetectionCode() {

            let code, index, faultDetection, services;
            services = this.mork.services;
            index = services.findIndex( el => el.sid === 'faultDetection' );
            faultDetection = services[ index ].data;

            code = faultDetection.code;

            // 警告提示
            if ( 0 !== code && 5 === this.status ) {
                this.api.addMessage( { type: ERROR_NUM, key: 1, icon: 1, msg: Vue.filter( 'faultDetection_code' )( code ) } );
            } else {
                this.api.removeMessage( { type: ERROR_NUM } );
            }
            return code;
        },
    },
    created() {

        /* 初始化 */
        let { services } =  this.mork;
        this.joyoung = services[ services.findIndex( el => el.sid === 'joyoung' ) ].data;
        Vue.prototype.speed = 5;

        /* api 处理 */
        Vue.prototype.api = apiFn( services, 'MilkMachine' );
        this.api.modifyTitleBar( TIT_COLOR_ON );
        this.api.callback = data => {

            if ( 1 === data.joyoung.action && 3 !== data.joyoung.status ) {
                // 调试代码
                if ( !this.api.hasHilink ) {
                    this.show = true;
                }

                this.workTime = Vue.filter( 'workTime' )( data.joyoung.program );
                window.setTimeout( _ => this.show = true, 500 );
                this.getDevHistory();

                if( this.api.hasHilink ){
                    console.log( '设备下发:', 'getDevInfo: leftTime' );
                    this.api.getDevInfo();
                }
            } else {
                this.show = true;
            }

            // 预约状态
            if ( 6 === data.joyoung.status ) {
                let preTimeHour = this.getItem( 'preTimeHour' ), preTimeMin = this.getItem( 'preTimeMin' );
                console.log( `loacl=> hour: ${ preTimeHour } minutes: ${ preTimeMin }` );
            }
        }
        this.api.getCallback( 'getDevInfo', res => {
            console.log( 'freashLefttimeRes:', res );
            this.api.deviceLog( 'freashLefttimeRes:', res );

            let data, now, step;

            now = new Date();
            data = common.parse( res );

            // let { leftTime, preTimeHour, preTimeMin } = data;
            let leftTime = data.leftTime;

            /* 解决设备上报的预约剩余时间不变化的问题 */
            // if ( null != preTimeHour && null != preTimeMin ) {
            //     this.joyoung.preTimeHour = preTimeHour;
            //     this.joyoung.preTimeMin = preTimeMin;
            // }

            if ( leftTime < 0 || typeof leftTime !== 'number' ) {
                leftTime = 0;
            }
            if ( this.isShow.isAction ) {
                step = Math.abs( this.workTime - leftTime );

                if ( step > 2 ) {
                    this.workTime = leftTime;
                } else {
                    // 没有对应的时间会继续当前的 workTime 进行倒计时
                    console.log( 'leftTime超出界限:', leftTime );
                    this.api.deviceLog( 'leftTime超出界限:', leftTime );
                }
            }

            this.show = true;
        } );

        this.api.send();
    },


    methods: {
        /* 测试 */
        test() {

            /* 测试 DIY */
            // Object.assign( this.joyoung, {
            //     program: 1,
            //     status: 1,
            //     DIYTime: 0,
            //     leftTime: 55,
            //     action: 1,
            // } );

            this.joyoung.program = 11;
        },

        /* 根据 program 来初始化 */
        initBtnActive( val ) {

            let index;
            if ( ( index = hotIndex.findIndex( el => el === val ) ) != -1 ) {           // 热杯

                this.bottomList.curIndex = 2;
                this.bottomList.data[ 1 ].imgUrl = hotImgs[ index ];
                this.hotCupIndex = index;
                this.cupStatus = 2;
            } else if ( ( index = iceIndex.findIndex( el => el === val ) ) != -1 ) {    // 冷杯

                this.bottomList.curIndex = 3;
                this.bottomList.data[ 2 ].imgUrl = iceImgs[ index ];
                this.cupStatus = 1;
                this.iceCupIndex = index;
            }
        },

        /* 选择栏点击 */
        chooseClick( $index ) {

            if ( this.isChooseDIY ) return;

            switch ( $index ) {
                case 0:
                    this.isShow.DIYSpeed = true;
                    break;
                case 1:
                    this.isShow.DIYTime = true;
                    break;
            }
        },

        /* 取消预约活动状态 */
        canclePreActive() {
            this.bottomList.data[ 0 ].isActive = false;
        },

        /* 热饮和冷饮的选择回调 */
        arrowCallback( $index ) {
            this.program = $index;
        },

        /* 修改下发的缓存 */
        sendParam( key, val ) {

            this.joyoung[ key ] = val;
            this.api.sid.joyoung[ key ] = { val };
        },
    },

    watch: {

        isShow: {
            // 变化 title 栏颜色
            deep: true,
            handler( val ) {
                for ( let key in val ) {
                    if ( val[ key ] && key !== 'isAction' && key !== 'iceCupTip' && key !== 'is12Tip' ) {
                        this.api.modifyTitleBar( TIT_COLOR_MASK );
                        return;
                    }
                }
                this.api.modifyTitleBar( TIT_COLOR_ON );
            },
        },

        leftTime( val ) {

            if ( this.api.isReset && this.isShow.isAction ) {
                this.api.getCallback( 'getDevInfo' )( JSON.stringify( { leftTime: val } ) );
            }
        },
    },
};
</script>

<style lang="less">

@import '../../../../static/css/mixins.less';

@chooseTop: 1.6rem;
@lineHeight: 3.6rem;

.home {
    .setWH();
}

#top {
    box-sizing: border-box;
    .setWH();
    padding-bottom: @bottomHeight;
    background-clip: content-box;

    .inner {
        .setWH();
        .setPosition(relative);
        .setCenterUseFlex();
        background-image: linear-gradient(to bottom,#e3773a, #f7bf4d);
        justify-content: space-between;

        .choose {

            position: relative;
            left: 0;
            bottom: 0;
            width: 100%;
            margin: @chooseTop .8rem;

            .line {
                height: @lineHeight;
                width: 1px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                background-color: @white_2;
            }

            .item {
                width: 50%;
                text-align: center;
                float: left;
            }

            .txt {
                color: #fff;
                vertical-align: middle;
                position: relative;

                .info {
                    font-size: 2.2rem;
                }
                .unit {
                    font-size: 1.2rem;
                }
            }

            .txt::after {
                content: "";
                position: absolute;
                top: 77%;
                transform: translate(50%,-50%);
                border: solid 5px transparent;
                border-top: solid 5px #fff;
            }

            .tit {
                font-size: 1.2rem;
                color: @white_7;
            }
        }

        .choose.diy {
            opacity: .3;

            .line {
                background-color: @white_5;
            }
        }
    }

    .status {
        font-size: 1.3rem;
        color: rgba(255, 255, 255, .7);
        text-align: center;
        transform: translateY(0);
    }
}

#bottom {

    // overflow-x: hidden;
    width: 100%;
    height: @bottomHeight;
    position: fixed;
    left: 0;
    bottom: 0;

    .item_1 {
        .arrow.word::before {
            content: "热 · ";
            font-weight: 700;
        }
    }

    .item_2 {
        .arrow.word::before {
            content: "冷 · ";
            font-weight: 700;
        }
    }
}

</style>
