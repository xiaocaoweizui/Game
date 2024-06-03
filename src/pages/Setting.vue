<template>
<!--  <ol class="breadcrumb">-->
<!--    <li><a href="#">首页</a></li>-->
<!--    <li class="active">设置</li>-->
<!--  </ol>-->
  <br>
  <div class="row">
    <div class="col-md-2" style="">
      <ul class="nav nav-pills nav-stacked">
        <li role="presentation" class="active">
          <a  @click="changeTab('setPeriod',$event)">目标设置</a>
        </li>
        <li role="presentation"> <a @click="changeTab('homeSettings',$event)">首页设置</a></li>

      </ul>
    </div>

    <div class="col-md-10 container">
      <component :is="currentView" />
    </div>
  </div>
</template>

<script>
import SetPeriod from "./setting/SetPeroid.vue";
import HomeSettings from "./setting/HomeSettings.vue";
import NotFound from "./NotFound.vue";

const routes = {
  'setPeriod': SetPeriod,
  'homeSettings':HomeSettings
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
    changeTab(tabName,e) {
      $(e.target).parents("ul").find("li").removeClass("active");
      $(e.target).parent().addClass("active");
      this.currentView = routes[tabName] || NotFound;
    },
  },
};
</script>
