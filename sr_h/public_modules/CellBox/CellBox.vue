<template>
    <div>
        <mt-cell
            :title="title"
            :label="label"
            :icon="icon"
            :is-link="isLink"
            :value="value"
            :to="to">

            <slot>
                <mt-switch v-model="mtValue" v-if="switchValue != null"></mt-switch>
            </slot>

        </mt-cell>
    </div>
</template>

<script>

import { Cell } from 'mint-ui';
import { Switch } from 'mint-ui';
import 'mint-ui/lib/cell/style.css';
import 'mint-ui/lib/switch/style.css';

export default {
    name: 'cell-box',
    props: [ 'title', 'label', 'icon', 'value', 'to', 'is-link', 'switchValue' ],
    components: {
        [ Cell.name ]: Cell,
        [ Switch.name ]: Switch
    },

    data () {
        return {
            mtValue: false
        };
    },

    created () {
        this.mtValue = this.switchValue;
    },

    watch: {
        mtValue( val ) {
            this.$emit('update:switchValue', val)
        }
    }
}
</script>

<style lang="less">
@import url("../../static/css/mixins.less");

@bgc: #fcfcfc;
@height: 4.8rem;
@padding: 1.6rem;
@fz_l: 1.5rem;
@fz_r: 1.3rem;
@mr: 1.5rem;

.mint-cell-wrapper {
    padding: 0 @padding;
    background: @bgc;
    height: @height;

    .mint-cell-text {
        font-size: @fz_l;
    }
    .mint-cell-value {
        font-size: @fz_r;
    }
    .mint-cell-value.is-link {
        margin-right: @mr;
    }
}

.mint-cell-wrapper::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 @padding;
    z-index: 0;
    height: .5px;
    border-bottom: .5px solid rgba( 0, 0, 0, .1);
}

</style>
