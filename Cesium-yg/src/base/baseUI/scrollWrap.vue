<template>
    <happy-scroll class="scroll-wrapper"
            :size=size
            :color=color
            :resize=resize>
        <slot></slot>
    </happy-scroll>
</template>

<script>
import {HappyScroll} from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'

export default {
    props: {
        size: {
            type: Number,
            default: 6
        },
        color: {
            type: String,
            default: 'rgba(47, 184, 255, 1)'
        },
        resize: {
            type: Boolean,
            default: true
        }
    },
    components: {
        HappyScroll
    }
}
</script>

<style lang="less" scoped>
.scroll-wrapper /deep/ .happy-scroll-container .happy-scroll-content{
  display:block;
  padding:0 20px 20px 0;     //设置为20抵消插件里计算多的20（也是padding的20）
}
</style>


