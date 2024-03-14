<template>
  <div class="row">
    <br>
    <div class="col-md-1" style="backgroud-color:#eee">
      <ul class="nav nav-pills nav-stacked">
        <li role="presentation"  class="active" >
          <a href="javascript:void(0)" @click="changeTab('life',$event)">生活</a>
        </li>
        <li role="presentation"><a href="javascript:void(0)" @click="changeTab('work',$event)">工作</a></li>
        <li role="presentation"><a href="javascript:void(0)" @click="changeTab('game',$event)">娱乐</a></li>
      </ul>
   
    </div>
    <div class="col-md-11 container" style="border-left:solid 1px #eee">
      <component :is="currentView" />
    </div>
  </div>
</template>

<script>
import game from "./game/DayGetInAnalysis.vue";
import life from "./life/DayGetInAnalysis.vue";
import NotFound from "./NotFound.vue";

const routes = {
  'game': game,
  'life': life,
};

export default {
  data() {
    return {
      currentView: life
    }
  },
  mounted(){
    
  },
  methods: {
    changeTab(tabName,e) {
      this.currentView = routes[tabName] || NotFound;
      //选中状态的变更
      $(e.target).parent().siblings().removeClass("active");
      $(e.target).parent().addClass("active");
    },
  },
};
</script>
