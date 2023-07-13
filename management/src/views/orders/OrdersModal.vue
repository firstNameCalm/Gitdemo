<template>
    <div>
        <el-dialog :title="title" :visible="visible" width="30%" :before-close="close">
            <el-row :gutter="20">
                <el-form :model="ruleFrom" label-width="80px" :rules="rules" ref="ruleForm">
                    <el-col :span="12">
                        <el-form-item label="客户名称" prop="name">
                            <el-input v-model="ruleFrom.name"></el-input>
                        </el-form-item>
                        <el-form-item label="起始城市" prop="start">
                            <el-input v-model="ruleFrom.start"></el-input>
                        </el-form-item>
                        <el-form-item label="目的城市" prop="end">
                            <el-input v-model="ruleFrom.end"></el-input>
                        </el-form-item>
                        <el-form-item label="货物名称" prop="cargo">
                            <el-input v-model="ruleFrom.cargo"></el-input>
                        </el-form-item>
                        <el-form-item label="件数" prop="count">
                            <el-input v-model="ruleFrom.count"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="单位" prop="unit">
                            <el-input v-model="ruleFrom.unit"></el-input>
                        </el-form-item>
                        <el-form-item label="运费" prop="price">
                            <el-input v-model="ruleFrom.price"></el-input>
                        </el-form-item>
                        <el-form-item label="订单来源" prop="from">
                            <el-radio-group v-model="ruleFrom.from">
                                <el-radio label="移动端">移动端</el-radio>
                                <el-radio label="pc端">pc端</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="是否支付" prop="pay">
                            <el-radio-group v-model="ruleFrom.pay">
                                <el-radio :label="1">已支付</el-radio>
                                <el-radio :label="2">未支付</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// mapMutations
import {post} from '@/utils/http'
import { mapState, mapMutations} from 'vuex'
export default {
    props:['visible'],// props修改需要通知传过来的组件
    data(){
        return {
            title:'新建订单',
            ruleFrom:{ //这里是双向绑定的数据
                name:'',//客户名称
                start:'',
                end:'',
                cargo:'',
                pay:'',
                price:'',
                count:'',
                unit:'',
                from:''
            },
            rules:{ //这里是每个表单定义的规则
                name:[
                    {required:true,message:'不能为空',trigger:'blur'}
                ],
                start:[
                    {required:true,message:'不能为空',trigger:'blur'}
                ],
                end:[
                    {required:true,message:'不能为空',trigger:'blur'}
                ],
                cargo:[
                    {required:true,message:'不能为空',trigger:'blur'}
                ],
                count:[
                    {required:true,message:'不能为空',trigger:'blur'},
                    {pattern:/^\d+$/,message:'只能为数字',trigger:'blur'}

                ],
                unit:[
                    {required:true,message:'不能为空',trigger:'blur'}
                ],
                price:[
                    {required:true,message:'不能为空',trigger:'blur'}
                ],
                from:[
                    {required:true,message:'不能为空',trigger:'change'}
                ],
                pay:[
                    {required:true,message:'不能为空',trigger:'change'}
                ],
            }
        }
    },
    methods:{
        ...mapMutations(['setRow']),
        close(){
            this.$emit("hide")
            this.$refs.ruleForm.resetFields()
            this.setRow({})
        },
        save(){
            this.$refs.ruleForm.validate((valid)=>{
                if(valid) {
                    post('/addOrder',this.ruleFrom).then(()=>{
                        this.$notify({
                            title:'操作成功',
                            type:'success'
                        })
                        this.close()
                        this.$emit('reload')
                    })
                }
            })
        }
    },
    computed:{...mapState(['row']),},
    
    watch:{
        visible(){ //监听子组件中的props属性，把vuex存的数据渲染到表单里面
            const {name,start,end,cargo,pay,count,price,unit,from} = this.row
            this.ruleFrom = {name,start,end,cargo,pay,count,price,unit,from}
            this.title = name?'编辑订单':'新建订单'
        }
    }
}
</script>

<style lang="less" scoped></style>