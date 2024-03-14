<script setup>
import { ref, computed } from 'vue'
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import NotFound from './pages/NotFound.vue'
import Day from './pages/Day.vue'
import Account from './pages/Account.vue'
import Analysis from './pages/Analysis.vue'
import Setting from './pages/Setting.vue'

const routes = {
  '/': Home,
  '/about': About,
  '/day':Day,
  '/analysis':Analysis,
  '/account':Account,
  '/setting':Setting,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})

</script>



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
          <a class="navbar-brand" href="#">LIFE RECORD</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <!-- <li class="active"><a href="#/dayGetIn">每日收入</a></li> -->
            <li ><a href="#/day">每日记录</a></li>
            <li> <a href="#/analysis">统计分析</a> </li>
            <!-- <li> <a href="#/test">测试</a> </li> -->
            <li><a href="#/account">账户</a> </li>
            <li><a href="#/setting">设置</a> </li>
            <li> <a href="#/about">Broken Link</a></li>
          
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
    <div  class="container" style="margin-top:60px">
        <component :is="currentView" />
    </div>

</template>
