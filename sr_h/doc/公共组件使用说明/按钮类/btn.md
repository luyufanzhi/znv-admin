#### 1. 底部删除按钮
```html
<div class="btn-container">
	<div class="btn btn-large" @click="btnDelete">去连接网络</div>
</div>
```

![](./modulePic/btn_01.png)



#### 2. 头部的 `tab-bar`

```html
<div class="tab-bar">
	<div class="wrap">
		<ul class="tab-bar-container">
				<li class="tab-bar-item">食谱</li>
				<li class="tab-bar-item">做法</li>
			<li class="tab-bar-item active">DIY</li>
		</ul>
	</div>
</div>
```

```css
@import url(".../hi_home/static/css/btn/tab-bar.less");
```



![](./modulePic/tab-bar_01.png)

---



#### 按钮颜色

> 默认颜色为浅蓝色

`class="btn btn-danger"`

![](./modulePic/btn_02.png)

`class="btn btn-primary"`

![](./modulePic/btn_04.png)

`class="btn btn-defaulut"`

![](./modulePic/btn_05.png)

---



#### 按钮特效

> btn 默认自带了这个样式

点击置灰 `class="btn btn-mask"`

![](./modulePic/btn_03.png)

---



### btn-small

