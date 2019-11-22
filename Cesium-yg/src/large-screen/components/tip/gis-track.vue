<template>
    <div class="track-tip" v-show="tipShip === 'track'">
        <tip :title="title" @enter="enter" @close="close">
            <div class="row important">
                <label>开始时间</label>
                <span>：</span>
                <div class="txt event-name">
                    <el-date-picker type="datetime" placeholder="选择日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        ></el-date-picker>
                </div>
            </div>
            <div class="row important">
                <label>结束时间</label>
                <span>：</span>
                <div class="txt event-name">
                    <el-date-picker type="datetime" placeholder="选择日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        ></el-date-picker>
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
    name: 'track-tip',
    mixins: [ tip ],
    props: [ 'title' ],
    components: {
        tip: Wrap,
        search: Search
    },
    data () {
        return {
            selectOpt: [ {
                name: 'txt',
                type: 'text',
                placeholder: '事件名称'
            } ],
            selectModel: {
                txt: 'wg'
            },
        }
    },

    computed: {
    },

    watch: {
    },

    methods: {
        enter () {
            // this.uTipShip( '' )
            this.$router.push( { name: 'playback' } )
        },

        close () {
            // this.uTipShip( '' )
        },
    }
}
</script>

<style lang="less" scoped>
@import "~@less/element/date.less";
.track-tip {

    /deep/ .content {
        padding-left: .px2vw( 10 )[ @result ];
    }

    /deep/ .map-tip {
        left: -110%;
        top: 15%;
        // transform: none;
        transform: none;
    }

    .row {
        margin-bottom: @h20;
    }

    .row:last-child {
        margin-bottom: 0;
    }

    // text-align: left;
    font-size: .px2vh( 16 )[ @result ];
    // padding: @grap-16vh 0;
    // margin-bottom: @h30;
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
        font-size: .px2vh( 16 )[ @result ];
    }
    span {
        font-size: .px2vh( 16 )[ @result ];
        float: left;
    }
    .txt {
        color: #fff;
        margin-left: .px2vw( 100 )[ @result ];
        text-align: left;
        height: .px2vh( 35 )[ @result ];
    }

    /deep/ .el-button.btn_search {
        display: none;
    }
}
</style>
