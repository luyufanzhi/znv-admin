<template>
    <div>
        <Header
            :title="'修改背景颜色'"
            :isSecondary="true"
            @leftClick="$router.go( -1 )">

            <!-- <span slot="left">返回</span>
            <span slot="right">确定</span> -->
        </Header>
        <!-- <mt-header class="header" fixed
            title="标题过长会隐藏后面的内容啊哈哈哈哈"
            :style="{ backgroundColor: bgc || 'black' }">

            <div slot="left"><</div>
            <div slot="right">...</div>
        </mt-header> -->
    </div>
</template>

<script>

import { Button } from 'mint-ui';
import 'mint-ui/lib/header/style.css'
import 'mint-ui/lib/button/style.css'

import Header from 'Header.vue'

export default {
    name: 'page',
    props: [ 'bgc' ],
    components: {
        [ Button.name ]: Button,
        Header,
    },
}
</script>

<style lang="less">

</style>

