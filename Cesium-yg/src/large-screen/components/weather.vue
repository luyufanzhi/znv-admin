<template>
    <div class="weather">
        <div class="icon"></div>
        <div class="txt unselect">
            <p>{{temperature}}</p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'weather',

    data () {
        return {
            temperature: `27℃`,
            bg: '../map/images/weather.png'
        }
    },
}
</script>

<style lang="less" scoped>
.weather {
    position: absolute;
    right: 3.6vw;
    top: 5.3vh;

    width: 7.8vw;
    height: 2.2vw;
    background:rgba(7,32,69,0.5);
    border:1px solid rgba(0,255,252,1);
    border-radius: 1.1vw;
    z-index: @zIndex-tool;

    .icon {
        position: absolute;
        top: 50%;
        left: 1.1vw;
        .setWH( 2vw, 1.5vw );
        transform: translateY(-50%);
        .setBg();
        background-image: url("../map/images/weather.png");
    }

    .txt {
        // font-size: 2.3vh;
        font-size: 1.2vw;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color:rgba(255,255,255,1);
        text-align: center;
        height: 2.2vw;
        line-height: 2.2vw;
        text-indent: 2em;
    }
}
</style>
