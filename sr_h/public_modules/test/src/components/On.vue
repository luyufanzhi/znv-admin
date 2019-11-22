<template>
    <div class="on">

        <!-- 中间的白圆 -->
        <div class="content">
            <!-- <div class="tab-bar">
                <div class="wrap">
                    <ul class="tab-bar-container">
                            <li class="tab-bar-item">食谱</li>
                            <li class="tab-bar-item">做法</li>
                        <li class="tab-bar-item active">DIY</li>
                    </ul>
                </div>
            </div> -->

            <!-- <Header
                :title="'sdfsf'"
                :isSecondary="true"></Header> -->

        </div>

        <div class="btn-container">
            <div class="btn" @click="btnDelete">去连接网络</div>
        </div>

        <div class="btn btn-danger" @click="btnDelete">去连接网络</div>
        <div class="btn btn-danger btn-small" @click="btnDelete">去连接网络</div>

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

import Header from 'Header'

export default {
    name: 'on',
    props: [  ],
    mixins: [ mixins ],

    components: {
        Header,
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
        btnDelete() {},
    },
}

</script>

<style scoped lang="less">

@import '../../../../static/css/mixins.less';
@import url("../../../../static/css/btn/tab-bar.less");
@import url("../../../../static/css/btn/btn.less");

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

