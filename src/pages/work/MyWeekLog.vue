<template>
    <div id="div_week_log" >
      <h3 class="text-center">张毅工作周志({{ data.weekRange }})</h3>
      <br>
      <table class="table table-bordered"  >
        <tbody>
        <tr class="text-center">
          <td colspan="2" class="active" width="50%">季度重点工作</td>
          <td colspan="2"  class="active">本月重点工作</td>
        </tr>
        <tr>
          <td colspan="2">
            <ol>
              <li v-for="monthWork in data.monthWorks">{{ monthWork }}</li>
            </ol>
          </td>
          <td colspan="2">
            <ol>
              <li v-for="quarterWork in data.quarterWorks">{{ quarterWork }}</li>
            </ol>
          </td>
        </tr>
        <tr class="text-center">
          <td colspan="4" class="active" >本周工作完成情况</td>
        </tr>
        <tr class="text-center">
          <td class="active" width="20%">日期</td>
          <td colspan="2" class="active" >工作事项</td>
          <td class="active" width="20%">完成情况</td>
        </tr>
        <tr  v-for="weekWork in data.weekWorks">
          <td class="text-center">{{ weekWork.date }}（{{ weekWork.weekDay }}）</td>
          <td colspan="2">
            <ol>
              <li v-for="work in weekWork.works">{{ work }}</li>
            </ol>
          </td>
          <td>
            {{weekWork.status}}
          </td>
        </tr>
        <tr class="text-center">
          <td colspan="4" class="active" >工作心得</td>
        </tr>
        <tr>
          <td colspan="4">
            <h5>一、消息信息</h5>
            <p>上周本以为统一消息移动端对接的上周已经改造完，但是本周测试验证发现了很多问题，由于本次和移</p>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
</template>
<style scoped>
@import "MyWeekLog.css";
</style>
<script>

import dayjs from "dayjs";
export default {
  data() {
    return {
      data:{
        weekRange:"",
        monthWorks:["11111","22222"],
        quarterWorks:["11111","22222"],
        weekWorks:[],
        Summarize:[
            {
              title:"ttttttt",
              content:"xxxx"
            },
        ]

      }
    }
  },
  mounted(){
    
  },
  methods: {
    init:function (weekRange){
      var monday=weekRange.split('~')[0];
      var me=this;
      me.data.weekRange=weekRange;
      for(var i=0;i<7;i++){
        var date=dayjs(monday).add(i, 'day').format('YYYY-MM-DD');
        me.data.weekWorks.push({
          date:date,
          weekDay:dayjs(date).format('ddd'),
          works:[],
          status:"未完成"
        });
      }
    }
  },
};
</script>
