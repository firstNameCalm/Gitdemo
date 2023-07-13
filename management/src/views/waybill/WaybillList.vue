<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="mt">
            <el-row :gutter="16" >
                <el-col :span="6">
                    <el-input placeholder="请输入运单号" v-model="params.waybillNo"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入客户名称" v-model="params.name"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-date-picker
                        v-model="date"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        style="width: 100%;">
                    </el-date-picker>
                </el-col>
                <el-col :span="6" class="tr">
                    <el-button type="primary"  @click="loadData">查询</el-button>
                    <el-button type="primary">重置</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt"> 
            <el-radio-group v-model="params.status" @change="loadData">
                <el-radio-button label="1">全部运单(300)</el-radio-button>
                <el-radio-button label="2">装货中(120)</el-radio-button>
                <el-radio-button label="3">运输中(70)</el-radio-button>
                <el-radio-button label="4">已完成(100)</el-radio-button>
                <el-radio-button label="5">运单异常(10)</el-radio-button>
            </el-radio-group>
        </el-card>
        <el-card class="mt">
            <el-table :data="tableData" v-loading="loading">
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="no" label="运单号"></el-table-column>
                
                <el-table-column prop="date" label="下单时间"></el-table-column>
                <el-table-column prop="name" label="客户名称"></el-table-column>
                <el-table-column prop="cargo" label="货物名称"></el-table-column>
                <el-table-column prop="count" label="件数"></el-table-column>
                <el-table-column prop="start" label="起始城市"></el-table-column>
                <el-table-column prop="end" label="目的城市"></el-table-column>
                <el-table-column prop="price" label="运费"></el-table-column>
                <el-table-column prop="needRecive" label="需要接货"></el-table-column>
                <el-table-column prop="plateNumber" label="车牌号"></el-table-column>
                <el-table-column prop="driver" label="司机"></el-table-column>
                <el-table-column prop="tel" label="司机电话"></el-table-column>
                <el-table-column prop="percent" label="运输速度">
                    <template slot-scope="scope">
                        <el-progress :percentage="scope.row.percent"></el-progress>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="detail(scope.row.no)">详情</el-button>
                        <el-button size="mini" type="danger">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                class="mt mb fr"
                :current-page="pageData.page"
                :page-sizes="[10, 20, 30, 40]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
/*
<keep-alive>
    1.可以是component<component :is=b>在这里切换组件</component>    
    2.router-view
</kepp-alive>
*/
import breadCrumb from '@/mixins/breadCrumb'
import {post} from '@/utils/http'
import moment from 'moment'
import { mapState} from 'vuex'
    export default {
        mixins: [breadCrumb],
        created(){
            this.loadData()
        },
        data(){
            return{
                loading:false,
                tableData:[],
                params:{
                    waybillNo:'',
                    name:'',
                    status:'1',
                },
                date:[],
                pageData:{
                    page:1,
                    pageSize:10
                },
                total:0
            }
        },
        computed:mapState(['isFromDetail']),
        activated(){
            console.log('重新激活的使用');
            if(!this.isFromDetail){ // 做标记后，我们在组件挂载激活的时候，判断vuex数据
                this.loadData() // 重新请求数据
            }
        },
        deactivated(){
            console.log('失活的时候使用');
        },
        methods:{
            async loadData(){
                this.loading = true
                let startDate = this.date[0] ? moment(this.date[0]).format('YYYY-MM-DD') : ''
                let endDate = this.date[0] ? moment(this.date[1]).format('YYYY-MM-DD') : ''
                console.log(this.params.date);
                const res = await post('/waybillList',{...this.pageData,...this.params,startDate,endDate})
                this.tableData = res.data.list
                this.loading = false
                console.log(res);
                this.total = res.data.total // 总条数
                console.log(this.total);
            },
            handleSizeChange(val){
                this.pageData.pageSize = val
                this.loadData()
                console.log(val,1);
            },
            handleCurrentChange(val){
                this.pageData.page = val
                this.loadData()
                console.log(val,2);
            },
            detail(no){
                console.log('我是',no);
                this.$router.push(`/waybill/list/detail?no=${no}`)
            },
            clearCache() {
            let vnode = this.$vnode;
            let parentVnode = vnode && vnode.parent;
            if (
                parentVnode &&
                parentVnode.componentInstance &&
                parentVnode.componentInstance.cache
            ) {
                var key =
                    vnode.key == null
                        ? vnode.componentOptions.Ctor.cid +
                        (vnode.componentOptions.tag
                            ? `::${vnode.componentOptions.tag}`
                            : "")
                        : vnode.key;
                var cache = parentVnode.componentInstance.cache;
                var keys = parentVnode.componentInstance.keys;
                if (cache[key]) {
                    this.$destroy();
                    // remove key
                    if (keys.length) {
                        var index = keys.indexOf(key);
                        if (index > -1) {
                            keys.splice(index, 1);
                        }
                    }
                    cache[key] = null;
                }
            }
        }
        },
        beforeRouteLeave(to,from,next){ // 组件局部离开守卫
            if(to.path == '/waybill/list/detail'){ // 当我是从当前页面跳到指定页面
                from.meta.keepAlive = true // 我就修当前页面(from)的路由元信息
            }else{ // 如果去别的页面我们就要清除（有可能之前留下的缓存信息）
                this.clearCache()
            }
            next()
        }
    }
</script>

<style lang="less" scoped>

</style>