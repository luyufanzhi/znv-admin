<template>
    <div :class="[ 'arrow', {
        turn: !isActive,
        down: isDown,
        left: type === 'left'
    } ]"
        @click="$emit( 'active', !isActive )"
        @mousedown="isDown = true"></div>
</template>

<script>
export default {
    name: 'arrow',
    props: {
        isActive: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'right'
        }
    },
    model: {
        prop: 'isActive',
        event: 'active'
    },
    data () {
        return {
            // isActive: false,
            isDown: false,
        }
    },
    created () {
        this.up = this.up.bind( this )
        window.addEventListener( 'mouseup', this.up )
    },
    destroyed () {
        window.removeEventListener( 'mouseup', this.up )
    },
    methods: {
        up () {
            this.isDown = false
        }
    }
}
</script>

<style lang="less">
.arrow {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateX(-100%) translateY(-50%);
    width: .px2vw(21)[@result];
    height: .px2vh(144)[@result];
    background-image: url("./images/right_open.png");
    .setBg();
    cursor: pointer;
}

.arrow.turn {
    background-image: url("./images/right_pack_up.png");
}
.arrow.down {
    // background-image: url("./images/right_open.png");
}
.arrow.turn.down {
    // background-image: url("./images/right_pack_up.png");
}

.arrow.left {
    left: auto;
    right: 0;
    transform: translateX(100%) translateY(-50%);
    background-image: url("./images/left_open.png");
}
.arrow.left.turn {
    background-image: url("./images/left_pake_up.png");
}
.arrow.left.down {
    // background-image: url("./images/left_open.png");
}
.arrow.left.turn.down {
    // background-image: url("./images/left_pake_up.png");
}
</style>
