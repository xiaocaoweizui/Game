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
      test: "",
    };
  },
  mounted: function () {
    axios
      .get("/record/queryAll")
      .then((res) => {
        this.test = res.data;
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
