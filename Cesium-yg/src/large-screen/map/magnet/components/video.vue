<template>
    <!-- 现场视频 -->
    <div class="video">
        <wrap :list="list" v-model="activeName" >
            <div class="video-item" slot="video-l">
                <div class="top">
                    <div :class="[ 'btn-l', 'btn', {
                        active: isActiveBtn === 1
                    } ]" @click="isActiveBtn = 1">
                        <div class="icon"></div>
                        <p class="txt znv-ellipsis">出入口</p>
                    </div>
                    <div :class="[ 'btn-r', 'btn', {
                        active: isActiveBtn === 2
                    } ]" @click="isActiveBtn = 2">
                        <div class="icon"></div>
                        <p class="txt znv-ellipsis">其他区域</p>
                    </div>
                </div>
                <div class="bottom carousel">
                    <div class="ca-wrap">
                        <div id="swiper">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <video src="/static/video/scene1.mp4" muted loop></video>
                                </div>
                                <div class="swiper-slide">
                                    <video src="/static/video/scene2.mp4" muted loop></video>
                                </div>
                                <div class="swiper-slide">
                                    <video src="/static/video/scene1.mp4" muted loop></video>
                                </div>
                                <div class="swiper-slide">
                                    <video src="/static/video/scene2.mp4" muted loop></video>
                                </div>
                                <div class="swiper-slide">
                                    <video src="/static/video/scene1.mp4" muted loop></video>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-button-prev swiper-btn"></div><!--左箭头-->
                        <div class="swiper-button-next swiper-btn"></div><!--右箭头-->
                    </div>
                </div>
            </div>
            <div class="video-item screen-full" slot="video-r">
                <div class="znv-wrap">
                    <video src="/static/video/scene1.mp4" muted loop></video>
                </div>
            </div>
        </wrap>
    </div>
</template>

<script>
import Wrap from '../wrap'

import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

export default {
    name: 'video',
    components: {
        'wrap': Wrap
    },
    data () {
        return {
            list: [ {
                label: '现场视频',
                name: 'video-l'
            }, {
                label: '高点全景视频',
                name: 'video-r'
            } ],

            activeName: 'video-l',

            isActiveBtn: 1,
        }
    },

    created () {
        this.resize = this.resize.bind( this )
        this.$nextTick( () => {
            this.initSwiper( window.innerWidth / 1920 )

            window.addEventListener( 'resize', this.resize )
        } )
    },

    destroyed () {
        window.removeEventListener( 'resize', this.resize )
    },

    methods: {
        /**
         * tab 栏的点击事件
         * @param { Vue } vm 栏选项的实例, index, value
         */
        tabClick ( vm ) {
            console.log( 'vm:', vm )
        },

        initSwiper ( w ) {
            this.swiper = new Swiper( '#swiper', {
                autoPlay: true,
                slidesPerView: 2,
                spaceBetween: 15 * w,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            });
        },

        resize () {
            let w = window.innerWidth / 1920
            this.swiper.destroy()
            this.initSwiper( w )
        }
    }
}
</script>

<style lang="less" scoped>
.video {
    .top, .bottom {
        height: 50%;
        width: 100%;
    }

    .top {
        .btn {
            width: 2.8vw;
            height: 6.04vh;
            cursor: pointer;
            font-size: 1.24vh;
            text-align: center;
            float: left;
            margin-top: 1.6vh;
        }
        .icon {
            width: 1.3vw;
            // height: calc( (13/@znv-h) )vh;
            height: 2.31vh;
            margin: auto;
            margin-top: 1.07vh;
            margin-bottom: 1.07vh;
        }

        .btn-l {
            margin-left: 5.7vw;
            margin-right: 2.8vw;
        }

        .btn-l .icon {
            .setBg();
            background-image: url("../../images/inward_and_outward.png");
        }
        .btn-r .icon {
            .setBg();
            background-image: url("../../images/other_areas.png");
        }

        .btn.active {
            background-color: #4371F7;
            box-shadow: @shadow-inner;
        }
    }

    .bottom.carousel {
        .setRelative();
        padding-bottom: 1.6vh;

        .ca-wrap {
            .setWH();
            .setRelative();
        }
    }

    .screen-full {
        .znv-wrap {
            padding: .px2vh( 26 )[@result] .px2vw( 23 )[@result];

            video {
                .setWH();
                object-fit: fill;
            }
        }
    }
}

#swiper {
    width: 16vw;
    height: 100%;
    margin: auto;
    overflow: hidden;
    // padding-left: 1vw;
    // padding-right: 1vw;
    // box-sizing: border-box;

    .swiper-slide {
        // width: 7.6vw!important;
        // background-color: red;
        // margin-right: .8vw!important;
        box-shadow: @shadow-inner;

        video {
            .setWH();
            object-fit: fill;
        }
    }
}

.swiper-btn {
    width: .7vw;
    // height: 2.3vh;
    height: 100%;
    cursor: pointer;
    .setBg();
    top: 0;
    margin: 0;

    &:focus {
        outline: none;
    }
}

.swiper-button-next {

}

.swiper-button-prev {

}
</style>
