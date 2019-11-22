<template>
    <div class="set">

        <!-- 头部标题栏 -->
        <Header class="header"
            :title="setParamsMsg[ $route.query.tit || 0 ]"
            @leftClick="$router.go( -1 )">

        </Header>

        <!-- 中间设置内容 -->
        <params ref="params"
            :status="status"
            :recipes="recipes"
            :temperature="temperature"
            :stirSwitch="stirSwitch"
            :preheatSwitch="preheatSwitch"
            :workTime="workTime"
            :leftTime="leftTime"
            :preTimeHour="preTimeHour"
            :preTimeMin="preTimeMin"
            :code="code"></params>

        <!-- 底部按钮 -->
        <div class="btn-container">
            <div class="btn btn-large" @click="btnClick">开始制作</div>
        </div>
    </div>
</template>

<script>

import mixins from '@/mixins';
import props from '@/mixins/props.js';
import { setParamsMsg } from '@/dictionary';

/* 组件 */
import Header from 'Header';
import params from '@/components/page/params.vue';

export default {
    name: 'set',
    mixins: [ mixins ],
    props,
    components: {
        Header,
        params
    },

    data () {
        return {

            // 标题栏文本信息
            setParamsMsg
        };
    },

    methods: {
        btnClick () {
            if ( this.isWork ) {  // 非待机状态下直接跳转到 home 页面

                // 非待机状态下下发修改参数
                this.changeParam( this.$refs.params.data );
                this.go( '/home' );
            } else {

                // 待机下下发开始制作
                this.startWork( this.$refs.params.data );
            }
        }
    }
};
</script>

<style lang="less">
@import url("../../../../static/css/mixins.less");
@import url("../../../../static/css/params.less");
@import url("../../../../static/css/btn/btn.less");

.set {
    .setWH();
    box-sizing: border-box;
    padding-top: @titHeight;
    // .setCenterUseFlex();

    .header {
        position: fixed;
        top: @top;
        left: 0;
    }

    .params {
        width: 100%;
        box-sizing: border-box;

        .tit {

        }
        // padding-bottom: @btnHeight * 2;
    }

    .btn-container {
        // position: fixed;
        // left: 0;
        // bottom: 0;
    }
}

</style>
