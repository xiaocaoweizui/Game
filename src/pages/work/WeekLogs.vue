<template>
  <div class="container-fluid" >
    <form class="form-horizontal">
      <div class="form-group">
        <label for="inputStartDate" class="col-sm-1 control-label">工作周志</label>
        <div class="col-sm-3">
         <select class="form-control">
           <option>2024-04-15~2024-04-22</option>
           <option>2</option>
         </select>
        </div>
        <div class="col-sm-3">
          <button  class="btn btn-default" @click="exportFile()">导出文件</button>&nbsp;
          <button  class="btn btn-default" @click="copyHtml()">复制html</button>
        </div>
      </div>
    </form>
    <hr />
    <div class="row" >
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

    },
    formatDate(date) {
      if(date==null){
        return "";
      }
      return dayjs(date).format("YYYY-MM-DD");
    },

    setData(data) {

    },
    clear() {},
  },
  components: {
    WeekLog
  },
};
</script>
