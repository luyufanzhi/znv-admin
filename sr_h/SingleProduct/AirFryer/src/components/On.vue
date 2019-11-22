<template>
    <div class="on">

        <!-- 中间的白圆 -->
        <div class="content tc">
            <p>状态: {{ status | status }}</p>
            <p v-show="status === 4">预热时间: {{ this.preheatSwitch ? 5 : 35 }}</p>
            <p>搅拌开关: {{ stirSwitch }}</p>
            <h1 v-if="isStartInterval">剩余时间: </h1>
            <h1 v-if="status === 0">制作时间: </h1>
            <h1 v-if="isStartInterval || status === 0">
                {{ h }}<span :class="{ disable: time._flag }">:</span>{{ m }}
            </h1>
        </div>

    </div>
</template>

<script>

// import Vue from 'vue';
import mixins from '@/mixins';
import props from '@/mixins/props.js';

// import $time from '@/asset/$time.js';
import { time } from '@/asset/$time.js';

// dictionary
// import {  } from '../dictionary/dictionary.js';
// import {  } from '../dictionary/imgSrc.js';

export default {
    name: 'on',
    props,
    mixins: [ mixins, time ],

    components: {

    },

    created () {
    },

    mounted () {

    },

    computed: {
    },

    methods: {
    }
};

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
    /* 下移 68px */
    .setTitForNative();
    .setCenterUseFlex();

    .content {
        width: 100%;
    }

    .disable {
        opacity: 0;
    }
}

</style>
