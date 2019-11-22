<template>
    <div>
        <div class="map-tip">
            <div class="tit">
                {{ title }}
                <i class="el-icon-close close" @click="close"></i>
            </div>
            <div class="content clearfix">
                <slot>
                    <p>{{ $store.state.map.tipMsg }}</p>
                </slot>
            </div>
            <el-button type="primary" class="btn" @click="enter" @keypress.enter="enter">确定</el-button>
        </div>
        <div class="mask" @click="close"></div>
    </div>
</template>

<script>
// import mixins from 'common/mixins'
import tip from 'common/mixins/tip'
export default {
    name: 'map-tip',
    mixins: [ /* mixins, */ tip ],
    props: [ 'title' ],
    // model: {
    //     prop: 'tipShow',
    //     event: 'changeVisit'
    // },

    mounted () {
        // console.log( 'tipShow:', this.tipShow, this )
    },

    methods: {
        enter () {
            this.$emit( 'enter' )
            this.uTipShip( '' )
        },

        close () {
            this.$emit( 'close' )
            this.uTipShip( '' )
        }
    },
}
</script>

<style lang="less" scoped>
.map-tip {
    width: .px2vw( 430 )[@result];
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
    z-index: @zIndex-tip;
    padding: @grap-16vh @grap-15vw;

    .tit {
        @h: .px2vh( 16 )[@result];
        font-size: @h;
        line-height: @h;
        height: @h;
        text-align: left;
        border-bottom: 1px solid rgba(47,184,253,1);
        .setRelative();
        text-indent: 5px;
        padding-bottom: 1vh;
        box-sizing: content-box;
        margin-bottom: .px2vh( 16 )[@result];

        .close {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            font-size: .px2vh( 13 )[@result];
        }
    }

    p {
        margin-top: .px2vh( 66 )[@result];
        text-align: center;
    }

    .btn {
        width: .px2vw( 65 )[@result];
        height: .px2vh( 38 )[@result];
        background:linear-gradient(180deg,rgba(107,187,253,1),rgba(0,138,252,1),rgba(0,95,176,1));
        border-radius:2px;
        font-size: .px2vh( 18 )[@result];
        line-height: .px2vh( 38 )[@result];
        padding: 0;
        margin-top: .px2vh( 16 )[@result];
        margin-bottom: .px2vh( 16 )[@result];
    }

    .content {
        margin-bottom: .px2vh( 16 )[@result];
    }
}
</style>
