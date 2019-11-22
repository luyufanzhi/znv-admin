<template>
    <div class="date-nav clearfix">
        <div :class="[ 'item', 'year', {
            active: activeIndex === 0
        } ]" @click="tabClick(0)">日</div>
        <div :class="[ 'item', 'month', {
            active: activeIndex === 1
        } ]" @click="tabClick(1)">月</div>
        <div :class="[ 'item', 'day', {
            active: activeIndex === 2
        } ]" @click="tabClick(2)">年</div>
    </div>
</template>

<script>
export default {
    name: 'date-nav',
    props: [ 'activeIndex' ],
    model: {
        prop: 'activeIndex',
        event: 'changeIndex'
    },

    data () {
        return {
            active: 'in-out',
        }
    },

    methods: {
        tabClick ( index ) {
            this.$emit( 'changeIndex', index )
            this.$emit( 'tab-click', index )
        }
    }
}
</script>

<style lang="less" scoped>
.date-nav {


    .item {
        width: 1.6vw;
        height: 2.13vh;
        float: left;
        border: 1px solid rgba(85,120,221,1);
        font-size: 1.24vh;
        line-height: 2.13vh;
        color: #fff;
        text-align: center;
        cursor: pointer;
    }

    .item.active {
        background:rgba(0,91,193,1);
        box-shadow: @shadow-inner;
    }
}
</style>
