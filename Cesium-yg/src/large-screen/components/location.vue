<template>
    <div class="location">
        <div class="txt unselect">
            <p @click="show = !show">蛇口渔港</p>
            <!-- <item :data.sync="data" :show.sync="show"></item> -->
        </div>

        <div class="icon" @click="show = !show"></div>
    </div>
</template>

<script>
import Item from './item.vue'

export default {
    name: 'location',
    components: {
        'item': Item
    },
    data () {
        return {
            show: false,
            data: [ {
                txt: '蛇口渔港',
                nor: '../map/images/ship-nor.png',
                pre: '../map/images/ship-pre.png',
                isActive: false
            }, {
                txt: '蛇口渔港',
                nor: '../map/images/ship-nor.png',
                pre: '../map/images/ship-pre.png',
            }, {
                txt: '蛇口渔港',
                nor: '../map/images/ship-nor.png',
                pre: '../map/images/ship-pre.png',
            } ]
        }
    },
}
</script>

<style lang="less" scoped>
.location {
    // width: 14.1vw;
    height: 2.2vw;
    background:linear-gradient(90deg,rgba(5,212,225,0),rgba(51,107,234,1));
    // border:1px solid rgba(0,255,252,1);
    box-shadow:0px 0px 73px 0px rgba(0,28,107,0.24);
    border-radius: 1.1vw;
    // border-image: linear-gradient( 90deg, rgba(0,255,252,1) , rgba(0,255,252,1));
    // padding: 1px;
    padding-left: 4vw;
    padding-right: 3vw;

    position: absolute;
    left: 7.9vw;
    top: 5.3vh;
    z-index: @zIndex-tool;

    .icon {
        position: absolute;
        top: 50%;
        right: .3vw;
        .setWH( 1.7vw );
        transform: translateY(-50%);
        background-image: url('../map/images/regional_tree.png');
        .setBg();
    }

    .txt {
        // width: 120px;
        // font-size: 2.6vh;
        font-size: 1.2vw;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(209,224,255,1);
        text-align: right;
        line-height: 2.2vw;
        // margin: auto;
        // text-indent: 2.5vw;
        padding-left: .3vw;
        padding-right: .5vw;
        box-sizing: border-box;
        .setRelative();

        &::after {
            content: "";
            position: absolute;
            right: -.6vw;
            top: 50%;
            transform: translateY(-50%);
            width: .px2vw(13)[@result];
            height: .px2vh(8)[@result];
            background-image: url('../map/images/drop_down.png');
            .setBg();
        }
    }
}
</style>
