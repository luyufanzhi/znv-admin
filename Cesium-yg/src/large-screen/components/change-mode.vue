<template>
    <div class="change-mode">
        <ul class="clearfix">
            <li :class="[ 'item', 'more' ]" @click="optionClick"></li>
            <li :class="[ 'item', 'change', {
                active: $route.name === 'map'
            } ]" @click="changeMode"></li>
        </ul>
    </div>
</template>

<script>
import mixins from 'common/mixins'

export default {
    name: 'change-mode',
    props: [ 'isActiveMore' ],
    mixins: [ mixins ],

    methods: {
        changeMode () {
            if ( this.$route.name === 'map' ) {
                this.$router.push( { name: 'gis' } )
            } else {
                this.$router.push( { name: 'map' } )
            }
        },
        optionClick () {
            // this.$router.push( '/home' )
        }
    }
}
</script>

<style lang="less" scoped>
@width: 2vw; // 显示大小
@grap: 1.1vw;
@left: 2vw;
.change-mode {
    position: absolute;
    left: @left;
    top: 5.3vh;
    .setWH( @width * 2 + @grap, @width );
    z-index: @zIndex-img;

    ul {
        .setWH();
        .setFlex();

        .item {
            .setWH( @width );
            .setBg();
        }
        .more {
            background-image: url("../map/images/menu-nor.png");
        }
        .more.active {
            background-image: url("../map/images/menu-pre.png");
        }

        .change {
            margin-left: @grap;
            background-image: url("../map/images/magnet_mode-nor.png");
        }
        .change:active {
            background-image: url("../map/images/magnet_mode-pre.png");
        }
        .change.active {
            background-image: url("../map/images/map_mode-nor.png");
        }
        .change.active:active {
            background-image: url("../map/images/map_mode-pre.png");
        }
    }
}
</style>
