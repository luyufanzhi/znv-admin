# WarnBox
> 警告提示弹窗
>
> 依赖于 `ConfirmBox.vue` 组件



## 例子

### 1. 基本使用,

+ #### 带有 `icon` 图片

```vue
<WarnBox
            v-show="isShow.isWarnBoxShow"
            :word="'我知道了 red'"
            :src="'./static/images/icon_Power_on.png'"
            @cancel="isShow.isWarnBoxShow = false"
            @submit="isShow.isWarnBoxShow = false">

	这是一个寂寞的天, 下着有些伤心的雨.
</WarnBox>
```

![](.\img\WarnBox_01.png)

+ #### 不带有图片

```vue
<WarnBox
	v-show="isShow.isWarnBoxShow"
	:word="'我知道了'"
	@cancel="isShow.isWarnBoxShow = false"
	@submit="isShow.isWarnBoxShow = false">

	这是一个寂寞的天, 下着有些伤心的雨.
</WarnBox>
```

![](.\img\WarnBox_02.png)



### 2. 自定按钮文字与文字颜色

方法同 `ComfirmBox` 组件一样



## Props

|  参数   |                      说明                       |   类型   | 可选值 | 默认值 |
| :-----: | :---------------------------------------------: | :------: | :----: | :----: |
|  word   | 按钮文字, 可以修改颜色, 修改方法同 `ComfirmBox` |  String  |  必须  |        |
|   src   |                    图片路径                     |  String  |  可选  |        |
| @submit |            右边按钮的点击事件(确定)             | Function |  可选  |        |



## 预览




## 备注
| 责任人（工号）     | 时间      | 说明     |
| ------------------ | --------- | -------- |
| 庄萍华 <zwx518614> | 2018/4/17 | 代码检视 |
