<template>
    <AppointPicker
            :valuesRight="null"
            :valuesLeft="values == null ? data : values"
            :defaultValues="[ defaultValue ]"
            :submitWord="submitWord"
            :cancelWord="cancelWord"
            :apre="msg"
            :unit="unit"
            :title="title"
            @cancel="$emit( 'cancel' )"
            @submit="val => this.$emit( 'submit', val )"></AppointPicker>
</template>

<script>

import Vue from 'vue'
import AppointPicker from 'AppointPicker.V2'

export default {
    name: 'SinglePicker',
    props: [ 'values', 'defaultValue', 'apre', 'unit', 'title', 'area', 'submitWord', 'cancelWord' ],
    components: {
        AppointPicker,
    },

    data() {
        return {
            data: [],
        };
    },

    created() {
        this.changeData( this.area );
    },

    computed: {

        // 副标题
        msg() {
            if ( null == this.apre ) {
                return null;
            }
            return this.apre;
        },
    },

    methods: {

        /**
         * 修改步长
         * @param { Array( length === 2|3 ) } val 父组件传递进来的 area 值, [ 开始值, 结束值, 步长值( 缺省为 1 ) ]
         */
        changeData( val ) {
             if ( this.values == null && Array.isArray( val ) && val.length >= 2 ) {
                let step = val[ 2 ] || 1, i = 0;
                let start = Number.parseFloat( val[ 0 ] ), end = Number.parseFloat( val[ 1 ] );

                this.deleteParam( 'data' );

                while ( start <= end ) {
                    this.$set( this.data, i++, start );
                    start += step;
                }
            }
        },

        /**
         * 根据数组改变现有 picker 中的数组
         * @param { Array } array 期望的数组
         */
        changeValues( array ) {
            if ( Object.prototype.toString.call( array ) !== '[object Array' || this.values == null ) return;

            this.deleteParam( 'values' );
            array.forEach( ( el, index ) => {
                this.$set( this.values, index, el );
            } );
        },

        /**
         * 删除数组所有元素
         * @param { String } key this.data | this.values 数组
         */
        deleteParam( key ) {
            this[ key ].forEach( ( el, index ) => {
                Vue.delete( this[ key ], index );
            } );
            this[ key ].length = 0;
        },
    },

    watch: {
        area: {
            deep: true,
            handler( val ) {
                this.changeData( val );
            }
        }
    }
}
</script>
