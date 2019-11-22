<template>
    <div>  
        <top-items :items='topItems'></top-items>
        <div class="hr30"></div>
        <top-items :items='topItems'></top-items>
        <div class="hr30"></div>
        <top-items :items='topItems'></top-items>
        渔船统计分析
    </div>
</template>

<script>
import TopItems from '@/components/topItems/topItems'

export default {
    created() {
        this.topItems = [
                                {   
                                    innerBg: '#2FB8FF',
                                    items: [
                                        {
                                            type: 0,
                                            m: '0 0 0 50',
                                            text: '全部',
                                            icon: {
                                                type: 'all',
                                                w: 54,
                                                h: 54,
                                            }
                                        },
                                        {
                                            type: 1,
                                            m: '32 0 0 30',
                                            data: '556'
                                        }
                                    ],
                                },
                                {   
                                    innerBg: '#ECB745',
                                    items: [
                                        {
                                            type: 0,
                                            m: '0 0 0 50',
                                            text: '即将过期',
                                            icon: {
                                                type: 'clock',
                                                w: 54,
                                                h: 52,
                                            }
                                        },
                                        {
                                            type: 1,
                                            m: '32 0 0 0',
                                            data: '23'
                                        }
                                    ],
                                },
                                {   
                                    innerBg: '#BFBFBF',
                                    items: [
                                        {
                                            type: 0,
                                            m: '0 0 0 28',
                                            text: '已过期',
                                            icon: {
                                                type: 'expired',
                                                w: 54,
                                                h: 54,
                                            }
                                        },
                                        {
                                            type: 1,
                                            m: '32 0 0 0',
                                            data: '12'
                                        }
                                    ]
                                }
            ]
    },
    components: {
        TopItems
    }
}
</script>
