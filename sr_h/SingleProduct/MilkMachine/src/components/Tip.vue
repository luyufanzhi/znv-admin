<template>
    <div>
        <!-- 预约提示 -->
        <AppointPicker
            v-show="isShow.preTime"
            :title="'预约完成时间'"
            :unit="unit"
            :defaultValues="defTime"
            @cancel="preTimeCancel"
            @submit="preTimeSubmit"></AppointPicker>

        <!-- 预约确定提示 -->
        <PreTip
            v-show="isShow.preTip"
            @cancel="isShow.preTip = false, isShow.preTime = true, $emit( 'canclePreActive', false )"
            @submit="preTipSubmit">

            {{ joyoung.program | program }} 制作需要{{ workTime | workTimeToString }},
            最早预约完成时间为{{ isToday | isToday }} {{ preTimeHour }} 时 {{ preTimeMin }} 分,
            是否立即制作食物。
        </PreTip>

        <!-- 不能预约提示 -->
        <Warn
            v-show="isShow.warnTip || isShow.isWorking"
            @cancel="isShow.warnTip = false, isShow.isWorking = false"
            @submit="warnSubmit">

            {{ warnMsg }}
        </Warn>

        <!-- DIY 档位选择 -->
        <SpeedPicker ref="DIYSpeed"
            v-show="isShow.DIYSpeed"
            :title="'电机档位'"
            :values="SpeedData"
            :defaultValue="5"
            :unit="'stalls'"
            @cancel="isShow.DIYSpeed = false"
            @submit="DIYSpeedSubmit"></SpeedPicker>

        <!-- DIY 时间选择 -->
        <DIYTimePicker ref="DIYTime"
            v-show="isShow.DIYTime"
            :values="DIYTimeData"
            :defaultValue="30"
            :unit="'second'"
            :title="'DIY时间'"
            @cancel="isShow.DIYTime = false"
            @submit="DIYTimeSubmit"></DIYTimePicker>

        <!-- 工作完成 -->
        <Complete
            v-if="isShow.complete"
            :src="completeTip.src"
            @submit="completeSubmit">

            {{completeTip.name}}
        </Complete>

        <!-- 是否确认取消 -->
        <Confirm
            v-show="isShow.confirm"
            :cancelWord="'否'"
            :submitWord="'是 red'"
            @cancel="isShow.confirm = false"
            @submit="confirmSubmit">

            {{ confirmTxt[ +( 6 === joyoung.status ) ] }}
        </Confirm>

        <!-- 是否开始制作 -->
        <WorkConfirm
            v-show="isShow.workConfirm"
            :title="'确认启动'"
            @cancel="isShow.workConfirm = false"
            @submit="workConfirmSubmit">

            <p class="tl">模<span style="opacity: 0">呵呵</span>式:&nbsp;&nbsp; {{ workConfirmData[ 0 ] }}</p>
            <p class="tl">工作时间:&nbsp;&nbsp; {{ workConfirmData[ 1 ] }}</p>
        </WorkConfirm>

        <!-- 新的时间选择器 -->
        <!-- <AppointPicker2
            v-show="xxx"
            :title="'预约完成时间'"
            @cancel="xxx=false"
            @submit="xxx=false"></AppointPicker2> -->

        <!-- <button class="test" @click="test">click me</button> -->

    </div>
</template>

<script>

import Vue from 'vue'
import mixin from '../common/mixins.js'

// dictionary
import {
    program, MINUTE, warnMsg, workingTip,
    completeTip, btnMenu, preTimeTip, PRETIME_NUM,
    cancelTxt, PROGRAM_ZERO, isToday, preTimeIs12
} from '../dictionary/dictionary.js'

import { completeIcon } from '../dictionary/imgSrc.js'

import $time from '../assets/time.js'

// 组件
import AppointPicker from 'AppointPicker.V2.vue'
import PreTip from 'ConfirmBox.vue'
import Warn from 'WarnBox.vue'
import Complete from 'WarnBox.vue'
import SpeedPicker from 'SinglePicker.vue'
import DIYTimePicker from 'SinglePicker.vue'
import Confirm from 'ConfirmBox.vue'
import WorkConfirm from 'ConfirmBox.vue'

// 测试新的时间选择器
// import AppointPicker2 from 'AppointPicker.V2.vue'

export default {
    name: 'Tip',
    props: [ 'isShow', 'joyoung', 'workTime', 'oldSpeed' ],
    mixins: [ mixin ],
    components: {
        AppointPicker,
        PreTip,
        SpeedPicker,
        DIYTimePicker,
        Warn,
        Complete,
        Confirm,
        WorkConfirm,
        // AppointPicker2,
    },

    data() {
        return {
            defTime: [ 7, 10 ],         // 预约的默认时间
            preTimeHour: 7,             // 从 picker 上获取的时间
            preTimeMin: 10,
            isToday: false,             // 是否今天
            workingTip,
            unit: undefined,

            SpeedData: [],
            DIYTimeData: [],

            completeTip: {
                name: completeTip,
                src: completeIcon,
            },

            isNowWork: false,           // 是否正在工作中
            confirmTxt: cancelTxt,      // 是否取消制作, 预约
            // xxx: true,
        }
    },

    created() {
        let i = 0, key = 5;
        for ( i = 0; i < 10; i++ ) {
            this.$set( this.SpeedData, i, Vue.filter( 'speedToH' )( i + 1 ) );
        }

        i = 0;
        while ( key <= 360 ) {
            this.$set( this.DIYTimeData, i++, key );
            if ( key > 0 && key < 60 ) {
                key += 5;
            } else if ( key >= 60 && key < 120 ) {
                key += 10;
            } else if ( key >= 120 ) {
                key += 30;
            }
        }
    },

    computed: {
        // 本地工作时间分秒
        workTimeMin() {
            return Math.floor( this.workTime / MINUTE );
        },
        workTimeSec() {
            return this.workTime % MINUTE;
        },

        // 开始启动信息
        workConfirmData() {
            return [ Vue.filter( 'programLetter' )( this.joyoung.program || PROGRAM_ZERO ), Vue.filter( 'workTimeToString' )( this.workTime ) ];
        },

        // 不能预约提示
        warnMsg() {
            let reg = '{{mode}}';

            if ( 1 === this.joyoung.program ) {
                this.isShow.iceCupTip = false;
                this.isShow.is12Tip = false;
                return warnMsg.replace( reg, 'DIY' );
            } else if ( this.isShow.iceCupTip ) {
                this.isShow.is12Tip = false;
                return warnMsg.replace( reg, '冷杯' );
            } else {
                this.isShow.iceCupTip = false;
                return preTimeIs12;
            }
        },
    },

    methods: {
        test() {
            // this.unit = "year month";
            // this.defTime = [ 10, 30 ];
        },

        /* 预约 */
        preTimeSubmit( data ) {
            this.$emit( 'canclePreActive', false );
            this.isShow.preTime = false;
            this.preTimeHour = data[ 0 ];
            this.preTimeMin = data[ 1 ];

            this.setItem( 'preTimeHour', +data[ 0 ] );
            this.setItem( 'preTimeMin', +data[ 1 ] );

            // 工作时长小于 0 退出
            if ( this.workTime == 0 ) return;

            // 立即制作
            if ( !this.computedTime() ) {

                if ( !this.isShow.warnTip ) {
                    this.isShow.preTip = true;
                }
                return;
            }

            // 预约
            // this.sendParam( 'status', 6 );
            this.api.sid.joyoung.status = { val: 6 };
            this.isNowWork = false;
            this.api.modifyTitleStatus( btnMenu[ 0 ] );
            this.sendWork();
        },
        preTimeCancel() {
            this.isShow.preTime = false;
            this.$emit( 'canclePreActive', false );
        },

        /* 预约提示 */
        preTipSubmit( data ) {

            this.isShow.preTip = false;
            this.$emit( 'canclePreActive', false );
            this.sendParam( 'status', 1 );

            console.log( '正在工作中!!' );
            this.api.sid.joyoung.action = { val: 1 };
            this.sendWork();
        },

        /* warn 提示框 */
        warnSubmit() {
            this.isShow.warnTip = ( this.isShow.isWorking = false );
            this.$emit( 'canclePreActive', false );

            if ( this.isShow.is12Tip ) {
                this.isShow.preTime = true;
            }
        },

        /* DIY */
        DIYTimeSubmit( val ) {
            this.isShow.DIYTime = false;
            if ( val == null ) return;
            this.sendParam( 'DIYTime', val[ 0 ] );
            this.sendParam( 'workTime', val[ 0 ] );
            this.sendTime( val[ 0 ] );
        },
        DIYSpeedSubmit( val ) {
            let res = val[ 0 ];
            this.isShow.DIYSpeed = false;
            if ( val == null ) return;
            if ( 'H' === res ) {
                res = 10;
            }
            this.$emit( 'update:oldSpeed', res );
        },

        /* 取消预约和取消制作的提示框 */
        confirmSubmit() {

            this.api.sid.joyoung.action = { val: 0 };
            this.api.sid.joyoung.status = { val: 0 };
            this.isShow.confirm = false;
            this.api.removeMessage( { type: PRETIME_NUM } );
            // this.sendWork();
            // 比较特殊, 需要全部下发才会取消
            this.api.send.joyoung();
        },

        /* 计算时间 */
        computedTime() {
            let now = new Date(), hour, min, isNowWork, resH, resM, workTimeMin, workTimeSec, workTimeHour;
            hour = now.getHours(), min = now.getMinutes();

            this.isToday = this.preTimeHour > hour || ( this.preTimeHour == hour && this.preTimeMin - min >= 0 );

            if ( this.isToday ) {   // 今天

                resM = this.preTimeMin + ( this.preTimeMin >= min  ? 0 : 60 ) - min;
                resH = this.preTimeHour - hour + ( this.preTimeMin >= min  ? 0 : -1 );

                workTimeHour = this.workTime / MINUTE / MINUTE;
                this.isNowWork = resH < Math.floor( workTimeHour ) || ( ( resH == Math.floor( workTimeHour ) ) && resM <= ( this.workTime / MINUTE ) );

                if ( this.isNowWork ) {

                    console.log('下发预约时间: isNowWork | Hour minute | ', resH, resM);
                    this.sendParam( 'preTimeHour',resH );
                    this.sendParam( 'preTimeMin', resM );
                    return false;
                }

            } else {                // 明天

                resM = this.preTimeMin + ( this.preTimeMin >= min  ? 0 : 60 ) - min;
                resH = 24 + this.preTimeHour - hour + ( this.preTimeMin >= min ? 0 : -1 );
            }

            // 判断是否超过 12 小时
            if ( resH * 60 + resM > 12 * 60 ) {
                this.isShow.warnTip = true;
                this.isShow.is12Tip = true;
                return false;
            } else {
                this.isShow.is12Tip = false;
            }

            console.log('下发预约时间 | Hour minute | ', resH, resM);
            this.sendParam( 'preTimeHour',resH );
            this.sendParam( 'preTimeMin', resM );

            return true;
        },

        /* 是否开始制作 */
        workConfirmSubmit() {
            this.isShow.workConfirm = false;
            this.api.sid.joyoung.action = { val: 1 };
            this.api.sid.joyoung.status = { val: 1 };
            this.api.removeMessage( { type: PRETIME_NUM } );
            this.sendWork();
        },

        /* 完成提示 */
        completeSubmit() {
            this.sendParam( 'action', 0 );
            this.isShow.complete = false;
        },
    },

    watch: {

        'isShow.complete'( val ) {
            if ( val ) {
                this.isShow.isAction = false;
                $time.clearInterval();
            }
        },
    },
}
</script>

<style scoped lang="less">
p.tl {
    line-height: 2.5rem;
    font-size: 1.5rem;
    height: 2.5rem;
    text-indent: 4.2rem;
}
</style>
