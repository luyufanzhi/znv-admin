<template>
    <div class="znv-test">
        <div class="wrap">
            <!-- 二级页面 -->
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
export default {
    name: 'znv-test'
}
</script>

<style lang="less" scoped>
.znv-test {
    .setWH();
    padding: 130px 100px 20px;
    position: absolute;
    left: 0;
    top: 0;

    .wrap {
        // border: 1px solid #000;
        box-sizing: border-box;
        .setWH();
    }
}
</style>
