<template>
    <div id="div_week_log" >
      <h3 class="text-center">张毅工作周志(2024-04-15~2024-04-22)</h3>
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
          <td>{{ weekWork.date }}（{{ weekWork.weekDay }}）</td>
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
<style>
#div_week_log ol{
  margin: 0;
}
</style>
<script>

export default {
  data() {
    return {
      data:{
        monthWorks:["11111","22222"],
        quarterWorks:["11111","22222"],
        weekWorks:[{
          date:"2021-01-01",
          weekDay:"周一",
          works:["11111","22222"],
          status:"已完成"
        },
          {
            date:"2021-01-02",
            weekDay:"周二",
            works:["11111","22222"],
            status:"已完成"
          },
          {
            date:"2021-01-03",
            weekDay:"周三",
            works:["11111","22222"],
            status:"已完成"
          },
          {
            date:"2021-01-04",
            weekDay:"周四",
            works:["11111","22222"],
            status:"已完成"
          }],
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

  },
};
</script>
