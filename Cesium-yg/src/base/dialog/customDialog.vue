<template>
    <el-dialog :visible.sync="isShowMe" 
                :title="title" 
                :width="_width" 
                :class="{'no-title-line': isShowTitleLine}">
        <slot></slot>
    </el-dialog>
</template>

<script>
export default {
    props: {
        isShow: {
            required: true,
            type: Boolean,
        },
        title: {
            type: String,
        },
        isShowTitleLine: {
            type: Boolean,
            defualt: true
        },
        width: {
            default: "50%"
        }
    },
    data() {
        return {
            isShowMe: false
        }
    },
    computed: {
        _width() {
            let width = "50%"
            if(this.width.indexOf('%') > -1 || this.width.indexOf('px') > -1) {
                width = this.width
            }else{
                width = parseInt(this.getCurrentPx(this.width))+'px'
            }
            
            return width
        }
    },
    watch: {
        isShow: {
            immediate: true,
            handler(val) {
                if(val) {
                    this.isShowMe = true
                }
            }
        },
        isShowMe(val) {
            if(!val) {
                this.$emit('update:isShow', false)
            }
        }
    }
}
</script>

<style lang="less" scoped>

@h14: .px2vh(14)[@result];
@h16: .px2vh(16)[@result];

/deep/ .el-dialog__wrapper {
    .el-dialog{
        background: #072045;
        border: 1px solid @th-border;
        box-shadow: 0px 0px 32px 0px rgba(0,174,253,0.31);
        .el-dialog__body{
            padding: @w30 @w20;
        }
        .el-dialog__header{
            padding: 0 @w20;
            span.el-dialog__title{
                display:block;border-bottom:1px solid @border6;
                padding:@h14 0;font-size:@h16;color:#fff;
            }
            button.el-dialog__headerbtn {
                top:@h15;font-size:@w30;
                i{
                    color: rgba(255,255,255,0.5);font-size:@h20; 
                }
            }
        }
    }
    &.no-title-line .el-dialog {
        .el-dialog__body{
            padding-top:0;
        }
        .el-dialog__header span.el-dialog__title{
            border-bottom:0px none;
        } 
    }
}
</style>
