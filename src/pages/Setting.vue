<template>
  <ol class="breadcrumb">
    <li><a href="#">首页</a></li>
    <li class="active">设置</li>
  </ol>
  <div class="row">
    <div class="col-md-2" style="">
      <ul class="nav nav-pills nav-stacked">
        <li role="presentation" class="active">
          <a href="javascript:void(0)" @click="changeTab('setPeriod')">设置目标</a>
        </li>
        <li role="presentation"><a href="#">待开发</a></li>
        <li role="presentation"><a href="#">待开发</a></li>
      </ul>
    </div>

    <div class="col-md-10 container">
      <component :is="currentView" />
    </div>
  </div>
</template>

<script>
import SetPeriod from "./setting/SetPeroid.vue";
import NotFound from "./NotFound.vue";

const routes = {
  'setPeriod': SetPeriod,
};

export default {
  data() {
    return {
      currentView: SetPeriod
    }
  },
  mounted(){
    
  },
  methods: {
    changeTab(tabName) {
      currentView = routes[tabName] || NotFound;
    },
  },
};
</script>
