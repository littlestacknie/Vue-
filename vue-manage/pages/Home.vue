<template>
    <el-row class="home" :gutter="24">
        <el-col :span="8" style="margin-top:5px">
            <el-card shadow="hover" style="height:290px">
                <div class="user">
                    <img :src="userImg" />
                    <div class="userInfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登陆时间：<span>2022-1-2</span></p>
                    <p>上次登陆地点：<span>上海</span></p>
                </div>
            </el-card>
            <el-card style="margin-top:20px;height:305px">
                <el-table :data="tableData">
                    <el-table-column v-for="(val,key) in tableLabel" 
                    :key="key"
                    :prop="key"
                    :label="val"></el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="margin-top:5px">
            <div class="num">
                <el-card v-for="item in countData" 
                :key="item.name" 
                :body-style="{display:'flex',padding:0}">
                <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                <div class="detail">
                    <p class="num">¥{{item.value}}</p>
                    <p class="txt">{{item.name}}</p>
                </div>
                </el-card>
            </div>
            <el-card style="height:210px">
                <!-- <div style="height:210px" ref="orderEcharts"></div> -->
                <echarts :chartData="echartData.order" style="height:210px"/>
            </el-card>
            <div class="graph">
                <el-card style="height:180px">
                <!-- <div style="height:180px" ref="userEcharts"></div> -->
                <echarts :chartData="echartData.user" style="height:180px"/>
                </el-card>
                <el-card style="height:180px">
                <!-- <div style="height:180px" ref="videoEcharts"></div> -->
                <echarts :chartData="echartData.video" :isAxisChart="false" style="height:160px"/>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import{getData}from '../api/data'
// import * as echarts from 'echarts'
import Echarts from '../src/components/Echarts.vue'
export default {
    name:'Home',
    components:{Echarts},
    data(){
        return{
            userImg:require('../src/assets/img/user.png'),
            tableData: [],
            tableLabel:{
                name: '课程',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买'
            },
            countData: [
                {
                name: "今日支付订单",
                value: 1234,
                icon: "success",
                color: "#2ec7c9",
                },
                {
                name: "今日收藏订单",
                value: 210,
                icon: "star-on",
                color: "#ffb980",
                },
                {
                name: "今日未支付订单",
                value: 1234,
                icon: "s-goods",
                color: "#5ab1ef",
                },
                {
                name: "本月支付订单",
                value: 1234,
                icon: "success",
                color: "#2ec7c9",
                },
                {
                name: "本月收藏订单",
                value: 210,
                icon: "star-on",
                color: "#ffb980",
                },
                {
                name: "本月未支付订单",
                value: 1234,
                icon: "s-goods",
                color: "#5ab1ef",
                },
            ],
            echartData:{
                order:{
                    xData:[],
                    series:[]
                },
                user:{
                    xData:[],
                    series:[]
                },
                video:{
                    series:[]
                }
            }
        }
    },
    mounted() {
        getData().then(res=>{
            const {code,data}=res.data
            if(code===20000){
                this.tableData=data.tableData

                //折线图
                const order=data.orderData
                const xData=order.date
                const keyArray=Object.keys(order.data[0])
                const series=[]
                keyArray.forEach(key=>{
                    series.push({
                        name:key,
                        data:order.data.map(item=>item[key]),
                        type:'line'
                    })
                })
                // const option={
                //     xAxis:{
                //         data:xData
                //     },
                //     yAxis:{},
                //     legend:{
                //         data:keyArray
                //     },
                //     series
                // }

                this.echartData.order.xData=xData
                this.echartData.order.series=series

                // const orderEcharts=echarts.init(this.$refs.orderEcharts)
                // orderEcharts.setOption(option)

                //柱状图
                // const userEchartsOption={
                //     legend: {
                //         // 图例文字颜色
                //         textStyle: {
                //         color: "#333",
                //         },
                        
                //     },
                //     grid: {
                //         left: "20%",
                //     },
                //     // 提示框
                //     tooltip: {
                //         trigger: "axis",
                //     },
                //     xAxis: {
                //         type: "category", // 类目轴
                //         data:data.userData.map(item=>item.date),
                //         axisLine: {
                //         lineStyle: {
                //             color: "#17b3a3",
                //         },
                //         },
                //         axisLabel: {
                //         interval: 0,
                //         color: "#333",
                //         },
                //     },
                //     yAxis: [
                //         {
                //         type: "value",
                //         axisLine: {
                //             lineStyle: {
                //             color: "#17b3a3",
                //             },
                //         },
                //         },
                //     ],
                //     color: ["#2ec7c9", "#b6a2de"],
                //     series: [
                //         {
                //             name:'新增用户',
                //             data:data.userData.map(item=>item.new),
                //             type:'bar'
                //         },{
                //             name:'活跃用户',
                //             data:data.userData.map(item=>item.active),
                //             type:'bar'
                //         }
                //     ],
                // }

                this.echartData.user.xData=data.userData.map(item=>item.date)
                this.echartData.user.series=[
                                    {
                                        name:'新增用户',
                                        data:data.userData.map(item=>item.new),
                                        type:'bar'
                                    },{
                                        name:'活跃用户',
                                        data:data.userData.map(item=>item.active),
                                        type:'bar'
                                    }
                ]

                // const userEcharts=echarts.init(this.$refs.userEcharts)
                // userEcharts.setOption(userEchartsOption)

                //饼图
                // const videoOption={
                //     tooltip: {
                //         trigger: "item",
                //     },
                //     color: [
                //         "#0f78f4",
                //         "#dd536b",
                //         "#9462e5",
                //         "#a6a6a6",
                //         "#e1bb22",
                //         "#39c362",
                //         "#3ed1cf",
                //     ],
                //     series: [{
                //         data:data.videoData,
                //         type:'pie'
                //     }],
                // }

                this.echartData.video.series=[{
                        data:data.videoData,
                        type:'pie'
                    }]

                // const videoEcharts=echarts.init(this.$refs.videoEcharts)
                // videoEcharts.setOption(videoOption)
            }
            console.log(res);
        })
    },
}
</script>

<style lang="less" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
    &info {
      .name {
        font-size: 32px;
        margin-bottom: 10px;
      }
      .access {
        color: #999999;
      }
    }
  }
  .login-info {
    p {
      line-height: 28px;
      font-size: 14px;
      color: #999999;
      span {
        color: #666666;
        margin-left: 60px;
      }
    }
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      height: 80px;
      margin-bottom: 20px;
    }
    .icon {
      font-size: 30px;
      width: 80px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .detail {
      height: 80px;
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num {
        font-size: 20px;
        margin-bottom: 5px;
      }
      .txt {
        font-size: 14px;
        text-align: center;
        color: #999999;
      }
    }
  }
  .graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card {
      width: 48%;
    }
  }
}
</style>