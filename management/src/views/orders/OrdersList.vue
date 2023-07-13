<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="mt">
            <el-row>
                <el-col :span="6">
                    <el-input placeholder="请输入订单号或者客户名称" v-model="params.keyword" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6" :offset="12" class="operate">
                    <el-button type="primary" @click="visible=true">新建订单</el-button>
                    <el-button :disabled="!select.length" @click="operate(1)">审核</el-button>
                    <el-button :disabled="!select.length"  @click="operate(2)">修改</el-button>
                    <el-button :disabled="!select.length"  @click="operate(3)">作废</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-table 
            :data="tableData" 
            style="width: 100%" 
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            @selection-change="handleSelectionChange"
            >            
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="id" label="订单号" fixed="left" width="100"></el-table-column>
                <el-table-column prop="status" label="状态" width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==1">待审核</span>
                        <span v-else-if="scope.row.status==2">已审核</span>
                        <span v-else-if="scope.row.status==3">审核通过</span>
                        <span v-else>审核拒绝</span>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="下单时间" width="180"></el-table-column>
                <el-table-column prop="name" label="客户名称" width="180"></el-table-column>
                <el-table-column prop="start" label="起始城市" width="180"></el-table-column>
                <el-table-column prop="end" label="目的城市" width="180"></el-table-column>
                <el-table-column prop="cargo" label="货物名称" width="180"></el-table-column>
                <el-table-column prop="count" label="件数" width="100"></el-table-column>
                <el-table-column prop="unit" label="单位" width="50"></el-table-column>
                <el-table-column prop="price" label="运费" width="180"></el-table-column>
                <el-table-column prop="from" label="订单来源" width="180"></el-table-column>
                <el-table-column prop="pay" label="是否支付" width="180">
                    <template slot-scope="scope">
                        {{scope.row.pay==1?'已支付':'未支付'}}
                    </template>
                </el-table-column>
                <el-table-column  label="操作" fixed="right" width="180">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="deletes(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="mt fr mb"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="params.page"
                :page-sizes="[10, 20, 30, 40]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
        <orders-modal :visible="visible" @hide="visible=false" @reload="loadData()"></orders-modal>
    </div>
</template>

<script>
import breadCrumb from '@/mixins/breadCrumb'
import {post} from '@/utils/http'
import OrdersModal from './OrdersModal.vue'
import { mapMutations } from 'vuex'
export default {
    mixins: [breadCrumb],
    created(){
        this.loadData()
    },
    components:{OrdersModal},
    data() {
        return {
            visible:false, // 定义一个参数，通过父子传值，子组件使用prop接收数据
            loading:false, // 页面黑色加载圈
            params:{
                page:1,
                keyword: '',
                pageSize:10,
            },
            tableData: [],
            select:[], // 存放勾选的数据 同时同步到按钮禁用位置
            total:0
        }
    },
    methods:{
        async loadData(){
            this.loading = true
            const res =  await post('/orderList',this.params)
            this.tableData = res.data.list
            this.total=res.data.total // 同步数据共有多少条
            this.loading = false
        },
        handleSizeChange(pageSize ){ // 请求总页数发生变化
            this.pageSize = pageSize
            this.loadData()
        },
        handleCurrentChange(currentPage ){ // 请求页码发生变化
            this.page = currentPage
            this.loadData()
        },
        handleSelectionChange(selection){ // 勾选的数据发生变化
            this.select=selection
            
        },
        operate(type) { // 申请 作废按钮
            console.log(type) // 分清楚是点了那个操作
            // 当我点击某个按钮 select里就是存放这勾选的数据
            let nos = this.select.map(item => item.id) // 把选中的id选出来 ，然后提交给后端
            this.$notify({
                title: '操作成功',
                message: nos,
                type: 'success'
            });
        },
        ...mapMutations(['setRow']),
        edit(data){ // 当我点击编辑的时候，我就想把数据存到vuex里面
            console.log(data)
            this.visible = true // 点击编辑就让弹窗显示出来
            this.setRow(data)
        }
        // deletes(id){
        //     post('/delete',{id}).then(()=>{
        //         this.$message({
        //             message:'操作成功',
        //             type:'success'
        //         })
        //         this.loadData() // 删除成功后重新加载数据
        //     })
        // }
    },
    
    
}
</script>

<style lang="less" scoped>
.operate {
    text-align: right;
}
</style>