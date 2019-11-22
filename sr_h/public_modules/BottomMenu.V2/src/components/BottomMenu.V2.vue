
<template>
    <div>
        <ul class="bottom-simple clearfix" ref="bottomSimple" v-if="1">

            <li class="item">

            </li>
            <li class="item">

            </li>
            <li class="item">

            </li>
            <li class="item">

            </li>

        </ul>
    </div>
</template>

<script>

export default {
    name: 'bottom-menu',
    props: {
        data: Array,

    },
}
</script>

<style scoped lang="less">
@import url("../../../../static/css/base.less");
@import url("../../../../static/css/mixins.less");

.bottom-simple {
    .setWH(100%, @bottomHeight);
    .setCenterUseFlex(row);
    box-sizing: border-box;
    padding: 24px 8px;

    .item {
        flex: 1;
        height: 100%;
        float: left;
        background-color: blue;
    }
}

</style>

