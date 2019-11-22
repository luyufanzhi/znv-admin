<template>
    <div class="home">

        <!-- 主题显示 开始 -->
        <div id="top">
            <div class="inner">

                <!-- 中间主体 -->
                <keep-alive>
                    <component :is="curView"
                        :status="status"
                        :recipes="recipes"
                        :temperature="temperature"
                        :stirSwitch="stirSwitch"
                        :preheatSwitch="preheatSwitch"
                        :workTime="workTime"
                        :leftTime="leftTime"
                        :preTimeHour="preTimeHour"
                        :preTimeMin="preTimeMin"
                        :code="code"></component>
                </keep-alive>

            </div>
        </div>
        <!-- 主题显示 结束 -->

        <!-- 底部按钮 开始 -->
        <div id="bottom">

            <!-- 按钮组件 -->
            <BottomMenu :opt="opt"
                        :words="words" >
            </BottomMenu>

        </div>
        <!-- 底部按钮 结束 -->

    </div>
</template>

<script>

// import Vue from 'vue';
import mixins from '@/mixins';
import props from '@/mixins/props.js';
import { btnMsg } from '@/dictionary';

// import Bus from '@/common/bus.js';

// dictionary
// import {

// } from '@/dictionary/dictionary.js';

// import { btnImgs } from '@/dictionary/imgSrc.js';
// import { TIT_COLOR_ON } from '@/dictionary/colors.js';

import ifttFn from '@/config/iftt.js';

/* 组件 */
import On from '@/components/On.vue';

// import Tip from './Tip.vue';
import BottomMenu from '@/components/BottomMenu/BottomMenu.vue';

export default {
    name: 'on',
    mixins: [ mixins ],
    props,
    components: {
        On,
        BottomMenu
    },

    data () {
        return {
            curView: On,
            iftt: { },

            // 底部菜单
            bottomList: { },
            bottomListTwo: { }
        };
    },

    computed: {

        /**
         * 按钮文字
         */
        words () {
            return [
                btnMsg[ 0 ][ +this.isPre ],
                btnMsg[ 1 ][ +this.isKeepHot ],
                btnMsg[ 2 ]
            ];
        },

        /**
         * 底部按钮的选项
         */
        opt () {
            return this.isKeepHot ? this.bottomList : this.bottomListTwo;
        }
    },

    created () {
        this.iftt = ifttFn.call( this );
        let {
            bottomList,
            bottomListTwo
        } = this.iftt;

        Object.assign( this, {
            bottomList,
            bottomListTwo
        } );

        // 向 Tip.vue 传递数据
        // Bus.$on( 'cancelActive', this.cancelActive );
    },

    methods: {

        /**
         * 取消按钮的活动状态, 蓝色 border
         */
        cancelActive ( index = 0 ) {
            this.opt.data[ index ].isActive = false;
        }
    }
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
