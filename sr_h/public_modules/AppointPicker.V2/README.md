# AppointPicker.V2
> 时间选择器, 2列( 时, 分 )
>
> 组件依赖于 `ConfirmBox.vue` 组件以及 `mint-ui` 的 `picker` 组件



## 例子



### 1. 预约时间选择

```vue
<AppointPicker
	v-show="isShow.isAppointPickerShow"
	:title="'预约完成时间'"
	:defaultValues="[7,10]"
	@cancel="isShow.isAppointPickerShow = false"
	@submit="isShow.isAppointPickerShow = false"></AppointPicker>
```

![](.\img\AppointPicker.V2_01.png)



### 2. 自定义单位

####　`unit` : 自定义单位, 填入你设定好的值

#### @example: 

+ `:unit="'month stalls'"`:  月 档
+ `:unit="'stalls'"`:    档 档     // 只填一个默认2个单位都一样

#### 添加单位: 在目录 `...\H5_project\static\css\module\AppointPicker.V2\unit.less` 

#### 添加自定单位方法:

![](.\img\AppointPicker.V2_04.png)

```html
<AppointPicker
            v-show="isShow.isAppointPickerShow"
            :title="'预约完成时间'"
            :unit="'month stalls'"
            :defaultValues="[ 7, 10 ]"
            @cancel="isShow.isAppointPickerShow = false"
            @submit="isShow.isAppointPickerShow = false"></AppointPicker>
```
![](.\img\AppointPicker.V2_03.png)



### 3. 自定义数组

> 注意: 不想要副标题, 设置为 null

```vue
<AppointPicker
            v-show="isShow.isAppointPickerShow"
            :title="'预约完成时间'"
            :apre="null"
            :unit="'stalls'"
            :valuesRight="null"
            :valuesLeft="[ 8, 2, 4, 3, 1, 2, 3, 9 ]"
            :defaultValues="[ 3 ]"
            @cancel="isShow.isAppointPickerShow = false"
            @submit="isShow.isAppointPickerShow = false"></AppointPicker>
```

![](.\img\AppointPicker.V2_02.png)



### 4. 监听滑动过程中值变

1. 注册事件 `changeValues`

```html
<AppointPicker ref="apt"
            v-show="isShow.isAppointPickerShow"
            :title="'预约完成时间'"
            :unit="'month stalls'"
            @changeValues="changeValues"
            @cancel="isShow.isAppointPickerShow = false"
            @submit="isShow.isAppointPickerShow = false"></AppointPicker>
```
```js
changeValues( val ) {
	console.log('aptValues:', val);
}
```


2. 监听 `vm` 实例对象属性 `values`

```vue
<AppointPicker ref="apt"
            v-show="isShow.isAppointPickerShow"
            :title="'预约完成时间'"
            :unit="'month stalls'"
            @cancel="isShow.isAppointPickerShow = false"
            @submit="isShow.isAppointPickerShow = false"></AppointPicker>
```

```js
data() {
	return {
		values: undefined,
	}
},
mounted() {
	let apt;
	if ( apt = this.$refs.apt ) {
		this.values = apt.values;
	}
},
      
watch: {
	values( val ) {
		console.log('aptValue:', val);
	},
},
```


### 5. 设定默认值

修改 `defaultValues`



---



## Props

|     参数      |                             说明                             |   类型   | 可选值 |             默认值             |
| :-----------: | :----------------------------------------------------------: | :------: | :----: | :----------------------------: |
|     title     |                            标题栏                            |  String  |  可选  |                                |
|     apre      |             副标题栏, 不需要副标题请设置为 null              |  String  |  可选  |     已预约,xx时x分完成制作     |
|     unit      |                        文本后面的单位                        |  String  |  可选  |       "' hour  minutes'"       |
| defaultValues |                2列选择器的默认值, 长度必须为2                |  Array   |  可选  | 不设定, 设置错误缺省选中第三个 |
|    @cancel    |                   左边按钮的点击事件(取消)                   | Function |  可选  |                                |
|    @submit    |                   右边按钮的点击事件(确定)                   | Function |  可选  |                                |
|  valuesLeft   | 自定义左边数组, 只在初始化有效, 动态修改请使用$set方法或者mint-ui/picker提供的setValues方法 |  Array   |  可选  |                                |
|  valuesRight  | 自定义右边数组, 只在初始化有效, 动态修改请使用$set方法或者mint-ui/picker提供的setValues方法 |  Array   |  可选  |                                |
|  cancelWord   | 自定义左边按钮文字, 字体颜色默认主题色, 具体使用请看ConfirmBox.vue 组件说明 |  String  |  可选  |        例: "'add red'"         |
|  submitWord   | 自定义右边边按钮文字, 字体颜色默认主题色, 具体使用请看ConfirmBox.vue 组件说明 |  String  |  可选  |       例: "'delete red'"       |

## LESS
> 提供的功用样式, 可在其他引用 `mint-ui` 的 `picker` 组件时使用, 已经通过 UI 检视
+ 样式地址: `...\H5_project\static\css\module\AppointPicker.V2\style.less` 



## 预览



## 备注

| 责任人（工号）     | 时间      | 说明     |
| ------------------ | --------- | -------- |
| 庄萍华 <zwx518614> | 2018/4/17 | 代码检视 |
