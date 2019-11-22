<template>
    <div class="count clearfix">
        <div :class="[ 'num', {
            nor: num[ 0 ] === -1
        } ]">{{ num[ 0 ] | count }}</div>
        <div :class="[ 'num', {
            nor: num[ 1 ] === -1
        } ]">{{ num[ 1 ] | count }}</div>
        <div :class="[ 'num', {
            nor: num[ 2 ] === -1
        } ]">{{ num[ 2 ] | count }}</div>
        <div :class="[ 'num', {
            nor: num[ 3 ] === -1
        } ]">{{ num[ 3 ] | count }}</div>
    </div>
</template>

<script>
export default {
    name: 'count',
    props: [ 'value' ],
    data () {
        return {
            num: [ -1, -1, -1, -1 ],
            len: 0,
        }
    },

    created () {
        this.init()
    },

    methods: {
        init () {
            let num = this.value.toFixed( 0 ), i = 0
            this.len = num.length
            // let a =
            for ( ; i < this.len; i++ ) {
                this.num[ 4 - 1 - i ] = num[ i ]
            }

        }
    },

    watch: {
        len ( value ) {
            if ( value < 4 ) {
                let i = 0, len = 4 - value
                for ( ; i < len; i++ ) {
                    this.num[ i ] = -1
                }
            }
            // switch ( value ) {
            //     case 0:
            //         this.num[ 0 ] = -1
            //         break;
            //     case 1:
            //         this.a = -1
            //         this.b = -1
            //         this.c = -1
            //         break;
            //     case 2:
            //         this.a = -1
            //         this.b = -1

            //         break;
            //     case 3:
            //         this.a = -1

            //         break;

            //     default:
            //         break;
            // }
        },

        num () {
            this.init()
        }
    },

    filters: {
        count ( value ) {
            return value === -1 ? 0 : value
        },
    }
}
</script>

<style lang="less" scoped>
.count {
    .num {
        width: 1.3vw;
        height: 3.55vh;
        line-height: 3.55vh;
        float: left;
        margin-right: .05vw;
        .setBg();
        background-image: url("./images/digital_bg.png");
        background-size: 100% 100%;
        text-align: center;
        font-size: 2.84vh;
        font-weight: 700;
    }

    .num.nor {
        color: #0F3557;
    }
}
</style>
