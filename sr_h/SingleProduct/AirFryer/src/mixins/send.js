import common from '@/common/common.js';
import recipes from '@/dictionary/recipes.js';

/**
 * 下发 action
 * @param { Number } code 下发 action 属性的值
 */
function setAction ( code ) {
    let { cook } = this.api.sid;
    Object.assign( cook, {
        action: { val: code }
    } );
    this.api.send.cook(
        'action'
    );
}

export default {
    methods: {

        /**
         * 获取本地参数 | 修改参数
         * @param { Object | null | undefined } 包含参数的对象, 为空则取默认值
         */
        // workTime temperature stirSwitch preheatSwitch
        setParams ( opt ) {
            let { cook } = this.api.sid;

            if ( common.isPlainObject( opt ) ) {    // 修改参数

                // 待机状态下不接受跟新, 所以要同时修改 cache 的数值
                this.setObj( cook, opt );
            } else {

                // 不修改参数取默认值
                this.setObj( cook, recipes[ +this.curRecipes ] );
            }
        },

        /**
         * 获取目标对象下的对应属性值
         * @param { Object } obj 源对象
         * @param { Object } target 目标对象
         */
        setObj ( obj, target ) {
            Object.assign( obj, {
                workTime: { val: target.workTime },
                temperature: { val: target.temperature },
                stirSwitch: { val: target.stirSwitch },
                preheatSwitch: { val: target.preheatSwitch }
            } );
        },

        /**
         * 开始制作
         * @param { Number } id 菜谱的编号
         */
        startWork ( opt ) {
            if ( this.isError ) {
                return this.api.deviceLog(
                    '设备异常禁止下发',
                    `status = ${this.status}, code = ${this.code}`
                );
            }

            let { cook } = this.api.sid;

            this.setParams( opt );

            Object.assign( cook, {
                action: { val: 1 },
                recipesCode: {
                    val: '000007E7A050C80500140001003C0101010000000000050100000000000000'
                },
                recipes: { val: +this.curRecipes }
            } );
            this.api.send.cook(
                'action recipes recipesCode workTime temperature stirSwitch preheatSwitch'
            );

            // 模拟设备上报
            if ( !this.api.hasHilink ) {
                let preheatSwitch = opt.preheatSwitch == null ? true : false;
                let workTime = opt.workTime == null ?
                    recipes[ this.curRecipes ].workTime :
                    opt.workTime;

                console.warn( `开始工作后模拟上报 status = ${preheatSwitch ? 4 : 1}` +
                    `, leftTime = ${workTime}` );
                this.api.sid.cook.status = {
                    val: preheatSwitch ? 4 : 1
                };

                // this.api.sid.cook.preheatSwitch = { val: preheatSwitch };
                this.api.sid.cook.leftTime = { val: workTime };
            }
        },

        /**
         * 取消制作
         */
        cancel () {
            if ( this.isError ) {
                return this.api.deviceLog(
                    '设备异常禁止下发',
                    `status = ${this.status}, code = ${this.code}`
                );
            }
            setAction.call( this, 0 );

            // 模拟设备上报
            if ( !this.api.hasHilink ) {
                console.warn( '取消制作或预约后模拟上报 status = 0' );
                this.api.sid.cook.status = { val: 0 };
            }
        },

        /**
         * 保持预热
         */
        keepWarn () {
            if ( this.isError ) {
                return this.api.deviceLog(
                    '设备异常禁止下发',
                    `status = ${this.status}, code = ${this.code}`
                );
            }
            setAction.call( this, 3 );

            // 模拟设备上报
            if ( !this.api.hasHilink ) {
                console.warn( '保持预热后模拟上报 preheatSwitch = 0, status = 5, leftTime = 1800' );
                this.api.sid.cook.preheatSwitch = { val: false };
                this.api.sid.cook.status = { val: 5 };
                this.api.sid.cook.leftTime = { val: 30 * 60 };
            }
        },

        /**
         * 跳过预热
         */
        passWarn () {
            if ( this.isError ) {
                return this.api.deviceLog(
                    '设备异常禁止下发',
                    `status = ${this.status}, code = ${this.code}`
                );
            }
            setAction.call( this, 2 );

            // 模拟设备上报
            if ( !this.api.hasHilink ) {
                let workTime = 33;
                console.warn( '跳过预热后模拟上报 preheatSwitch = false, status = 1, ' +
                    `leftTime = ${workTime}` );
                this.api.sid.cook.preheatSwitch = { val: false };
                this.api.sid.cook.status = { val: 1 };
                this.api.sid.cook.leftTime = { val: workTime };
            }
        },

        /**
         * 修改参数
         * @param { Object } 带有参数的对象
         */
        // workTime temperature stirSwitch preheatSwitch
        changeParam ( opt ) {
            if ( !common.isPlainObject( opt ) ) {
                return this.api.deviceLog(
                    '下发修改参数获取到的参数错误, 停止下发',
                    JSON.stringify( opt )
                );
            }

            if ( this.isError ) {
                return this.api.deviceLog(
                    '设备异常禁止下发',
                    `status = ${this.status}, code = ${this.code}`
                );
            }

            let { cook } = this.api.sid;

            this.setParams( opt );

            Object.assign( cook, {
                action: { val: 4 },
                recipes: { val: +this.curRecipes }
            } );
            this.api.send.cook(
                'action recipes workTime temperature stirSwitch preheatSwitch'
            );

            // 模拟设备上报
            if ( !this.api.hasHilink ) {
                console.warn( `下发修改参数后模拟设备上报 status = 1, preheatSwitch =  ${opt.preheatSwitch}` );
                this.api.sid.cook.status = { val: opt.preheatSwitch ? 4 : 1 };
                this.api.sid.cook.preheatSwitch = { val: opt.preheatSwitch };
            }
        },

        /**
         * 预约
         * @param { Number } 预约时间: 时
         * @param { Number } 预约时间: 分
         */
        sendPre ( hour, min ) {
            if ( this.isError ) {
                return this.api.deviceLog(
                    '设备异常禁止下发',
                    `status = ${this.status}, code = ${this.code}`
                );
            }

            let { cook } = this.api.sid;

            // 获取默认参数
            this.setParams( null );

            Object.assign( cook, {
                action: { val: 1 },
                recipesCode: {
                    val: '000007E7A050C80500140001003C0101010000000000050100000000000000'
                },
                preTimeHour: { val: hour },
                preTimeMin: { val: min },
                recipes: { val: +this.curRecipes }
            } );
            this.api.send.cook(
                'action recipes workTime temperature ' +
                'stirSwitch preheatSwitch preTimeHour preTimeMin'
            );

            // 模拟设备上报
            if ( !this.api.hasHilink ) {
                console.warn( '下发预约后模拟上报 status = 3' );
                this.api.sid.cook.status = { val: 3 };
            }
        },

        /**
         * DIY页面：开始制作
         */
        sendDIYWork ( opt ) {
            if ( !common.isPlainObject( opt ) ) {
                return this.api.deviceLog(
                    '下发 diy 获取到的参数错误, 停止下发',
                    JSON.stringify( opt )
                );
            }

            if ( this.isError ) {
                return this.api.deviceLog(
                    '设备异常禁止下发',
                    `status = ${this.status}, code = ${this.code}`
                );
            }

            let { cook } = this.api.sid;

            this.setParams( opt );

            Object.assign( cook, {
                action: { val: 1 },
                recipes: { val: 8 },
                recipesCode: {
                    val: '00000008 c850c805 00140001 003c0100 01000000 01000500 01'
                }
            } );
            this.api.send.cook(
                'action recipes recipesCode workTime temperature stirSwitch preheatSwitch'
            );

            // 模拟设备上报
            if ( !this.api.hasHilink ) {
                let { workTime } = opt;
                console.warn( `下发 diy 后模拟设备上报 status = 1, preheatSwitch =  ${opt.preheatSwitch}` +
                    `, workTime = ${workTime}` );
                this.api.sid.cook.status = { val: opt.preheatSwitch ? 4 : 1 };
                this.api.sid.cook.preheatSwitch = { val: opt.preheatSwitch };
                this.api.sid.cook.leftTime = { val: workTime };
            }
        }
    }
};
