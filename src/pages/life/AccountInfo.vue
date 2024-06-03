<template>
  <ol class="breadcrumb">
    <li><a href="#">首页</a></li>
    <li class="active">用户编辑</li>
  </ol>
  <form class="form-horizontal">
    <input type="hidden" :value="data.id">
    <div class="form-group">
      <label for="inputLogo" class="col-sm-2 control-label">头像</label>
      <div class="col-sm-4">
        <img :src="data.logoUrl" alt="" class="img-thumbnail">
      </div>
    </div>

    <div class="form-group">
      <label for="inputName" class="col-sm-2 control-label">姓名</label>
      <div class="col-sm-4">
        <input type="text" class="form-control" id="inputName" placeholder="" :value="data.name" />
      </div>

      <label for="inputSex" class="col-sm-2 control-label">性别</label>
      <div class="col-sm-4">
        <input type="text"  class="form-control"   id="inputSex"  placeholder=" " :value="data.sex"  />
      </div>
    </div>
    <div class="form-group">
      <label for="inputUserCode" class="col-sm-2 control-label">账号</label>
      <div class="col-sm-4">
        <input type="text" class="form-control" id="inputUserCode" placeholder="" :value="data.code" />
      </div>
      <label for="inputPassword" class="col-sm-2 control-label">密码</label>
      <div class="col-sm-4">
        <input type="password" class="form-control" id="inputPassword" placeholder="" :value="data.password" />
      </div>
    </div>
    <div class="form-group">
      <label for="inputRemark" class="col-sm-2 control-label">备注</label>
      <div class="col-sm-10">
        <textarea  row="5" type="text"  class="form-control"  id="inputRemark" placeholder="备注" :value="data.remark"   />
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="button" class="btn btn-default" @click="save()">Save</button>  <button type="button" class="btn btn-default">back</button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "用户编辑",
  data: function () {
    return {
      data: "",
    };
  },
  mounted: function () {},
  methods: {
    load(id) {
      axios
        .get("/person/query?id=" + id)
        .then((res) => {
          this.data = res.data.data;
        })
        .catch((err) => {
          console.log("获取err", err);
        });
    },
    getImgPath(url){
      return new URL(url,import.meta.url).href;
    },
    save(){
      var me=this;
      me.data.name=$("#inputName").val();
      me.data.remark=$("#inputRemark").val();
      me.data.sex=$("#inputSex").val();
      me.data.password=$("#inputPassword").val();
      me.data.code=$("#inputUserCode").val();

      axios.post("/person/save",me.data).then((res)=>{
        if(res.data.msg=="success"){
          alert("保存成功");
        }
      })
    }
  },
};
</script>
