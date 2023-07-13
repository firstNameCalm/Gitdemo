<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="mt" :body-style="{ padding: '10px' }" style="padding-left: 5px;">
            <el-row>
                <el-col :span="10" style="line-height: 32px;">运单编号:YGC20170110000001 我是传过来的数据{{title}}</el-col>
                <el-col :span="2" class="fr">
                    <el-button type="primary" size="medium" @click="back">返回</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-steps :active="2" align-center>
                <el-step title="未发货" ></el-step>
                <el-step title="运输中" ></el-step>
                <el-step title="已收货" ></el-step>
                <el-step title="已完成" ></el-step>
            </el-steps>
        </el-card>
        <el-card class="mt">
            <el-row>
                <h2>基础信息</h2>
                <el-col :span="6">
                    <p>客户名称:诺莱科技有限公司</p>
                    <p>货物名称:口罩</p>
                    <p>数量:8吨</p>
                </el-col>
                <el-col :span="6">
                    <p>客户名称:诺莱科技有限公司</p>
                    <p>货物名称:口罩</p>
                    <p>数量:8吨</p>
                </el-col>
                <el-col :span="6">
                    <p>客户名称:诺莱科技有限公司</p>
                    <p>货物名称:口罩</p>
                    <p>数量:8吨</p>
                </el-col>
                <el-col :span="6">
                    <p>客户名称:诺莱科技有限公司</p>
                    <p>货物名称:口罩</p>
                    <p>数量:8吨</p>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
                <h2>基础信息</h2>
                <el-col :span="6">
                    <p>货物名称:口罩</p>
                    <p>数量:8吨</p>
                </el-col>
                <el-col :span="6">
                    <p>货物名称:口罩</p>
                    <p>数量:8吨</p>
                </el-col>
                <el-col :span="6">
                    <p>货物名称:口罩</p>
                    <p>数量:8吨</p>
                </el-col>
                <el-col :span="6">
                    <p>货物名称:口罩</p>
                    <p>数量:8吨</p>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
                <h2>基础信息</h2>
                <el-col :span="6">
                    <p>货物名称:口罩</p>
                    <p>数量:8吨</p>
                </el-col>
                <el-col :span="6">
                    <p>货物名称:口罩</p>
                    <p>数量:8吨</p>
                </el-col>
                <el-col :span="6">
                    <p>货物名称:口罩</p>
                    <p>数量:8吨</p>
                </el-col>
                <el-col :span="6">
                    <p>货物名称:口罩</p>
                    <p>数量:8吨</p>
                </el-col>
                
            </el-row>
            <el-divider></el-divider>
        </el-card>
    </div>
</template>

<script>
import breadCrumb from '@/mixins/breadCrumb'
import { mapMutations } from 'vuex'
    export default {
        mixins: [breadCrumb],
        data(){
            return{
                title:this.$route.query.no
            }
        },
        methods:{
            ...mapMutations(['ChangeIsFromDetail']),
            back(){
                this.$router.push('/waybill/list')
            }
        },
        // 这里由于用户会在详情页 直接跳转到别的页面(原先的页面数据还在缓存中)导致无法重新刷新
        beforeRouteLeave(to,from,next){ 
            if(to.path=='/waybill/list'){ // 如果你是返回
                this.ChangeIsFromDetail(true) //vuex中的数据作为标记
            }else{
                this.ChangeIsFromDetail(false)
            }
            next()
        }
    }
</script>

<style lang="less" scoped>

</style>