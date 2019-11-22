<template>
    <div class="diy">
        <!-- 中间设置内容 -->
        <params ref='params'
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
            <span class="btn btn-normal fl" @click="isShow.appointPicker = $refs.params.data.workTime">预约</span>
            <span class="btn btn-normal fl" @click="sendDIY">开始制作</span>
        </div>
    </div>
</template>

<script>

import mixins from '@/mixins';
import props from '@/mixins/props.js';
import params from '@/components/page/params.vue';

export default {
    name: 'diy',
    mixins: [ mixins ],
    props,
    components: {
        params
    },

    methods: {
        sendDIY () {
            this.sendDIYWork( this.$refs.params.data );
        }
    }
};
</script>

<style lang="less" scoped>
@import url("../../../../../static/css/mixins.less");
@import url("../../../../../static/css/btn/btn.less");

.diy {
    .setWH();
    // .setCenterUseFlex();

    .params {
        .setWH();
        box-sizing: border-box;
        padding-bottom: @btnHeight * 2;
    }
}

</style>
