
<template>
 <div class="container">
   <div class="row">
     <div class="col-sm-3" >
       <img src="../../../public/image/me.jpg"  class="img-thumbnail" width="300" height="200">
     </div>
     <div class="col-sm-9" >
       <h4>基本信息</h4>
       <hr>
       <table class="table col-sm-9"  id="table_base_info" >
         <tbody>
          <tr>
            <td class="col-sm-2">姓名：张毅</td>
            <td class="col-sm-3">性别：男</td>
            <td></td>
          </tr>
         <tr>
           <td>民族：汉</td>
           <td>籍贯：湖北</td>
           <td></td>
         </tr>
         <tr>
           <td>生日：1990-01-01</td>
           <td>邮箱：atuofa@163.com</td>
           <td></td>
         </tr>
         <tr>
           <td>手机：186******</td>
           <td>微信：atuofa</td>
           <td></td>
         </tr>
         <tr>
           <td>学历：本科</td>
           <td>专业：计算机科学与技术</td>
           <td></td>
         </tr>
         <tr>
           <td colspan="3">个性签名 : 天生我才必有用，千金散尽还复来。</td>
         </tr>
         </tbody>

       </table>
     </div>

   </div>
   <br>
   <div class="row">
      <h4>教育经历</h4>
     <hr>
     <dl class="dl-horizontal">
       <dt>2008~2012年</dt>
       <dd>就读于武汉理工大学</dd>
     </dl>
   </div>
   <div class="row">
     <h4>知识技能</h4>
     <hr>
     <ul>
       <li>1、前端方面：JavaScript、HTML、CSS、jQuery、Bootstrap、vue</li>
       <li>2、后端方面：asp.net 、c#.net、Java、.net core。对于底层架基本熟悉</li>
       <li>3、数据库方面：mysql、sqlserver、oracle、mongodb</li>
       <li>4、中间件方面：redis、rabbitmq、kafka、消息队列、负载均衡</li>
       <li>5、架构设计方面：分布式、微服务、DDD、severless、云原生等</li>
       <li>6、运维方面：linux、docker、k8s、git、jenkins、nginx、prometheus、grafana等</li>
       <li>7、其他方面：缓存、、集群、容错、监控、日志、安全</li>
     </ul>
   </div>
   <br>
   <div class="row">
     <h4>工作经历&项目经验</h4>
     <hr>

   </div>
 </div>
</template>

<style >
#table_base_info td{
  border-width: 0;
}
</style>
<script>
export default {
  name: 'Home',
  data () {
    return {
      name: 'Home'
    }
  }
}
</script>