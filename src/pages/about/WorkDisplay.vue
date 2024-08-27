
<template>
  <div class="container">
    <h3>JS学习</h3>
    <hr>
    <div class="row">
      <div class="col-sm-3">
        <a @click='openUrl("Tetris")'>1、Tetris</a>
      </div>
      <div class="col-sm-3">
        <a @click='openUrl("GuaGuale")'>2、呱呱乐</a>
      </div>
      <div class="col-sm-3">
        <a @click='openUrl("MP3")'>3、MP3播放器</a>
      </div>
      <div class="col-sm-3">
        <a @click='openUrl("turnPage")'>4、翻页效果</a>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-sm-3">
        <a @click='openUrl("rotatePicture")'>5、3D图片旋转展示</a>
      </div>
    </div>
    <br>
    <h3>工作相关</h3>
    <hr>
    <div class="row">
      <div class="col-sm-3">
        <a @click='openUrl("hzlc")'>1、合作历程</a>
      </div>
      <div class="col-sm-3">
        <a @click='openUrl("kcReport")'>2、考察报告</a>
      </div>
      <div class="col-sm-3">
        <a @click='openUrl("waterflow")'>3、技术图</a>
      </div>
      <div class="col-sm-3">
        <a @click='openDemo("spreadJs")'>4、SpreadJsDemo</a>
      </div>
    </div>
  </div>

</template>


<script >
import Config from "@/config";
const  urls={
  Tetris:"/html5/俄罗斯方块/index.html",
  GuaGuale:"/html5/刮刮乐/index.html",
  MP3:"/html5/播放器/index.html",
  turnPage:"/html5/翻页/index.html",
  rotatePicture:"/html5/图片旋转/index.html",
  hzlc:"/html/Hzlc.html",
  kcReport:"/html/KcReport.html",
  waterflow:"/html/WaterFlow.html",
  spreadJs:"/mySpreadJs"
}
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    openUrl(url){
      let redirectURL=Config.WORKS_SITE + urls[url];
      window.open(redirectURL);
    },
    openDemo(url){
      let redirectURL=window.location.origin+"/demo#" + urls[url];
      window.open(redirectURL);
    }
  }
}



</script>