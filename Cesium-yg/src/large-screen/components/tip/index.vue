<template>
    <div class="map-tip" v-show="$store.state.map.tipShow">
        <!-- <div class="tit">
            {{ $store.state.map.tipTit }}
            <i class="el-icon-close close"></i>
        </div> -->
        <slot>
            <p>{{ $store.state.map.tipMsg }}</p>
        </slot>
        <el-button type="primary" class="btn" @click="enter" @keypress.enter="enter">确定</el-button>
    </div>
</template>

<script>
import mixins from 'common/mixins'
export default {
    name: 'map-tip',
    mixins: [ mixins ],
    // props: [ 'title' ],
    // model: {
    //     prop: 'tipShow',
    //     event: 'changeVisit'
    // },

    methods: {
        enter () {
            // this.$emit( 'changeVisit', false )
            this.uTipShow( false )
        }
    },

    mounted () {
        // console.log( 'tipShow:', this.tipShow, this )
    }
}
</script>

<style lang="less" scoped>
.map-tip {
    // width: .px2vw( 430 )[@result];
    .setWH( 430px, 247px );
    background:rgba(7,32,69,1);
    border:1px solid rgba(47,184,253,1);
    box-shadow:0px 0px 32px 0px rgba(0,174,253,0.31);
    border-radius:5px;

    font-size:16px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:18px;
    text-align: center;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: @zIndex-tool;
    // padding: @grap-16vh @grap-15vw;

    .tit {
        @h: .px2vh( 16 )[@result];
        font-size: @h;
        line-height: @h;
        height: @h;
        text-align: left;
        border-bottom: 1px solid rgba(47,184,253,1);
        .setRelative();
        text-indent: 10px;
        padding-bottom: 1vh;
        box-sizing: content-box;

        .close {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            font-size: .px2vh( 13 )[@result];
        }
    }

    p {
        margin-top: 66px;
        text-align: center;
    }

    .btn {
        width:65px;
        height:38px;
        background:linear-gradient(180deg,rgba(107,187,253,1),rgba(0,138,252,1),rgba(0,95,176,1));
        border-radius:2px;
        font-size:18px;
        line-height:20px;
        margin: auto;
        padding: 0;
        margin-top: 130px - 17px - 66px;
    }
}
</style>
