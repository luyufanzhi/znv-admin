<template>
  <!-- update: 08.01.17 FIX 色环定位, 颜色匹配, 模式切换
      遗留问题: 提高性能 -->
  <!-- update: 08.01.19 FIX 色环定位算法重写改用 HSV, 代码整理 -->
  <!-- update: 08.01.20 FIX 初始颜色,  -->
  <!-- update: 08.01.22 添加设备打印和控制台打印用于调试 -->

  <div class="colorPicker">
    <div class="picker" ref="picker">

      <canvas class="canv" ref="canv"></canvas>

      <!-- 遮罩图片 -->
      <img class="img" :src="imgUrl" ref="img" alt="load error">

      <!-- 遮罩层 -->
      <div class="mask center" ref="mask">
        <slot name="mask"></slot>
      </div>

      <!-- 拖动的圆 -->
      <div class="circle" ref="circle" :style="{ backgroundColor: color }"></div>
    </div>
  </div>
</template>

<script>

  /**
   *
   *      <Color-picker :width="ColorPicker.width"
   :color.sync="ColorPicker.color"
   :img-url="ColorPicker.imgUrl"
   :is-render.sync="ColorPicker.isRender"
   :init-color="ColorPicker.initColor"
   :callback="ColorPicker.callback">

   <!-- <div class="demo" slot="mask"></div> -->

   </Color-picker>


   ColorPicker: {
        color: undefined,
        width: 270,
        initColor: 'rgba(100, 134, 251, 1)',
        isRender: false,
        callback: _ => console.log( 123 ),
    },


   * 注意: 父组件应该传入 width color maskWidth;
   *  width:      圆环外围半径                           (必须)
   *  color:      存储颜色值                             (必须)
   *  isRender:   是否正在拖动                           (可选)
   *  initColor:  设备上报的初始颜色值                    (可变)
   *  callback:   触摸结束并且颜色值发生改变时触发的时间    (可选)
   *
   * 这里引用了一张图片, 如果单独使用的话请修改图片地址路径.
   *
   *
   * this.initError(error): initColor 没有的时候的处理函数
   *
   * 图片原始尺寸: 1104 x 1104
   */


import 'core-js/fn/object/define-property'
import 'core-js/fn/array/find-index'
import 'core-js/fn/object/assign'

// 默认配置
  const def = {
    width     : 1104,                       // 图片初始宽高
    height    : 1104,
    lineWidth : 56 + 12 + 12,               // 圆环宽度
    Rmin      : 1104 / 2 - 56 - 12 - 12,    // 圆环最小半径
    circleW   : 56 + 12 + 12,               // 拖动圆宽度
    radius    : 1104 / 2 - 12 - 56 / 2,     // 圆环中心半径
    OFFSET    : 20,                         // 颜色值的偏差范围
    stepDeg   : 360,                        // 角度步长
    maskWidth : 70,                         // 遮罩层宽高
    initColor : 'rgba(100, 134, 251, 1)',   // 测试用
    normalW   : 26,                         // 正常大小
    bigW      : 34,                         // 拖动变大
    delay     : 100,                        // 函数防抖时长
  };

  const REG = /(\d+),\s*(\d+),\s*(\d+),\s*(\d+)/;

  let x = Symbol( 'x' ), y = Symbol( 'y' ), flag = false;

  let cache = { }, oldVal;

  export default {

    props: [ 'width', 'color', 'imgUrl', 'isRender', 'initColor', 'callback' ],

    data() {
      return {
        count    : 0,                   // 内部计数用
        colors   : [],                  // 临时存储用
        [x]      : undefined,           // 滑动过程坐标
        [y]      : undefined,
        queue    : undefined,           // 图片加载的 promise 实例
        timer    : null,                // 定时器的 ID
        padding  : undefined,           // picker 的 padding 值
        target   : null,                // 存储目标元素
        isAction : true,                // 是否执行 action
        cw       : 0,                   // 按钮变化的间距
      }
    },

    /* 初始化属性 */
    created() {

      // 如果没有传入 width 取默认值
      if ( this.width  == null ) this.width = def.width;
      // 如果没有传入 maskWidth 取默认值
      // if ( this.maskWidth == null ) this.maskWidth = def.width;

      this.scale      = this.width / def.width;           // 图片缩放比例
      this.lineWidth  = this.scale * def.lineWidth;       // 圆环宽度 (包括透明)
      this.Rmax       = this.width / 2;                   // 圆环半径 大 (包括透明)
      this.Rmin       = def.Rmin * this.scale;            // 圆环半径 小 (包括透明)
      this.circleW    = def.circleW * this.scale;         // 拖动的圆的宽度
      // this.circleW    = def.normalW;
      this.circleR    = this.circleW / 2;                 // 拖动的圆的半径
      this.radius     = def.radius * this.scale;          // 圆环中点半径
      this.cw         = def.normalW - this.circleW;

      // 函数防抖
      // this.updateFn = this.debounce( data => this.commitColor(data), def.delay, true );
    },

    mounted() {

      this.padding    = this.getStyle( this.$refs.picker, 'padding' );

      let img         = this.$refs.img;
      this.queue      = new Promise( function ( resolve, reject ) {
        img.onload  = resolve;
        img.onerror = reject;
      } );

      img.src         = this.imgUrl;

      let
        width       = this.width,
        height      = this.width,
        canv        = this.$refs.canv;

      this.ctx        = canv.getContext( '2d' );

      // 设置样式 (宽高, 定位等尺寸)
      this.setStyle( img, { width, height } );
      this.setStyle( canv, { width, height } );
      this.setStyle( this.$refs.picker, { width, height } );

      // 遮罩层样式 (宽高)
      this.setStyle( this.$refs.mask, {
        width  : this.radius * 2 - def.maskWidth - this.lineWidth,
        height : this.radius * 2 - def.maskWidth - this.lineWidth,
      } );

      // normal Circle
      this.normalCircle();

      // 设置 canvas 宽高
      Object.assign( canv, { width, height } );

      // 图片 onload 时间
      this.queue = this.queue.then( _ => this.ctx.drawImage( img, 0, 0, width, height ) );

      // 设置初始位置
      this.setCircleTopLeft( { x: this.Rmax - this.circleR, y: 0 } );
      // 上报颜色值初始化
      // this.getInitPoint( this.initColor );

      // 注册事件
      this.$refs.picker.addEventListener( 'touchmove', this.moveCircle, true );
      this.$refs.picker.addEventListener( 'touchend', this.moveEnd, true );
      this.$refs.picker.addEventListener( 'touchstart', this.moveStart, true );
    },

    methods: {
      /**
       * touchmove
       */
      moveCircle( e ) {

        let target  = e.target;
        if ( e.targetTouches.length > 1 || target === this.$refs.mask ) return;
        !this.isRender && this.$emit('update:isRender', true);

        if ( target === this.$refs.circle ) target = this.$refs.canv;

        let point   = e.targetTouches[0];
        this[x]     = point.pageX - this.getLeft( target );
        this[y]     = point.pageY - this.getTop( target );

        this.target = target;
        if (this.isAction) this.action();

        // e.preventDefault();
      },
      /**
       * touchend
       */
      moveEnd( e ) {
        let target  = e.target;
        if ( e.targetTouches.length > 1 || target === this.$refs.mask ) return;

        if ( this.isRender ) {
          this.normalCircle();
          // 解决变小的时候产生的偏移量
          this.setStyle( this.$refs.circle, {
            top  : this.getStyle( this.$refs.circle, 'top' ) + ( def.bigW - def.normalW ) / 2,
            left : this.getStyle( this.$refs.circle, 'left' ) + ( def.bigW - def.normalW ) / 2,
          } );
        }
        this.$emit( 'update:isRender', false );

        /* callback */
        if ( !this.isEqualColor( oldVal, this.color ) && oldVal != null ) {
          // 解决因为快速移动造成的颜色不同步问题
          // this[ x ] = e.changedTouches[ 0 ].pageX;
          // this[ y ] = e.changedTouches[ 0 ].pageY;
          // if ( this.isRender ) this.getCurColor();
          typeof this.callback === 'function' && this.callback( this.color );

          // this.queue.then( _ => {
          //     typeof this.callback === 'function' && this.callback( this.color );
          // } );
          oldVal = undefined;
        }

        window.cancelAnimationFrame( this.timer );
        // window.clearInterval(this.timer);
        this.isAction = true;
        // e.preventDefault();
      },
      /**
       * touchstart
       */
      moveStart( e ) {
        oldVal = this.color;

        let target = e.target, point, res;
        if ( target === this.$refs.mask || target === this.$refs.circle ) return;
        this.cw = def.normalW - this.circleW;
        this.normalCircle();

        // 解决变小的时候产生的偏移量
        this.setStyle( this.$refs.circle, {
          top  : this.getStyle( this.$refs.circle, 'top' ) + ( def.bigW - def.normalW ) / 2,
          left : this.getStyle( this.$refs.circle, 'left' ) + ( def.bigW - def.normalW ) / 2,
        } );

        point      = e.targetTouches[ 0 ];
        res        = this.getTargetPoint( point.pageX - this.getLeft( target ), point.pageY - this.getTop( target ), target );

        this.setCircleTopLeft( res );
        // e.preventDefault();
      },

      /**
       * 拖动效果
       */
      action() {

        this.bigCircle();
        this.timer    = window.requestAnimationFrame( this.action.bind( this ) );
        this.isAction = false;
        this.setCircleTopLeft( this.getTargetPoint( this[ x ], this[ y ], this.target ) );

        // this.isAction = false;
        // this.timer = window.setInterval( _ => {

        //     this.setCircleTopLeft(this.getTargetPoint( this[x], this[y], this.target ));
        // }, 16.7);
      },

      /**
       * 计算坐标, 根据鼠标坐标获取对应圆环坐标
       * @param ( offsetX, offsetY ) 在 canvas 上的坐标
       * @param el 事件源, dom 对象
       * @returns { Object } { x, y } 对应在圆环上的坐标
       */
      getTargetPoint( offsetX, offsetY, el ) {

        let target = { }, padding = ( el === this.$refs.picker ? this.padding : 0 ), x, y;

        let center = {
          x: this.getStyle( el, 'width' ) / 2 + padding,
          y: this.getStyle( el, 'height' ) / 2 + padding,
        };

        x = offsetX - center.x;
        y = offsetY - center.y;

        if ( x !== 0 ) {

          let deg  = Math.atan( y / x);

          target.x = ( x > 0 ? Math.abs( this.radius * Math.cos( deg ) ) : -Math.abs( this.radius * Math.cos( deg ) ) ) + this.radius;
          target.y = ( y > 0 ? Math.abs( this.radius * Math.sin( deg ) ) : -Math.abs( this.radius * Math.sin( deg ) ) ) + this.radius;
        } else {    // 解决 90, 270 度的时候 没有斜率的问题

          target = { x: this.radius, y: this.radius + ( y > 0 ? this.radius : -this.radius ) }
        }

        // console.log( 'target:', target );
        // this.deviceLog( 'target', target );

        return target;
      },

      /**
       * 根据设备上报颜色值, 初始化角度
       * @param color 颜色值, 一般是 this.initColor
       */
      getInitPoint( color ) {
        console.time( 'initColor' );

        let error      = 'Don\'t have this initColor: ' + color;
        if ( color == null ) return console.error( error );

        this.queue = this.queue
        /* 遍历匹配 canvas 上的颜色值 */
          .then( _ => {

            // 预防 initError 重复定位
            if ( !flag ) return;
            // 给定一个默认值
            let color  = this.RGBtoHSV( ...this.initColor.match( REG ).splice( 1, 3 ) );
            let deg = -Math.PI / 180 * color[ 0 ];

            // 根据角度来设置位置
            let x = this.radius * Math.cos(deg) + this.radius;
            let y = this.radius * Math.sin(deg) + this.radius;
            this.setCircleTopLeft( { x, y } );

            // 提交
            this.queue.then( _ => this.commitColor( this.initColor ) );
            console.timeEnd( 'initColor' );
          }).catch( err => {

            this.initError( err );
            console.error( err.message );
            this.deviceLog( 'initError', err.message );
          } );
      },

      /**
       * 色盘没有 initColor 的时候处理函数
       */
      initError( error ) {
        // 给定一个默认值
        // this.getInitPoint(def.initColor);
      },

      /**
       * 提交 color 值
       * @param data { String } 要上报的颜色值
       */
      commitColor( data ) {
        // console.log( `%c commitColor: ${ data }`, `color: ${ data }` );
        this.deviceLog( 'commitColor', data );
        this.$emit( 'update:color' , data );
      },

      /* 获取当前的颜色 */
      // getCurColor() {
      //     let res = this.getTargetPoint( this[ x ], this[ y ], this.target );
      //     let circle = [ res.x + this.circleR, res.y + this.circleR ];
      //     this.commitColor( this.getColor( this.ctx.getImageData( ...circle, 1, 1 ).data ) );
      // },

      /**
       * 获取页面 top 值
       */
      getTop( el ){
        let offset = el.getBoundingClientRect().top;
        return offset;
      },
      /**
       * 获取页面 left 值
       */
      getLeft( el ) {
        let offset = el.getBoundingClientRect().left;
//        if ( el.offsetParent != null ) offset += this.getLeft( el.offsetParent );
        return offset;
      },
      /**
       * 设置目标样式
       */
      setStyle( el, target ) {
        for ( let key in target ) {
          if ( target[key] != null ) el.style[key] = target[key] + 'px';
        }
      },
      /**
       * data 转 rgba 数据
       * @returns { String } 返回 rgba 颜色值 'rgba(0, 0, 0, 1)'
       */
      getColor( data ) {
        return `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${Math.round((data[3] / 255) * 100) / 100})`;
      },
      /**
       * 设置拖动圆的 top 和 left 值, 并获取颜色值
       * @param res { x, y } canvas 中的坐标
       */
      setCircleTopLeft( res ) {
        let circle = [ res.x + this.circleR, res.y + this.circleR ];
        this.setStyle( this.$refs.circle, {
          top  : res.y + this.padding - this.cw / 2,
          left : res.x + this.padding - this.cw / 2,
        } );

        /* update color */
        this.queue = this.queue.then( _ => {

          // 解决 initColor 与 color 误差的问题造成循环下发的问题
          // if ( flag ) {
          //     this.commitColor(this.initColor);
          //     flag = false;
          // }

          /* 缓存机制 */
          res.x = Math.round(res.x);
          res.y = Math.round(res.y);
          let data = cache[ res.x + '-' + res.y ];
          if ( data == null ) {
            cache[ res.x + '-' + res.y ] = ( data = this.getColor( this.ctx.getImageData(...circle, 1, 1).data ) );
          }

          this.commitColor(data);
          // 阻止多次下发
          // this.updateFn( data );
        } );
      },

      /**
       * 获取样式值
       */
      getStyle( el, target ) {
        return Number.parseFloat( window.getComputedStyle( el, null )[ target ] );
      },

      /* 判断 2 个颜色是否相等 */
      isEqualColor( color1, color2 ) {
        if ( color1 == null || color2 == null ) return false;

        // color1 = color1.replace( /\s*/g, '' );
        // color2 = color2.replace( /\s*/g, '' );
        // return color1 == color2;
        let flag = true;
        color1   = color1.match( REG ).splice( 1, 4 );
        color2   = color2.match( REG ).splice( 1, 4 );
        color1.forEach( ( el, index ) => {
          if ( +el != +color2[index] ) flag = false;
        } );
        return flag;
      },

      /* 函数防抖 */
      debounce( func, wait, immediate ) {
        let timeout, args, context, timestamp, result;
        let now = new Date();

        let later = function() {
          let last = now - timestamp;

          if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
          } else {
            timeout = null;
            if (!immediate) {
              result = func.apply(context, args);
              if (!timeout) context = args = null;
            }
          }
        };

        return function() {
          context = this;
          args = arguments;
          timestamp = new Date();
          let callNow = immediate && !timeout;
          if (!timeout) timeout = setTimeout(later, wait);
          if (callNow) {
            result = func.apply(context, args);
            context = args = null;
          }

          return result;
        };
      },

      /* normal Circle */
      normalCircle() {
        this.setStyle( this.$refs.circle, {
          width  : def.normalW,
          height : def.normalW,
        } );
      },

      /* big Circle */
      bigCircle() {
        this.cw = def.bigW - this.circleW;
        this.setStyle( this.$refs.circle, {
          width  : def.bigW,
          height : def.bigW,
        } );
      },

      /* 比较颜色值 */
      colorComp( ar, ag, ab, br, bg, bb ) {
        let absR = ar - br, absG = ag - bg, absB = ab - bb;
        return Math.sqrt( absR * absR + absG * absG + absB * absB ) < def.OFFSET;
      },

      /* rgb 与 hsv 颜色转换 */
      RGBtoHSV( r, g, b ) {
        let min, max, delta, h, s, v;
        min = Math.min.apply(null, [ r, g, b ]);
        max = Math.max.apply(null, [ r, g, b ]);

        // v
        v = max;
        delta = max - min;

        if( max != 0 ) {
          // s
          s = delta / max;
        } else {
          // r = g = b = 0                    // s = 0, v is undefined
          s = 0;
          h = -1;
          return;
        }

        if( r == max ) {
          h = ( g - b ) / delta;          // between yellow & magenta
        } else if ( g == max ) {
          h = 2 + ( b - r ) / delta;      // between cyan & yellow
        } else {
          h = 4 + ( r - g ) / delta;      // between magenta & cyan
        }

        h *= 60;                            // degrees
        if ( h < 0 ) {
          h += 360;
        }

        return [ h, s, v ];
      },
      HSVtoRGB( h, s, v ) {
        let i, f, p, q, t, r, g, b;
        if( s == 0 ) {
          // achromatic (grey)
          r = g = b = v;
          return;
        }
        h /= 60;            // sector 0 to 5
        i = Math.floor( h );
        f = h - i;          // factorial part of h
        p = v * ( 1 - s );
        q = v * ( 1 - s * f );
        t = v * ( 1 - s * ( 1 - f ) );
        switch( i ) {
          case 0:
            r = v;
            g = t;
            b = p;
            break;
          case 1:
            r = q;
            g = v;
            b = p;
            break;
          case 2:
            r = p;
            g = v;
            b = t;
            break;
          case 3:
            r = p;
            g = q;
            b = v;
            break;
          case 4:
            r = t;
            g = p;
            b = v;
            break;
          default:        // case 5:
            r = v;
            g = p;
            b = q;
            break;
        }

        return [ r, g, b ];
      },

      /* 设备用户级别打印信息 */
      deviceLog( ...args ) {
        let tag = args[ 0 ], msg = args[ 1 ], flag = !args[ 2 ];

        if ( window.hilink && typeof window.hilink.printLog === 'function' ) {
          window.hilink.printLogDebug( !!flag, 'H5_' + tag, JSON.stringify( msg ) );
        }
      },
    },

    watch: {

      initColor( val, oldVal ) {
        if ( this.isEqualColor( val, this.color ) ) return;
        console.log( `%c initColor: ${ val }`, `color: ${ val }` );
        this.deviceLog( 'initColor', val );
        flag = true;
        this.cw = def.normalW - this.circleW;
        this.getInitPoint( val );
      }
    },
  };
</script>


<style scoped lang="less">

  /* 定位 */
  .setPosition( @positon: absolute, @top: 0, @left: 0 ) {
    position: @positon;
    top: @top;
    left: @left;
  }

  /* 居中 */
  .setCenter(){
    margin: 50% 50%;
    transform: translateY( -50% ) translateX( -50% );
  }

  .colorPicker {
    overflow: hidden;

    /* 内部 */
    .picker {

      .setPosition( relative );
      background-color: transparent;
      margin: auto;
      padding: 10px;

      /* 遮罩层 */
      .mask {

        .setPosition();
        .setCenter();
        border-radius: 50%;
        z-index: 21;
      }

      /* 拖动的圆 */
      .circle {

        box-sizing: border-box;
        .setPosition();
        border: 2px solid #fff;
        border-radius: 50%;
        z-index: 20;
        background-color: rgba(182, 226, 124, 1);
      }

      /* canv */
      .canv {
        opacity: 1;
        .setPosition( relative );
        z-index: 11;
      }

      /* 图片遮罩 */
      .img {
        opacity: 0;
        .setPosition( absolute, 50%, 50% );
        transform : translateY( -50% ) translateX( -50% );
        z-index: 1;
      }
    }
  }
</style>



