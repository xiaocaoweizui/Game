<template>
  <div id="div_list">
    <ol class="breadcrumb">
      <li><a href="#">首页</a></li>
      <li class="active">用户列表</li>
    </ol>
    
    <div class="row">
      <div class="col-sm-6 col-md-4" v-for="(item, index) in data">
        <div class="thumbnail">
          <!-- src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMThjNWQzNjc4NTIgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xOGM1ZDM2Nzg1MiI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44MDQ2ODc1IiB5PSIxMDUuMSI+MjQyeDIwMDwvdGV4dD48L2c+PC9nPjwvc3ZnPg==" -->
          <img
            data-src="holder.js/100%x200"
            alt="100%x200"
            :src="item.logoUrl"
            data-holder-rendered="true"
            style="height: 200px; width: 100%; display: block"
          />
          <div class="caption">
            <h3>{{ item.name}}</h3>
            <ul class="list-unstyled">
              <li>
                <span class="glyphicon glyphicon-user" aria-hidden="true"></span> 性别：
                {{ item.sex }}
              </li>
              <li>
                <span class="glyphicon glyphicon-tag" aria-hidden="true"></span>
                个性说明：{{ item.remark }}
              </li>
            </ul>
            <p>
              <a class="btn btn-primary" @click="mod(item.id)" role="button">详情</a> <a class="btn btn-default" @click="del(item.id)" role="button">删除</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="display: none" id="div_form">
    <Accountinfo ref="form" ></Accountinfo>
  </div>
</template>

<script>
import axios from "axios";
import Accountinfo from "./AccountInfo.vue";

export default {
  name: "用户列表",
  data: function () {
    return {
      data: ""
    };
  },
  mounted: function () {
    axios
      .get("/person/queryAll")
      .then((res) => {
        this.data = res.data.data;
      })
      .catch((err) => {
        console.log("获取err", err);
      });
  },
  methods: {
    mod(id) {
      var me = this;

      $("#div_list").hide();
      $("#div_form").show();

      this.$refs.form.load(id);
    },
    del(id) {},
  },
  components: {
    Accountinfo,
  },
};
</script>
