<template>
  <p>{{ test }}</p>
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
import HelloWorld from "../components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "test",
  data: function () {
    return {
      test: "我的AI问答",
    };
  },
  mounted: function () {
    var url = "http://api.tanshuapi.com/api/qa/v1/index?key=&keywords=说一个笑话";
    axios
      .get(url)
      .then((res) => {
        alert(res);
        this.test = res;
      })
      .catch((err) => {
        console.log("获取err", err);
      });
  },
  components: {
    HelloWorld,
  },
};
</script>

<style></style>
