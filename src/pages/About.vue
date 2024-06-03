<template>

  <br>
  <div class="row">
    <div class="col-md-2" style="">
      <ul class="nav nav-pills nav-stacked">
        <li role="presentation" class="active">
          <a  @click="changeTab('introduction',$event)">个人介绍</a>
        </li>
        <li role="presentation">
          <a  @click="changeTab('work-display',$event)">作品展示</a></li>
      </ul>
    </div>

    <div class="col-md-10 container">
      <component :is="currentView" />
    </div>
  </div>
</template>

<script>
import Introduction from "./about/Introduction.vue";
import WorkDisplay from "./about/WorkDisplay.vue";

const routes = {
  'introduction': Introduction,
  'work-display':WorkDisplay
};

export default {
  data() {
    return {
      currentView: Introduction
    }
  },
  mounted(){

  },
  methods: {
    changeTab(tabName,e) {
      $(e.target).parents("ul").find("li").removeClass("active");
      $(e.target).parent().addClass("active");
      this.currentView = routes[tabName] ;
    },
  },
};
</script>
