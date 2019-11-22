<template>
    <div :class="[ 'magnet-right', {
        active: isActive
    } ]">
        <div class="content">
            <ship class="magnet-item ship"></ship>
            <warn class="magnet-item warn"></warn>
            <video-znv class="magnet-item video"></video-znv>
            <arrow v-model="isActive"></arrow>
        </div>
    </div>
</template>

<script>

// 磁贴
import Ship from './components/ship' // 渔港概括
import Warn from './components/warn' // 进出港统计
import Video from './components/video' // 车辆统计

import Arrow from 'arrow'

export default {
    name: 'magnet-right',
    components: {
        ship: Ship,
        warn: Warn,
        'video-znv': Video,
        arrow: Arrow
    },
    data () {
        return {
            isActive: false
        }
    },
}
</script>


<style lang="less" scoped>
@import "~@less/animation/translate.less";
@height: 88.4vh;
@width: 18.9vw;

.magnet-right.active {
    transform: translateX(100%);
}

.magnet-right {
    transition: transform 1s;
    position: absolute;
    right: 0;
    bottom: .5vw;
    padding-right: 3vw;
    // width: @width;
    // height: @height;
    box-sizing: content-box;

    .content {
        width: @width;
        .setRelative();
        height: @height;
        .setBg();
        background-size: 100% 100%;
        background-image: url("../images/line_right.png");
        z-index: @zIndex-magnet;
    }

    .magnet-item {
        .setWH( 19.8vw, 27vh );
        position: absolute;
        right: -1.9vw;

        &.ship {
            top: 4.97vh - 1vh;
        }
        &.warn {
            top: 32.15vh - 1vh;
        }
        &.video {
            top: 59.36vh - 1vh;
        }
    }
}
</style>
