<template>
  <ol class="breadcrumb">
    <li><a href="#">首页</a></li>
    <li class="active">用户编辑</li>
  </ol>
  <form class="form-horizontal">
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
      <label for="inputRemark" class="col-sm-2 control-label">备注</label>
      <div class="col-sm-10">
        <textarea  row="5" type="text"  class="form-control"  id="inputRemark" placeholder="备注" :value="data.remark"   />
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-default">Save</button>  <button type="submit" class="btn btn-default">back</button>
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
    }
  },
};
</script>
