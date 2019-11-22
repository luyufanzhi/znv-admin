<template>
    <div class="on">

        <!-- 中间的白圆 -->
        <div class="content">

            <ColorPicker
                :width="colorPicker.width"
                :color.sync="colorPicker.color"
                :img-url="colorPicker.imgUrl"
                :is-render.sync="colorPicker.isRender"
                :init-color="colorPicker.initColor"
                :callback="colorPicker.callback"></ColorPicker>

        </div>

    </div>
</template>

<script>

import Vue from 'vue'
import mixins from '../common/mixins.js'

// 组件
import ColorPicker from 'ColorPicker'

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
        ColorPicker,
    },

    data() {
        return {
            colorPicker: {
                color: undefined,
                imgUrl: './static/images/image_lamp_circular.png',
                width: 300,
                isRender: undefined,
                initColor: "rgba(94, 144, 249, 1)",
                callback: undefined,
            },
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

