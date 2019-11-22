<template>
    <player-map ajax="/static/mork/playback.json"></player-map>
</template>

<script type="text/">
import PlayerWithMap from 'playerWithMap'

export default {
    components: {
        'player-map': PlayerWithMap
    }
}
</script>
