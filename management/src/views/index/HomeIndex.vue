<template>
    <div>
        <el-row :gutter="24" style="margin-bottom: 20px;">
            <el-col :span="6">
                <el-card class="firstbox" style="background-color: #4f88ff;">
                    <div class="fl" style="color: aliceblue;">
                        <p>本月进账</p>
                        <p class="mrg">1211111111</p>
                        <p>
                            +20.12%
                            <span class="small">与上个月相比</span>
                        </p>
                    </div>
                    <i class="el-icon-edit fr"></i>
                    <div class="clear"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="secondbox" style="background-color: deeppink;">
                    <div class="fl" style="color: aliceblue;">
                        <p>本月放款</p>
                        <p class="mrg">6588</p>
                        <p>
                            +20.12%
                            <span class="small">与上个月相比</span>
                        </p>
                    </div>
                    <i class="el-icon-share fr"></i>
                    <div class="clear"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="secondbox" style="background-color: blue;">
                    <div class="fl" style="color: aliceblue;">
                        <p>累计进件</p>
                        <p class="mrg">128700</p>
                        <p>
                            +20.12%
                            <span class="small">与上个月相比</span>
                        </p>
                    </div>
                    <i class="el-icon-upload fr"></i>
                    <div class="clear"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="secondbox" style="background-color: orangered;">
                    <div class="fl" style="color: aliceblue;">
                        <p>累计放款</p>
                        <p class="mrg">128700</p>
                        <p>
                            +20.12%
                            <span class="small">与上个月相比</span>
                        </p>
                    </div>
                    <i class="el-icon-camera-solid fr"></i>
                    <div class="clear"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="18">
                <el-card>
                    <div slot="header">进件统计分析</div>
                    <div style="height: 240px;" ref="analysis"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">进件统计分析</div>
                    <div style="height: 240px;" ref="percent">内容</div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24" class="mt">
            <el-col :span="12">
                <el-card>
                    <el-timeline>
                        <el-timeline-item timestamp="2018/4/12" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/12 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/3" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/3 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/2" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/2 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/2" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/2 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/2" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/2 20:46</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <el-calendar v-model="date"></el-calendar>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import { get } from '@/utils/http'
export default {
    data(){
        return{
            date:new Date()
        }
    },
    mounted() {
        this.drawLine()
        this.drawPie()
    },
    methods: {
        async drawLine() {
            // 第一步准备一个容器(用来显示图标)
            var myChart = echarts.init(this.$refs.analysis)
            const { data } = await get('/line')
            let keys = []
            let values = []
            for (let key in data) {
                keys.push(key)
                values.push(data[key])
            }
            console.log(keys, values);
            // 第二步 配置图标配置项目（关键步骤）
            const option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: '类目是{b}: </br> 数值是{c}'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: keys
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: values,
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#4f88ff' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'white' // 100% 处的颜色
                                }],
                                global: false
                            }
                        }
                    }
                ]
            }
            // 第三步 调用方法生成图表（setoption）
            myChart.setOption(option)
        },
        drawPie() {
            var myChart = echarts.init(this.$refs.percent)
            const option = {
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 16,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ]
                    }
                ]
            };
            myChart.setOption(option)
        }
    },

}
</script>

<style lang="less" scoped>
.fr {
    font-size: 90px;
    color: rgba(255, 255, 255, 0.3);
}

.mrg {
    padding: 10px 0;
}

.small {
    font-size: 12px;
}
</style>