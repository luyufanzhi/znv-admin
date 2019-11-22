<template>
    <div class="tit">
        <h1>{{tit}}</h1>
        <span></span>
    </div>
</template>

<script>
    export default {
        props:{
            tit:{
                type:String,
                default:'标题'
            }
        }
    }
</script>

<style scoped>
.tit{
    overflow: hidden;
}
.tit h1{
    color: #ffffff;
    font-size: 1.7vh;
    line-height: 3.1vh;
    padding:0 5px 0 15px;
    height: 3.1vh;
    background: linear-gradient(to bottom, #6bbbff 0%,#008aff 16%,#005fb0 100%);
    font-weight: normal;
    float: left;
    margin: 0;
}
.tit span{
    display: block;
    float: left;
    background: url(/static/img/report/tit_arrow.png) no-repeat left center;
    width: 21px;
    height: 3.1vh;
}
</style>