<template>
    <div class="user-info" @click="show = !show">
        <div class="icon"></div>
        <div class="txt unselect">
            <p>{{ $store.state.user.name }}</p>
                <item class="more-item"
                    :data.sync="data"
                    :show=show
                    @item-click="itemClick"></item>
        </div> 
    </div>
</template>

<script>
import Item from './item.vue'
export default {
    name: 'user-info',
    components: {
        'item': Item
    },
    data () {
        return {
            bg: '../map/images/user.png',
            data: [ {
                title: '系统管理',
                nor: 'set',
                path: '/home'
            } ],
            show: false,
        }
    },

    created () {
        // console.log( 'name', this.$store.state.user.name )
        if ( this._name == null || this._name === '' ) {
            // this.$axios.get( 'http://120.78.73.154:8085/sys/user/info' ).then( ( res ) => {
            //     console.log( '用户信息:', res )
            //     // this.$store.state.user.name = 'admin'
            //     this.$store.commit( 'user/updateName', 'admin' )
            // } )
        }
    },

    computed: {
        _name () {
            return this.$store.state.user.name
        }
    },

    methods: {
        itemClick ( data, index ) {
            let method = data[ index ].method
            if ( this[ method ] ) {
                this[ method ]()
            }
        },
        sys () {
            this.$router.push( '/home' )
        }
    }
}
</script>

<style lang="less" scoped>
@import "~@less/element/checkbox";
@import "~@less/animation/translate.less";

.user-info {
    position: absolute;
    right: 12vw;
    top: 5.3vh;

    // width: 14.1vw;
    height: 2.2vw;
    background:linear-gradient(90deg,rgba(5, 212, 225, .5),rgba(51, 107, 234, 0));
    // border:1px solid rgba(0,255,252,1);
    box-shadow:0px 0px 73px 0px rgba(0,28,107,0.24);
    border-radius: 1.1vw;
    padding-right: 4vw;

    z-index: @zIndex-tool;

    .icon {
        position: absolute;
        top: 50%;
        left: .3vw;
        .setWH( 1.7vw );
        transform: translateY(-50%);
        .setBg();
        background-image: url("../map/images/user.png");
    }

    .txt {
        // width: 84%;
        // font-size: 2.6vh;
        font-size: 1.2vw;
        font-family:MicrosoftYaHei;
        font-weight: 400;
        color:rgba(209,224,255,1);
        text-align: center;
        line-height: 2.2vw;
        // margin: auto;
        // .setRelative();
        text-align: left;
        text-indent: 2.5vw;
        padding-left: .3vw;
        padding-right: .5vw;
        box-sizing: border-box;

        &::after {
            content: "";
            position: absolute;
            right: 1.5vw;
            top: 50%;
            width: .px2vw(13)[@result];
            height: .px2vh(8)[@result];
            transform: translateY(-50%);
            background-image: url('../map/images/drop_down.png');
            .setBg();
        }
    }
}
.more-item{
    width:100%;
    /deep/ li .inner{
        padding-left:1vw;
    }
}
</style>
