<template>
  <p></p>
  <form class="form-horizontal">
    <div class="form-group">
      <label for="inputTarget" class="col-sm-1 control-label">目标</label>
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
      <label for="inputStartDate" class="col-sm-1 control-label">开始时间</label>
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
        <button class="btn btn-default" @click="search()">Search</button>&nbsp;
        <button class="btn btn-default" @click="clear()">Clear</button>
      </div>
    </div>
  </form>
  <!-- Modal -->
  <div
    class="modal fade"
    id="myModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title" id="myModalLabel">每日收入情况</h4>
        </div>
        <div class="modal-body">
          <form class="form-horizontal">
            <div class="form-group">
              <label for="user_selected" class="col-sm-2 control-label">角色 </label>
              <div class="col-sm-10">
                <select class="form-control" id="user_selected">
                  <option selected>小草微醉</option>
                  <option>小草喵喵</option>
                  <option>115DT</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="getIn_date" class="col-sm-2 control-label">日期</label>
              <div class="col-sm-10">
                <input
                  type="datetime"
                  class="form-control"
                  id="getIn_date"
                  placeholder="日期"
                  :value="now()"
                />
                <!-- <p class="form-control-static">{{ now()}}</P> -->
              </div>
            </div>
            <div class="form-group">
              <label for="total_coin" class="col-sm-2 control-label">总金币</label>
              <div class="col-sm-10">
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    id="total_coin"
                    placeholder="0"
                    @change="change()"
                  />
                  <div class="input-group-addon">{{ selectedTarget.unit }}</div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="day_coin" class="col-sm-2 control-label">当天进展</label>
              <div class="col-sm-10">
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    id="day_coin"
                    placeholder="0"
                  />
                  <div class="input-group-addon">{{ selectedTarget.unit }}</div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="remark" class="col-sm-2 control-label">备注</label>
              <div class="col-sm-10">
                <textarea class="form-control" rows="3" id="remark"></textarea>
              </div>
            </div>
          </form>
        </div>
        <div style="display: none">
          <input type="text" id="id" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="save()">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
  <h2></h2>
  <div class="panel panel-default">
    <!-- Default panel contents -->
    <div class="panel-heading">
      <span>每日金币记录列表</span>
      <button
        class="btn btn-primary"
        style="position: relative; float: right; top: -6px"
        @click="open()"
      >
        新增
      </button>
    </div>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>角色id</th>
          <th>时间</th>
          <th>星期</th>
          <th>目标总额</th>
          <th>备注</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data">
          <td>{{ index + 1 }}</td>
          <td>{{ item.user_id }}</td>
          <td>{{ formatTime(item.record_time) }}</td>
          <td>{{ getWeek(item.record_time) }}</td>
          <td style="text-align: right">{{ item.amount }}</td>
          <td>{{ item.remark }}</td>
          <td>
            <a href="javascript:void(0)" @click="mod(item.id)">详情</a>
            &nbsp;
            <a href="javascript:void(0)" @click="del(item.id)">删除</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="page_div">
    <ul class="pagination" style="margin: 0px" id="pageNum">
      <li><span>&laquo;</span></li>
      <li v-for="num in getPageArr()" :class="{ active: num == 1 }">
        <a href="javascript:void(0)" @click="changePage($event)">{{ num }}</a>
      </li>
      <li><span>&raquo;</span></li>
    </ul>
  </div>
</template>
<style>
.row_height {
  height: 40px;
}
.page_div {
  padding: 0px;
  margin: 0px;
  text-align: right;
}
</style>

<script>
import axios from "axios";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import _ from "underscore";

export default {
  name: "dayGetIn",
  components: {},
  data: function () {
    return {
      data: "",
      totalcount: 0,
      targets: [],
      selectedTarget:{}
    };
  },
  mounted: function () {
    var me = this;

    me.initData();

    //模态框关闭后事件
    $("#myModal").on("hidden.bs.modal", function (e) {
      me.initData();
    });
    //初始化弹出框
    $('[data-toggle="popover"]').popover();

    //扩展周
    dayjs.extend(weekOfYear);

    //初始化日期控件
    $("#startDate").datetimepicker({
      format: "YYYY-MM-DD",
      locale: moment.locale("zh-cn"),
    });
    $("#endDate").datetimepicker({
      format: "YYYY-MM-DD",
      locale: moment.locale("zh-cn"),
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
    changeTarget(e) {
      var selectedId = $(e.target)[0].selectedOptions[0].id;
      var me = this;
      var target = _.findWhere(me.targets, { id: selectedId });
      me.selectedTarget=target;

      $("#inputStartDate").val(me.formatDate(target.start_time));
      $("#inputEndDate").val(me.formatDate(target.end_time));

      me.search();
    },
    changePage(e) {
      var selectPage = $(e.target).text() - 0;
      //选中状态的变更
      $(e.target).parent().siblings().removeClass("active");
      $(e.target).parent().addClass("active");

      this.search(null,null,selectPage);
    },
    getPageArr() {
      var ret = [];
      //默认15页面
      for (var i = 0; i < this.totalcount / 15; i++) {
        ret.push(i + 1);
      }
      return ret;
    },
    initData() {
      var me=this;
      axios.get(`/target/queryAll?t=${Math.random()}&type=娱乐`)
        .then((res) => {
          me.targets = res.data.data;
          if (me.targets.length == 0) {
            return null;
          }
          var target = _.findWhere(me.targets, { status: "进行中" });
          if (target == null) {
            target = me.targets[0];
          }
          me.selectedTarget=target;

          var startDate=me.formatDate(target.start_time);
          var endDate=me.formatDate(target.end_time);

          $("#inputStartDate").val(startDate);
          $("#inputEndDate").val(endDate);

          return me.search(startDate, endDate);
        });
    },

    formatTime(date) {
      if(date==null){
        return "";
      }
      return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
    },
    formatDate(date) {
      if(date==null){
        return "";
      }
      return dayjs(date).format("YYYY-MM-DD");
    },
    getWeek(date) {
      var num = dayjs(date).day();
      switch (num) {
        case 0:
          return "星期日";
        case 1:
          return "星期一";
        case 2:
          return "星期二";
        case 3:
          return "星期三";
        case 4:
          return "星期四";
        case 5:
          return "星期五";
        case 6:
          return "星期六";
        default:
          break;
      }
    },
    open() {
      $("#user_selected").val();
      $("#getIn_date").val(this.now());
      $("#total_coin").val(0);
      $("#remark").val("");
      $("#id").val("");
      $("#myModal").modal("show");
    },
    now() {
      return dayjs().format("YYYY-MM-DD HH:mm:ss");
    },
    save() {
      let userId = $("#user_selected").val();
      let getInDate = $("#getIn_date").val();
      let amount = $("#total_coin").val();
      let remark = $("#remark").val();
      let id = $("#id").val();
      let dayAmount = $("#day_coin").val() - 0;

      let url = `/record/insert`;
      if (id != "") {
        url = "/record/update";
      }
      let data = {
        id: id,
        amount: amount,
        user_id: userId,
        remark: remark,
        record_time: getInDate,
        day_amount: dayAmount,
        week: dayjs(getInDate).week(),
      };
      axios.post(url, data).then((res) => {
        if (res.data.msg == "success") {
          $("#myModal").modal("hide");
        }
      });
    },
    del(id) {
      var url = `/record/del?id=${id}&t=${Math.random()}`;
      axios.get(url).then((res) => {
        if (res.data.msg == "success") {
          this.initData();
        }
      });
    },
    mod(id) {
      var url = `/record/query?id=${id}&t=${Math.random()}`;
      axios.get(url).then((res) => {
        if (res.data.msg == "success") {
          //{id: '52edfc6d-8a9f-11ee-a47c-0242ac110002', record_time: '2023-11-24T07:58:59.000Z', amount: 197, user_id: '小草微醉', remark: null}

          $("#user_selected").val(res.data.data.user_id);
          $("#getIn_date").val(this.formatTime(res.data.data.record_time));
          $("#total_coin").val(res.data.data.amount);
          $("#remark").val(res.data.data.remark);
          $("#id").val(res.data.data.id);
          $("#day_coin").val(res.data.data.day_amount);
          $("#myModal").modal("show");
        }
      });
    },
    change() {
      let getInDate = $("#getIn_date").val();
      let amount = $("#total_coin").val();

      let preDate = dayjs(getInDate).add(-1, "day").format("YYYY-MM-DD");
      let selectIndex = $("#pageNum li.active").text() - 0;
      var url = `/record/queryByDate?date=${preDate}&page=${selectIndex}&t=${Math.random()}`;

      axios.get(url).then((res) => {
        if (res.data.msg == "success" && res.data.data != undefined) {
          var dayGetIn = amount - res.data.data.amount;
          $("#day_coin").val(dayGetIn);
        }
      });
    },
    search(startDate, endDate,pageNum) {
      startDate = startDate || $("#inputStartDate").val();
      endDate = endDate || $("#inputEndDate").val();
      pageNum=pageNum || 1;

      let url = `/record/search?isDesc=1&startDate=${startDate}&endDate=${endDate}&&page=${pageNum}&targetId=${this.selectedTarget.id}`;

      axios
        .get(
          `/record/getTotalCountByDate?t=${Math.random()}&startDate=${startDate}&endDate=${endDate}`
        )
        .then((res) => {
          this.totalcount = res.data.data.totalcount;
          return axios.get(url);
        })
        .then((res) => {
          if (res.data.msg == "success" && res.data.data != undefined) {
            this.data = res.data.data;
          }
        });
    },
    clear() {},
  },
};
</script>
