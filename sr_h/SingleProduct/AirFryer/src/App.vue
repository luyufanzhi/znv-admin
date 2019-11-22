<template>
    <div id="app">
        <div class="txt test" style="display: none; color: black;" @click="test">
            <h1 class="txt">
                {{ 'status: ' + status + ' recipes: ' + recipes + ' temperature: ' + temperature + ' stirSwitch: ' + stirSwitch + ' preheatSwitch: ' + preheatSwitch + ' workTime: ' + workTime + ' leftTime: ' + leftTime + ' preTimeHour: ' + preTimeHour + ' preTimeMin: ' + preTimeMin + ' code:' + code }}
            </h1>
            <h1 class="txt">
                {{ 'isPre: ' + isPre + ' isKeepHot: ' + isKeepHot + ' isNoGet: ' + isNoGet + ' isError: ' + isError }}
            </h1>
            <h1 class="txt">
                + 2018.03.14
            </h1>
        </div>

        <router-view
            :status="status"
            :recipes="recipes"
            :temperature="temperature"
            :stirSwitch="stirSwitch"
            :preheatSwitch="preheatSwitch"
            :workTime="workTime"
            :leftTime="leftTime"
            :preTimeHour="preTimeHour"
            :preTimeMin="preTimeMin"
            :code="code"
            :isPre="isPre"
            :isKeepHot="isKeepHot"
            :isNoGet="isNoGet"
            :isError="isError"></router-view>

        <Tip
            :status="status"
            :recipes="recipes"
            :temperature="temperature"
            :stirSwitch="stirSwitch"
            :preheatSwitch="preheatSwitch"
            :workTime="workTime"
            :leftTime="leftTime"
            :preTimeHour="preTimeHour"
            :preTimeMin="preTimeMin"
            :code="code"
            :isPre="isPre"
            :isKeepHot="isKeepHot"
            :isNoGet="isNoGet"
            :isError="isError"></Tip>
    </div>
</template>

<script>

import Vue from 'vue';

import apiFn from '@/common/api.js';
import mork from '@/common/mork.js';
import common from '@/common/common.js';

// import { SPACE_RGE } from '@/common/common.js';
import { COLLECTION } from '@/dictionary/constant.js';

import mixins from '@/mixins';
import watch from '@/mixins/appWather.js';
import computed from '@/mixins/computed.js';
import data from '@/mixins/data.js';

import Tip from '@/components/Tip.vue';

export default {
    name: 'app',
    mixins: [ mixins, watch, computed, data ],
    components: {
        Tip
    },
    data () {
        return {
            mork,
            cook: { },
            faultDetection: { }
        };
    },

    created () {

        /* 初始化 */
        let { services } = this.mork;

        /* api 处理 */
        Vue.prototype.api = apiFn( services, 'AirFryer' );
        this.api.send();

        this.cook = services.filter( el => 'cook' === el.sid )[ 0 ].data;
        this.faultDetection = services.filter( el => 'faultDetection' === el.sid )[ 0 ].data;
        Object.assign( Vue.prototype, {
            cook: this.cook,
            faultDetection: this.faultDetection,
            isShow: this.isShow,
            cache: this.cache
        } );

        this.api.callback = () => {
            this.curRecipes = this.recipes;
        };

        // 设置本地缓存收藏
        common.setItem( COLLECTION, '' );

        // 将设备上报的各个属性计算后扩充到原型上
        // let keys = 'status recipes temperature stirSwitch preheatSwitch workTime leftTime preTimeHour preTimeMin code';
        // keys.split( SPACE_RGE ).forEach( key => Vue.prototype.cook[ key ] = this[ key ] );
    },

    mounted () {

    },

    methods: {

        /**
         * 测试
         */
        test () {
            console.log( 'test:===========' );

            // this.cook.recipes = +!this.cook.recipes;
            this.cook.recipes++;
        }
    }
};
</script>

<style>

#app {
    font-family: regular;
    width: 100%;
    height: 100%;
}

.btn-container {
    position: fixed;
    bottom: 0;
    left: 0;
}

</style>
