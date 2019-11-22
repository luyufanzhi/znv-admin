<template>
     <div class="cook">

        <div class="device-title"></div>

        <main class="main">

            <!-- tab-bar -->
            <div class="tab-bar">
                <div class="wrap">
                    <ul class="tab-bar-container">
                        <li :class="[ 'tab-bar-item', { active: $index === tabBarIndex } ]"
                            v-for="( item, $index ) in tabBarList" :key="$index"
                            @click="tabBarClick( $index )">
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>

            <!-- navbar: mint-ui 中的 navbar 不好使 -->
            <!-- <ly-tab v-model="selected"
                    :additionalX="80"
                    :activeColor="'#007DFF'"
                    :lineWidth="0">

                <ly-tab-item v-for="(item, $index) in navBarList" :key="$index">
                    {{item}}
                </ly-tab-item>
            </ly-tab> -->
            <!-- <mt-navbar v-model="selected">
                <mt-tab-item v-for="( item, $index ) in navBarList" :id="$index" :key="$index"
                    @click="navbarClick( $index )">{{ item }}</mt-tab-item>
            </mt-navbar> -->


            <!-- tab-container -->
            <!-- <mt-tab-container v-model="selected" swipeable>
                <mt-tab-container-item :id="0">
                    <div class="wrapper-0 wrapper">
                        <ul class="clearfix content">
                            <li class="carte-container fl"
                                v-for=" $index in 10" :key="$index">
                                <div class="carte fl">
                                    <img class="img"
                                        v-lazy="'./static/images/recipes/1-fritters.jpg'"
                                        alt="imgUrl error"
                                        @click="go( 'detail' )">
                                    <div class="carte-info">
                                        <span class="tit fl">胶料</span>
                                        <div class="btn btn-small fr"
                                            @click="startWork( $index )">

                                            开始制作
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item :id="1">
                    <div class="wrapper-1 wrapper">
                        <ul class="content">
                            <li style="height: 80px">111</li>
                            <li style="height: 80px">111</li>
                            <li style="height: 80px">111</li>
                            <li style="height: 80px">111</li>
                            <li style="height: 80px">111</li>
                            <li style="height: 80px">111</li>
                            <li style="height: 80px">111</li>
                            <li style="height: 80px">111</li>
                            <li style="height: 80px">111</li>
                            <li style="height: 80px">111</li>
                            <li style="height: 80px">111</li>
                        </ul>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item :id="2">
                    <div class="btn btn-small fr"
                        @click="go( 'home', { recipes: n } )">

                        开始制作
                    </div>
                </mt-tab-container-item>
            </mt-tab-container> -->

            <keep-alive>
                <router-view class="content"
                    :status="status"
                    :recipes="recipes"
                    :temperature="temperature"
                    :stirSwitch="stirSwitch"
                    :preheatSwitch="preheatSwitch"
                    :workTime="workTime"
                    :leftTime="leftTime"
                    :preTimeHour="preTimeHour"
                    :preTimeMin="preTimeMin"
                    :code="code"></router-view>
            </keep-alive>
        </main>
    </div>
</template>

<script>

// import Vue from 'vue';
import mixins from '@/mixins';
import props from '@/mixins/props.js';
import common from '@/common/common.js';
import { tabBarList, tabBarListMsg } from '@/dictionary';
import { PARAMSID } from '@/dictionary/constant.js';

// mint-ui
// import { /* Navbar,  */TabItem, TabContainer, TabContainerItem } from 'mint-ui';

// import 'mint-ui/lib/navbar/style.css';
// import 'mint-ui/lib/tab-item/style.css';
// import 'mint-ui/lib/tab-container/style.css';
// import 'mint-ui/lib/tab-container-item/style.css';

// asset
// import LyTab from 'ly-tab/src/tab.vue';
// import LyItem from 'ly-tab/src/tab-item.vue';
// import BScroll from 'better-scroll';

const REG = /\/([a-z]*)$/;

export default {
    name: 'cook',
    ame: 'cook',
    props,
    mixins: [ mixins ],
    components: {

        // [ Navbar.name ]: Navbar,
        // [ TabItem.name ]: TabItem,
        // [ TabContainer.name ]: TabContainer,
        // [ TabContainerItem.name ]: TabContainerItem,

        // [ LyTab.name ]: LyTab,
        // [ LyItem.name ]: LyItem
    },

    data () {

        return {

            // selected: 0,
            // tabBarIndex: 0,
            tabBarList

            // navBarList: [ '常用', '肉类', '果蔬', '小食', '西点', '主食', '小食1', '西点1', '主食1' ],

            // test
            // lyTab: undefined,
            // BScroll: undefined,
            // isScroll: true
        };
    },

    computed: {
        tabBarIndex () {
            let path = this.$route.path.match( REG )[ 1 ];
            let index = tabBarListMsg.indexOf( path );
            if ( index === -1 ) {
                index = 0;
                this.api.deviceLog( 'tagBarIndex', '没有找到该索引' );
            }
            return index;
        }
    },

    created () {
        common.setItem( PARAMSID, -1 );
    },

    mounted () {

    },

    methods: {

        tabBarClick ( $index ) {
            let path = tabBarListMsg[ $index ];

            if ( $index === 1 ) {
                this.tabBarClick.curRecipes = this.curRecipes;
                this.curRecipes = 0;
            } else if ( $index === 0 ) {
                this.curRecipes = this.tabBarClick.curRecipes || this.recipes;
            }
            this.go( path );
        }
    },

    watch: {
        selected ( val ) {
            this.setScroll( val );
        }
    }
};
</script>

<style lang="less">
@import url("../../../../static/css/mixins.less");
@import url("../../../../static/css/btn/btn.less");
@import url("../../../../static/css/base64/loadding.less");

/* tab-bar */
@import url("../../../../static/css/btn/tab-bar.less");

.setZIndex(@index: 2) {
    position: relative;
    z-index: @index;
}

.device-title {
    position: relative;
    z-index: 2;
}

.cook {
    .setWH();
    background-image: linear-gradient(to bottom,#e3773a, #f7bf4d);
    .setCenterUseFlex();

    .main {
        box-sizing: border-box;
        .setCenterUseFlex();
        width: 100%;
        background-color: #fff;
        flex: 1;
    }

    .tab-bar {
        .setZIndex();
        width: 100%;
    }

    .content {
        flex: 1;
    }
}

</style>
