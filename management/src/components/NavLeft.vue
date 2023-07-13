<template>
    <div>
        <h1 class="tittle">邦达国际物流平台</h1>
        <el-menu 
        :router="true"
        background-color="#001529"
        text-color="#fff"
        >
            <menus-vue v-for="(item,index) in menuData" :menu="item" :key="index"></menus-vue>
        </el-menu>
    </div>
</template>

<script>
import { get } from '@/utils/http';
import MenusVue from './MenusVue.vue';
    export default {
        components:{MenusVue},
        data(){
            return {
                menuData: []
            }
        },
        created(){
            this.getMenu()
        },
        methods:{
            async getMenu() {
                 let {data} = await get('/menu')
                 this.menuData = data
            }
        }
    }
</script>

<style lang="less" scoped>
.tittle {
    line-height: 50px;
    color: #fff;
    text-align: center;
}
</style>