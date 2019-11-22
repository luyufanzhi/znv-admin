<template>
    <div class="on">

        <!-- 中间的白圆 -->
        <div class="content">

        </div>

    </div>
</template>

<script>

import Vue from 'vue'
import mixins from '../common/mixins.js'

// dictionary
import {  } from '../dictionary/dictionary.js'
import {  } from '../dictionary/imgSrc.js'

// js
// import $time from '../assets/time.js'

export default {
    name: 'on',
    props: [  ],
    mixins: [ mixins ],

    components: {

    },

    data() {
        return {

        }
    },

    created() {

    },

    computed: {

    },

    methods: {

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
    /* 下移 68px */
    .setTitForNative();
    .setCenterUseFlex();

    .content {
        width: 100%;
    }
}



</style>

