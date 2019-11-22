<template>
    <div>
        <!-- 预约提示 -->
        <AppointPicker
            v-show="isShow.preTime"
            :title="'预约时间'"
            :area="'0:0;23:59'"
            :step="10"
            :defaultNo="[ preTimeHour, preTimeMin ]"
            :word = "['时','分']"
            @cancel="preTimeCancel"
            @submit="preTimeSubmit"></AppointPicker>

        <!-- 预约确定提示 -->
        <PreTip
            v-show="isShow.preTip"
            @cancel="isShow.preTip = false, isShow.preTime = true"
            @submit="preTipSubmit">

            {{ joyoung.program | program }} 制作需要{{ workTime | workTimeToString }},
            最早预约网时间为{{ isToday | isToday }} {{ preTimeHour }} 时 {{ preTimeMin }} 分,
            是否立即制作食物。
        </PreTip>

        <!-- 冷杯不能预约提示 -->
        <Warn
            v-show="isShow.iceCupTip || isShow.isWorking"
            @cancel="isShow.iceCupTip = false, isShow.isWorking = false"
            @submit="warnSubmit">

            {{ isShow.iceCupTip ? iceTip : workingTip }}
        </Warn>

        <!-- DIY 档位选择 -->
        <SpeedPicker
            v-if="isShow.DIYSpeed"
            :defaultNo="[ this.joyoung.speed ]"
            :area="[1,10]"
            :stepone="1"
            :word="['档']"
            :title="'电机档位'"
            @cancel="isShow.DIYSpeed = false"
            @submit="DIYSpeedSubmit"></SpeedPicker>

        <!-- DIY 时间选择 -->
        <DIYTimePicker
            v-if="isShow.DIYTime"
            :defaultNo="[ joyoung.DIYTime ]"
            :area="[0, 360]"
            :word="['秒']"
            :title="'DIYTime时间'"
            @cancel="isShow.DIYTime = false"
            @submit="DIYTimeSubmit"></DIYTimePicker>

        <!-- 工作完成 -->
        <Complete
            v-if="isShow.complete"
            :title="completeTip.title"
            :name="completeTip.name"
            :src="completeTip.src"
            @cancel="isShow.complete = false"
            @submit="isShow.complete = false">

        </Complete>

        <!-- 是否确认取消 -->
        <Confirm
            v-show="isShow.confirm"
            :name="confirmTxt[ +( 6 === joyoung.status ) ]"
            @cancel="isShow.confirm = false"
            @submit="confirmSubmit"></Confirm>

        <!-- 是否开始制作 -->
        <WorkConfirm
            v-show="isShow.workConfirm"
            :area="workConfirmData"
            @cancel="isShow.workConfirm = false"
            @submit="workConfirmSubmit"></WorkConfirm>

    </div>
</template>

<script>

import Vue from 'vue'
import mixin from '../common/mixins.js'

// dictionary
import {
    program, MINUTE, iceTip, workingTip,
    completeTip, btnMenu, preTimeTip, PRETIME_NUM,
    cancelTxt, PROGRAM_ZERO
} from '../dictionary/dictionary.js'

import { completeIcon } from '../dictionary/imgSrc.js'

import $time from '../assets/time.js'

// 组件
import AppointPicker from './public/AppointPicker.vue'
import PreTip from './public/PreTip.vue'
import Warn from './public/Warn.vue'
import Complete from './public/Warn.vue'
import SpeedPicker from './public/SpeedPicker.vue'
import DIYTimePicker from './public/TimePicker.vue'
import Confirm from './public/Confirm.vue'
import WorkConfirm from './public/WorkConfirm.vue'

export default {
    name: 'Tip',
    props: [ 'isShow', 'joyoung', 'workTime' ],
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
    },

    data() {
        return {
            defTime: [ 7, 10 ],         // 预约的默认时间
            preTimeHour: 7,             // 从 picker 上获取的时间
            preTimeMin: 10,
            isToday: false,             // 是否今天
            iceTip,
            workingTip,

            completeTip: {
                name: completeTip,
                title: undefined,
                src: completeIcon,
            },

            isNowWork: false,           // 是否正在工作中
            confirmTxt: cancelTxt,      // 是否取消制作, 预约
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
    },

    methods: {

        /* 预约 */
        preTimeSubmit( data ) {
            this.isShow.preTime = false;
            this.preTimeHour = data[ 0 ];
            this.preTimeMin = data[ 1 ];

            // 工作时长小于 0 退出
            if ( this.workTime == 0 ) return;

            // 立即制作
            if ( !this.computedTime() ) {
                this.isShow.preTip = true;
                return;
            }

            // 预约
            this.$emit( 'canclePreActive', false );
            this.sendParam( 'status', 6 );
            this.isNowWork = false;
            this.api.modifyTitleStatus( btnMenu[ 0 ] );
            this.api.addMessage( {
                    type: PRETIME_NUM,
                    key: 1, icon: 1,
                    msg: preTimeTip
                            .replace( /{{hours}}/, $time.toString( this.preTimeHour ) )
                            .replace( /{{minutes}}/, $time.toString( this.preTimeMin ) )
                } );
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
            this.sendParam( 'status', 2 );

            console.log( '正在工作中!!' );
            this.api.sid.joyoung.action = { val: 1 };
            this.sendWork();
        },

        /* warn 提示框 */
        warnSubmit() {
            this.isShow.iceCupTip = ( this.isShow.isWorking = false );
            this.$emit( 'canclePreActive', false );
        },

        /* DIY */
        DIYTimeSubmit( val ) {
            this.isShow.DIYTime = false;
            this.sendParam( 'DIYTime', val );
            this.sendParam( 'workTime', val );
            this.sendTime( val );
        },
        DIYSpeedSubmit( val ) {
            this.isShow.DIYSpeed = false;
            this.sendParam( 'speed', val );
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
                this.$emit( 'canclePreActive', false );
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
    },
}
</script>