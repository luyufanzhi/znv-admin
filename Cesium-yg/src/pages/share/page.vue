<template>
    <div class="block">
    
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="5"
      layout=" pager, next,slot"
      :total="50">
      <span>共{{totalPage}}页</span>
    </el-pagination>
    
    
  </div>
</template>

<script>
    export default {
        data() {
            return {
                currentPage1: 1,
                totalPage:10
            }
        },
         methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
    }
</script>

<style >
 .el-pagination{
    display: flex;
    justify-content: flex-end;
}
 .el-pagination,
 .el-pager li.btn-quicknext,
 .el-pager li.btn-quickprev,
 .el-pagination .btn-next, 
 .el-pagination .btn-prev{
    color: #49d0ec !important;
    font-size: 1.6vh !important;
}
 .el-pager li,
 .el-pagination .btn-next,
 .el-pagination .btn-prev{
    background: #0f2a4c !important;
}
 .el-pager li.active{
    color: #ffffff  !important;
}
</style>