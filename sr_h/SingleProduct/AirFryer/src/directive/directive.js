import Vue from 'vue';

/**
 * 自动聚焦
 */
Vue.directive( 'focus', {

    // 当被绑定的元素插入到 DOM 中时
    inserted: function ( el ) {
        el.focus();
    }
} );

/**
 * 给 div 设置遮罩层
 */

// 遮罩层颜色
const MASK_COLOR = 'rgba( 0, 0, 0, .05 )';

Vue.directive( 'mask', {

    // 当被绑定的元素插入到 DOM 中时
    inserted: function ( el ) {

        // 遮罩用的 div
        let mask;

        mask = document.createElement( 'div' );
        mask.classList.add( 'mask' );

        Object.assign( el.style, { position: 'relative' } );
        Object.assign( mask.style, {
            display: 'none',
            backgroundColor: MASK_COLOR,
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0
        } );

        el.appendChild( mask );

        el.addEventListener( 'touchstart', function () {
            let { style, dataset } = this;
            dataset.bgc = style.backgroundColor;
            mask.style.display = 'block';
        } );

        el.addEventListener( 'touchend', function () {
            mask.style.display = 'none';
        } );
    }
} );
