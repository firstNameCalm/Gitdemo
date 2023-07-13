<template>
    <div>
        <el-row type="flex" justify="center">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <h2>蚂蚁金融后台管理系统</h2>      
                </div>
                <el-form 
                :model="ruleForm" 
                :rules="rules" ref="ruleForm" 
                label-width="80px" 
                class="demo-ruleForm">
                    <el-form-item label="用户名:" prop="username">
                        <el-input v-model.trim="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码:" prop="password">
                        <el-input v-model.trim="ruleForm.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="btn" @click="login" :loading="loading">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-row>

    </div>
</template>

<script>
import {post} from '@/utils/http.js' // 由于我们这里需要用到post请求
import {setToken} from '@/utils/auth'
export default {
    data(){
        return{
            ruleForm:{
                username:'',
                password:''
            },
            loading:false,
            rules:{
                username:[
                    {required:true,message:'用户名不能为空',trigger:'blur'},
                    {pattern:/^\w{4,6}$/,message:'要求是6位纯数字',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'密码不能为空',trigger:'blur'},
                    {pattern:/^\d{6}$/,message:'密码是6位纯数字',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        login(){
            this.$refs.ruleForm.validate((valid)=>{
                if(valid){ // 这个是组件给我定义应该满足表单条件的
                    // 满足表单验证条件我们就要发请求了
                    // axios({
                    //     method:'post',
                    //     url:'http://localhost:8080/login',
                    //     data:this.ruleForm // 参数与提交的参数一致的简写
                    // }).then((res)=>{
                    //     console.log(res.data);
                    // })
                    this.loading = true
                    post('/login',this.ruleForm).then((res)=>{
                        setToken(res.token)
                        sessionStorage.setItem('nickname',res.nickname)
                        this.loading = false
                        this.$router.push('/')
                    }).catch((error)=>{
                        this.loading = false

                        console.log(error)
                    })
                }
            })
        },
    }

}
</script>

<style lang="less" scoped>
    .box-card{
        width: 600px;
        margin-top: 200px;
        h2{
            text-align: center;
        }
        .btn{width: 100%;}
    }
    
</style>