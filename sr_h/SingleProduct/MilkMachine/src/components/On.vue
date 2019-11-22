<template>
    <div class="on">

        <div class="txt test">
            <h1 class="txt">
                {{ action }}
            </h1>
        </div>

        <!-- 中间的白圆 -->
        <div class="content">
            <div :class="[ 'wrap', { noCup: isNoCup } ]">

                <div :class="[ 'hasCup', { noCup: isNoCup } ]">
                    <div :class="[ 'cupStatus', { preTime: 6 === joyoung.status } ]">{{ cupStatus | cupStatus }}</div>

                    <p :class="[ 'time-word', { preTime: 6 === joyoung.status } ]">剩余时长(时/分)</p>

                    <div :class="[ 'work-time', { preTime: 6 === joyoung.status } ]">
                        <span class="hour time">{{ workTimeMin}}</span>
                        <span class="circle time">:</span>
                        <span class="min time">{{ workTimeSec}}</span>
                    </div>

                    <div :class="[ 'icon', { preTime: 6 === joyoung.status } ]">
                        <img :class="[ 'icon-img', { pause: isShow.isAction } ]" :src=" isShow.isAction ? pause : start" alt="zp-imgUrl error"
                            @click="work">
                    </div>
                </div>

                <div class="noCup" v-if="isNoCup">
                    <p class="cupStatus noCup">{{ cupStatus | cupStatus }}</p>
                </div>

            </div>
        </div>

        <div :class="[ 'status', { preTime: 6 === joyoung.status } ]">{{ joyoung.status | status }}</div>

    </div>
</template>

<script>

import Vue from 'vue'
import mixin from '../common/mixins.js'

// dictionary
import { MINUTE } from '../dictionary/dictionary.js'
import { start, pause } from '../dictionary/imgSrc.js'

// js
import $time from '../assets/time.js'

let count = 0;

export default {
    name: 'on',
    props: [ 'joyoung', 'isShow', 'workTime' ],
    mixins: [ mixin ],

    components: {
    },

    data() {
        return {
            start, pause,
            test: {
                a: 1
            },
        }
    },

    computed: {

        // 无杯, 冷杯, 热杯
        cupStatus() {
            let res = this.joyoung.cupStatus;
            if ( 0 === res ) {
                this.api.modifyTitleStatus( Vue.filter( 'cupStatus' )( res ) );
            }
            return res;
        },

        // 判断是否为无杯
        isNoCup() {
            return this.cupStatus === 0;
        },

        // 启动停止
        action: {
            get() {
                let res = this.joyoung.action;
                if ( 1 == res && 6 !== this.joyoung.status && !this.isShow.complete && 3 !== this.joyoung.status && 5 !== this.joyoung.status ) {
                    this.timeStart();
                } else {
                    this.isShow.isAction = false;
                    $time.clearInterval();
                }
                return res
            },
            set( val ) {
                if ( val < 0 ) val = 0;
                this.sendParam( 'action', val );
            },
        },

        // 本地工作时间分秒
        workTimeMin() {
            // if ( 10 === this.joyoung.program ) {
            //     return '--';
            // }
            return $time.toString( Math.floor( this.workTime / MINUTE ) );
        },
        workTimeSec() {
            // if ( 10 === this.joyoung.program ) {
            //     return '--';
            // }
            return $time.toString( this.workTime % MINUTE );
        },
    },

    methods: {

        work() {
            if ( this.workTime <= 0 || ( 1 === this.action && this.joyoung.status !== 3 ) || this.api.isReset === false || this.joyoung.status === 6 ) return;
            this.isShow.workConfirm = true;
        },

        // LEFTTIME: 倒计时开始
        timeStart() {
            this.isShow.isAction = true;
            // 获取云端数据
            // window.setTimeout( _ => this.getDevHistory(), 1000 );
            $time.getNow().setInterval( _ => {

                /* 解决温度达到会跳动的问题 */
                // if ( ++count >= 15 ) {
                //     count = 0;
                //     this.getDevHistory();
                // }

                if ( ( this.sendTime( Number.parseInt( this.workTime ) - 1 ) ) <= 0 ) {

                        this.api.sid.joyoung.status = { val: 7 };
                        this.api.sid.joyoung.action = { val: 0 };
                        // this.sendWork();
                        if ( !window.hilink ) {
                            this.sendWork();
                        }
                        this.isShow.isAction = false;
                        return $time.clearInterval();
                    }
                } );
        },
    },
}

</script>

<style scoped lang="less">

@import '../../../../static/css/mixins.less';

@icon_w: 4.8rem;

.setFont(@size: 1.3rem) {
    color: @white_6;
    font-size: @size;
    text-align: center;
}

.on {
    .setWH();
    .setTitForNative();
    .setCenterUseFlex();

    .content {
        width: 100%;

        .wrap {
            .setBgi(cover);
            width: 100%;
            background-image: url("../../static/images/image_breaking.png");
            padding: 4.4rem 0;
        }

        .cupStatus{
            .setFont();
            padding-bottom: 4.6rem;
        }

        .time-word {
            .setFont();
            padding-bottom: .2rem;
        }

        .icon {
            text-align: center;
            vertical-align: middle;

            .icon-img {
                padding-top: .8rem;
                width: @icon_w;
                height: @icon_w;
            }

            .pause {
                opacity: .2;
            }
        }

        .work-time {
            text-align: center;

            .time {
                font-size: 4rem;
                color: #fff;
            }
        }
    }

    .wrap.noCup {
        background-image: url("../../static/images/image_breaking_empe.png");
    }
    .cupStatus.noCup {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        font-size: 3.6rem;
        color: @white_7;
        text-align: center;
    }
    .hasCup.noCup {
        opacity: 0;
    }
}

.preTime {
    opacity: .3;
}

</style>

