<template>
    <ul class="more" v-show="show">
        <li :class="[ 'more-item', {
            active: index == navListCurrentIndex &&modeCurrentIndex==modeIndex
        } ]" v-for="( item, index ) in data" :key="index"
            @click.stop="onSecondClick(item, index)">

            <div class="inner pr" >
                <con class="pol" :w=60 :h=50>
                   <img-icon :type="item.nor" :w=36 :h=36 class="abs"></img-icon>
                </con>
                {{ item.title }}
            </div>
                <ul class="thirdNav" v-if="item.children">
                    <li v-for="(thridItem, thirdIndex) in item.children" :key=thirdIndex
                        @click.stop="onThirdClick(thridItem, thirdIndex, index)"
                        :class="{active: thirdIndex==thirdCurrentIndex}"
                    >
                        {{thridItem.title}}
                    </li>

                </ul>

        </li>
    </ul>
</template>

<script>
import { mapGetters,mapActions,mapMutations } from 'vuex'

export default {
    name: 'tool-item',
    props: [ 'data', 'show', 'modeIndex'],
    data() {
        return {

        }
    },
    methods: {
        onSecondClick(item, index){
            if(index == this.navListCurrentIndex && this.modeIndex == this.modeCurrentIndex) return
            this.setNavListIndex(index)
            this.setModeIndex(this.modeIndex)

            if(item.children && item.children.length > 0)  {
                //有三级导航的什么都不做
                return
            }else{
                 //点击没有三级导航的，要把初始三级导航index
                this.setThirdIndex(-1)
                this._goto(item)
            }
        },
        onThirdClick(item, thirdIndex, secondIndex){
            //modeIndex 一级模块index  secondIndex 二级  thirdIndex 三级
            this.setModeIndex(this.modeIndex)        
            this.setNavListIndex(secondIndex)
            this.setThirdIndex(thirdIndex)

            this._goto(item)
        },
        _goto (item) {
            this.$emit('update:show', false)
            if(!/map/.test(item.path)){
                this.setTabList({tabItem:  item})
            }

            this.$router.push( item.path )
        },

        ...mapActions([ 'setTabList']),
        ...mapMutations({
            setModeIndex: 'MODE_CURRENT_INDEX',
            setThirdIndex: 'THIRD_CURRENT_INDEX',
            setNavListIndex: 'NAV_LIST_CURRENT_INDEX',
        })
    },
    computed: {
        ...mapGetters(['navListCurrentIndex', 'thirdCurrentIndex','modeCurrentIndex'])
    }

}
</script>

<style lang="less" scoped>
@tool-height: 4.62vh;
@icon-w: 1.3vw;
@icon-h: 2.31vh;
@h36: .px2vh(36)[@result];
@w160: .px2vw(160)[@result];
@w60: .px2vw(60)[@result];


.more {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: /* @tool-height */ 99%;
    width: 180px;
    background:rgba(7,32,69,0.6);
    border:1px solid rgba(47,184,253,1);
    box-shadow:0px 0px 17px 0px rgba(0,174,255,0.31);
    border-radius:3px;
    // padding: 0 1vw;
    z-index: @zIndex-tool + 1;

    ul {
        border: 1px solid @th-border;
        background-color: @th-bg;
    }

    li {
        width: 100%;
        height: @tool-height;
        line-height: @tool-height;
        color: #fff;
        font-size: 1.68vh;
        font-family:MicrosoftYaHei;
        // font-weight:400;
        // color:rgba(0,255,255,1);
        position: relative;
        // border-bottom: 1px solid@nav-border;
        letter-spacing: 3px;
        // margin: auto;
        .setRelative();

        box-sizing: border-box;

        &::after {
            content: "";
            position: absolute;
            left: 10%;
            top: 0;
            width: 80%;
            height: 100%;
            border-bottom: 1px solid @nav-border;
        }
        .inner{
            overflow:hidden;
            height: 100%;
            padding-left: @w60;
        }

        img {
            position: absolute;
            top: 50%;
            left: 1.5vw; // 1.1
            transform: translateY(-50%);
            .setWH( @icon-w, @icon-h );
            // transform: translateY(-.2vw);
            // margin-left: 1.1vw;
        }

    }

    li:last-child::after {
        content: none;
        border-bottom-style: none;
    }

    li.active, li:hover {
        // color: @th-active;
        background-color: #3D96D6;
        .thirdNav{
                display:block;
        }
    }
}

.thirdNav{
    width: 120px;position:absolute;left:100%;top:0;border:1px solid @nav-border; display:none;

    li{
        overflow:hidden;text-indent:0;letter-spacing:1px;
        text-align:left;
        height: @h36;
        line-height: @h36;
        padding-left: @w15;
        &::after {
            border-bottom:0px none;
        }
    }
}

</style>
