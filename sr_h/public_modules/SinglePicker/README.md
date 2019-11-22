# SinglePicker
> 选择器, 单列
>
> 依赖于 `AppointPicker.V2.vue` 组件, 样式也是引用 `AppointPicker.V2.vue`



## 例子

### 1. 自定义步长

步长可以不设置 `:area="[ 0, 24 ]"`, 缺省值为 1

```vue
<SinglePicker
            v-show="isShow.isSingleChooseShow"
            :title="'电机档位'"
            :area="[ 0, 24, 2 ]"
            :defaultValue="24"
            :unit="'stalls'"
            @cancel="isShow.isSingleChooseShow = false"
            @submit="SinglePickerSubmit"></SinglePicker>
```

![](.\img\SinglePicker_01.png)



### 2. 自定义数组

```html
<SinglePicker
            v-show="isShow.isSingleChooseShow"
            :title="'电机档位'"
            :values="[ 1, 2, 0, 34, 24, 9, 0 ]"
            :unit="'stalls'"
            @cancel="isShow.isSingleChooseShow = false"
            @submit="SinglePickerSubmit"></SinglePicker>
```
![](.\img\SinglePicker_02.png)

### 3. 监听滑动过程中值变化

请看 `AppointPicker.V2` 组件



### 4. 设定默认值

修改父组件的 `defalutValue` 值

---



## Props

|     参数     |                             说明                             |       类型       | 可选值 |             默认值             |
| :----------: | :----------------------------------------------------------: | :--------------: | :----: | :----------------------------: |
|    title     |                            标题栏                            |      String      |  可选  |                                |
|     apre     |                           副标题栏                           |      String      |  可选  |                                |
|     unit     |                        文本后面的单位                        |      String      |  可选  |       "' hour  minutes'"       |
|    area *    | 区域, 必须为数组, 第一个为起始位置, 第二个为结束位置, 第三个为步长, 缺省为 1. 修改请使用 $set 方法修改, 可以触发页面更新 |     Array(3)     |  必须  |      例: "'[ 0, 24, 2 ]'"      |
| defaultValue |                      1列选择器的默认值                       | Number \| String |  可选  | 不设定, 设置错误缺省选中第三个 |
|   @cancel    |                   左边按钮的点击事件(取消)                   |     Function     |  可选  |                                |
|   @submit    |                   右边按钮的点击事件(确定)                   |     Function     |  可选  |                                |
|    values    | 自定义数组, 只在初始化有效, 动态修改请使用$set方法或者mint-ui/picker提供的setValues方法 |      String      |  必须  |                                |
|  cancelWord  | 自定义左边按钮文字, 字体颜色默认主题色, 具体使用请看ConfirmBox.vue 组件说明 |      String      |  可选  |        例: "'add red'"         |
|  submitWord  | 自定义右边边按钮文字, 字体颜色默认主题色, 具体使用请看ConfirmBox.vue 组件说明 |      String      |  可选  |       例: "'delete red'"       |



## 预览




## 备注
| 责任人（工号）     | 时间      | 说明     |
| ------------------ | --------- | -------- |
| 庄萍华 <zwx518614> | 2018/4/17 | 代码检视 |
