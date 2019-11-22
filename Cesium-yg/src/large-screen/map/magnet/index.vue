<template>
    <div class="magnet">
        <left></left>
        <right></right>
    </div>
</template>

<script>

// 磁贴
import Left from './left'
import Right from './right'

export default {
    name: 'magnet',

    components: {
        left: Left,
        right: Right
    },
}
</script>
