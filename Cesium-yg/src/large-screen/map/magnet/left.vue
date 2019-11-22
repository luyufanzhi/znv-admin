<template>
    <div :class="[ 'magnet-left', {
        active: isActive,
    } ]">
        <div class="content">
            <generalize class="magnet-item generalize"></generalize>
            <in-out class="magnet-item in-out" v-model="activeIndex"></in-out>
            <car class="magnet-item car"></car>
            <arrow v-model="isActive" type="left"></arrow>
        </div>
    </div>
</template>

<script>

// 磁贴
import Generalize from './components/generalize' // 渔港概括
import InOut from './components/inOut' // 进出港统计
import Car from './components/car' // 车辆统计

import Arrow from 'arrow'

export default {
    name: 'magnet-left',
    components: {
        generalize: Generalize,
        'in-out': InOut,
        car: Car,
        arrow: Arrow,
    },

    data () {
        return {
            activeIndex: 0,
            show: true,
            isActive: false,
        }
    },
}
</script>


<style lang="less" scoped>
@import "~@less/animation/translate.less";
@height: 88.4vh;
@width: 18.9vw;

.magnet-left.active {
    transform: translateX(-100%);
}

.magnet-left {
    position: absolute;
    left: 0;
    bottom: .5vw;
    padding-left: 3vw;
    box-sizing: content-box;
    transition: transform 1s;

    .content {
        width: @width;
        .setRelative();
        height: @height;
        .setBg();
        background-size: 100% 100%;
        background-image: url("../images/line_left.png");
        z-index: @zIndex-magnet;
    }

    .magnet-item {
        .setWH( 19.8vw, 27vh );
        position: absolute;
        left: -1.9vw;

        &.generalize {
            top: 4.97vh - 1vh;
        }
        &.in-out {
            top: 32.15vh - 1vh;
        }
        &.car {
            top: 59.36vh - 1vh;
        }
    }
}
</style>
