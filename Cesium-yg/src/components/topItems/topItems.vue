<template>
    <div class="top-items clearfix">
        <div class="item" v-for="(inner,index) in items" :key=index>
            <div class="inner" :style="{backgroundColor: inner.innerBg}">
                <con class="t-l fl">
                    <item :params="inner.items[0]"></item>
                </con>
                <con class="t-r fl pr" >
                    <item :params="inner.items[1]"></item>
                </con>
            </div>
        </div>
    </div>
</template>

 <script>
    import Item from './item';

    export default {
        props: {
            items: {                   //其元素 里type 有四种取值对应四种样式
                type: Array,
                default: () => []
            }
        },
        components: {
            Item
        }
    }
</script> 

<style lang="less" scoped>



.top-items{
    margin:.px2vw( -10 )[@result];height:.px2vh(130)[@result];overflow: hidden;
    display:flex;
    .item{
        position:relative;flex:1;
        padding:0 .px2vw(10)[@result];box-sizing:border-box;
        .inner{
            height:.px2vh(130)[@result];border-radius:5px;
            .t-r{
                width:50%;
            }
            .t-l{
                width: 50%;  
            }
            &:last-child{
                margin-right:0;
            }
        }
        
    }

    
}

</style> 