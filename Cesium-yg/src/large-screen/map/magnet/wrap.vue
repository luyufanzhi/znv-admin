<template>
    <!-- 背景 -->
    <div class="wrap znv-ellipsis">
        <el-tabs v-model="active" @input="$emit( 'input', active )" type="card" @tab-click="vm => $emit( 'tab-click', vm )" class="g-content">
            <el-tab-pane v-for="( item, index ) in list" :key="index"
                :label="item.label" :name="item.name" :class="[ 'g-config', 'g-item', item.class ? item.class : '' ]">
                <slot :name="item.name" class="slot"></slot>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
/**
 * 可以双向绑定 list 中的 name 属性
 * tab 栏的点击注册事件为: @tab-click
 * 每一个 tab 的 name 都有一个具名插槽
 */

export default {
    name: 'wrap',
    props: [ 'list', 'activeName' ],
    model: {
        prop: 'activeName',
        event: 'input'
    },
    data () {
        return {
            active: '',
        }
    },

    created () {
        this.active = this.activeName
    },
}
</script>

<style lang="less" scoped>
.wrap {
    .setWH();
    z-index: @zIndex-magnet;
    cursor: default;

    @import "~@less/tab/magnet-tab.less";
}
</style>
