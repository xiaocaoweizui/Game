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
      <LineChart ref="myDayGetInAys"></LineChart>
    </div>
    <div class="row" style="height: 350px">
      <BarChart ref="myBarWeek"></BarChart>
    </div>
  </div>
</template>

<script>
import LineChart from "./LineChart.vue";
import BarChart from "./BarChart.vue";
import _ from "underscore";
import axios from "axios";
import dayjs from "dayjs";

export default {
  data() {
    return {
      // name:"小草微醉",
      // xData:['2020-02','2020-03','2020-04','2020-05'],
      // yData:[30,123,50,134]
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
        .get(`/target/queryAll?t=${Math.random()}&type=生活`)
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
      let xData = _.pluck(data, "record_time");
      xData = _.map(xData, function (item) {
        return dayjs(item).format("YYYY-MM-DD");
      });
      let yData = _.pluck(data, "amount");
      this.$refs.myDayGetInAys.initChart("每日收入分析", xData, yData);

      let barData = [];
      let xBarData = [];
      let yBarData = [];
      _.each(data, function (item) {
        var weekItem = _.find(barData, function (x) {
          return x.week == item.week;
        });
        if (weekItem != undefined) {
          weekItem.day_amount += item.day_amount;
        } else {
          barData.push(item);
        }
      });

      xBarData = _.pluck(barData, "weekRange");
      yBarData = _.pluck(barData, "day_amount");
      // console.log(barData);

      this.$refs.myBarWeek.initChart("每周收入分析", xBarData, yBarData);
    },
    search(startDate, endDate) {
      startDate = startDate || $("#inputStartDate").val();
      endDate = endDate || $("#inputEndDate").val();
      let url = `/record/search?startDate=${startDate}&endDate=${endDate}`;
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
    LineChart,
    BarChart,
  },
};
</script>
