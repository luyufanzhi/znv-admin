<template>
    <div>

        <!-- 预约弹窗 -->
        <AppointPicker ref="apt"
            v-show="isShow.appointPicker && localTime !== 0"
            :apre="AppointPickerMsg"
            :title="'预约完成时间'"
            :defaultValues="[ hours, minMinutes ]"
            @cancel="isShow.appointPicker = false"
            @submit="appointPickerSubmit"></AppointPicker>

        <!-- 取消预约 | 取消制作 -->
        <ConfirmBox
            v-show="isShow.confirmBox"
            :isorderSure="true"
            :cancelWord="'否'"
            :submitWord="'是 red'"
            @cancel="confirmBoxCancel"
            @submit="confirmBoxSubmit">

            {{ confirmMsg }}
        </ConfirmBox>

        <!-- 工作完成提示 -->
        <Complete
            v-show="isShow.complete && !isError"
            :isorderSure="true"
            :cancelWord="'再烹一下'"
            :submitWord="'我知道了'"
            @cancel="completeCancel"
            @submit="completeSubmit">

            <div class="icon">
                <img class="icon-img" :src="'./static/images/icon_Power_on.png'" alt="warn imgUrl error">
            </div>

            <p>{{ finishMsg1 | mode( recipes ) }}</p>
            <p>{{ finishMsg2 }}</p>
        </Complete>

        <!-- 保持预热提示以及跳过预热提示 -->
        <Tips
            v-show="isShow.tips"
            :isorderSure="true"
            :cancelWord="'否'"
            :submitWord="'是'"
            @cancel="tipsCancel"
            @submit="tipsSubmit">

            {{ tipMsg }}
        </Tips>

        <!-- 预约时间超过 12 个小时 -->
        <WarnBox
            v-show="isShow.warnBox"
            :word="'我知道了'"
            @submit="isShow.warnBox = false, isShow.appointPicker = true">

            {{ preWarnMsg }}
        </WarnBox>

    </div>
</template>

<script>

// import Vue from 'vue';
import mixins from '@/mixins';
import props from '@/mixins/props.js';
import recipes from '@/dictionary/recipes.js';
import {
    cancelPreTimeMsg, cancelWorkMsg, keepHotMsg, passHotMsg,
    finishMsg1, finishMsg2, workMsg, preWarnMsg } from '@/dictionary';
import { KEEPHOT, PASSHOT, CURRECIPES, STARTWORK } from '@/dictionary/constant.js';

import methods from '@/mixins/tipMethods.js';
import $time from '@/asset/$time.js';
import common from '@/common/common.js';

// dictionary
import {
    AppointPickerMsg
} from '@/dictionary';

// import {  } from '../dictionary/imgSrc.js';

// 组件
import AppointPicker from 'AppointPicker.V2';
import ConfirmBox from 'ConfirmBox';
import Complete from 'ConfirmBox';
import Tips from 'ConfirmBox';
import WarnBox from 'WarnBox';

export default {
    name: 'tip',
    props,
    mixins: [ mixins, methods ],
    components: {
        AppointPicker,
        ConfirmBox,
        Complete,
        Tips,
        WarnBox
    },

    data () {
        return {

            // now: new Date(),
            hours: undefined,

            // 最接近当前时间的预约分钟
            minMinutes: undefined,

            // 本地时间
            localTime: 0,
            AppointPickerMsg: '',
            preWarnMsg,
            finishMsg1,     // 完成提示
            finishMsg2,
            keepHotMsg      // 保持预热提示
        };
    },

    mounted () {
        this.$nextTick( () => {
        } );
    },

    computed: {

        /**
         * Tips 提示文本
         */
        tipMsg () {
            let msg;

            switch ( this.isShow.tips ) {
            case KEEPHOT:
                msg = keepHotMsg;
                break;
            case PASSHOT:
                msg = passHotMsg;
                break;
            case STARTWORK:
                msg = workMsg;
                break;
            }

            return msg;
        },

        /**
         * 取消制作和取消预约的提示文本
         */
        confirmMsg () {
            return this.isPre ? cancelPreTimeMsg : cancelWorkMsg;
        }
    },

    methods: {

        setMsg () {
            this.localTime = recipes[ +common.getItem( CURRECIPES ) ].workTime;
            let now = $time.getNow();
            let hours = now.getHours();
            let minMinutes = $time.upperTime( now.getMinutes() + this.localTime );

            this.minMinutes = minMinutes >= 60 ?
                ( hours += Math.floor( minMinutes / 60 ), minMinutes % 60 ) :
                minMinutes;

            this.hours = hours >= 24 ? hours % 24 : hours;

            return AppointPickerMsg
                .replace( /{{workTime}}/, this.localTime )
                .replace( /{{hours}}/, this.hours )
                .replace( /{{minutes}}/, this.minMinutes );
        }

        // updateLeft () {
        // //     let hours = this.now.getHours();
        // //     let minutes = this.now.getMinutes();

        // //     if ( minutes > 50 ) {
        // //         hours++;
        // //     }

        // //     let i = 0, arr = [];

        // //     for ( ; i < SUPPORT_TIME; i++ ) {
        // //         if ( hours > 23 ) {
        // //             hours = 0;
        // //         }
        // //         arr[ i ] = hours++;
        // //     }

        // //     try {
        // //         let { picker } = this.$refs.apt.$refs;
        // //         picker.setSlotValues( 0, arr );
        // //     } catch ( error ) {}
        // // },

        // change ( val ) {
        //     // if ( !this.isShow.appointPicker ) {
        //     //     return;
        //     // }

        //     // let hours = val[ 0 ], h, m, i = 0;

        //     // let arr = [];

        //     // h = this.now.getHours();
        //     // m = +$time.upperTime( this.now.getMinutes() );
        //     // let { picker } = this.$refs.apt.$refs;

        //     // console.log( 'm:', hours, h );
        //     // if (  hours === h ) {

        //     //     for ( ; m < 60; m += 10 ) {
        //     //         arr[ i++ ] = m;
        //     //     }
        //     //     // this.minMinutes = 30;
        //     //     picker.setSlotValues( 1, arr );
        //     //     // this.minMinutes = arr[ 0 ];
        //     //     console.log( 'rjight:', arr );
        //     //     // picker.setValues( [ hours, right[ 0 ] ] );
        //     // } else {
        //     //     picker.setSlotValues( 1, right );
        //     // }
        // }
    },

    filters: {
        mode ( val, id ) {
            return val.replace( /{{mode}}/, recipes[ id ].name );
        }
    },

    watch: {
        'isShow.appointPicker': {
            deep: true,
            handler ( ) {
                this.AppointPickerMsg = this.setMsg();
            }
        }
    }
};
</script>

<style lang="less" scoped>
@import url("../../../../static/css/mixins.less");
@import url("../../../../static/css/module/WarnBox/style.less");
</style>
