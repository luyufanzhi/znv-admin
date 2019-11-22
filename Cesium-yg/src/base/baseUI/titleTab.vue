<template>
    <div class="item-con">
        <div class="item" v-for="(item, index) in tabList" :key=index @click="onTabClick(index)" :class="{active: index == tabListCurrentIndex}">
            <div class="text">
                {{item.title}}
                <img-icon class="ic" v-if="isShowCloseIcon" @onClick.stop="closeTab(index)" w=21 h=21 type="close"></img-icon>
            </div>
            
        </div>
    </div> 
</template>

<script>
import { mapGetters,mapActions,mapMutations } from 'vuex';

    export default {
        props:{
            titles: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            onTabClick(index) {
                this.changeTabCurrent({index})
            },
            closeTab(index) {
                this.deleteTabListFromIndex({ index })
            },
            ...mapActions(['deleteTabListFromIndex', 'changeTabCurrent'])
        },
        computed: {
            isShowCloseIcon() {
                return this.tabList.length > 1
            },
            ...mapGetters(['tabList','tabListCurrentIndex'])
        },
        created() {
            //console.log(this.tabList)
            // console.log(this.$store)
        },
        watch: {
            tabListCurrentIndex(index) {
                this.$router.push(this.tabList[index].path)
            },
            tabList(list) {
                console.log(list)
            }
        }
    }
</script>

<style lang="less" scoped>
    @garident:linear-gradient(180deg,rgba(107,187,255,1),rgba(0,138,255,1),rgba(0,95,176,1));
    @h192: .px2vh( 192 )[@result];
    @h34: .px2vh( 34 )[@result];

   .item-con{
        margin:@h192 0 0 @w20;overflow:hidden;
        .item{
            background:rgba(0,84,169,0.7);;float:left;transform:skew(30deg, 0);color:#fff;
            height:@h34 ;line-height:@h34;cursor: pointer;
            padding:0 @w40 0 @w20; position:relative;
            
            .text{
                transform:skew(-30deg, 0);
            }
            &:first-child{
                padding-left: @w50; margin-left: -@w30;
            }
            &.active{
                background: @garident;
            }
            .ic{
                position: absolute;top:0.6vh;right:-1.5vw;opacity: 0;
            }
            &:hover{
                .ic {
                    opacity: 1;
                }
            }
        }
    }

</style>
