# ConfirmBox
> 普通弹窗



## 例子

### 1. 有标题栏和副标题

```vue
<ConfirmBox
            v-show="isShow.isConfirmBoxShow"
            :title="'预约完成'"
            :apre="'明天完成'"
            @cancel="isShow.isConfirmBoxShow = false"
            @submit="isShow.isConfirmBoxShow = false">
  
	这是一个寂寞的天
</ConfirmBox>
```

![全部](.\img\ConfirmBox_01.png)



### 2. 没有标题栏

```html
<ConfirmBox
            v-show="isShow.isConfirmBoxShow"
            :isorderSure="true"
            @cancel="isShow.isConfirmBoxShow = false"
            @submit="isShow.isConfirmBoxShow = false">
  
	这是一个寂寞的天
</ConfirmBox>
```
![](.\img\ConfirmBox_02.png)

### 3. 自定义按钮

>  设定 `class="btn btn-mask"` 可以继承基本样式

```html
<ConfirmBox
            v-show="isShow.isConfirmBoxShow"
            :cancelWord="'delete black'"
            :submitWord="'add red'"
            @cancel="isShow.isConfirmBoxShow = false"
            @submit="isShow.isConfirmBoxShow = false">

	这是一个寂寞的天
	<div slot="btn" class="btn" :style="{ width: '100%' }" @click.stop.prevent="isShow.isConfirmBoxShow = false">
		我知道了
	</div>
</ConfirmBox>
```
![](.\img\ConfirmBox_05.png)



### 4. 自定义按钮文字

```vue
<ConfirmBox
            v-show="isShow.isConfirmBoxShow"
            :submitWord="'add'"
            :cancelWord="'delete'"
            @cancel="isShow.isConfirmBoxShow = false"
            @submit="isShow.isConfirmBoxShow = false">

	这是一个寂寞的天
</ConfirmBox>
```

![](.\img\ConfirmBox_03.png)



### 5. 自定义按钮文字颜色

> 自定义颜色在内容后面添加颜色即可 `:submitWord="'add black'"`
>
> 默认颜色是主题色

```vue
<ConfirmBox
            v-show="isShow.isConfirmBoxShow"
            :submitWord="'add black'"
            :cancelWord="'delete red'"
            @cancel="isShow.isConfirmBoxShow = false"
            @submit="isShow.isConfirmBoxShow = false">

	这是一个寂寞的天
</ConfirmBox>
```

![](.\img\ConfirmBox_04.png)



---



## Props

|    参数    |                           说明                            |   类型   | 可选值 |         默认值         |
| :--------: | :-------------------------------------------------------: | :------: | :----: | :--------------------: |
|   title    |                          标题栏                           |  String  |  可选  |                        |
|    apre    |            副标题栏, 不需要副标题请设置为 null            |  String  |  可选  | 已预约,xx时x分完成制作 |
|  @cancel   |                 左边按钮的点击事件(取消)                  | Function |  可选  |                        |
|  @submit   |                 右边按钮的点击事件(确定)                  | Function |  可选  |                        |
| cancelWord |  自定义左边按钮文字, 具体使用请看ConfirmBox.vue 组件说明  |  String  |  可选  |    例: "'add red'"     |
| submitWord | 自定义右边边按钮文字, 具体使用请看ConfirmBox.vue 组件说明 |  String  |  可选  |   例: "'delete red'"   |



## 预览




## 备注
| 责任人（工号）     | 时间      | 说明     |
| ------------------ | --------- | -------- |
| 庄萍华 <zwx518614> | 2018/4/17 | 代码检视 |
