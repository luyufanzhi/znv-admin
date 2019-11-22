<template>

	<ConfirmBox class="appoint-picker"
		:title="title"
        :apre="msg"
		:submitWord="submitWord"
		:cancelWord="cancelWord"
		@cancel="$emit( 'cancel' )"
        @submit="$emit( 'submit', values )">

			<!-- mint-ui-picker -->
			<mt-picker class="mt-picker"
				ref="picker"
				:slots="slots"
				:itemHeight="itemHeight"
				@change="vm => { this.values = vm.values; this.$emit( 'changeValues', this.values ) }"></mt-picker>
	</ConfirmBox>
</template>

<script>

import ConfirmBox from 'ConfirmBox'
import Picker from 'mint-ui/lib/picker'
import 'mint-ui/lib/picker/style.css'

const ITEM_HEIGHT = 3.6;
const preTimeTip = '已预约, {{day}}{{hours}}时{{minutes}}分完成制作';

export default {
	name: 'AppointPicker',

	props: [ 'title', 'apre', 'valuesLeft', 'valuesRight', 'unit', 'defaultValues', 'submitWord', 'cancelWord' ],
	components: {
		ConfirmBox,
		'mt-picker': Picker,
	},
	data() {
		return {
			itemHeight: Number.parseInt( Number.parseInt( window.getComputedStyle( document.querySelector( 'body' ), null ).fontSize ) * ITEM_HEIGHT ),			// 设置行高
			values: undefined,		// 选中的值, 数组
			message: undefined,		// 如果没有接收副标题, 这个就是副标题

			slots: [
				{
					flex: 1,
					values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
					className: 'l',
					textAlign: 'center',
					defaultIndex: 2,
				}, {
					flex: 1,
					values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
					className: 'r',
					textAlign: 'center',
					defaultIndex: 2,
				}
			]
		};
	},

	created() {
		// 自定义传值, 默认时分
		this.slots[ 0 ].values = this.l;
		// 判断是否为单个 slot
		if ( this.valuesRight === null ) {
			this.slots.length = 1;
		} else {
			this.slots[ 1 ].values = this.r;
		}
	},

	mounted() {
		let picker = this.$refs.picker;

		// 设置单位
		if ( this.unit ) {
			this.changeUnit( this.unit );
		}
		// 设置默认位置
		if ( this.defaultValues ) {
			try {
				if ( this.defaultValues[ 0 ] == null ) {
				this.defaultValues[ 0 ] = this.slots[ 0 ].values[2];
				}
				if ( this.defaultValues[ 1 ] == null ) {
					this.defaultValues[ 1 ] = this.slots[ 1 ].values[2];
				}
			} catch ( e ) { }

			this.setDefaultValues( this.defaultValues );
		}

		// 解决 ios active 伪类无效的问题;
		picker.$el.addEventListener( 'touchstart', function () { } );
	},

	computed: {
		/* 左边内容 */
		l() {
			let arrL = [], i = 0;
			if ( this.valuesLeft == null ) {
				for ( ; i < 24; i++ ) {
					arrL.push( i );
				}
			}
			return this.valuesLeft || arrL;
		},
		/* 右边内容 */
		r() {
			let arrR = [], i = 0;
			if ( this.valuesRight == null ) {
				for ( ; i < 60; i += 10 ) {
					arrR.push( this.timeToString( i ) );
				}
			}
			return this.valuesRight || arrR;
		},
		/* 副标题 */
		msg() {
			if ( this.apre === null ) {
				return undefined;
			}
			return this.apre || this.message;
		},
	},

	methods: {
		/**
		 * 转换时间为字符串, 如: 8 => '08'
		 * @param { Number } val 0~9 的数字
		 */
		timeToString( val ) {
			return val > 9 ? val : '0' + val;
		},

		/**
		 * 设置单位
		 * @param { String } val 从父组件接收的 unit 单位
		*/
		changeUnit( val ) {
			try {
				let unit = val.split( ' ' );
				if ( unit.length < 2 ) {
					unit = [ ...unit, ...unit ];
				}
				this.slots.forEach( ( el, index ) => el.className = unit[ index ] );
			} catch( e ) {}
		},

		/**
		 * 设置默认值
		 * @param { Array } val 要设定的默认值, 如果数组中没有改值, 则默认选择第三个
		 */
		setDefaultValues( val ) {
			let { picker } = this.$refs, leftDef = val[ 0 ], rightDef = val[ 1 ];

			if ( this.isRightDefaultValues( 0, leftDef ) ) {
				leftDef = this.slots[ 0 ].values[ 2 ];
			}
			if ( this.isRightDefaultValues( 1, rightDef ) ) {
				rightDef = this.slots[ 1 ].values[ 2 ];
			}

			if ( val.length === 1 ) {
				picker.setValues( [ leftDef ] );
			} else if ( val.length === 2 ) {
				picker.setValues( [ leftDef, rightDef ] );
			}
		},

		/**
		 * 判断 slot 数组是否有要设定的默认值
		 * @param { Number } index slot 数组下标
		 * @param { Number | String } val slot 要设定的默认值
		 * @return { Boolean }
		 */
		isRightDefaultValues( index, val ) {
			return null != this.slots[ index ] && null != this.slots[ index ].values && -1 == this.slots[ index ].values.indexOf( val );
		},
	},

	watch: {
		/**
		 * 监听选中值的变化, 绑定副标题
		 */
		values( val, oldVal ) {
			let preTimeHour = val[ 0 ], preTimeMin = val[ 1 ], now = new Date();
			let hour = now.getHours(), min = now.getMinutes();
			let isToday = preTimeHour > hour || ( preTimeHour == hour && preTimeMin - min >= 0 );
			this.message = preTimeTip
								.replace( /{{day}}/, isToday ? '今天' : '明天' )
								.replace( /{{hours}}/, preTimeHour )
								.replace( /{{minutes}}/, preTimeMin );
		},

		/**
		 * 单位变化
		 */
		unit( val ) {
			this.changeUnit( val );
		},

		/**
		 * 设定的默认值变化
		 */
		defaultValues: {
			deep: true,
			handler( val ) {
				this.setDefaultValues( val );
			},
		},
	},
}
</script>

<style lang="less">
@import url("../../static/css/mixins.less");
@import url("../../static/css/module/AppointPicker.V2/unit.less");

.appoint-picker {

	.mt-picker {
		@import url("../../static/css/module/AppointPicker.V2/style.less");
	}
}

</style>
