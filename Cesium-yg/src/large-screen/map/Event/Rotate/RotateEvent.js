import SensorEvent from '../SensorEvent'

export class RotateStart extends SensorEvent {
    static type = 'rotate:start'
}

export class Rotating extends SensorEvent {
    static type = 'rotate:rotating'

    get nativeEvent () {
        return this.data.nativeEvent
    }
}

export class RotateEnd extends SensorEvent {
    static type = 'rotate:end'
}

export class RotatePause extends SensorEvent {
    static type = 'rotate:pause'
}
