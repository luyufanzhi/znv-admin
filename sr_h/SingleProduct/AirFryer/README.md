# 104Y 空气炸锅

+ 2018.04.20 前完成 App 开发.
+ 2018.04.21 开始联调.

# 会议记录

+ 跳过预热不再修改预热时间, 默认 30 分钟, 无需下发 30
+ leftTime 是分钟

## 目前缺少的

+ 高保真
+ 菜谱图
+ 详情页的信息( 九宫格图片 )
+ iftt的信息
+ 菜谱指令表

## 待解决

+ 预约时间修改成相对时间
+ 下发的菜谱 id 不再按照 profile 下发, 需要提供一份指令表
+ leftTime 单位是秒还是分 ( 已经解决 )
    - 结果: 分钟. 也就是本地不再倒计时

## 未完成的功能

+ 预约提示栏以及置灰页面
+ 提示栏改成 H5
+ 设置页面与错误页面
+ 路由切换的动画





## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
