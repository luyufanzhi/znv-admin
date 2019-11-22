<template>
    <!-- 渔港概括 -->
    <div class="generalize">
        <wrap :list="list" v-model="activeName" >
            <div class="generalize-item" slot="generalize">
                <div class="top">
                    <div class="item">
                        <img src="../../images/water_area.png" alt="" class="icon">
                        <p class="detail znv-ellipsis">水域面积</p>
                        <p class="count znv-ellipsis">29万㎡</p>
                    </div>
                    <div class="item">
                        <img src="../../images/stacking area.png" alt="" class="icon">
                        <p class="detail znv-ellipsis">陆地域面积</p>
                        <p class="count znv-ellipsis">10万㎡</p>
                    </div>
                    <div class="item">
                        <img src="../../images/shoreline.png" alt="" class="icon">
                        <p class="detail znv-ellipsis">岸线长度</p>
                        <p class="count znv-ellipsis">2668m</p>
                    </div>
                </div>
                <div class="bottom">
                    <div class="item">
                        <img src="../../images/catches.png" alt="" class="icon">
                        <p class="detail znv-ellipsis">渔获量</p>
                        <p class="count znv-ellipsis">10万t/Y</p>
                    </div>
                    <div class="item">
                        <img src="../../images/registered.png" alt="" class="icon">
                        <p class="detail znv-ellipsis">登记在册渔船数</p>
                        <p class="count znv-ellipsis">61</p>
                    </div>
                    <div class="item">
                        <img src="../../images/management_personnel.png" alt="" class="icon">
                        <p class="detail znv-ellipsis">管理人员</p>
                        <p class="count znv-ellipsis">20</p>
                    </div>
                </div>
            </div>
        </wrap>
    </div>
</template>

<script>
import Wrap from '../wrap'

export default {
    name: 'generalize',
    components: {
        'wrap': Wrap
    },
    data () {
        return {
            list: [ {
                label: '渔港概况',
                name: 'generalize'
            } ],

            activeName: 'generalize'
        }
    },

    methods: {
        /**
         * tab 栏的点击事件
         * @param { Vue } vm 栏选项的实例, index, value
         */
        tabClick ( vm ) {
            console.log( 'vm:', vm )
        }
    }
}
</script>

<style lang="less" scoped>
.generalize {

    .top, .bottom {
        height: 50%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;

        .item {
            width: 33.3%;
            height: 100%;
            text-align: center;

            .icon {
                .setWH( 1.5vw, 2.66vh );
                margin-top: 2.13vh;
            }
            .detail {
                font-size: 1.42vh;
                line-height: 1.42vh;
                height: 1.42vh;
                margin-top: 1.06vh;
                color: #fff;
            }
            .count {
                font-size: 1.6vh;
                line-height: 1.6vh;
                color: #00F6FF;
                height: 1.6vh;
                margin-top: .7vh;
                margin-bottom: .89vh;
            }
        }
    }
}
</style>
