<template>
    <div class="colum-tab">
        <div class="tab-list">

            <!-- tab 栏 -->
            <div :class="[ 'list-item', {
                active: active === index
            } ]"
                v-for="( item, index ) in data" :key="index"
                @click="itemClick( index )">

                <p class="txt">{{ item.name }}</p>
            </div>
        </div>

        <!-- 内容区域 -->
        <div class="content"
            v-for="( item, index ) in data" :key="index"
            v-show="active === index">

            <slot :name="`slot-${index}`"
                :class="[ 'slot', `slot-${index}`, item.class | '' ]"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'colum-tab',
    props: [ 'data', 'active' ],
    model: {
        prop: 'active',
        event: 'changeIndex'
    },

    data () {
        return {
            activeIndex: 0, // 当前激活索引
        }
    },

    created () {
    },

    watch: {

    },

    methods: {
        itemClick ( index ) {
            this.activeIndex = index
            // this.$emit( 'tab-click', index )
            this.$emit( 'changeIndex', index )
        },
    },
}
</script>

<style lang="less" scoped>
.colum-tab {
    .setWH( 22.4vw, 86.32vh );
    background-color: red;
    position: absolute;
    right: .9vw;
    bottom: 1.24vh;
    background:rgba(7,32,69,1);
    border:1px solid rgba(47,184,253,1);
    box-shadow:0px 0px 17px 0px rgba(0,174,253,0.31);
    border-radius:3px;
    padding: @grap-15vh @grap-16vw;

    .tab-list {
        position: absolute;
        left: -2.1vw;
        top: 1.6vh;
        width: 2.1vw;
        // height: 10vh;
        // background-color: black;
        overflow: hidden;

        .list-item {
            width: 100%;
            transform: skew( 0, 45deg );
            background-color: green;
            writing-mode: vertical-lr;
            padding-top: 3vh;
            padding-bottom: 3vh;
            text-align: center;
            vertical-align: middle;
            margin-bottom: .5vh;
            transform-origin: right bottom;
            background: rgba( 0, 84, 169, 0.7 );
            color: #C2E2FF;
            cursor: pointer;

            .txt {
                transform: skew( 0, -45deg );
                width: 100%;
                line-height: 2.1vw;
                font-size: .px2vw( 20 )[@result];
            }
        }

        .list-item:nth-child(1) {
            text-indent: 1.5vh;
        }

        .list-item.active {
            background: linear-gradient(180deg,rgba(107,187,255,1),rgba(0,138,255,1),rgba(0,95,176,1));
            color: #C2E2FF;
        }
    }

    .setScroll( content );
    .content {
        .setWH();
        overflow-y: auto;
    }
}
</style>
