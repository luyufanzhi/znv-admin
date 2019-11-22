<template>
    <div class="tip" v-show="count > 0" :style="{backgroundColor: bgColor}">
        <ul :class="[{'move1': count === 2, 'move2': count === 3}]">
            <li v-for="(item,idx) in messageList"
                :class="item.type ? 'fault' : 'time' "
                :key = idx
                @click="toDetail(idx)">{{ item.word }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'tip',
        props: {
            messageList: {
                type: Array,
                required: true
            },
            bgColor: {
                type: String,
                default: '#FCEBE8'
            }
        },
        methods: {
            toDetail(index) {
                this.$emit("toDetail", index)
            }
        },

        computed: {
            count() {
                return this.messageList.length
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .tip {
        width: 100%;
        height: 3.2rem;
        position: absolute;
        left: 0;
        top: 68px;
        z-index: 10;
        overflow: hidden;
        background-color: rgba(255, 255, 255, .6);
    }

    ul {
        width: 100%;
        height: 3.2rem;
    }

    li {
        height: 3.2rem;
        line-height: 3.2rem;
        padding-left: 3.8rem;
        background-repeat: no-repeat;
        -webkit-background-size: 2.4rem 2.4rem;
        background-size: 2.4rem 2.4rem;
        background-position: 1rem center;
        z-index: 50;
        font-size: 1.5rem;
    }

    .fault {
        background-image: url(./img/icon_fault.png);
        color: #f7381c;
    }

    .time {
        background-image: url(./img/icon_remind.png);
        color: #f58b23;
    }

    @keyframes move1 {
        0% {
            transform: translateY(3.2rem);
        }
        50% {
            transform: translateY(0rem);
        }
        100% {
            transform: translateY(-3.2rem);
        }
    }

    .move1 {
        animation: move1 5s cubic-bezier(0, 1, 0, 1) infinite;
    }

    @keyframes move2 {
        0% {
            transform: translateY(3.2rem);
        }
        33.3% {
            transform: translateY(0rem);
        }
        66.6% {
            transform: translateY(-3.2rem);
        }
        100% {
            transform: translateY(-6.4rem);
        }
    }

    .move2 {
        animation: move2 5s cubic-bezier(0, 1, 0, 1) infinite;
    }
</style>