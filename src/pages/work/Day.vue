<template>


  <form class="form-horizontal">
    <div class="form-group div_select">
      <label for="inputTarget" class="col-sm-1 control-label">选择月份 </label>
      <div class="col-sm-3">
        <div class="input-group " id="pickDate">
          <input type="text" class="form-control" id="inputPickDate"/>
          <span class="input-group-addon">
                <span class="glyphicon glyphicon-calendar"></span>
              </span>
        </div>
      </div>
      <div class="div_select_tip" >
        <span class="glyphicon glyphicon-fullscreen" aria-hidden="true" id="spanfull"  @click="fullScreen()"></span>
        <span class="glyphicon glyphicon-screenshot" aria-hidden="true" id="spanShot" style="display: none" @click="shotScreen()"></span>
      </div>
    </div>
  </form>
  <div>
    <table class="table table-bordered" id="table_calender">
      <thead>
        <tr class="table_calender_thead">
          <th>日</th>
          <th>一</th>
          <th>二</th>
          <th>三</th>
          <th>四</th>
          <th>五</th>
          <th>六</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in days" class="table_calender_tr">
        <td v-for="day in item">
          <div v-if="day!=null" class="div_todo" v-bind:id="'div_day_'+day.date" v-bind:date="day.date">
            <span>{{ day.date }}</span>
            <span v-if="day.isHoliday&& !day.isWeekend" class="tip-holiday">休</span>
            <span v-if="!day.isHoliday&& day.isWeekend" class="tip-workday">班</span>
            <span class="span_todo_new" @click="newTodo($event)">➕</span>
            <span class="span_todo_save" @click="save($event)">✔️</span>

          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>


<style scoped>
  @import "Day.css";
</style>
<script>

import _ from "underscore";
import axios from "axios";
import dayjs from "dayjs";
import moment from "dayjs";
import ww  from "chinese-workday";

export default {
  data() {
    return {
      data: "",
      days:[]
    };
  },
  created() {
    var me=this;
    var nowMonth = dayjs().format("YYYY-MM");
    me.days =me.buildCalc(nowMonth);
  },
  mounted() {
    var me = this;
    //初始化日期控件
    $("#pickDate").datetimepicker({
      format: "YYYY-MM",
      locale: moment.locale("zh-cn")
    });
    $("#pickDate").on("dp.change", function (e) {
      var newMonth = e.date.format("YYYY-MM");
      me.init(newMonth);
    });
    $(".table_calender_tr td").on("mouseenter", function (e) {
      $(e.currentTarget).find(".span_todo_new").show();
      $(e.currentTarget).find(".span_todo_save").show();
    })
    $(".table_calender_tr td").on("mouseleave", function (e) {
      setTimeout(() => {
        $(e.currentTarget).find(".span_todo_new").hide();
        $(e.currentTarget).find(".span_todo_save").hide();
      }, 100);

    })
    var nowMonth = dayjs().format("YYYY-MM");
    $("#inputPickDate").val(nowMonth);
    me.init(nowMonth);
  },
  updated() {
    //设置今天的背景
    var date = dayjs().date();
    var curMonth=dayjs().get("month")+1;
    var nowMonth= $("#inputPickDate").val();
    var month = dayjs(nowMonth).month() + 1;

    $("td.today").removeClass("today");

    if(curMonth==month){
      $("#div_day_" + date).parent("td").addClass("today");
    }
  },
  methods: {
    init: function (nowMonth) {
      var me = this;
      //重新计算日历
      me.days =me.buildCalc(nowMonth);
      var month = dayjs(nowMonth).month() + 1;
      var year = dayjs(nowMonth).year();
      //获取数据
      axios.get("/worktodo/query?month=" + month + "&year=" + year).then(res => {
          //清空所有代办：
        $("div.checkbox").remove();
        _.each(res.data.data, function (item) {
          var day = dayjs(item.cur_date).get("date");
          var divTodo = $("#div_day_" + day);
          var isDone=item.status=="已完成";
          divTodo.append(me.buildTodo(item.title,isDone));
        })
      });
    },
    formatDate(date) {
      if (date == null) {
        return "";
      }
      return dayjs(date).format("YYYY-MM-DD");
    },
    now() {
      return dayjs().format("YYYY-MM-DD HH:mm:ss");
    },
    buildCalc(month) {
      var firstDay = month + "-01";
      var daysInMonth = dayjs(firstDay).daysInMonth();
      //当天是星期几
      var week = dayjs(firstDay).day();

      var count = 1;
      var ret = [[], [], [], [], []];
      let isHoliday=false;
      for (var i = 0; i < ret.length; i++) {
        //首行
        if (i === 0) {
          for (var j = 0; j < 7; j++) {
            if (j < week) {
              ret[i][j] = null;
            } else {
              isHoliday= ww.isHoliday(month +'-'+ count.toString()) ;
              ret[i][j] = {date: count++, week: j, isHoliday:isHoliday,isWeekend: j==0||j==6};
            }
          }
        } else {
          for (var n = 0; n < 7; n++) {
            if (count > daysInMonth) {
              ret[i][n] = null;
            } else {
              isHoliday= ww.isHoliday(month +'-'+ count.toString()) ;
              ret[i][n] = {date: count++, week: j, isHoliday:isHoliday,isWeekend: n==0||n==6};
            }
          }
        }
      }
      return ret;
    },
    clear() {
    },
    showDel(e) {
      $(e.currentTarget).parent().find(".span_todo_del").show();
    },
    hideDel(e) {
      $(e.currentTarget).parent().find(".span_todo_del").hide();
    },
    newTodo(e) {
      let me = this;
      let $parent = $(e.currentTarget).parent();
      $parent.append(me.buildTodo());
    },
    buildTodo(text,isDone) {
      var me=this;
      if (text == undefined) {
        text = "";
        isDone=false;
      }
      let checked=isDone?"checked":"";
      let todo = $('<div class="checkbox"></div>');
      let label = $('<label><input type="checkbox" value="" '+ checked+' ></label>');
      let inputTodo = $('<input type="text" class="input_todo" value="' + text + '"  placeholder="待办事项">')
      inputTodo.bind("mouseover", function (e) {
        me.showDel(e);
      });
      inputTodo.bind("mouseout", function (e) {
        setTimeout(function () {
          me.hideDel(e);
        }, 1000);
      });

      let spanTodo = $('<span class="span_todo_del">❌</span>')
      spanTodo.bind("click", function (e) {
        e.preventDefault();
        me.delTodo(e);
      });

      label.append(inputTodo);
      label.append(spanTodo);
      todo.append(label);
      return todo;
    },
    delTodo(e) {
      let $parent = $(e.currentTarget).parents(".checkbox");

      let divTodo=$(e.currentTarget).parents(".div_todo");
      let curDate = $("#inputPickDate").val() + "-" + divTodo.attr("date");

      axios.delete("/worktodo/del?day=" +curDate).then(res=>{
        if(res.data.msg=="success"){
          $parent.remove();
        }
      });


    },
    save(e) {
      let formData = [];
      let todos = $(e.currentTarget.parentElement).find("div.checkbox");

      _.each(todos, function (item, index) {
        let isDone = $(item).find('input:checkbox').prop("checked");
        let todo = $(item).find('.input_todo').val();
        if (todo != "") {
          let curDate = $("#inputPickDate").val() + "-" + $(item).parents(".div_todo").attr("date");
          formData.push({
            cur_date: curDate,
            status: isDone ? "已完成" : "未完成",
            title: todo
          });
        }
        console.log(formData);
        if (formData.length > 0) {
          axios
              .post("/worktodo/save", {data: formData})
              .then((res) => {
                if (res.data.msg == "success") {

                }
              })
              .catch((err) => {
                console.log("获取err", err);
              });
        }
      });
    },
    fullScreen(){

    },
    shotScreen() {

    }
  },
  components: {},
};
</script>