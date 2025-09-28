<template>
  <p></p>
  <form class="form-horizontal">
    <div class="form-group">
      <label for="inputTarget" class="col-sm-1 control-label">目标</label>
      <div class="col-sm-3">
        <div class="input-group">
        <select class="form-control" id="select_target" @change="changeTarget($event)">
          <option v-for="target in targets" :id="target.id" :selected="target.status==='进行中'">{{ target.target }}</option>
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
          <h4 class="modal-title" id="myModalLabel">每日情况</h4>
        </div>
        <div class="modal-body">
          <form class="form-horizontal">
            <div class="form-group">
              <label for="title" class="col-sm-2 control-label">主题</label>
              <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="主题"
                  />
              </div>
            </div>
            <div class="form-group">
              <label for="user_selected" class="col-sm-2 control-label">人员</label>
              <div class="col-sm-10">
                <select class="form-control" id="user_selected">
                  <option v-for="p in persons" :id="p.id" >{{ p.name }}</option>
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
            <div class="form-group" style="display: none">
              <label for="cur_amount" class="col-sm-2 control-label">总进度</label>
              <div class="col-sm-10">
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    id="cur_amount"
                    placeholder="0"
                    @change="change()"
                  />
                  <!-- <div class="input-group-addon">万</div> -->
                </div>
              </div>
            </div>
            <div class="form-group"  style="display: none">
              <label for="day_amount" class="col-sm-2 control-label">当天进展</label>
              <div class="col-sm-10">
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    id="day_amount"
                    placeholder="0"
                  />
                  <!-- <div class="input-group-addon">万</div> -->
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="user_selected" class="col-sm-2 control-label">目标：</label>
              <div class="col-sm-10" >
                <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="目标"
                    readonly
                    v-bind:value="selectedTarget.target"
                />
                <input type="hidden" id="target_id" v-bind:value="selectedTarget.id">
              </div>
            </div>
            <div class="form-group">
              <label for="remark" class="col-sm-2 control-label">备注</label>
              <div class="col-sm-10">
                <textarea class="form-control" rows="5" id="remark"></textarea>
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
      <span>每日记录列表</span>
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
          <th>标题</th>
          <th>人员</th>
          <th>时间</th>
          <th>备注</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data">
          <td>{{ index + 1 }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.person_name }}</td>
          <td>{{ formatTime(item.record_time) }}</td>
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
  padding: 0;
  margin: 0;
  text-align: right;
}
</style>

<script>
import axios from "axios";
import dayjs from "dayjs";
import _ from "underscore";

export default {
  name: "dayGetIn",
  components: {},
  data: function () {
    return {
      data: "",
      totalcount: 0,
      targets: [],
      persons:[],
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
      var startDate=null;
      var endDate=null;
      axios.get(`/target/queryAll?t=${Math.random()}&type=工作`)
        .then((res) => {
          me.targets = res.data.data;
          if (me.targets.length === 0) {
            return null;
          }
          var targetIndex = _.findLastIndex(me.targets, { status: "进行中" });
          me.selectedTarget=me.targets[targetIndex];

          startDate=me.formatDate(me.selectedTarget.start_time);
          endDate=me.formatDate(me.selectedTarget.end_time);

          $("#inputStartDate").val(startDate);
          $("#inputEndDate").val(endDate);

          return axios.get(`/person/queryAll`);
        }).then(res=>{
          me.persons=res.data.data;
          return me.search(startDate, endDate);
        })
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
    open() {
      $("#title").val("");
      $("#user_selected").val();
      $("#getIn_date").val(this.now());
      $("#cur_amount").val(0);
      $("#remark").val("");
      $("#id").val("");
      $("#myModal").modal("show");
    },
    now() {
      return dayjs().format("YYYY-MM-DD HH:mm:ss");
    },
    save() {
      let title= $("#title").val();
      let userId = $("#user_selected").val();
      let userName = $("#user_selected").find("option:selected").text();
      let getInDate = $("#getIn_date").val();
      let amount = $("#cur_amount").val();
      let remark = $("#remark").val();
      let id = $("#id").val();
      let dayAmount = $("#day_amount").val() - 0;
      let targetId = $("#target_id").val();

      let url = `/liferecord/insert`;
      if (id != "") {
        url = "/liferecord/update";
      }
      let data = {
        id: id,
        title:title,
        cur_amount: amount,
        person_id: userId,
        person_name: userName,
        remark: remark,
        record_time: getInDate,
        day_amount: dayAmount,
        target_id:targetId
      };
      axios.post(url, data).then((res) => {
        if (res.data.msg == "success") {
          $("#myModal").modal("hide");
        }
      });
    },
    del(id) {
      var url = `/liferecord/del?id=${id}&t=${Math.random()}`;
      axios.get(url).then((res) => {
        if (res.data.msg == "success") {
          this.initData();
        }
      });
    },
    mod(id) {
      var url = `/liferecord/query?id=${id}&t=${Math.random()}`;
      axios.get(url).then((res) => {
        if (res.data.msg == "success") {
          //{id: '52edfc6d-8a9f-11ee-a47c-0242ac110002', record_time: '2023-11-24T07:58:59.000Z', amount: 197, user_id: '小草微醉', remark: null}

          $("#user_selected").val(res.data.data.person_id);
          $("#getIn_date").val(this.formatTime(res.data.data.record_time));
          $("#cur_amount").val(res.data.data.cur_amount);
          $("#remark").val(res.data.data.remark);
          $("#id").val(res.data.data.id);
          $("#day_amount").val(res.data.data.day_amount);
          $("#myModal").modal("show");
        }
      });
    },
    change() {
      let getInDate = $("#getIn_date").val();
      let amount = $("#cur_amount").val();

      let preDate = dayjs(getInDate).add(-1, "day").format("YYYY-MM-DD");
      let selectIndex = $("#pageNum li.active").text() - 0;
      var url = `/liferecord/queryByDate?date=${preDate}&page=${selectIndex}&t=${Math.random()}`;

      axios.get(url).then((res) => {
        if (res.data.msg == "success" && res.data.data != undefined) {
          var dayGetIn = amount - res.data.data.amount;
          $("#day_amount").val(dayGetIn);
        }
      });
    },
    search(startDate, endDate,pageNum) {
      startDate = startDate || $("#inputStartDate").val();
      endDate = endDate || $("#inputEndDate").val();
      pageNum=pageNum || 1;

      let url = `/liferecord/search?isDesc=1&startDate=${startDate}&endDate=${endDate}&&page=${pageNum}&targetId=${this.selectedTarget.id}`;

      axios
        .get(
          `/liferecord/getTotalCountByDate?t=${Math.random()}&startDate=${startDate}&endDate=${endDate}`
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
