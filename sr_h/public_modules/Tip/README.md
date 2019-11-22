#Tip
> 提示或者警告横条栏

## 例子
```javascript
<tip :messageList="messageList" :bgColor='bgColor' @toDetail="tap"></tip>
```
```javascript
import Tip from 'Tip'

  export default {
    name: 'home',
    components: {
      Tip
    },
    data() {
      return {
        messageList: [
          {word: "当前音源无法播放", type: 1},
          {word: "电池电量不足20%，请及时充电", type: 1},
          {word: "已开启定时休眠，于休眠", type: 0}
        ]
      }
    },
    methods: {
      tap(index) {
        console.log(index) //打印点击栏目的下标
      }
    }
  }
```

## Api
| 参数          | 说明    | 类型           | 可选值  | 默认值     |
| ----------- | ----- | ------------ | ---- | ------- |
| messageList | 数组集合  | Array(obj集合) |      |         |
| bgColor     | 背景颜色值 | String       |      | #FCEBE8 |

### messageList（obj集合）
| 参数   | 说明          | 类型     | 可选值         | 默认值  |
| ---- | ----------- | ------ | ----------- | ---- |
| word | 提示或警告文字     | String |             |      |
| type | 提示类型（提示/错误） | Number | 1（错误）,0（提示） |      |


##Event

| 名称       | 说明     | 返回值            |
| -------- | ------ | -------------- |
| toDetail | 栏目点击事件 | index(点击栏目的下标) |

## 预览
  ![Tip](https://obs.myhwclouds.com/iot.mbb.web/user/wangliwei/pic_component/Tip.gif)

## 注意事项
  > 最多支持3条信息展示

## 备注
| 责任人（工号）       | 时间       | 说明   |
| ------------- | -------- | ---- |
| 罗纯<lwx519950> | 2018/4/4 | Tip  |