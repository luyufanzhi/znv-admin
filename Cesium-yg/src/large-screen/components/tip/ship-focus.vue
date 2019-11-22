<template>
    <div class="ship-focus" v-show="tipShip === 'focus'">
        <tip :title="title" @enter="enter" @close="close">
            <div class="row">
                <label>渔船名称:&nbsp;&nbsp;&nbsp;</label>
                <span class="txt name">{{ tipShipFocusOpt.name }}</span>
            </div>
            <div class="row">
                <label>渔船编号:&nbsp;&nbsp;&nbsp;</label>
                <span class="txt No">{{ tipShipFocusOpt.No }}</span>
            </div>
            <div class="row">
                <label>关注类型:&nbsp;&nbsp;&nbsp;</label>
                <search class="select"
                    :data="selectOpt"
                    :model="selectModel"
                    @handleSelectChange="selectChange"></search>
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
            title: '重点关注渔船',

            selectOpt: [ {
                name: 'wg',
                type: 'select',
                // placeholder: '渔船编号/船长名',
                options: [ {
                        value: 'wg',
                        label: '违规'
                }, {
                        value: 'wg2',
                        label: '违规2'
                } ]
            } ],
            // selectModel: {
            //     wg: 'wg'
            // }
        }
    },

    computed: {
        selectModel: {
            get () {
                return { wg: this.tipShipFocusOpt.type }
            }
        },
    },

    watch: {
        // 'tipShipFocusOpt.type' ( type ) {
        //     console.log( 'changeOpt', type )
        //     this.selectOpt.wg = type
        // }
    },

    methods: {
        enter () {
            this.$router.push( { name: 'track' } )
        },

        close () {
            // this.uTipShip( '' )
        },

        selectChange ( value ) {

        }
    }
}
</script>

<style lang="less" scoped>
.ship-focus {
    .row {
        text-align: left;
        font-size: .px2vh( 16 )[ @result ];
        // padding: @grap-16vh 0;
        margin-bottom: .px2vh( 14 )[ @result ];
        padding-left: .px2vh( 26 )[ @result ];

        label {
            color: #72B2FF;
        }

        .txt {
            color: #fff;
        }

        /deep/ .el-button.btn_search {
            display: none;
        }

        .select {
            display: inline-block;
        }
    }
}
</style>
