<template>
    <div class="manage" @click="handleParentClick">
        <!-- 导航栏 -->
        <home-nav ref="nav" @operateNav='operateNav'></home-nav>
         <!-- 切换模式 -->
        <change-mode></change-mode>

        <!-- 天气 -->
        <weather></weather>
        <location></location>
        <user></user>

        <title-tab class="titleTab" :class="{closedNav: isClosedNav}"></title-tab>

        <wrapper class="wrapper">
            <!-- 三级级页面 -->
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </wrapper>
    </div>

</template>

<script>
import Nav from '../components/nav' // 导航栏
import Weather from '../components/weather' // 用户
import Location from '../components/location' // 视角定位
import User from '../components/user' // 用户
import ChangeMode from '../components/change-mode'
import mixinViewModule from 'common/mixins/view-module'      //每个页面关于表格数据的增删改查
import Wrapper from 'base/baseUI/wrapper'
import TitleTab from 'base/baseUI/titleTab'
import mixins from 'common/mixins'
import { mapGetters } from 'vuex'

export default {
    data () {
       return {
            isClosedNav: false
       }
    },
    mixins: [mixinViewModule],
    methods: {
        operateNav(isClosedNav) {
            this.isClosedNav = isClosedNav
        },
        handleParentClick() {
            this.$refs.nav.hideSubNav()
        }
    },
    created() {

    },
    computed: {
        ...mapGetters({
             toolShow: 'map/toolShow',
        })
    },
    components: {
        'home-nav': Nav,
        Weather,
        ChangeMode,
        Wrapper,
        TitleTab,
        Location,
        User
    }
}
</script>

<style lang="less" scoped>

   .manage{
       background:@bluebg;height:100%;width:100%;padding-top:1px;
   }
    
    .titleTab{
        transition: margin .5s;
        &.closedNav {
            margin-top:12vh !important;
        }
    }
   


</style>
