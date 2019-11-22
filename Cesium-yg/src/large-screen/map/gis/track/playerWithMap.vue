<template>
    <div class="player-width-map">
        <div class="map">
            <znv-map :ctl="ctl"></znv-map>

            <znv-label v-for="( item, index ) in labels" :key="index"
                :point="item"
                :ctl="ctl"></znv-label>
        </div>

        <player class="player"
            :btns="btns"
            :ctl="ctl"
            :labels="labels"
            @play="play"
            @stop="stop"
            @pause="pause"
            @speed="speed"
            @back="back" ></player>
    </div>
</template>

<script>
import MapCtl from '@map/Model/Class/MapCtl'
import Player from './player'
import Map from '../../map'

import Label from './label'

export default {
    name: 'player-width-map',
    components: {
        player: Player,
        'znv-map': Map,
        'znv-label': Label
    },
    props: {
        btns: {
            type: String
        },
        subscribe: {
            type: String
        },
        ajax:{
            type: String
        },
        camera: {
            type: String
        },
        ctl: {
            type: MapCtl,
            default () {
                return new MapCtl( {
                    detail: 'Default Player\'s ctl.'
                } )
            }
        }
    },
    data () {
        return {
            labels: [],
        }
    },

    methods: {
        init () {

        },

        play () {},
        stop () {},
        pause () {},
        speed () {},
        back () {},
        complete () {},
        publish () {},
        setView () {},
    }
}
</script>

<style lang="less" scoped>
.player-width-map {
    .setFlex();
    flex-direction: column;
    .setWH();
    border-radius: 5px;
    background: rgba(7,32,69,1);
    border: 1px solid rgba(47,184,253,1);
    .shadow;
    z-index: @zIndex-view;

    /deep/ .gis-player {
        border-style: none;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-top: 1px solid rgba(47,184,253,1);
    }

    .map {
        flex: 1;
        width: 100%;
        .setRelative();
    }

    .player {
        width: 100%;
    }
}
</style>
