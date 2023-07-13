// 封装get 和 post 请求
// axios({
//     method:'post',
//     url:'http://localhost:8080/login',
//     data:this.ruleForm // 参数与提交的参数一致的简写 // 如果这里是get就是params
// }).then((res)=>{
//     console.log(res.data);
// })
import service from "./service";

export function get(url,params){ // 这里默认接收两个参数 一个是请求拼接的地址，一个是参数
    const config = {
        method:'get',
        url
    }
    if(params) {
        config.params = params
    }
    return service(config) // 返回get请求的结果，这里也就是promise 相当于axios().then
}
export function post(url,params){
    const config = {
        method:'post',
        url
    }
    if(params) {
        config.data = params
    }
    return service(config)
}