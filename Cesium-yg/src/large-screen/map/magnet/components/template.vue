<template>
    <!-- 进出港统计 -->
    <div class="in-out">
        <wrap :list="list" v-model="activeName" >
            <div class="in-out-item" slot="in-out">
                xxx
            </div>
        </wrap>
    </div>
</template>

<script>
import Wrap from '../wrap'

export default {
    name: 'in-out',
    components: {
        'wrap': Wrap
    },
    data () {
        return {
            list: [ {
                label: '进出港统计',
                name: 'in-out'
            } ],

            activeName: 'in-out'
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
.in-out {
}
</style>
