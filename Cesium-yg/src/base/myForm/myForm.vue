<template>
    <el-form :model="model" status-icon ref="form" @submit.native.prevent
            :rules="rules"    
            :label-width="_labelWidth">
        <el-form-item :label="item.label" v-for="(item, index) in formItems" :key=index  :prop="item.name" :style="_itemSpace">
            <template v-if="item.type==='select'">
                    <el-select  v-model="model[item.name]" clearable filterable 
                                @change="changeSelect" 
                                :placeholder="item.placeholder" 
                                :style=getStyle(item.width)>
                        <template v-for="(option, optionIndex) in item.options" >
                            <el-option :label="option.key" :value="option.value" :key=optionIndex></el-option>
                        </template>
                    </el-select>
            </template>

            <template v-else-if="item.type==='date'">
                <el-date-picker type="datetime" placeholder="选择日期" 
                                value-format="yyyy-MM-dd HH:mm:ss" 
                                v-model="model[item.name]" 
                                :style=getStyle(item.width)
                                ></el-date-picker>
            </template>

            <template v-else-if="item.type==='slot'">
                <slot :name="item.name"></slot>
            </template>

            <template v-else-if="item.type==='radios'">
                <el-radio-group v-model="model[item.name]">
                    <el-radio  v-for="(item, index) in item.options" :key='index' :label="item.label"></el-radio>
                </el-radio-group>
            </template>

            <template v-else-if="item.type==='range'">
                <div class="range-box">
                    <el-input v-model="model[item.min]" :style="rangeInputWidth"></el-input>
                    <span></span>
                    <el-input v-model="model[item.max]" :style="rangeInputWidth"></el-input> 
                </div>
            </template>

            <template v-else>
                <el-input :type="item.type" v-model="model[item.name]" :style=getStyle(item.width)  :placeholder="item.placeholder" ></el-input>
            </template>
        </el-form-item>
        <div class="confirm-btns">
            <template v-if="formBtns.length>0">
                <button v-for="(btn, index) in formBtns" :key=index :class="btn.class" @click="onSubmit">{{btn.text}}</button>
            </template>
            <button v-else class="mt10" @click="onSubmit">确定</button>
        </div>
    </el-form>
</template>

<script>

export default {
    props: {
        model: {
            required: true,
            type: Object,
        },
        formItems: {
            required: true,
            type: Array,
        },
        rules: {
            type: Object,
            default: () => {}
        },
        labelWidth: {
            type: Number,
            default: 85
        },
        formBtns: {
            type: Array,
            default: () => []
        },
        itemSpace: {        //form-item之间的间隙 
            type: Number,
            default: 20
        }
    },
    methods: {
        changeSelect(){},
        getStyle(width){
            let style = ""
            if(!width) {
                style = "width:100%"
            }else{
                style = parseInt(this.getCurrentPx(width))+'px'
            }
            return style
        },
        onSubmit() {
            this.$refs.form.validate(flag => {
                this.$emit('handleSubmit')
            }) 
        }
    },
    computed: {
        _labelWidth() {
            let width = Math.max(parseInt(this.getCurrentPx(this.labelWidth)), 70)
            return width+'px'
        },
        rangeInputWidth() {
            return {width: parseInt(this.getCurrentPx(74))+'px'}
        },
        _itemSpace() {
            return {marginBottom:parseInt(this.getCurrentPx(this.itemSpace))+'px'}
        }
    }
}
</script>

<style lang="less" scoped>
@w65: .px2vw(65)[@result];
@w14: .px2vw(14)[@result];
@h38: .px2vh(38)[@result];
@h32: 32px;

/deep/ .el-form{
    padding-right:@w40;
    .el-form-item__content{
        height:@h32;line-height:@h32;
    }
    .el-form-item__label{
        color: @color-blue;
    }
    .el-input__inner,.el-textarea__inner{
        background:transparent;
        border-radius:2px;
        border:1px solid rgba(50,170,255,1);
        color:#fff;
        padding-left:@w14;
        height:@h32;line-height:@h32;
    }
    .el-form-item{
        margin-bottom: @h20;
        &.is-required{
            position:relative;
            &:after{
                right:-@w40;content:"*";
                color:#fff;font-size:@w30;position:absolute;top:@h10;
            }
            .el-form-item__label:before{
                display:none;
            }
        }
    }
    
    
}

/deep/ .el-date-editor{
    .el-input__prefix{
        right: 0;left:auto;
        width:@w40;
        background:@btnGradient;
    }
    .el-input__suffix{
        right: @w50;
    }
}
/deep/ .el-select{
    .el-input__suffix{
        right: 0;left:auto;
        width:@w40;
        background:@btnGradient;
    }
}
/deep/ .el-radio-group{
    .el-radio{
        color:#fff;
        .el-radio__input{
            .el-radio__inner{
                background:rgba(0,45,107,1);
                border-color:rgba(66,195,255,1);
            }
            
            &.is-checked {
                .el-radio__inner:after{
                    width:10px;height:10px;background:#00EAFF;
                }
                &+.el-radio__label{
                    color:#fff;
                }
            }
        }
    }
}

.confirm-btns{
    text-align:center;
    button{
        height:@h38;background:@btnGradient;color:#fff;line-height:@h38;text-align:center;
        border:0px none;margin-left:auto;display:block;margin-right:auto;
        &.full{
            width:100%;
        }
        &.inline{
            display: inline-block;
            margin-right:20px;
        }
    }
}

.range-box{
    span{
        width:11px;height:2px;background:#42C3FF;vertical-align:middle;display:inline-block;margin:0 10px;
    }
}


</style>
