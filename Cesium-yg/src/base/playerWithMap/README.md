# 轨迹回放播放器带地图

其他模块下使用.

***轨迹播放的功能未完成.***



## 引用

由于后台不支持数据, 数据本地模拟, ajax 参数不用传.

```vue
<template>
    <player-map></player-map>
</template>

<script>
import PlayerWithMap from 'playerWithMap'

export default {
    components: {
        'player-map': PlayerWithMap
    }
}
</script>
```



## TODO

- [ ] 地图抽离纯净模式.
- [ ] 地图控制器改成类. ( 原本计划只有一个, 之后可能有多个. )
- [ ] 数据传递( 初始化 ), 订阅地址.



## 属性

| 属性      | 描述               | 类型    | 是否必须(否) | 默认值  | 备注                                          |
| --------- | ------------------ | ------- | ------------ | ------- | --------------------------------------------- |
| layer     | 是否加载图层       | Boolean |              | false   |                                               |
| subscribe | 订阅地址           | String  |              |         | 字段保留, 不传, 接受后台推送数据.             |
| ajax      | 获去初始化数据地址 | String  |              |         | 必须, 本地数据模拟. 后续是必须传的. |
| btns      | 右下角按钮         | String  |              | export  | 例: 'export\|time', 以 '\|' 分割              |
| camera    | 视角位置           | String  |              | default |                                               |



## 事件

| 事件名   | 描述         | 备注 |
| -------- | ------------ | ---- |
| play     | 播放         |      |
| pause    | 暂停         |      |
| stop     | 停止播放     |      |
| speed    | 快进         |      |
| back     | 快退         |      |
| complete | 播放完成     |      |
| publish  | 接收推送数据 |      |





## 方法

并不希望外界控制播放. 希望用户通过交互控制. 所以只提供部分方法.

| 方法    | 描述     | 参数             | 默认值  | 备注                  |
| ------- | -------- | ---------------- | ------- | --------------------- |
| setView | 改变视角 | ( type: String ) | default | 在配置文件下添加修改. |
| play    | 播放     |                  |         |                       |
| stop    | 停止     |                  |         |                       |
| pause   | 暂停     |                  |         |                       |
| speed   | 快进     |                  |         |                       |
| back    | 快退     |                  |         |                       |

视角配置文件:  ~/large-screen/home/config/position.js
