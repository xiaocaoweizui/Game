<template>
  <form class="form-horizontal">
    <div class="form-group">
      <label for="inputType" class="col-sm-1 control-label">分类</label>
      <div class="col-sm-11">
        <label class="checkbox-inline">
          <input
            type="checkbox"
            id="cb_type_life"
            value="生活"
            checked
            @click="typeChange($event)"
          />
          生活
        </label>
        <label class="checkbox-inline">
          <input
            type="checkbox"
            id="cb_type_work"
            value="工作"
            checked
            @click="typeChange($event)"
          />
          工作
        </label>
        <label class="checkbox-inline">
          <input
            type="checkbox"
            id="cb_type_game"
            value="娱乐"
            checked
            @click="typeChange($event)"
          />
          娱乐
        </label>
      </div>
    </div>
  </form>

  <hr />
  <div class="panel panel-default">
    <!-- Default panel contents -->
    <div class="panel-heading">
      <span>设置目标</span>
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
          <th style="text-align: center">分类</th>
          <th style="text-align: center">目标</th>
          <th style="text-align: center">目标总额</th>
          <th style="text-align: center">开始时间</th>
          <th style="text-align: center">结束时间</th>
          <th style="text-align: center">完成状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data">
          <td>{{ index + 1 }}</td>
          <td style="text-align: center">
            <span class="label" :class="getTypeStyle(item.type)">{{ item.type }}</span>
          </td>
          <td>{{ item.target }}</td>
          <td style="text-align: right">{{ item.amount }}</td>
          <td style="text-align: center">{{ formatDate(item.start_time) }}</td>
          <td style="text-align: center">{{ formatDate(item.end_time) }}</td>
          <td style="text-align: center">
            <span class="label" :class="getStatusStyle(item.status)">{{
              item.status
            }}</span>
          </td>
          <td>
            <a href="javascript:void(0)" @click="mod(item.id)">详情</a>
            &nbsp;
            <a href="javascript:void(0)" @click="del(item.id)">删除</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
          <h4 class="modal-title" id="myModalLabel">设置目标</h4>
        </div>
        <div class="modal-body">
          <form class="form-horizontal">
            <div class="form-group">
              <label for="input_target" class="col-sm-2 control-label">目标 </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="input_target"
                  placeholder="目标"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="start_time" class="col-sm-2 control-label">开始日期</label>
              <div class="col-sm-3">
                <input
                  type="datetime"
                  class="form-control"
                  id="start_time"
                  placeholder="开始日期"
                />
              </div>
              <label for="end_time" class="col-sm-2 control-label">结束日期</label>
              <div class="col-sm-3">
                <input
                  type="datetime"
                  class="form-control"
                  id="end_time"
                  placeholder="结束日期"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="total_coin" class="col-sm-2 control-label">目标总额</label>
              <div class="col-sm-3">
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    id="total_coin"
                    placeholder="0"
                  />

                </div>
              </div>

              <label for="total_coin" class="col-sm-2 control-label">状态</label>
              <div class="col-sm-3">
                <div class="input-group">
                  <select class="form-control" id="status">
                    <option>未开始</option>
                    <option>进行中</option>
                    <option>已达成</option>
                    <option>暂停</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="input_unit" class="col-sm-2 control-label">单位 </label>
              <div class="col-sm-3">
                <input
                    type="text"
                    class="form-control"
                    id="input_unit"
                    placeholder="单位"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="type" class="col-sm-2 control-label">分类</label>
              <div class="col-sm-10">
                <label class="radio-inline">
                  <input type="radio" name="radio_type" id="radio_life" value="生活" />
                  生活
                </label>
                <label class="radio-inline">
                  <input type="radio" name="radio_type" id="radio_work" value="工作" />
                  工作
                </label>
                <label class="radio-inline">
                  <input type="radio" name="radio_type" id="radio_game" value="娱乐" />
                  娱乐
                </label>
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
          <!-- <input type="text" id="status" /> -->
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
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
export default {
  data() {
    return {
      data: "",
    };
  },
  mounted() {
    var me = this;
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

    me.initData();
  },
  methods: {
    now() {
      return dayjs().format("YYYY-MM-DD");
    },
    getTypeStyle(status) {
      switch (status) {
        case "娱乐":
          return "label-success";
        case "工作":
          return "label-warning";
        default:
          return "label-default";
      }
    },
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
    open() {
      //新增攒金目标
      $("#input_target").val("");
      $("#start_time").val(this.now());
      $("#end_time").val();
      $("#total_coin").val(0);
      $("#remark").val("");
      $("#id").val("");
      $("#status").val("未开始");
      $("#myModal").modal("show");
      $("#input_unit").val("万");
    },
    save() {
      //保存攒金目标
      let target = $("#input_target").val();
      let startDate = $("#start_time").val() == "" ? null : $("#start_time").val();
      let endDate = $("#end_time").val() == "" ? null : $("#end_time").val();
      let amount = $("#total_coin").val();
      let remark = $("#remark").val();
      let status = $("#status").val();
      let id = $("#id").val();
      let type = $("input[name='radio_type']:checked").val();
      let unit = $("#input_unit").val();

      let url = `/target/insert`;
      if (id != "") {
        url = "/target/update";
      }
      let data = {
        id: id,
        amount: amount,
        target: target,
        remark: remark,
        start_time: startDate,
        end_time: endDate,
        amount: amount,
        status: status,
        type: type,
        unit:unit
      };
      axios.post(url, data).then((res) => {
        if (res.data.msg == "success") {
          $("#myModal").modal("hide");
        }
      });
    },
    formatDate(date) {
      if (date == null) {
        return "";
      }
      return dayjs(date).format("YYYY-MM-DD");
    },
    initData(pageNum) {
      let isLifeChecked = $("#cb_type_life")[0].checked;
      let isWorkChecked = $("#cb_type_work")[0].checked;
      let isGameChecked = $("#cb_type_game")[0].checked;

      var types = "";
      if (isLifeChecked) {
        types = types + $("#cb_type_life").val() ;
      }
      if (isWorkChecked) {
        types =
          types + (types == "" ? $("#cb_type_work").val() : "," + $("#cb_type_work").val());
      }
      if (isGameChecked) {
        types =
          types + (types == "" ? $("#cb_type_game").val() : "," + $("#cb_type_game").val());
      }

      //获取数据
      axios
        .get(`/target/queryAll?t=${Math.random()}&types=${types}`)
        .then((res) => {
          this.data = res.data.data;
        })
        .catch((err) => {
          console.log("获取err", err);
        });
    },
    del(id) {
      var url = `/target/del?id=${id}&t=${Math.random()}`;
      axios.get(url).then((res) => {
        if (res.data.msg == "success") {
          this.initData();
        }
      });
    },
    mod(id) {
      var url = `/target/query?id=${id}&t=${Math.random()}`;
      axios.get(url).then((res) => {
        if (res.data.msg == "success") {
          //{id: '52edfc6d-8a9f-11ee-a47c-0242ac110002', record_time: '2023-11-24T07:58:59.000Z', amount: 197, user_id: '小草微醉', remark: null}

          $("#input_target").val(res.data.data.target);
          $("#start_time").val(this.formatDate(res.data.data.start_time));
          $("#end_time").val(this.formatDate(res.data.data.end_time));
          $("#remark").val(res.data.data.remark);
          $("#id").val(res.data.data.id);
          $("#status").val(res.data.data.status);
          $("#total_coin").val(res.data.data.amount);
          $("#input_unit").val(res.data.data.unit);
          $("input[name='radio_type'][value='" + res.data.data.type + "']").prop(
            "checked",
            true
          );
          $("#myModal").modal("show");
        }
      });
    },
    typeChange(e) {
      // var target = $(e.target);
      // var isChecked = $(e.target)[0].checked;
      // var value = $(e.target).val();

      this.initData();
    },
  },
};
</script>
