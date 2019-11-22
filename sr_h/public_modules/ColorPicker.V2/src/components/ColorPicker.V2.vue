<template>
    <div class="color-picker"
        ref="picker"
        :style="{ width: getUint( opt.width ), height: getUint( opt.height ) }"
        @touchstart="touchstart( $event )"
        @touchmove="touchmove( $event )"
        @touchend="touchend( $event )">

        <div class="circle"
            ref="circle"
            :style="{ backgroundColor: opt.color }"></div>

        <img class="img" src="../../static/images/colorPicker.png" alt="imgUrl error" ref="img">

        <canvas class="canvas"
            ref="canvas"></canvas>

    </div>
</template>

<script>

/**
 * 基本原理:
 *      1. 取色
 *          利用 canvas 画笔的 getImageData 方法取得图片上的颜色
 *      2. 设置颜色
 *          待定
 */

// /* 兼容 Promise */
// if ( '[object Function]' !== Object.prototype.toString.call( Promise ) ) {
//     import( 'core-js/fn/promise/index.js' )
//         .then( Promise => window.Promise = Promise )
//         .catch( error => console.log( 'error:', error ) )
// }
// /* 兼容 Object.assign */
// if ( 'assign' in Object && '[object Function]' !== Object.prototype.toString.call( Object.assign ) ) {
//     import( 'core-js/fn/promise/index.js' )
//         .then( assign => Object.assing = assign )
//         .catch( error => console.log( 'error:', error ) )
// }

// 默认配置信息
const def = {
    circleW: 50,
    borderW: 3,
    left: 100,
    top: 100,
    wc: 5,
};

def.radius = def.circleW / 2 + def.borderW;

let oldX, oldY;

export default {
    name: "color-picker",
    components: {},
    props: {
        opt: {
            type: Object,
            required: true,
            default: function () {
                return {
                    width: 244,         // 默认宽度
                    height: 374,        // 默认高度
                    color: undefined,   // 返回的颜色
                }
            }
        },
    },

    data() {
        return {
            x: undefined,           // 鼠标移动时 pageX 坐标
            y: undefined,           // 鼠标移动时 pageY 坐标
            width: undefined,
            height: undefined,

            queuw: undefined,       // 图片加载的 promise 实例
            timer: null,            // 定时器 ID
            error: true,            // 是否创建失败

            canvas: undefined,      // canvas 对象
            ctx: undefined,         // 画笔
            circle: undefined,      // 滑动的圆
            picker: undefined,      // 取色器

            pickerX: undefined,     // picker 在窗口中的 left 值
            pickerY: undefined,     // picker 在窗口中的 top 值
        };
    },

    created() {
        Object.assign( this, {
            width: this.opt.width,
            height: this.opt.height,
        } );
    },

    mounted() {

        // 创建 promise 实例
        this.$nextTick( _ => {

            let { img, canvas, circle, picker } = this.$refs;
            let { left, top } = picker.getBoundingClientRect();

            // 初始化滑动圆的样式
            this.setStyle( circle, {
                width: def.circleW,
                height: def.circleW,
            } );

            Object.assign( this, {
                canvas,
                ctx: canvas.getContext( '2d' ),
                circle,
                picker,
                pickerX: left,
                pickerY: top,
            } );

            // 加载图片
            this.queue = new Promise( ( resolve, reject  ) => {
                // 图片加载成功
                img.onload = _ => {
                    this.error = false;
                    resolve( img );
                }
                // 图片加载失败
                img.onerror = _ => {
                    console.error( 'img load fail' );
                    this.error = true;
                    reject();
                }
            } );

            // canvas 绘图
            this.queue = this.queue
                // 图片加载成功的时候, canvas 绘制图片
                .then( img => {
                    let { width, height } = this.opt;

                    // 设置 canvas 的宽高
                    this.canvas.setAttribute( 'width', this.getUint( width ) );
                    this.canvas.setAttribute( 'height', this.getUint( height ) );

                    // 利用图片显示, 不考虑 canvas 边模糊的情况
                    this.ctx.drawImage( img, 0, 0, width, height );

                    // 设置初始颜色值
                    this.setCirclePosition( this.pickerX + def.left, this.pickerY + def.top );
                } )
        } );
    },

    methods: {

        /**
         * touchstart 事件
         * @param { Object } e vue 创建的 $event
         */
        touchstart( e ) {
            let target = e.touches[ 0 ];

            // 点击定位
            let { pageX, pageY } = target;

            if ( pageX < this.pickerX || pageY < this.pickerY ) return;
            if ( pageX > this.pickerX + this.width || pageY > this.pickerY + this.height ) return;

            Object.assign( this, {
                x: pageX, y: pageY,
            } );
            this.setCirclePosition( pageX, pageY );

            // 判断是否为滑动圆
            this.isCircle( target );

            // 开始动画
            this.cancleAction();
            this.action();
        },
        /**
         * touchmove 事件
         * @param { Object } e vue 创建的 $event
         */
        touchmove( e ) {
            if ( this.error ) return;

            let target = e.touches[ 0 ];

            // 判断是否为滑动圆
            this.isCircle( target );

            let { pageX, pageY } = target, maxX, maxY;

            // 越界判断
            if ( pageX < this.pickerX + def.wc ) {
                pageX = this.pickerX + def.wc;
            } else if ( pageX > ( maxX = this.pickerX + this.width - def.wc ) ) {
                pageX = maxX;
            }
            if ( pageY < this.pickerY + def.wc ) {
                pageY = this.pickerY + def.wc;
            } else if ( pageY > ( maxY = this.pickerY + this.height - def.wc ) )  {
                pageY = maxY;
            }

            Object.assign( this, { x: pageX, y: pageY } );
        },
        /**
         * touchend 事件
         * @param { Object } e vue 创建的 $event
         */
        touchend( e ) {
            this.cancleAction();
        },

        /**
         * 滑动圆的动画
         */
        action() {
            this.opt.isRender = true;
            this.timer = window.requestAnimationFrame( this.action.bind( this ) );
            // 设置互动圆的位置
            this.setCirclePosition( this.x, this.y );
        },
        /**
         * 取消动画
         */
        cancleAction() {
            this.opt.isRender = false;
            window.cancelAnimationFrame( this.timer );
        },

        /**
         * 判断目标元素是不是滑动圆
         * @param { Object } target 触发滑动的目标 DOM 元素
         * @returns { Boolean } 目标元素是否为滑动圆
         */
        isCircle( target ) {
            let res;
            if ( res = target.target !== this.circle ) return console.error( 'touchmove target is not circle!' );
            return res;
        },

        /**
         * 根据 canvas 上的坐标取色
         * @param { Number } x 在 canvas 上的 x 坐标
         * @param { Number } y 在 canvas 上的 y 坐标
         */
        getColor( x, y ) {
            let Uint8Data = this.ctx.getImageData( x, y, 1, 1).data;
            return this.uint8ToRgba( Uint8Data );
        },

        /**
         * Uint8ClampedArray 转换为 rgba
         * @param { Uint8Data | Array } Uint8Data 利用 canvas 获取到的值, 或者是代表 rgba 值的数组, 长度为 4
         * @return { String } 返回 Rgba 颜色值
         */
        uint8ToRgba( Uint8Data ) {
            if ( 0 === Uint8Data[ 3 ] ) {
                // console.log( 'color error:', this.pickerX, this.x );
                return this.opt.color;
            }
            return `rgba( ${ Uint8Data[ 0 ] }, ${ Uint8Data[ 1 ] }, ${ Uint8Data[ 2 ] }, ${ Math.round( ( Uint8Data[ 3 ] / 255 ) * 100 ) / 100} )`;
        },

        /**
         * 设置滑动圆的位置
         * 原理: 屏幕中的坐标减去滑动圆的父元素 top, left 值, 在减去自身 radius( width / 2 )
         * @param { Number } x 屏幕中的 pageX 坐标
         * @param { Number } y 屏幕中的 pageY 坐标
         */
        setCirclePosition( x, y ) {

            if ( oldX === x && oldY === y ) return;

            let curX = x - this.pickerX;
            let curY = y - this.pickerY;

            // 获取颜色
            this.opt.color = this.getColor( curX, curY );

            this.setStyle( this.circle, {
                left: curX - def.radius,
                top: curY - def.radius,
            } );

            // 缓存旧值, 避免多次执行
            oldX = x, oldY = y;
        },

        /**
         * 返回数值 + 单位
         * @param { Number } res 要设置的值
         * @returns { String } 返回带有单位的目标值
         */
        getUint( res ) {
            return res + 'px';
        },

        /**
         * 设置目标样式
         * @param { Object } el 目标 DOM 元素对象
         * @param { Object } target 目标元素要设置的值
         * @returns { Object } 返回目标 DOM 元素对象
         */
        setStyle( el, target ) {
            // if ( typeof el !== Object ) {
            //     return console.errror( '设置样式是, 目标元素不是对象' );
            // }

            let key;
            for ( key in target ) {
                if ( target[ key ] != null ) el.style[ key ] =  this.getUint( target[ key ] );
            }
            return el;
        },
    },
}
</script>


<style lang="less" scoped>
@import url("../../../../static/css/mixins.less");
@import url("../../../../static/css/module/ColorPicker.V2/params.less");

.color-picker {
    position: relative;

    .circle {
        .setPosition(absolute);
        background-color: @circle-bgc;
        border-radius: 50%;
        border: @border-width solid @border-color;
    }

    .img {
        .setWH(244px, 374px);
    }

    .canvas {
        display: none;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
    }
}

</style>


