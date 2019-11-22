<template>
    <div class="nav pr"  :style="{
                    height: ( navShow ? bgHight : bgBottomHeight ) + 'px',
                }">
        <transition name="top">
            <div v-if="!isClosedNav" class="nav-inner pr">
                

                <!-- 头部背景图 -->
                <div class="bg" ref="bg" :style="{
                    width: mapWidth + 'px',
                    height: ( navShow ? bgHight : bgBottomHeight ) + 'px',
                    backgroundImage: bgi
                }"></div>

                <!-- 头部标题 -->
                <h2 class="tit unselect" :style="{
                    height: bgTopHeight + 'px',
                    lineHeight: bgTopHeight + 'px'
                }">{{ $store.state.home.title }}</h2>

                <!-- 头部导航栏 -->

                <div class="bg-bottom" ref="bgBottom" :style="{
                    top: bgTopHeight + 'px',
                    height: bgBottomHeight + 'px'
                }" v-show="navShow">
                    <div class="nav-content" :style="{
                        width: bgBottomWidth + 'px',
                    }">

                        <div :class="[ 'item', 'item-' + index, {
                            active: currentIndex === index
                        } ]" v-for="( item, index ) in navItems"
                            :key="index"
                            @mouseleave="itemLeave"
                            @click.stop="itemActive( index )"
                            @mouseenter="itemEnter( index )" >

                            <nav-item v-if="subNavItems&&subNavItems.children.length&&currentIndex==index"
                                :data="subNavItems.children"
                                :modeIndex="index"
                                :show.sync="isShowSubNavItems"
                                :key="index"
                                ></nav-item>
                        </div>

                    </div>
                </div>
            </div>
        </transition>

        <img-icon :type="navStatusIconClass" w=18 h=22 class="por cp nav-icon" :class="{closed: isClosedNav}"
                @onClick="isClosedNav=!isClosedNav;$emit('operateNav',isClosedNav)"></img-icon>
    </div>
</template>

<script>

import Item from './item'
import mixins from 'common/mixins'
import {mapGetters,mapActions,mapMutations} from 'vuex'

export default {
    props: [ 'mapWidth' ],
    mixins: [ mixins ],

    components: {
        'nav-item': Item
    },

    data () {
        return {
            bgHight: 0,
            bgTopHeight: 0,
            bgBottomHeight: 0,
            bgBottomWidth: 0,
            bgi: 'url("/static/img/large-screen/nav_bg.png")',
            navItems: [
                '../map/images/nav-home-nor.png',
                '../map/images/nav-ship-nor.png',
                '../map/images/nav-people-nor.png',
                '../map/images/nav-safe-nor.png',
                '../map/images/nav-beautiful-nor.png',
            ],
            isShowSubNavItems: false,
            currentIndex: -1,
            isClosedNav: false
        }
    },

    created () {
        this.initNavData({
            currentRoute: this.$route,
            router: this.$router
        })
    },


    mounted () {
        this.resize = this.resize.bind( this )
        this.removeItem = this.removeItem.bind( this )
        this.resize()
        window.addEventListener( 'resize', this.resize )
        window.addEventListener( 'click', this.removeItem )
    },

    destroy () {
        window.removeEventListener( 'resize', this.resize )
        window.removeEventListener( 'click', this.removeItem )
    },

    watch: {
        navShow: {
            immediate: true,
            handler ( val ) {
                switch ( val ) {
                    case true:
                        this.bgi = 'url("/static/img/large-screen/nav_bg.png")'
                        break;
                    case false:
                        this.bgi = 'url("/static/img/large-screen/nav_bg1.png")'
                        break;

                    default:
                        break;
                }
            }
        },
        modeCurrentIndex:{
            immediate: true,
            handler(index) {
                this.currentIndex = index
            }
        }
    },

    methods: {

        // 容器头部导航栏自适应
        resize () {
            // 背景图尺寸: 1935x167 70
                // 650 x 70
                // TODO: 自适应

                if ( !this.$refs.bg ) {
                    return
                }

                let rect = this.$refs.bg.getBoundingClientRect()
                let height = Number.parseFloat( rect.height )
                let width = Number.parseFloat( rect.width )
                let cale1 = width / 1935, cale2 = 70 / 167

                this.bgHight = cale1 * 167
                this.bgTopHeight = this.bgHight * cale2
                this.bgBottomHeight = this.bgHight - this.bgTopHeight
                this.bgBottomWidth = cale1 * 650
        },

        itemActive( $index ){
            if ( 0 === $index ) {
                this.$router.push( { name: 'map' } )
            }
        },

        // 导航滑入事件
        itemEnter ( $index ) {

            if($index != this.currentIndex) {
                this.currentIndex = $index
                this.isShowSubNavItems = true
            }else {
                this.isShowSubNavItems = !this.isShowSubNavItems
            }

        },
        // 导航滑出事件
        itemLeave ( ) {

            this.isShowSubNavItems = false
            this.currentIndex = this.modeCurrentIndex

        },

        removeItem () {
            // 点击清除掉
            this.navList.forEach( ( item ) => item.isShow = false )
        },

        hideSubNav() {
            this.isShowSubNavItems = false
        },
        ...mapActions(['initNavData', 'setTabList']),
        ...mapMutations({
            setModeIndex: 'MODE_CURRENT_INDEX',
            setThirdIndex: 'THIRD_CURRENT_INDEX',
            setNavListIndex: 'NAV_LIST_CURRENT_INDEX'
        })
    },

    computed: {
        subNavItems() {
            return this.navList[this.currentIndex]
        },
        navStatusIconClass() {
            return this.isClosedNav?'close_nav':'open_nav'
        },
        ...mapGetters(['modeCurrentIndex','navList','navListCurrentIndex'])
    }

}
</script>

<style lang="less" scoped>
/* 导航栏 开始 */
// @20: .px2vh(20)[@result];
@import "~@less/animation/translate.less";

.nav-inner{
    // height:117.806px;
    
   
}
.nav-icon{
    transition: transform .5s;
    left: 50%;
    bottom: 0;
    right: auto;
    top: auto;
    transform: translateX(-50%) translateY(80%);
    &.closed{
        transform: translateX(-50%) translateY(-14vh);
        //top:0;
    }
}

.nav {
    position: absolute;
    left: 0;
    top: 0;
    .setWH(100%, 0);
    z-index: @zIndex-img;

    .bg {
        width: 100%;
        .setBg();
        background-position: 0 0;
    }
    .tit {
        color: #fff;
        font-size: 3.73vh;
        width: 100%;
        text-align: center;
        position: absolute;
        left: 0;
        top: 0;
        margin: 0;
    }
}

.bg-bottom {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding-top: 5px;
    padding-bottom: 15px;
}

.nav-content {
    height: 100%;
    margin: auto;
    .setFlex();

    .item {
        .setBg();
        width: 5.5vw + .5vw;
        height: 5.7vw + .5vw;
        .setRelative();
    }

    .item-0.active {
        background-image: url("../map/images/nav-home-down.png");
    }
    .item-1.active {
        background-image: url("../map/images/nav-ship-down.png");
    }
    .item-2.active {
        background-image: url("../map/images/nav-people-down.png");
    }
    .item-3.active {
        background-image: url("../map/images/nav-safe-down.png");
    }
    .item-4.active {
        background-image: url("../map/images/nav-beautiful-down.png");
    }

    .item-0 {
        background-image: url("../map/images/nav-home-nor.png");
    }
    .item-1 {
        background-image: url("../map/images/nav-ship-nor.png");
    }
    .item-2 {
        background-image: url("../map/images/nav-people-nor.png");
    }
    .item-3 {
        background-image: url("../map/images/nav-safe-nor.png");
    }
    .item-4 {
        background-image: url("../map/images/nav-beautiful-nor.png");
    }
}
/* 导航栏 结束 */

/* 磁贴 开始 */
.magnet {
    position: absolute;
    left: 0;
    top: 0;
    .setWH(0);
}
/* 磁贴 结束 */
</style>
