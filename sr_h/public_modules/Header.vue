<template>
    <div>
        <mt-header :class="[ 'header', { secondary: isSecondary } ]"
            :title="title"
            :style="{ backgroundColor: bgc || '#fcfcfc' }">

            <!-- <slot name="left" slot="left">
                <span slot="left"
                    :class="[ 'icon', { back: !isSecondary, close: isSecondary } ]"
                    @click.stop="leftClick"></span>
            </slot> -->
            <span slot="left" class="icon" @click.stop="$emit('leftClick')">
                <slot name="left">
                    <span :class="[ { back: !isSecondary, close: isSecondary } ]"></span>
                </slot>
            </span>
            <span slot="right" class="icon" @click.stop="$emit('rightClick')">
                <slot name="right">
                    <span slot="right" :class="[ { open: isSecondary } ]"></span>
                </slot>
            </span>
        </mt-header>
    </div>
</template>

<script>

import { Header } from 'mint-ui';
import { Button } from 'mint-ui';
import 'mint-ui/lib/header/style.css'
import 'mint-ui/lib/button/style.css'

export default {
    name: 'Header',
    props: [ 'bgc', 'title', 'isSecondary' ],
    components: {
        [ Header.name ]: Header,
        [ Button.name ]: Button,
    },
}
</script>

<style lang="less">
@import url("../static/css/mixins.less");
@import url("../static/css/base64/icon.less");

@icon_width: 1.8rem;

.header {
    color: black;
    height: 48px;
    border-bottom: 2px solid #e2e2e2;
    padding: 0;
    width: 100%;

    .mint-header-title {
        color: rgba( 0, 0, 0, 1 );
    }

    .icon span {
        display: inline-block;
        padding: 0 1.6rem;
        color: @color;
    }

    .mint-header-title {
        font-size: 1.8rem;
        margin: 0;
        text-align: left;
    }

    .mint-header-button.is-left {
        flex: inherit;
    }
}

.header.secondary {
    .mint-header-title {
        text-align: center;
    }
}

.close, .open, .back {
    .setWH(@icon_width, @icon_width);
    .setBgi();
}

.close {
    background-image: url(@close);
}
.open {
    background-image: url(@open);
}
.back {
    background-image: url(@back);
}

</style>
