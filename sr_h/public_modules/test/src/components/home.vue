<template>
    <div class="home">

        <div class="txt test" style="display: block;" @click="test">
            <h1 class="txt">
                + 2018.02.01 20:21PM V2.5
            </h1>
        </div>

        <!-- 主题显示 开始 -->
        <div id="top">
            <div class="inner">

                <!-- 中间主体 -->
                <keep-alive>
                    <component :is="curView"></component>
                </keep-alive>

                <!-- 底部选择栏 -->
                <div :class="[ 'choose', 'clearfix', { diy: 0 } ]">
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
            <BottomMenu :opt="bottomList"
                        :words="words" >
            </BottomMenu>

            <!-- 提示框 开始 -->
            <Tip :is-show="isShow"></Tip>

        </div>
        <!-- 底部按钮 结束 -->

    </div>
</template>

<script>

import Vue from 'vue'
import mixins from '@/common/mixins.js'

// dictionary
import {

} from '@/dictionary/dictionary.js'

import { btnImgs } from '@/dictionary/imgSrc.js'
import { TIT_COLOR_ON } from '@/dictionary/colors.js'
import { def } from '@/config/def.config.js'

import mork from '@/common/mork.js'
// api
import apiFn from '../common/api.js'
import common from '../common/common.js'
// import $time from '../assets/time.js'

/* 组件 */
import On from './On.vue'
import Tip from './Tip.vue'
import BottomMenu from 'BottomMenu'

export default {
    name: "home",
    mixins: [ mixins ],
    components: {
        On,
        Tip,
        BottomMenu,
    },

    data() {
        return {
            mork,
            curView: On,

            // 控制开关
            isShow: {
                isSingleChooseShow: false,
                isConfirmBoxShow: false,
                isAppointPickerShow: false,
                isWarnBoxShow: false,
            },

            // 选择栏
            chooseData: [{
                tit: '转速',
                txt: 11,
                unit: '档'
            }, {
                tit: '制作时间',
                txt: 22,
                unit: '秒'
            }],

            // 底部菜单
            bottomList: {
                data: [
                    {       // 预约
                        imgUrl: btnImgs[ 0 ],
                        callback: ( index, item ) => {
                            this.bottomList.switch = !this.bottomList.switch;
                        },
                    }, {    // 热杯
                        imgUrl: btnImgs[ 1 ],
                        // isUnArrow: true,
                        // arrow: [ 1, 2, 3 ],
                        arrowCallback: ( index, item ) => {

                        },
                        callback: ( index, item ) => {
                            // item.isUnArrow = !item.isUnArrow;
                        },
                    }, {    // 冷杯
                        imgUrl: btnImgs[ 2 ],
                        // isUnArrow: true,
                        // arrow: [ 1, 2, 3, 4 ],
                        arrowCallback: ( index, item ) => {

                        },
                        callback: ( index, item ) => {
                            // item.isUnArrow = !item.isUnArrow;
                        },
                    }, {    // 自定义
                        imgUrl: btnImgs[ 3 ],
                        callback: ( index, item ) => {
                            item.isActive = !item.isActive;
                            this.isShow.isSingleChooseShow = true;
                            // this.isShow.isConfirmBoxShow = true;
                            // this.isShow.isAppointPickerShow = true;
                            // this.isShow.isWarnBoxShow = true;
                        },
                    }
                ],

                curIndex: -99,
                switchIndex: 0,
                switch: false,
            },
        };
    },

    computed: {

        /* 按钮文字 */
        words() {
            return [
                111,
                2233,
                333,
                444
            ];
        },
    },

    created() {
        /* 初始化 */
        let { services } =  this.mork;

        /* api 处理 */
        Vue.prototype.api = apiFn( services, 'MilkMachine' );
        this.api.modifyTitleBar( TIT_COLOR_ON );
        this.api.callback = data => {

            console.log( '初始化结束了' );
        }
        this.api.send();
    },

    methods: {
        /* 测试 */
        test() {

        },

        chooseClick() {},
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
                // background-color: black;
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
}

#bottom {

    // overflow-x: hidden;
    width: 100%;
    height: @bottomHeight;
    position: fixed;
    left: 0;
    bottom: 0;
}

</style>
