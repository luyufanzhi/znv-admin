<template>
    <div class="ship-event" v-show="tipShip === 'event'">
        <tip :title="title" @enter="enter" @close="close">
            <div class="row">
                <label>事件名称</label>
                <span>：</span>
                <div class="txt event-name">
                    <search class="select"
                        :data="selectOpt"
                        :model="selectModel"
                        @handleSelectChange="selectChange"></search>
                </div>
            </div>
            <div class="row">
                <label>经纬度</label>
                <span>：</span>
                <div class="txt loc">N1923E11052</div>
            </div>
            <div class="row">
                <label>事件类型</label>
                <span>：</span>
                <div class="txt type clearfix">
                    <div class="icon red" @click="flagClick( 0 )"></div>
                    <div class="icon yellow" @click="flagClick( 1 )"></div>
                    <div class="icon blue" @click="flagClick( 2 )"></div>
                    <div class="icon green" @click="flagClick( 3 )"></div>
                </div>
            </div>
            <div class="row">
                <label>备注</label>
                <span>：</span>
                <div class="txt detail">
                    <search class="select"
                        :data="selectOpt2"
                        :model="selectModel2"
                        @handleSelectChange="selectChange2"></search>
                </div>
            </div>
        </tip>
    </div>
</template>

<script>
import Wrap from './wrap'
import tip from 'common/mixins/tip'
import Search from 'search'

export default {
    name: 'ship-event',
    mixins: [ tip ],
    components: {
        tip: Wrap,
        search: Search,
    },
    data () {
        return {
            title: '事件标注',

            selectOpt: [ {
                name: 'txt',
                type: 'text',
                placeholder: '事件名称'
            } ],
            selectModel: {
                txt: 'wg'
            },
            selectOpt2: [ {
                name: 'textarea',
                type: 'textarea',
                placeholder: '请输入备注'
            } ],
            selectModel2: {
                textarea: 'wg'
            }
        }
    },

    computed: {
    },

    watch: {
    },

    methods: {
        enter () {
            // this.uTipShip( '' )
        },

        close () {
            // this.uTipShip( '' )
        },

        selectChange ( value ) {

        },
        selectChange2 ( value ) {

        },

        // 点击旗子
        flagClick ( index ) {

        }
    }
}
</script>

<style lang="less" scoped>
.ship-event {
    .row {
        // text-align: left;
        font-size: .px2vh( 16 )[ @result ];
        // padding: @grap-16vh 0;
        margin-bottom: .px2vh( 14 )[ @result ];
        padding-left: .px2vh( 26 )[ @result ];

        label {
            display: inline-block;
            color: #72B2FF;
            float: left;
            // padding-right: 5px;
            // text-align: right;
            width: .px2vw( 80 )[ @result ];
            text-align: justify;
            text-align-last: justify;
        }
        span {
            float: left;
        }
        .txt {
            color: #fff;
            margin-left: .px2vw( 120 )[ @result ];
            text-align: left;
            height: .px2vh( 35 )[ @result ];
        }

        /deep/ .el-button.btn_search {
            display: none;
        }

        .select {
            display: inline-block;
        }

        .event-name, .detail, .type {
            height: auto;
        }

        .type {
            .icon {
                float: left;
                .setBg();
                height: .px2vw( 32 )[ @result ];
                width: .px2vh( 16 )[ @result ];
                margin-right: .px2vw( 40 )[ @result ];

                &.red {
                    background-image: url("../../map/images/flag_red.png");
                }
                &.yellow {
                    background-image: url("../../map/images/flag_yellow.png");
                }
                &.blue {
                    background-image: url("../../map/images/flag_blue.png");
                }
                &.green {
                    background-image: url("../../map/images/flag_green.png");
                }
            }
        }
    }
}
</style>
