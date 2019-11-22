<template>
    <recipes class="collection"
        :status="status"
        :recipes="recipes"
        :temperature="temperature"
        :stirSwitch="stirSwitch"
        :preheatSwitch="preheatSwitch"
        :workTime="workTime"
        :leftTime="leftTime"
        :preTimeHour="preTimeHour"
        :preTimeMin="preTimeMin"
        :code="code"></recipes>
</template>

<script>

import mixins from '@/mixins';
import props from '@/mixins/props.js';

/* 组件 */
import recipes from '@/components/page/recipes.vue';

export default {
    name: 'collection',
    mixins: [ mixins ],
    props,
    components: {
        recipes
    }
};
</script>

<style lang="less" scoped>
@import url("../../../../../static/css/mixins.less");

.collection {
    flex: 1;
}

</style>
