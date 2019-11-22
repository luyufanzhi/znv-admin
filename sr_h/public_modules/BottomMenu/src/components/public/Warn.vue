<template>
    <div id="warn">
        <div class="container">
            <div class="icon" v-if="src"><img :src="src" alt="warn imgUrl error"></div>
            <div class="title">
                <slot>{{title}}{{name}}</slot>
            </div>
            <div class="buttons">
                <div class="submit" @click="submit">我知道了</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'warn',
    props: ['src', "name", 'title'],
    data() {
        return {
        }
    },
    methods: {
        submit() {
            this.$emit("submit")
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#warn {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .3);
    z-index: 100;
}

#warn .container {
    padding: 2.4rem 1.6rem 1.6rem;
    z-index: 1000;
    position: fixed;
    text-align: left;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    background: #f6f6f6;
    min-height: 5rem;
    border-radius: 1.5rem;
    -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, .05), 0 -2px 8px rgba(0, 0, 0, .05);
    box-shadow: 0 2px 8px rgba(0, 0, 0, .05), 0 -2px 8px rgba(0, 0, 0, .05);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-animation: actionsheet 400ms ease-in-out 0ms;
    animation: actionsheet 400ms ease-in-out 0ms;
}

#warn .container .title {
    font-size: 1.5rem;
    margin-bottom: 4rem;
    text-align: center;
}

#warn .container .icon {
    margin: 4rem auto 1.6rem;
    text-align: center;
}

#warn .container .icon img {
    width: 4rem;
    height: 4rem;
}

#warn .container .buttons div {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    border-radius: 4rem;
    box-sizing: border-box;
    font-size: 1.5rem;
    font-weight: 600;
    height: 4rem;
    line-height: 4rem;
    display: inline-block;
    vertical-align: top;
    color: #007dff;
    box-shadow: 0 0 1px #b8bbbf;
    outline: 0;
    overflow: hidden;
    position: relative;
    text-align: center;
}


@keyframes actionsheet {
    0% {
        bottom: -100%;
    }
    to {
        bottom: 1rem;
    }
}
</style>