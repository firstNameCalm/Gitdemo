<template>
    <div>
        <el-container>
            <el-aside width="200px" class="aside">
                <nav-left></nav-left>
            </el-aside>
            <el-container>
                <el-header class="head">
                    <top-header></top-header>
                </el-header>
                <el-main class="main">
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive"></router-view>
                    </keep-alive>
                    <router-view v-if="!$route.meta.keepAlive"></router-view>         
                </el-main>
                <el-footer class="foot">
                    京ICP备88888888号 公安啊8888888888
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import NavLeft from '@/components/NavLeft.vue'
import TopHeader from '@/components/TopHeader.vue'
export default {
    components:{NavLeft,TopHeader}
}
</script>

<style lang="less" scoped>
.head{
    background-color: #fff;
    line-height: 60px;
    box-shadow: 0 5px 4px rgba(0, 21, 41, 0.3);
}
.aside{
    background-color: #001529;
    height: 100vh;//当你父级是body 百分比是不生效的
}
.main{
    height: 70vh;
    background-color: #e9eef3;
}
.foot{
    text-align: center;
    font-size: 12px;
    color: #999;
    line-height: 60px;
    background-color: #e9eef3;

}
</style>