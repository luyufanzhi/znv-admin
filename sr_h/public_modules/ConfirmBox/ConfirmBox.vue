<template>
	<div class="confirm-box" ref="confirm-box">
		<div class="container appear">

            <!-- 头部标题栏 -->
			<h2 v-if="title" class="title">{{title}}</h2>

            <!-- 头部副标题 -->
			<div class="title-sub" v-text="apre" v-if="apre"></div>

            <!-- 主题内容 -->
			<div :class="[ 'content', { single: !apre && !title } ]">
                <slot></slot>
			</div>

            <!-- 底部按钮 -->
			<div class="buttons clearfix">
				<slot name="btn">
                    <div :style="{ color: cancelC }" class="cancel btn fl" @click.stop.prevent="$emit( 'cancel' )">{{ cancelWord | wordFilter( 0 ) }}</div>
                    <div :style="{ color: submitC }" class="submit btn fr" @click.stop.prevent="$emit( 'submit' )">{{ submitWord | wordFilter( 1 ) }}</div>
                </slot>
			</div>

		</div>
	</div>
</template>

<script>

const wordsArr = [ '取消', '确定', '我知道了' ];

export default {
    name: 'confirm-box',
    props: [ 'title', 'apre', 'isorderSure', 'submitWord', 'cancelWord' ],
    components: {

    },

    mounted() {
        document.querySelectorAll( '.btn' ).forEach( el => el.addEventListener( 'touchstart', function () { } ) );  // 解决 ios active 伪类无效的问题;
    },

    computed: {

        /**
         * 字体颜色
         * cancelWord: '取消 #fff'
         */
        cancelC() {
            return this.colorFilter( this.cancelWord );
        },
        submitC() {
            return this.colorFilter( this.submitWord );
        },
    },

    methods: {
        /**
         * 颜色过滤
         * @param { String } val 父组件传递过来的 cancelWord 值
         */
        colorFilter( val ) {
            try {
                return val.split( ' ' )[ 1 ];
            } catch( e ) {
                return '#007dff';
            }
        },
    },

    filters: {
        /**
         * 文字过滤器
         * @param { String } val 父组件传进来的文字信息, 例如 "确定 #fff"
         * @param { Number } index 索引值, 用来确定是哪个按钮
         */
        wordFilter( val, index ) {
            if ( null != val ) {
                val = val.split( ' ' )[ 0 ];
            }
            if ( null == val ) {
                val = wordsArr[ index ];
            }
            return val;
        },
    },
}

</script>

<style lang="less" scoped>
@import url("../../static/css/base.less");
@import url("../../static/css/mixins.less");
@import url("../../static/css/animation/keyframes.less");
@import url("../../static/css/btn/btn.less");

@titleHeight: 48px;         // 标题栏高度
@fz-title: 18px;            // 标题栏字体大小
@fz-btn: 15px;              // 底部按钮字体大小
@fz-title-sub: 13px;        // 副标题栏
@bgc: #f6f6f6;            // 背景色
@content-padding: 16px;     // 主题部分左右
@btn-width: 48%;            // 底部按钮宽度
@btn-height: 40px;          // 按钮行高


.confirm-box {
    .setWH();
    .setPosition(@positon: fixed);
	background-color: @black_3;
    z-index: 100;
}

.container {

    z-index: 1000;
    text-align: center;
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    background: @bgc;
    min-height: 10rem;
    border-radius: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,.05), 0 -2px 8px @black_05;
    backface-visibility: hidden;

    /* 标题栏 */
    .title {
        text-align: center;
        font-size: @fz-title;
        font-weight: normal;
        letter-spacing: 1px;
        border-bottom: 2px solid @black_1;
        .setLightCenter(@titleHeight);
    }

    /* 副标题栏 */
    .title-sub {
        padding-top: 1.6rem;
        font-size: @fz-title-sub;
        color: @black_5;
    }

    /* 底部按钮 */
    .buttons {
        padding: 1.6rem;
    }

    .btn {
        background: @bgc;
        // appearance: none;
        // display: inline-block;
        // border-radius: 4rem;
        // position: relative;
        // box-sizing: border-box;
        width: @btn-width;
        height: @btn-height;

        font-size: @fz-btn;
        // line-height: @btn-height;
        // color: @btn-color;
        // border: 1px solid @black_1;
        // box-shadow: 0 0 1px 1px #fff inset;
        // outline: 0;
        // overflow: hidden;
        // text-align: center;
        letter-spacing: .2rem;
        // .setLightCenter(@btn-height);
    }
}

@contentPadding: 2.4rem;

.content {
    padding: 1.2rem 1.6rem 0;
    font-size: 1.5rem;
}

.content.single {
    line-height: 3rem;
    padding: @contentPadding 2.6rem @contentPadding - 1.6rem;
}
</style>