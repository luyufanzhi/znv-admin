<template>
    <div class="mod">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
.mod{
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #0675d9;
  background-color: #0f2a4c;
  box-shadow: 0px 0px 30px #13578f inset;
  height: 74.6vh;
  padding: 15px 20px 18px;
  box-sizing: border-box;
  overflow-y: auto;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: transparent;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 3px;
  background-color: transparent;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background: rgba(47, 184, 255, 1);
}
</style>