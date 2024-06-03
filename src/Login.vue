<template>
  <div id="div_login">
    <div class="div_login_position">
      <form class="form-horizontal" id="form_login">
        <div class="form-group text-center">
          <h3>Life Game</h3>
          <br>
        </div>
        <div class="form-group">
          <label for="inputUseName" class="col-sm-2 control-label">用户</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputUseName" placeholder="用户名称">
          </div>
        </div>
        <div class="form-group">
          <label for="inputPassword" class="col-sm-2 control-label">密码</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" id="inputPassword" placeholder="密码">
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <div class="checkbox">
              <label>
                <input type="checkbox" @click="rememberMe($event)"> Remember me
              </label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10 text-right">
            <button type="button" class="btn btn-success" @click="login()">  &nbsp;登陆 &nbsp;</button> &nbsp;&nbsp;&nbsp;
            <button type="button" class="btn btn-default">  &nbsp;注册 &nbsp; </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<style>
  #div_login{
    background:url(../public/image/bg_title.jpg) repeat-x, url(../public/image/bg.jpg);
    width: 100%;
    position: relative;
  }
  .div_login_position{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -210px;
    width: 400px;
    background-color: white;
    padding: 15px 35px 15px 30px;
    border-radius: 8px;
  }
  #form_login{

  }
</style>
<script>

import axios from "axios";

export default {
  name: "test",
  data: function () {
    return {
      test: "123213",
    };
  },
  mounted: function () {
    //初始化div的高度
    $("#div_login").height($(window).height());
    // axios
    //   .get("/record/queryAll")
    //   .then((res) => {
    //     //this.test = res.data;
    //   })
    //   .catch((err) => {
    //     console.log("获取err", err);
    //   });
  },
  methods: {
    rememberMe(e) {
      //是否设置浏览器记住密码
      if($(e.target).is(":checked")){
        $("#inputPassword").attr("autocomplete","on");
      }else {
        $("#inputPassword").attr("autocomplete","off");
      }
    },
    login() {
      var me = this;

      axios
        .post("/person/login", {
          name: $("#inputUseName").val(),
          password: $("#inputPassword").val(),
        })
        .then((res) => {
          if (res.data.message === "success") {
            localStorage.setItem("authorization",res.data.token);
            window.location.href = "/";

          } else {
            alert("用户名或密码错误");
          }
        });
    },
  },
  components: {

  },
};
</script>

<style></style>
