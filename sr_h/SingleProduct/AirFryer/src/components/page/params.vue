<template>
    <div class="params">

        <!-- 温度 -->
        <p class="tit">{{ paramsMsg[ 0 ] }}</p>
        <mt-range class="range"
            v-model="data.temperature"
            :min="data.minte"
            :max="data.maxte"
            :step="data.stepte"
            :bar-height="5">

            <div slot="start" class="left">{{ data.minte }}</div>
            <div slot="end" class="right">{{ data.maxte }}</div>
        </mt-range>

        <!-- 时长设定 -->
        <p class="tit clearfix">
            <span class="left fl">{{ paramsMsg[ 1 ][ 0 ] }}</span>
            <span class="right fr">{{ msg }}</span>
        </p>
        <mt-picker ref="picker"
            :slots="slots"
            :visibleItemCount="3"
            @change="pickerChange"></mt-picker>

        <!-- 搅拌开关 -->
        <CellBox
            :title="paramsMsg[ 2 ]"
            :switchValue.sync="data.stirSwitch">
        </CellBox>

        <!-- 预热开关 -->
        <CellBox
            :title="paramsMsg[ 3 ]"
            :switchValue.sync="data.preheatSwitch">
        </CellBox>

    </div>
</template>

<script>

import mixins from '@/mixins';
import props from '@/mixins/props.js';
import { paramsMsg } from '@/dictionary';
import recipes from '@/dictionary/recipes.js';
import $time from '@/asset/$time.js';
import { PARAMS, PARAMSID, SETITEM } from '@/dictionary/constant.js';
import Bus from '@/common/bus.js';

import common from '@/common/common.js';
import { SPACE_RGE } from '@/common/common.js';

// 组件
import { Range } from 'mint-ui';
import { Picker } from 'mint-ui';
import CellBox from 'CellBox';

import 'mint-ui/lib/range/style.css';
import 'mint-ui/lib/picker/style.css';

let config = 'minte maxte stepte minti maxti stepti'.split( SPACE_RGE );
let params = 'workTime temperature stirSwitch preheatSwitch'.split( SPACE_RGE );

export default {
    name: 'params',
    mixins: [ mixins ],
    props,
    components: {
        [ Range.name ]: Range,
        [ Picker.name ]: Picker,
        CellBox
    },

    data () {
        return {
            paramsMsg,
            label: null,
            slots: [
                {
                    flex: 1,
                    values: [ ],
                    className: 'slot1',
                    textAlign: 'center',
                    defaultIndex: 1
                }
            ],

            // workTime temperature stirSwitch preheatSwitch
            data: {

                // cell
                stirSwitch: false,
                preheatSwitch: false,

                // range
                temperature: undefined,
                minte: undefined,
                maxte: undefined,
                stepte: undefined,

                // picker
                workTime: 0,
                minti: undefined,
                maxti: undefined,
                stepti: undefined
            }
        };
    },

    created () {
        this.initData();

        // 根据参数初始化时间选择器
        let i = this.data.minti, key = 0;
        let target = this.slots[ 0 ];
        for ( ; i <= this.data.maxti; i += this.data.stepti ) {
            this.$set( target.values, key++, i );
        }

        // 设置 picker 默认值
        let index = target.values.indexOf( this.data.workTime );
        target.defaultIndex = index === -1 ? 1 : index;

        // 注册事件
        Bus.$on( SETITEM, () => {
            common.setItem( PARAMS, this.data );
            common.setItem( PARAMSID, this.curRecipes );
        } );
    },

    mounted () {
        this.$nextTick( () => {

            // 跟新 range 的提示
            this.label = document.createElement( 'span' );
            this.label.classList.add( 'label' );
            this.label.innerHTML = this.data.temperature;
            this.$el.querySelector( '.mt-range-thumb' ).appendChild( this.label );
        } );
    },

    computed: {

        /**
         * 时长设定右边的提示
         */
        msg () {
            let m = $time.getNow().getMinutes() + this.data.workTime;
            let h = $time.getNow().getHours();

            m = m >= 60 ?
                ( h += Math.floor( m / 60 ), m % 60 ) :
                m;

            return this.paramsMsg[ 1 ][ 1 ]
                .replace( /{{hours}}/, $time.toString( h ) )
                .replace(
                    /{{minutes}}/,
                    $time.toString( $time.toString( m ) )
                );
        },

        /**'
         * 是否获取缓存
         */
        isCache () {
            let oldIndex = common.getItem( PARAMSID );
            return oldIndex === this.curRecipes && ( this.status === 0 || this.curRecipes === 0 );
        }
    },

    methods: {

        /**
         * 给 data 赋值
         * @param { Number } 菜谱的id
         * @param { Object } 目标对象
         */
        // workTime temperature stirSwitch preheatSwitch
        // minte maxte stepte minti maxti stepti
        setObj ( id, target ) {

            // 获取需要下发的属性
            params.forEach( key => this.data[ key ] = target[ key ] );

            // 获取设置参数
            config.forEach( key => this.data[ key ] = +recipes[ id ][ key ] );
        },

        /**
         * picker change 事件
         */
        pickerChange ( val ) {
            this.data.workTime = val.values[ 0 ];
        },

        /**
         * 跟新 data 数据
         * 在初始化的时候调用
         */
        initData () {

            // 如果是重复点击
            if ( this.isCache ) {
                return Object.assign( this.data, common.getItem( PARAMS ) );
            }

            if ( this.curRecipes !== 0 ) {      // 不是 diy 模式
                if ( this.status === 0 ) {      // 待机
                    this.setObj( this.curRecipes, recipes[ +this.curRecipes ] );
                } else if ( this.isWork || this.status === 2 ) {     // 工作的时候 | 工作完成的时候
                    this.setObj( this.recipes, this );
                }
            } else {                            // DIY 模式下直接使用默认 diy 参数
                this.setObj( 0, recipes[ 0 ] );
            }
        }
    },

    watch: {
        'data.temperature' ( val ) {
            if ( this.label != null ) {

                // 设置 range 正上方的 value 值
                this.label.innerHTML = val;
            }
        }
    }
};
</script>

<style lang="less">
@import url("../../../../../static/css/mixins.less");
@import url("../../../../../static/css/colors.less");

.params {
    flex: 1;

    .tit {
        box-sizing: border-box;
        font-size: 1.6rem;
        // text-indent: 2em;
        padding: 2rem;
    }

    .tit.clearfix {
        // text-indent: 0;
    }

    /* 温度设定 */
    .range {
        // width: 80%;
        margin: auto;

        .left,
        .right {
            color: @color;
            padding: 0 1rem;
        }
    }

    /* 时长设定 */
    @import url("../../../../../static/css/module/AppointPicker.V2/style.less");
}

.mt-range-thumb {
    position: relative;
    text-align: center;

    .label {
        color: @color;
        .setPosition();
        left: 50%;
        transform: translateY(-100%) translateX(-50%);
    }
}

</style>
