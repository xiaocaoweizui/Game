<template>
  <hr>
  <div class="container">
    <div class="row">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search for...">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button">Go!</button>
          </span>
        </div>
    </div>
    <div>

    </div>
  </div>
</template>

<!--<script type="module">-->
<!--import { pipeline,env }  from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0"-->
<!--</script>-->
<script>
import axios from "axios";


export default {
  name: "test",
  data: function () {
    return {
      test: "做一个古诗词问答AI",
    };
  },
  mounted: function () {
    debugger


  },
  components: {

  },
};
</script>

<style></style>
