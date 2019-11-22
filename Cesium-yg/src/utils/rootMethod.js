/**
 * @file 混合到根实例
 */

const PX = 'px'

export default {
    methods: {

        /**
         * 添加单位
         * @param { Object } target 样式对象 { width: 89 }
         * @param { String } unit 样式单位, 默认值: 'px'
         */
        addUnit ( target, unit ) {
            let k
            unit = unit == null ? PX : unit
            for ( k in target ) {
                target[ k ] += unit
            }
            return target
        }
    }
}
