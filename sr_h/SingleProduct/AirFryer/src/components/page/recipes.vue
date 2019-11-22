<template>
    <div class="recipes">
        <ul class="clearfix content">
            <li class="carte-container fl"
                v-for=" ( item, $index ) in recipesData" :key="$index">
                <div class="carte fl">
                    <img class="img"
                        v-lazy="item.imgUrl"
                        alt="imgUrl error"
                        @click="toDetail( item.id )">

                    <!-- <div class="loader">
                        <div data-loader='ball-rotate' class="ball-rotate"></div>
                    </div> -->

                    <div class="carte-info">
                        <span class="tit fl">{{ item.name }}</span>

                        <div class="container fr" @click="work( item.id, isDisable( item.id ) )">
                            <div :class="[ 'btn', 'btn-small', 'fr', { isDisable: isDisable( item.id ) } ]">

                                {{ msg | btnMsg( isDisable( item.id ), isWork, status ) }}
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

// import Vue from 'vue';
import mixins from '@/mixins';
import props from '@/mixins/props.js';
import recipes from '@/dictionary/recipes.js';
import common from '@/common/common.js';

// import $time from '@/asset/$time.js';

import { tabBarListMsg, startWorkMsg } from '@/dictionary';
import { COLLECTION } from '@/dictionary/constant.js';

import BScroll from 'better-scroll';

export default {
    name: 'recipes',
    props,
    mixins: [ mixins ],
    data () {
        return {
            recipesData: [],
            msg: startWorkMsg
        };
    },

    created () {

        // 判断是否不在在收藏页面
        if ( this.$route.name !== tabBarListMsg[ 2 ] ) {
            this.recipesData = recipes.slice( 1 );
        } else {

            let i = 0, index, ctr = common.getItem( COLLECTION ).split( '|' );

            // recipes.slice( 1 ).forEach( el => {
            //     if ( ctr.indexOf( el.id + '' ) !== -1 ) {
            //         this.$set( this.recipesData, i++, el );
            //     }
            // } );

            // 按照添加顺序排序
            ctr.forEach( el => {
                index = recipes.findIndex( item => item.id + '' === el );
                if ( index !== -1 ) {
                    this.$set( this.recipesData, i++, recipes[ index ] );
                }
            } );
        }
    },

    mounted () {
        this.$nextTick( function () {
            this.setScroll();

            // 解决 active 在 IOS 上的问题
            document.body.addEventListener( 'touchstart', () => { } );
        } );
    },

    methods: {

        /**
         * 设置滚动
         */
        setScroll () {
            try {
                this.BScroll = new BScroll( document.querySelector( '.recipes' ), {
                    click: true,
                    freeScroll: false,
                    preventDefault: false
                } );
            } catch ( error ) {
                this.api.deviceLog( 'setScroll', 'setScroll 创建实例失败' );
            };
        },

        /**
         * 点击开始制作按钮
         */
        work ( $index, flag ) {
            if ( flag ) {
                return;
            }

            this.curRecipes = $index;
            if ( this.isWork ) {
                return this.go( '/home' );
            }

            // $time.workTime = recipes[ $index ].workTime;
            this.startWork( $index );
        },

        /**
         * 图片的点击事件
         */
        toDetail ( $index ) {
            this.go( '/detail' );
            this.curRecipes = $index;
        }
    }
};
</script>

<style lang="less" scoped>
@import url("../../../../../static/css/mixins.less");
@import url("../../../../../static/css/params.less");
@import url("../../../../../static/css/base64/loadding.less");

// @import url("../../../../../static/css/animation/keyframes.less");

@height: 3.6rem;
@img_width: 17.1rem;
@padding: .6rem;

.carte-container {
    box-sizing: border-box;
    width: 50%;
    padding: 0 @padding / 2 0 @padding;
}

.carte-container:nth-child(2n) {
    padding: 0 @padding 0 @padding / 2;

    .img[lazy=loading] {
        // box-sizing: border-box;
        // margin-right: 0;
        // margin-left: .3rem;
        // background: red;
    }
}

.carte {
    margin-right: .3rem;
    margin-bottom: .3rem;

    .img {
        .setWH(@img_width, @img_width);
        .setBgi();
    }

    /* 设置懒加载 */
    .img[lazy=loading] {
        .setWH(@img_width, @img_width);
        background-image: url(@loaddingData);
        .setBgi();
        background-size: 50%;
    }
    .img[lazy=loading] + .loader > .ball-rotate {
        display: block;
    }
    .img[lazy=error] {
        .setWH(@img_width, @img_width);
        background-color: rgba( 246, 246, 246, 1 );
        background-image: url(@errorData);
        .setBgi();
        background-size: 70%;
        // animation: rotate 10s infinite linear;
    }

    // .loader {
    //     position: relative;
    //     .setWH(@img_width, @img_width);

    //     .ball-rotate {
    //         .setCenterUsePosition();
    //         display: none;
    //     }

    //     .ball-rotate,
    //     .ball-rotate::after,
    //     .ball-rotate::before {
    //         // .setWH(100px, 100px);
    //         background: @color;
    //     }
    // }

    .carte-info {
        .setLightCenter(4rem);
        padding: 0 .4rem;
        font-size: 1.4rem;

        .container {
            height: 100%;
            .btn {
                margin-top: .8rem;
            }
        }
    }
}

.recipes{
    box-sizing: border-box;
    overflow: hidden;
    .setWH();
}

</style>
