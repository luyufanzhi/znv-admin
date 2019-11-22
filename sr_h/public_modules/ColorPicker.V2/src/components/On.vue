<template>
    <div class="on">

        <!-- 中间的白圆 -->
        <div class="content">

            <!-- 取色器 -->
            <color-picker class="xxx" :opt="ColorPicker"></color-picker>

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

// 组件
import ColorPicker from 'ColorPicker.V2'

export default {
    name: 'on',
    props: [  ],
    mixins: [ mixins ],

    components: {
        ColorPicker,
    },

    data() {
        return {
            ColorPicker: {
                width: 244,         // 默认宽度
                height: 374,        // 默认高度
                color: undefined,
            },
        }
    },

    created() {

    },

    computed: {

    },

    methods: {

    },

    watch: {
        'ColorPicker.color'( val ) {
            console.log( `%c ${ val }`, `color: ${ val }` );
        },
    },
}

</script>

<style scoped lang="less">

@import '../../../../static/css/mixins.less';

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

.xxx {
    margin-left: 100px;
}

</style>

