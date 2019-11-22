
<template>
    <!-- update: 2018.1.3 -->
    <div class="item">

        <!-- 图标 -->
        <slot name="icon">

            <div ref="icon"
                :class="[ 'icon', { active: isActive } ]"
                @click="tap" @touchstart=" isShowAction = !isDisable " @touchend=" isShowAction = false ">

                <!-- 点击遮罩以及背景图片的切换 -->
                <div :class="[ 'inner', { clickStyle: isShowAction }, { disable: isDisable } ]"
                     :style="{ backgroundImage: 'url(' + imgUrl + ')' } ">

                    <!-- 水波纹特效 -->
                    <transition name="ripple">
                        <span v-show="isRipple" class="ripple"></span>
                    </transition>

                </div>

                <!-- 选择框 -->
                <Select-list v-if="item.arrow" ref="selectList"
                    class="mode-select"
                    :isListShow="isArrow"
                    :selectList="Array.isArray( item.arrow ) && item.arrow"
                    @chooseIndex="chooseIndex"></Select-list>

            </div>

        </slot>

        <!-- 底部文字 -->
        <p :class="[ 'word', { arrow: item.arrow }, { disable: isDisable } ]">
            <slot name="word">{{ word }}</slot>
            <span class="span"></span>
        </p>

    </div>
</template>

<script>

/*
    引用方式:
    <BottomItem
        :word="words[ $index ]"
        :index="$index + 1"
        :arrow=" item.arrow && opt.arrowUrl "
        :curIndex.sync="opt.curIndex"
        :isSwitch=" opt.switchIndex === $index "
        :isChildSwitch=" opt.childSwitchIndex === $index "
        :item="item" >
    </BottomItem>
 */

/*
    item: {
        arrow: false,
        imgUrl: [ '/src/components/BottomList/images/on.jpg', '/src/components/BottomList/images/off.jpg' ],
        callback: index => console.log( 'bottomItemCallback:', index ),

        // 这里补充的
        isActive: false,    // 控制是否会活动状态
        isDisable: false,   // 控制是否为不可点击状态
    }
 */

/**
 *
 * 传入的数据:
 *  item: arrow, imgUrl, callback 详情看 BottomMenu.vue
 *
 */

import SelectList from '../../../SelectList.vue'

const SWITCH     = 'switch';
const CHILD      = 'child';
const UNGROUP    = 'ungroup';
const IMG_URL    = './static/images/item_{{index}}.png';
const IMG_ON_OFF = [ './static/images/icon_Power_on.png', './static/images/icon_Power_off.png' ];

export default {
    name: 'bottomItem',
    props: [ 'word', 'isSwitch', 'isChildSwitch', 'index', 'curIndex', 'item', 'switch' ],
    components: { SelectList },

    data() {
        return {
            // 控制图片切换
            imgIndex: 0,

            unClick: false,
            isToggleImg: false,
            isRipple: false,
            isShowAction: false,
        };
    },

    created() {

        if ( this.item.isUnArrow == null ) {
            this.$set( this.item, 'isUnArrow', true );
        }
        // 当为 ungroup 时, 设置控制 active 的 isActive 值
        this.$set( this.item, 'isActive', false );
        // 默认状态为 disable
        if ( !this.isSwitch ) this.$set( this.item, 'isDisable', false );
        // 是否切换图片
        this.isToggleImg = Array.isArray( this.item.imgUrl );
        if ( this.curIndex == null ) {
            this.item.custom = true && ( this.item.ungroup = true );
        }
    },

    computed: {

        imgUrl() {

            // 设置默认路径
            if ( this.isSwitch && this.item.imgUrl == null ) {

                this.item.imgUrl = IMG_ON_OFF;
                this.isToggleImg = true;
            } else if ( this.item.imgUrl == null ) {

                return IMG_URL.replace( /{{index}}/, this.index )
            }

            return !this.isToggleImg ? this.item.imgUrl : this.item.imgUrl[ this.imgIndex ];
        },

        /* 控制是否会活动状态 */
        isActive() {

// TODO: 是否保留童锁之前的状态;
            return /* !this.isDisable &&  */( !this.isSwitch && !this.item.ungroup && this.curIndex === this.index ) || ( this.item.isActive && ( this.curIndex > 0 || this.item.custom ) );
        },

        /* 控制是否为不可点击状态 */
        isDisable() {
            return !this.switch && ( !this.isSwitch && this.curIndex < 0 || this.item.isDisable );
        },

        isArrow() {
            return this.isActive && !this.item.isUnArrow;
        }
    },

    watch: {
        isActive( val, oldVal ) {
            typeof this.item.activeCallback === 'function' && this.item.activeCallback.call( this, val, this.index, this.item );
            // 切换背景图
            if ( this.isToggleImg ) this.imgIndex = +( !this.imgIndex );
        },
    },

    methods: {

        tap() {

            if ( this.isDisable ) return;
            this.item.isUnArrow = !this.item.isUnArrow;

            // 特效
            this.isRipple = !this.isRipple;
            // 切换背景图
            // if ( this.isSwitch ) this.imgIndex = +( !this.imgIndex );

            // 不是组内元素
            // if ( this.item.ungroup && !this.item.custom ) this.item.isActive = !this.item.isActive;
            // 单独触发 callback
            typeof this.item.callback === 'function' && this.item.callback.call( this, this.index, this.item );
            // 更新 changeCurIndex
            if ( !this.item.ungroup && this.curIndex != this.index ) {
                this.$emit( 'update:curIndex', this.index );
            }
            // 童锁
            if ( this.isChildSwitch )  this.$emit( 'childMode', this.isActive );
        },

        chooseIndex( index ) {

            this.item.isActive = false;
            this.item.isUnArrow = true;
            if ( index === -1 ) {
                // this.$emit( 'update:curIndex', -this.curIndex );
                return;
            }

            typeof this.item.arrowCallback === 'function' && this.item.arrowCallback( index, this.item );
        },
    },

}
</script>

<style lang="less" scoped>
@import url("../../../../static/css/base64/bottomMenuBgc.less");

@icon_width: 70px;
@arrow_width: 10px;
@border_width: 2.5px;
@bordercheck_width:2px;
@icon_bgc_width: 24px;
@active_color: #007dff;
@unactive_color: #fbfbfb;

.setBgi() {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.setTransition() {
    transition-property: border;
    transition-delay: 300ms;
    transition-duration: .1s;
    transition-timing-function: ease-in;
}

.setWH() {
    width: 100%;
    height: 100%;
}

.item {
    width: 100%;
}

.bottom-simple, .item {
    margin: 0;
    padding: 0;
    list-style: none;
}

.icon {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center, center;

    box-sizing: border-box;
    background-color: #ffffff;
    position: relative;
    box-sizing: border-box;
    width: @icon_width;
    height: @icon_width;
    border-radius: 50%;
    margin: auto;
    margin-bottom: 6px;
    .bgiNormal();
    .setTransition();
}

.icon.active {
    .setTransition();
    .bgiPre();
    transition: background-image 300ms ease-in-out;
}

.inner.disable,
.word.disable {
    opacity: .3;
}

.inner {
    .setWH();
    border-radius: 50%;
    background-size: @icon_bgc_width;
    background-position: center;
    background-repeat: no-repeat;
    /* 解决 margin 塌陷 */
    border: .1px solid transparent;
    box-sizing: border-box;
}

.word {
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    position: relative;
    font-size: 13px;
    line-height: 17px;
    margin: 0;
}

.word.arrow {
    transform: translateX( -5px );
}

.word.arrow .span {
    position: absolute;
    top: 7px;
    margin-left: 5px;
    border: 5px solid transparent;
    border-top-color: rgb(0, 125, 255);
}

/* 水波纹特效 */
.ripple-enter-active,
.ripple-leave-active {
    animation: ripple 0.15s ease-in-out;
}

@ripple: 13px;
@offset: 13px;

@keyframes ripple {
    0% {
        margin: @ripple;
        border: 0px solid rgba(180, 180, 180, 0.5);
        top: -@ripple;
        left: -@ripple;
        position: relative;
    }
    100% {
        margin: 0px;
        border: @ripple solid rgba(220, 220, 220, 0.1);
        top: -@ripple;
        left: -@ripple;
        position: relative;
    }
}

.ripple {
    width: @icon_width;
    height: @icon_width;
    border-radius: 50%;
    position: absolute;
    left: -@offset;
    top: -@offset;
    z-index: 30;
}

/* 点击灰化样式 */
.clickStyle {
    background-color: rgba(0, 0, 0, 0.05) !important;
}

</style>