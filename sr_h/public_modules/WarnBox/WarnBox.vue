<template>
    <ConfirmBox ref="confirmBox">
        <div class="icon" v-if="src"><img class="icon-img" :src="src" alt="warn imgUrl error"></div>
        <span><slot></slot></span>
        <div slot="btn" class="btn btn-width btn-mask" :style="{ color: submitC }" @click.stop.prevent="$emit( 'submit' )">
            {{ word | wordFilter( 2 ) }}
        </div>
    </ConfirmBox>
</template>
<script>

import ConfirmBox from 'ConfirmBox'

export default {
    name: 'warnBox',
    props: [ 'src', 'title', 'word' ],
    components: {
        ConfirmBox,
    },

    data() {
        return {
            isMask: false,
        }
    },

    computed: {
        submitC( val ) {
            return ConfirmBox.methods.colorFilter( this.word );
        },
    },

    mounted() {
        document.querySelectorAll( '.btn' ).forEach( el => el.addEventListener( 'touchstart', function () { } ) );  // 解决 ios active 伪类无效的问题;
    },

    methods: {
        submit() {
            this.$emit("submit")
        }
    },

    filters: {
        wordFilter: ConfirmBox.filters.wordFilter,
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url("../../static/css/mixins.less");
@import url("../../static/css/module/WarnBox/style.less");

.btn.btn-width {
    width: 100%;
}

</style>