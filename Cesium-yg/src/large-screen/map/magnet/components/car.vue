<template>
    <!-- 车辆统计 -->
    <div class="car" id="car">
        <wrap :list="list" v-model="activeName" >
            <div class="car-item" slot="car">
                <el-tabs v-model="active" type="card" @tab-click="changeMode" class="">
                    <el-tab-pane label="进出车辆统计" name="in-out" class="in-out">
                        <p class="tit znv-ellipsis">在场车辆总数&nbsp;<span class="count">125</span></p>
                        <div class="content">
                            <div class="content-item clearfix">
                                <div class="icon">
                                    <img src="../../images/car_in.gif" alt="">
                                </div>
                                <div class="detail">
                                    <p class="count">52</p>
                                    <div class="btn znv-ellipsis">驶进</div>
                                </div>
                            </div>
                            <div class="content-item clearfix item-second">
                                <div class="icon">
                                    <img src="../../images/car_out.gif" alt="">
                                </div>
                                <div class="detail">
                                    <p class="count c-r">55</p>
                                    <div class="btn znv-ellipsis">驶出</div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="停放事件统计" name="park" class="">
                        <p class="tit znv-ellipsis">在场车辆总数&nbsp;<span class="count">125</span></p>
                        <div class="content">
                            <div class="content-item clearfix">
                                <div class="icon">
                                    <img src="../../images/car_in.gif" alt="">
                                </div>
                                <div class="detail">
                                    <p class="count">52</p>
                                    <div class="btn znv-ellipsis">驶进</div>
                                </div>
                            </div>
                            <div class="content-item clearfix item-second">
                                <div class="icon">
                                    <img src="../../images/car_out.gif" alt="">
                                </div>
                                <div class="detail">
                                    <p class="count c-r">55</p>
                                    <div class="btn znv-ellipsis">驶出</div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </wrap>
    </div>
</template>

<script>
import Wrap from '../wrap'

// 组件

export default {
    name: 'car',
    components: {
        'wrap': Wrap,
    },
    data () {
        return {
            list: [ {
                label: '车辆统计',
                name: 'car'
            } ],

            activeName: 'car',

            active: 'in-out'
        }
    },

    methods: {
        /**
         * tab 栏的点击事件
         * @param { Vue } vm 栏选项的实例, index, value
         */
        tabClick ( vm ) {
            console.log( 'vm:', vm )
        },

        btnClick () {

        },

        // 改变统计方式
        changeMode ( vm ) {

        }
    }
}
</script>

<style lang="less" scoped>
#car .car-item {
    .tit {
        font-size: 1.4vh;
        line-height: 2vh;
        height: 1.9vh;
        padding-left: .9vw;
        .count {
            font-size: 1.9vh;
            line-height: 1.9vh;
            color: #00F9FD;
        }
    }

    .in-out {
        // .setFlex();
        display: flex;
        flex-direction: column;
    }

    .content {
        flex: 1;
        height: auto;

        .content-item.item-second .icon img {
            // padding-left: 0;
            margin-left: 0;
        }

        .content-item {
            width: 50%;
            height: auto;
            padding-top: 1vh;
            display: flex;
            flex-direction: row;
            float: left;

            .count {
                color: #34CC7C;
                font-size: 4.44vh;
                font-weight: bold;
                // margin-left: 1.5vw;
                text-align: center;
                margin-top: .2vw;
            }
            .count.c-r {
                color: #FFAB1A;
            }
            .btn {
                background:rgba(67,113,247,1);
                border-radius:3px;
                width: 3.1vw;
                height: 3.73vh;
                color: #fff;
                font-size: 1.6vh;
                line-height: 3.73vh;
                text-align: center;
                margin: auto;
                cursor: pointer;
            }

            .icon img{
                width: 3.4vw * .9;
                height: 14.2vh * .9;
                margin-left: 1vw;
                float: left;
            }

            .icon, .detail {
                // display: inline-block;
                float: left;
            }

            .detail {
                flex: 1;
                // padding-left: 1vw;
            }
        }
    }

    @import "~@less/tab/car-tab.less";
}
</style>
