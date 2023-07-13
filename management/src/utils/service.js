// 封装axios
import axois from 'axios'
import { Message } from 'element-ui'
import { getToken } from './auth'
const service = axois.create({
    baseURL:'http://localhost:8080', // 由于每个请求，都有相同的请求地址
    timeout:5000
})
// axios({
//     method:'post',
//     url:'http://localhost:8080/login',
//     data:this.ruleForm // 参数与提交的参数一致的简写
// }).then((res)=>{
//     console.log(res.data);
// })
// 请求拦截器
service.interceptors.request.use((config)=>{
    if(getToken()){ // 因为登录请求不需要携带token(而是需要等他返回token)
        config.headers.token=getToken()
    }
    return config
},()=>{ // 请求拦截器也是有第二个参数
    Message({
        type:'error',
        message:'拦截请求错误'
    })
    return Promise.reject(new Error('请求错误'))
})

// 响应拦截器
service.interceptors.response.use((res)=>{
    console.log(res);
    const result = res.data
    if(result.success){ // 这里是请求是通了 就是判断后端返回的参数是否正确
        console.log(1);
        return result 
    }else{
        console.log(2);
        Message({
            type:'error',
            message:result.message||'错误'
        })
        return Promise.reject(new Error(result.message||'错误'))
    }
},()=>{ // 响应拦截器的第二个函数是代表请求都没通
    console.log(3);
    Message({
        type:'error',
        message:'请求错误'
    })
    return Promise.reject(new Error('请求错误'))
})







export default service