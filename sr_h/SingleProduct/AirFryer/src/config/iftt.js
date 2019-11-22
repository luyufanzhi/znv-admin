import Bus from '@/common/bus.js';

// import $time from '@/asset/$time.js';
import { btnImgs } from '@/dictionary/imgSrc.js';
import { KEEPHOT, PASSHOT } from '@/dictionary/constant.js';

export default function () {
    let cancleBtn, setParams, keepHot, passHot;

    /**
     * 取消按钮的活动状态
     */
    function cancelActive () {
        cancleBtn.isActive = false;
        setParams.isActive = false;
        keepHot.isActive = false;
        passHot.isActive = false;
    }

    // 向 Tip.vue 传递数据
    Bus.$on( 'cancelActive', cancelActive );

    cancleBtn = {   // 取消制作 | 取消预约
        imgUrl: btnImgs[ 0 ],
        ungroup: true,
        callback: ( index, item ) => {
            if ( this.isError ) {
                return;
            }
            cancelActive();
            item.isActive = true;

            if ( this.isWork ) {
                this.isShow.confirmBox = true;
            } else {
                this.go( '/cook' );
            }
        }
    };

    setParams = {   // 修改参数
        imgUrl: btnImgs[ 1 ],
        callback: ( index, item ) => {
            if ( this.isError ) {
                return;
            }
            cancelActive();
            item.isActive = true;
            this.go( '/set', { tit: 1 } );
        }
    };

    keepHot = {       // 保持预热
        imgUrl: btnImgs[ 1 ],
        callback: ( index, item ) => {
            if ( this.isError ) {
                return;
            }
            cancelActive();
            item.isActive = true;
            this.isShow.tips = KEEPHOT;
        }
    };

    passHot = {        // 跳过预热
        imgUrl: btnImgs[ 1 ],
        callback: ( index, item ) => {
            if ( this.isError ) {
                return;
            }
            cancelActive();
            item.isActive = true;
            this.isShow.tips = PASSHOT;
        }
    };

    let iftt = {

        // 不保持预热
        bottomList: {
            data: [
                cancleBtn,
                keepHot,
                passHot
            ],
            switch: true
        },

        // 保持预约
        bottomListTwo: {
            data: [
                cancleBtn,
                setParams
            ],
            switch: true
        }
    };

    return iftt;
};
