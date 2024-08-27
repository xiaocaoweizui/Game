<script setup>
import { ref, computed } from 'vue'
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import NotFound from './pages/NotFound.vue'
import Day from './pages/Day.vue'
import Account from './pages/Account.vue'
import Analysis from './pages/Analysis.vue'
import Setting from './pages/Setting.vue'
import MyAi from './pages/AI.vue'

const routes = {
  '/': Home,
  '/about': About,
  '/day':Day,
  '/analysis':Analysis,
  '/account':Account,
  '/setting':Setting,
  '/ai':MyAi,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})

</script>
<style>
  .nav-active{
    border-bottom: 3px solid #2aabd2;
  }
  body{
    //background:url(../public/image/bg_title.jpg) repeat-x, url(../public/image/bg.jpg);
  }
</style>


<template>
   <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">LIFE GAME</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav" id="main_nav">
            <!-- <li class="active"><a href="#/dayGetIn">每日收入</a></li> -->
            <li class="nav-active"><a href="#/day"  >每日记录</a></li>
            <li> <a href="#/analysis">统计分析</a> </li>
            <!-- <li> <a href="#/test">测试</a> </li> -->
            <li><a href="#/account">账户</a> </li>
            <li><a href="#/setting">设置</a> </li>
            <li><a href="#/ai">我的AI</a> </li>
            <li> <a href="#/about">关于</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">zhangy04 <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#">账户信息</a></li>
                <li><a href="#">修改密码</a></li>
                <li role="separator" class="divider"></li>
                <li><a @click="logout()">注销</a></li>
              </ul>
            </li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
    <div  class="container" style="margin-top:60px">
        <component :is="currentView" />
    </div>

</template>
<script>
import { ref, computed } from 'vue'

export default {
  name: 'App',
  mounted() {
      $("#main_nav").find("li").click(function(e){
        $(e.target).parents("ul").find("li").removeClass("nav-active");
        $(e.target).parents("li").addClass("nav-active");
      });
  },
  methods:{
    logout(){
      window.location.href = "/login";
    }
  }
}
</script>
