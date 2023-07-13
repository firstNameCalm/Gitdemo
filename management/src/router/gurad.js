import router from "./index";
import { getToken } from "@/utils/auth";
router.beforeEach((to,from,next)=>{
    const hasToken = getToken()
    if(hasToken) {
        if(to.path=='/login') { // 如果你有token 还去登录页， 我就让你去首页
            next('/')
        }else{
            next()
        }
    }else{
        if(to.path == '/login'){
            next()
        }else{
            next('/login')
        }
    }
})