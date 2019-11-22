<template>
    <div class="tabs ">

        <div class="tab-item" v-for="(item, index) in tabs" :key=index @click="onTabClick(index)" :class="{active: index == activeIndex}">
            <div class="text">{{item}}</div>
        </div>
        
    </div>

</template>

<script>
export default {
        props:{
            tabs: {
                type: Array,
                default: []
            },
            value: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                activeIndex: 0
            }
        },
        methods: {
            onTabClick(index) {
                this.activeIndex = index
                this.$emit('input', index)
            }
        },
        watch: {
            value(val) {
                if (val !== this.activeIndex) {
                    this.activeIndex = val;
                }
            }
        },
    }
</script>


<style lang="less" scoped>
@w137: .px2vw(137)[@result];

.tabs{
       border-bottom: 1px solid @border;color:#fff;
       height: @h40;
       line-height: @h40;
       padding-left: @h20;
       
       .tab-item{
           
           min-width:@w137;float:left;cursor: pointer;text-align:center;
           padding:0 @w20;color:rgba(255,255,255,0.5);font-size:@h16;
           &.active{
                border: 1px solid @border;color:rgba(255,255,255,1);
                border-bottom:0;background:@wrapBg;font-size:@h18;
           }
       }
   }
</style>
