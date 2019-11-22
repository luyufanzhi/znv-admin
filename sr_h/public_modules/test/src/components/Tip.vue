<template>
    <div>

        <SinglePicker ref="singlePicker"
            v-show="isShow.isSingleChooseShow"
            :title="'电机档位'"
            :values="singleData"
            :defaultValue="singleDefault"
            :area="step"
            :unit="unit"
            @cancel="isShow.isSingleChooseShow = false"
            @submit="SinglePickerSubmit"
            ></SinglePicker>

        <ConfirmBox
            v-show="isShow.isConfirmBoxShow"
            :cancelWord="'delete black'"
            :submitWord="'add red'"
            @cancel="isShow.isConfirmBoxShow = false"
            @submit="isShow.isConfirmBoxShow = false">

            这是一个寂寞的天
            <div slot="btn" class="btn" :style="{ width: '100%' }" @click.stop.prevent="$emit( 'submit' )">
                我知道了
            </div>
        </ConfirmBox>

        <AppointPicker ref="apt"
            v-show="isShow.isAppointPickerShow"
            :title="'预约完成时间'"
            :unit="'month stalls'"
            :area="step"
            @changeValues="changeValues"
            @cancel="isShow.isAppointPickerShow = false"
            @submit="isShow.isAppointPickerShow = false"></AppointPicker>

        <WarnBox
            v-show="isShow.isWarnBoxShow"
            :word="'我知道了'"
            @cancel="isShow.isWarnBoxShow = false"
            @submit="isShow.isWarnBoxShow = false">

            这是一个寂寞的天, 下着有些伤心的雨.
        </WarnBox>
    </div>
</template>

<script>

import Vue from 'vue'
import mixins from '../common/mixins.js'

// dictionary
import {

} from '../dictionary/dictionary.js'

import { completeIcon } from '../dictionary/imgSrc.js'

import $time from '../assets/time.js'

// 组件
import SinglePicker from 'SinglePicker'
import ConfirmBox from 'ConfirmBox'
import AppointPicker from 'AppointPicker.V2'
import WarnBox from 'WarnBox'

export default {
    name: 'Tip',
    props: [ 'isShow' ],
    mixins: [ mixins ],
    components: {
        SinglePicker,
        ConfirmBox,
        AppointPicker,
        WarnBox,
    },

    data() {
        return {
            values: [
                1, 2, 3, 3, 3, 5
            ],

            values: undefined,

            singleData: undefined,
            step: [ 10, 100 ],
            singleDefault: 15,
            unit: 'stalls',
        }
    },

    mounted() {
        let apt;
        if ( apt = this.$refs.apt ) {
            this.values = apt.values;
        }
    },

    computed: {

    },

    methods: {

        SinglePickerSubmit( val ) {
            // this.isShow.isSingleChooseShow = false;
            console.log( 'SinglePickerSubmit:', val );

            // this.$set( this, 'singleData', null )
            this.isShow.isSingleChooseShow = false;
            // this.step[ 1 ] = 50;
            // this.$set( this.step, 1, 50 );
            // this.$set( this.step, 2, 10 );
            // this.singleDefault = 20;
            this.unit = 'year';
            this.singleDefault = 13;
            // this.$refs.singlePicker.changeValues( [ 3, 4, 5 ] );
            // this.$set( this, 'step', [ 1, 10, 1 ] )
        },

        changeValues( val ) {
            console.log('aptValues:', val);
        }
    },

    // watch: {
    //     values( val ) {
    //         console.log('aptValue:', val);
    //     },
    // },
}
</script>