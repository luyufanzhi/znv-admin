# CellBox
> cell 组件
>
> 依赖于 `mint-ui` 的 `switch` 组件



## 例子

### 1. 无 `switch` 按钮

```vue
<CellBox v-for=" i in 10" :key="i"
                :title="'title'"
                :label="'label'"
                :icon="'图片路径'"
                :is-link="'右边是否有箭头'"
                :value="'value'"></CellBox>
```

![全部](.\img\CellBox_01.png)



### 2. 有 `switch`

```html
<CellBox v-for=" i in 10" :key="i"
                :title="'title'"
                :switchValue.sync="value"></CellBox>
```
![](.\img\CellBox_02.png)

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

|    参数     |           说明           |  类型  | 可选值 | 默认值 |
| :---------: | :----------------------: | :----: | :----: | :----: |
|    title    |          标题栏          | String |  可选  |        |
|    label    |         副标题栏         | String |  可选  |        |
|   is-link   |      右边是否有箭头      | String |  可选  |        |
|    value    |        右边的描述        | String |  可选  |        |
|    icon     |   左边 `icon` 图片路径   | String |  可选  |        |
| switchValue | 右边是否有 `switch` 开关 | String |  可选  |        |



## 预览




## 备注
| 责任人（工号）     | 时间      | 说明     |
| ------------------ | --------- | -------- |
| 庄萍华 <zwx518614> | 2018/4/17 | 代码检视 |
