<template>
    <con :m=params.m>
        <template v-if="params.type===1">
           <template v-if="(params.data instanceof Array)">
                <div v-for="(right,rightIndex) in params.data" :key="rightIndex" class="mt10">
                    <txt s='18'  >{{right.text}}</txt>
                    <txt class="fb" :class="[{red: rightIndex==0},{green: rightIndex==1}]" s=36 m="0 0 0 10">{{right.minNo}}</txt>
                    <txt class="fb"  s="36">/{{right.maxNo}}</txt>
                </div>
            </template>
            <template v-else> 
                <txt s=36 class="por" lh=130 m="0 30 0 0">{{params.data}}</txt>
            </template>
        </template>

        <template v-else-if="params.type===2">
            <div class="echartPie ilm" ref="echartPie"></div>
            <txt class="ilm fb" s=24 m="0 33 0 -5">{{params.percent*100+'%'}}</txt>
        </template>

        <template v-else-if="params.type===3">
            <img-icon :type='params.icon.type' 
                :w="params.icon.w" 
                :h="params.icon.h" 
                :m="params.icon.m" 
                class="pol"></img-icon>
            <div v-for="(right,rightIndex) in params.data" :key="rightIndex">
                <txt s='18' m="0 0 0 180" :w=140>{{right.text}}</txt>
                <txt class="fb" s="24">{{right.number}}</txt>
            </div>
        </template>

        <template v-else>
            <con class="pr ilm" :w=params.icon.w :h=130>
                <img-icon v-if="params.icon"  :type='params.icon.type' 
                    :w="params.icon.w" 
                    :h="params.icon.h" 
                    class="por abs"></img-icon>
            </con>
            
            <txt s=18 p="0 0 0 20" v-if="params.text">{{params.text}}</txt>
        </template>
    </con>
</template>

<script>
import echarts from 'echarts'
import { pieConfig } from './js/echartsConfig'

export default {
    props: {
        params: {
            type: Object,
            require: true
        }
    },
    created() {
        if(this.params.type == 2) {
            this.$nextTick( () => {
                this.chart = echarts.init( this.$refs.echartPie )
                this.chart.setOption( pieConfig({ 
                    text: this.params.text, 
                    percent: this.params.percent, 
                    colors: this.params.pieColor }) )
            })
        }
    }
}
</script>

<style lang="less" scoped>
    @h130:.px2vh(130)[@result];
    @w60:.px2vw(60)[@result];

    @red: #00FFC6;
    @green: rgba(209,209,209,1);

    .echartPie{
        width:@h130;height:@h130;
    }
    .red{
        color:@red !important;
    }
    .green{
        color:@green !important;
    }
</style>


