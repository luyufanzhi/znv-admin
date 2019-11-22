<template>
    <div class="params">
        <p>xxx</p>
        <router-view class="content"
                :status="status"
                :recipes="recipes"
                :temperature="temperature"
                :stirSwitch="stirSwitch"
                :preheatSwitch="preheatSwitch"
                :workTime="workTime"
                :leftTime="leftTime"
                :preTimeHour="preTimeHour"
                :preTimeMin="preTimeMin"
                :code="code"></router-view>
    </div>
</template>

<script>

import mixins from '@/mixins';
import props from '@/mixins/props.js';

export default {
    name: 'params',
    mixins: [ mixins ],
    props,
    components: {
    }
};
</script>

<style lang="less" scoped>
@import url("../../../../../static/css/mixins.less");

.params {
    flex: 1;
}

</style>
