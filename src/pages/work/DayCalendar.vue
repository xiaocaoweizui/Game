<template>
  <div class="container-fluid" >
    <form class="form-horizontal">
      <div class="form-group">
        <label for="inputTarget" class="col-sm-2 control-label">目标</label>
        <div class="col-sm-3">
          <div class="input-group">
          <select class="form-control" id="select_target" @change="changeTarget($event)">
            <option v-for="target in targets" :id="target.id" :selected="target.status=='进行中'">{{ target.target }}</option>
          </select>
          <span class="input-group-addon"><span class="label" :class="getStatusStyle(selectedTarget.status)">{{ selectedTarget.status}}</span></span>
        </div>
        </div>
      </div>
    </form>
    <form class="form-horizontal">
      <div class="form-group">
        <label for="inputStartDate" class="col-sm-2 control-label">开始时间</label>
        <div class="col-sm-3">
          <div class="input-group" id="startDate">
            <input type="text" class="form-control" id="inputStartDate" />
            <span class="input-group-addon">
              <span class="glyphicon glyphicon-calendar"></span>
            </span>
          </div>
        </div>

        <label for="inputEndDate" class="col-sm-1 control-label">结束时间</label>
        <div class="col-sm-3">
          <div class="input-group" id="endDate">
            <input type="text" class="form-control" id="inputEndDate" />
            <span class="input-group-addon">
              <span class="glyphicon glyphicon-calendar"></span>
            </span>
          </div>
        </div>
        <div class="col-sm-3">
          <button  class="btn btn-default" @click="search()">Search</button
          >&nbsp;
          <button  class="btn btn-default" @click="clear()">Clear</button>
        </div>
      </div>
    </form>
    <hr />
    <div class="row" style="height: 350px">

    </div>
    <div class="row" style="height: 350px">

    </div>
  </div>
</template>

<script>

import _ from "underscore";
import axios from "axios";
import dayjs from "dayjs";

export default {
  data() {
    return {

      data: "",
      targets:[],
      selectedTarget:{}
    };
  },
  mounted() {
    var me = this;
    this.init();

    //初始化日期控件
    $("#startDate").datetimepicker({
      format: "YYYY-MM-DD",
      locale: moment.locale("zh-cn")
    });
    $("#endDate").datetimepicker({
      format: "YYYY-MM-DD",
      locale: moment.locale("zh-cn")
    });
  },
  methods: {
    getStatusStyle(status) {
      switch (status) {
        case "已达成":
          return "label-success";
        case "进行中":
          return "label-warning";
        default:
          return "label-default";
      }
    },
    init() {
      var me=this;
      axios
        .get(`/target/queryAll?t=${Math.random()}&type=工作`)
        .then((res) => {
          me.targets = res.data.data;
          if (me.targets.length == 0) {
            return null;
          }
          var target = _.findWhere(me.targets, { status: "进行中" });
          me.selectedTarget=target;
          var startDate=me.formatDate(target.start_time);
          var endDate=me.formatDate(target.end_time);
          $("#inputStartDate").val(startDate);
          $("#inputEndDate").val(endDate);

          return me.search(startDate, endDate);
        })
        .catch((err) => {
          console.log("获取err", err);
        });
    },
    formatDate(date) {
      if(date==null){
        return "";
      }
      return dayjs(date).format("YYYY-MM-DD");
    },
    changeTarget(e) {
      var selectedId = $(e.target)[0].selectedOptions[0].id;
      var me = this;
      var target = _.findWhere(me.targets, { id: selectedId });
      me.selectedTarget=target;
      $("#inputStartDate").val(me.formatDate(target.start_time));
      $("#inputEndDate").val(me.formatDate(target.end_time));

      me.search();
    },
    setData(data) {

    },
    search(startDate, endDate) {
      startDate = startDate || $("#inputStartDate").val();
      endDate = endDate || $("#inputEndDate").val();
      let url = `/liferecord/search?startDate=${startDate}&endDate=${endDate}&targetId=${this.selectedTarget.id}`;
      axios.get(url).then((res) => {
        if (res.data.msg == "success" && res.data.data != undefined) {
          //设置图表的数据源
          this.setData(res.data.data);
        }
      });
    },
    clear() {},
  },
  components: {

  },
};
</script>
