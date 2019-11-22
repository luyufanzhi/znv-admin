<template>
   
        <el-pagination class="mt20"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size='pageSize'
                layout=" pager, next,slot"
                :total="total">
                <span>共{{total}}页</span>
            </el-pagination>
    
</template>

<script>
export default {
    props: {
        pageSize: {
            type: Number,
            default: 10
        },
        total: {
            type: Number,
            default: 0
        },
        pageNum: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            currentPage: 1
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.$emit('handleCurrentChange', val)
        }
    },
    watch: {
       pageNum: {
           immediate: true,
           handler(val) {
            if(val !== this.currentPage) {
                this.currentPage = val
            }
        }
       }
    }
}
</script>

<style lang="less">
.el-pagination{
    float:right;
    .el-pager li{
        color: #49D0EC;background:transparent;min-width:auto;padding:0 @w10;font-size:@h18;
        &.active{
            color: #fff;
        }
    }
    .btn-next{
        background: transparent !important;color:#666;padding-left:0;
    }
    span{
        color: #49D0EC;
    }
}
// .block .el-pagination{
//     display: flex;
//     justify-content: flex-end;
//     color: #49d0ec !important;
//     font-size: 1.6vh !important;
// }
// .block .el-pager li.btn-quicknext,
// .block .el-pager li.btn-quickprev,
// .block .el-pagination .btn-next,
// .block .el-pagination .btn-prev{
//     color: #49d0ec !important;
//     font-size: 1.6vh !important;
// }
// .block .el-pager li,
// .block .el-pagination .btn-next,
// .block .el-pagination .btn-prev{
//     background: transparent !important;
// }
// .block .el-pager li.active{
//     color: #ffffff  !important;
// }
</style>
