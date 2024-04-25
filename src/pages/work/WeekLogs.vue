<template>
  <div class="container-fluid" >
    <form class="form-horizontal">
      <div class="form-group">
        <label for="inputStartDate" class="col-sm-1 control-label">周志模板</label>
        <div class="col-sm-3">
         <select class="form-control" id="select_weekRange">

         </select>
        </div>
        <div class="col-sm-3">
          <button  class="btn btn-default" @click="downloadFoxmailTemplate()">下载foxmail模板</button>&nbsp;
          <button  class="btn btn-default" @click="copyHtml()">复制html</button>
        </div>
      </div>
    </form>
    <hr />
    <div class="row" id="div_child" >
      <WeekLog ref="myWeekLog"></WeekLog>
    </div>

  </div>
</template>

<script>
import _ from "underscore";
import axios from "axios";
import dayjs from "dayjs";
import WeekLog from "./MyWeekLog.vue";


export default {
  data() {
    return {
      data: "",

    };
  },
  mounted() {
    var me = this;
    this.init();
  },
  methods: {

    init() {
      var me=this;
      var now = dayjs().format('YYYY-MM-DD HH:mm:ss');
      var preWeekDay=dayjs(now).add(-7 , 'day').format('YYYY-MM-DD');
      var nextWeekDay=dayjs(now).add(7 , 'day').format('YYYY-MM-DD');
      var curWeekRange= me.getWeekRange(now);
      var nextWeekRange= me.getWeekRange(nextWeekDay);
      var preWeekRange= me.getWeekRange(preWeekDay);

      $("#select_weekRange").append($("<option>").val(preWeekRange).text(preWeekRange));
      $("#select_weekRange").append($("<option>").val(curWeekRange).text(curWeekRange).prop("selected",true));
      $("#select_weekRange").append($("<option>").val(nextWeekRange).text(nextWeekRange));

        me.$refs.myWeekLog.init(curWeekRange);
    },
    getWeekRange(date) {
      var day = dayjs(date).day();
      //  console.log(`${day},${date}` );
      var startDate = dayjs(date).add(1 - day, 'day').format('YYYY-MM-DD');
      var endDate = dayjs(date).add(7 - day, 'day').format('YYYY-MM-DD');
      return startDate + "~" + endDate;
    },
    formatDate(date) {
      if(date==null){
        return "";
      }
      return dayjs(date).format("YYYY-MM-DD");
    },

    setData(data) {

    },
    copyHtml() {
      var html=$("#div_child").html();
      var tmpURL="/static/html/weeklog_bootstrap.html";
      axios.get(tmpURL).then(res=>{
        var tmpHtml=res.data;
        tmpHtml= tmpHtml.replace("{{content}}",html);
        navigator.clipboard.writeText(tmpHtml)
            .then(function() {
              alert('复制成功');
            })
            .catch(function(err) {
              alert('复制失败:'+ err);
            });
      })
    },
    downloadFoxmailTemplate(){
      var tmpURL="/static/html/weeklog.html";
      axios.get(tmpURL).then(res=>{
        var tmpHtml=res.data;
        navigator.clipboard.writeText(tmpHtml)
            .then(function() {
              alert('复制成功');
            })
            .catch(function(err) {
              alert('复制失败:'+ err);
            });
      })
    }
  },
  components: {
    WeekLog
  },
};
</script>
