<template>
    <div :class="[ 'gis-item', {
        active: isActive
    } ]">
        <div class="ct">
            <slot></slot>
        </div>

        <arrow v-model="isActive"></arrow>
    </div>
</template>

<script>
import Arrow from 'arrow'

export default {
    name: 'wrap',
    components: {
        arrow: Arrow,
    },
    data () {
        return {
            isActive: false,
        }
    },
}
</script>

<style lang="less" scoped>
.gis-item.active {
    transform: translateX(100%);
}
.gis-item {
    transition: transform 1s;
    width: .px2vw(430)[@result];
    height: .px2vh(938)[@result];

    position: absolute;
    padding-right: @grap-17vw;
    padding-bottom: @grap-14vh;
    padding-left: @grap-14vw;
    right: 0;
    bottom: 0;
    z-index: @zIndex-magnet;
    box-sizing: content-box;

    .ct {
        .setWH();
    }
}
</style>
