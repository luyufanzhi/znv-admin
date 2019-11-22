# 竖向tab栏

```js
important "base/columTab"
```



## 属性

|  属性   |        意义        |     类型      |             备注             |
| :-----: | :----------------: | :-----------: | :--------------------------: |
|  data   |     导航栏数据     | Array<object> | [ { name: '重点关注渔港' } ] |
| v-model | 双向绑定导航栏索引 |    Number     |                              |

### data

| 属性  |      意义      |  类型  | 备注 |
| :---: | :------------: | :----: | :--: |
| name  |  tab栏的内容   | String |      |
| class | 内容区域的类名 | String |      |

## 插槽

slot="slot-{Number}" 

```html
// slot-{索引值}, 0-n
<div slot="slot-2">
    333333333
</div>
```



