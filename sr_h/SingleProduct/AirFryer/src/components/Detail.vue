<template>
    <div class="detail">

        <!-- 头部标题栏 -->
        <Header class="header"
            :title="titleMsg"
            :isSecondary="true"
            @leftClick="$router.go( -1 )"
            @rightClick="go( '/set' )">

            <span slot="left" class="back"></span>
            <span slot="right">编辑</span>
        </Header>

        <!-- 中间的详情 -->
        <main class="main tc">
            <img class="recipes-bgc" :src="imgUrl" alt="img error">
            <div :class="[ 'btn', 'btn-small', { isDisable: flag } ]" @click="collectionClick">{{ collectionMsg[ +flag ] }}</div>
        </main>

        <!-- 底部按钮 -->
        <div :class="[ 'btn-container' ]">
            <span :class="[ 'btn', 'btn-normal', 'fl', { isDisable: isWork } ]"
                @click="preClick( isWork )">{{ reservationMsg }}</span>
            <span :class="[ 'btn', 'btn-normal', 'fl', { isDisable: isDisable( curRecipes ) } ]"
                @click="startClick( isDisable( curRecipes ) )">

                {{ msg | btnMsg( isDisable( curRecipes ), isWork, status ) }}
            </span>
        </div>
    </div>
</template>

<script>

// import Vue from 'vue';
import props from '@/mixins/props.js';
import mixins from '@/mixins';
import recipes from '@/dictionary/recipes.js';
import common from '../common/common.js';

import { COLLECTION } from '@/dictionary/constant.js';

// import { SPACE_RGE } from '../common/common.js';
import { startWorkMsg, reservationMsg, collectionMsg } from '@/dictionary';

/* 组件 */
import Header from 'Header';

export default {
    name: 'detail',
    mixins: [ mixins ],
    props,
    components: {
        Header
    },
    data () {
        return {
            msg: startWorkMsg,
            reservationMsg,
            collectionMsg,
            flag: false
        };
    },

    created () {
        this.flag = common.getItem( COLLECTION ).split( '|' )
            .indexOf( this.curRecipes + '' ) !== -1;
    },

    computed: {

        // tit 提示
        titleMsg () {
            return recipes[ +this.curRecipes ].name;
        },

        // 图片路径
        imgUrl () {
            return recipes[ +this.curRecipes ].imgUrl;
        }
    },

    methods: {

        /**
         * 点击收藏
         */
        collectionClick () {
            let index = -1, ctr, arr;
            ctr = common.getItem( COLLECTION ) || '';
            arr = ctr.split( '|' );
            index = arr.indexOf( this.curRecipes + '' );

            if ( this.flag ) {              // 已经收藏
                arr.splice( index, 1 );
                common.setItem( COLLECTION, `${arr.join( '|' )}` );
            } else if ( index === -1 ) {    // 未收藏
                common.setItem( COLLECTION, `${ctr + this.curRecipes}|` );
            }
            this.flag = !this.flag;
        },

        /**
         * 点击预约
         */
        preClick ( flag ) {
            if ( flag ) {
                return;
            }
            this.isShow.appointPicker = true;
        },

        startClick ( flag ) {
            if ( flag ) {
                return;
            }

            if ( this.isWork ) {
                return this.go( '/home' );
            }
            this.go( '/set' );
        }
    }
};
</script>

<style lang="less">
@import url("../../../../static/css/btn/btn.less");
@import url("../../../../static/css/params.less");

.detail {
    box-sizing: border-box;
    padding-top: @titHeight;
}

.recipes-bgc {
    width: 100%;
    height: 40rem;
}

.header {
    position: fixed;
    top: @top;
    left: 0;
}

</style>
