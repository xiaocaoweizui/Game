<template>
  <hr>
  <div class="container">
    <div class="row">
        <div class="input-group">
          <input type="text" class="form-control" id="inputSearchKeys" placeholder="Search for...">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" id="btnSearch" @click="search()">Go!</button>
          </span>
        </div>
    </div>
    <div class="div_search_result"><p>搜索结果 <b>{{ totalCount }}</b> 条</p></div>
    <div class="div_content "  >
      <div v-for="data in datas" class="div_poem">
        <div class="div_poem_title">{{ data.title }}</div>
        <div class="div_poem_author">
         -- {{ data.author }} ({{ data.dynasty}})
        </div>
        <div class="div_poem_content">
          <div  v-for="content in data.contents" class="div_poem_content_title">
            {{ content }}
          </div>

        </div>
        <div >
          <blockquote class="div_poem_remark">
            评论：{{ data.remark }}
          </blockquote>

        </div>
      </div>
    </div>

    <div class="page_div ">
      <ul class="pagination" style="margin: 0px" id="pageNum">
        <li><span>&laquo;</span></li>
        <li v-for="num in getPageArr()" :class="{ active: num == 1 }">
          <a href="javascript:void(0)" @click="changePage($event)">{{ num }}</a>
        </li>
        <li><span>&raquo;</span></li>
      </ul>
    </div>
  </div>
</template>
<style>
.div_search_result{
  margin-top: 10px;
  margin-right: -15px;
  margin-left: -15px;
  text-align: right;
}
.div_search_result b{
  font-style: italic;
  text-decoration: underline;
}
.page_div{
  margin-top: 10px;
  margin-right: -15px;
  margin-left: -15px;
}
.div_content{
  margin-right: -15px;
  margin-left: -15px;
  //overflow-y: scroll;
  //overflow-x:hidden;
}
.div_poem{
  margin: 10px 0px;
  padding: 10px;
  text-align: center;
  display: inline;
  border: solid 1px #eee;

}
.div_poem_title{
  font-size: 18px;
  font-weight: bold;
}
.div_poem_author{
  font-style: italic;
  text-indent: 6em;
  margin-bottom: 5px;
}
.div_poem_content{
  font-size: 16px;
  margin-bottom: 20px;
  letter-spacing: 4px;
}
.div_poem_remark{
  font-size:12px;
  text-align: left;
}
</style>

<!--<script type="module">-->
<!--import { pipeline,env }  from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0"-->
<!--</script>-->
<script>
import axios from "axios";
import  _ from "underscore";
//import jieba  from "nodejs-jieba";

/**
 * 采用jieba分词，拆分：关键词、作者、朝代、体裁, 响应式滚动加载数据
 *  npm安装： npm install nodejs-jieba --registry=https://registry.npmmirror.com --nodejs-jieba_binary_host_mirror=https://registry.npmmirror.com/-/binary/nodejieba/ --MSVS_VERSION=2019
 * 数据来源（全繁体）：https://github.com/chinese-poetry/chinese-poetry
 * 数据源地址：https://github.com/todototry/AncientChinesePoemsDB
 * 过程问题：
 * 1、   npm install --save-dev @babel/plugin-transform-private-methods
 * 2、  npm install --save-dev node-polyfill-webpack-plugin，同时修改webpack.config.js，添加plugins: [new NodePolyfillPlugin()]
 * 3、    npm install --save-dev path-browserify
 *
 */

export default {
  name: "test",
  data: function () {
    return {
      test: "做一个古诗词问答AI",
      totalCount:2,
      datas:[
        {
          "title":"静夜思",
          "contents":["床前明月光，疑是地上霜。","举头望明月，低头思故乡。"],
          "author":"李白",
          "dynasty":"唐",
          "remark":"此诗描写了旅居在外的抒情主人公秋日夜晚在屋内抬头望月而思念家乡的感受。前两句写主人公在作客他乡的特定环境中一刹那间所产生的错觉；后两句通过动作神态的刻画，深化主人公的思乡之情。全诗运用比喻、衬托等手法，表达客居思乡之情，语言清新朴素而韵味含蓄无穷，历来广为传诵"
        },
        {
          "title":"赋得古原草送别",
          "contents":["离离原上草，一岁一枯荣。","野火烧不尽，春风吹又生。","远芳侵古道，晴翠接荒城。","又送王孙去，萋萋满别情。"],
          "author":"白居易",
          "dynasty":"唐",
          "remark":"此诗通过对古原上野草的描绘，抒发送别友人时的依依惜别之情。它是一曲野草颂，进而是生命的颂歌。前四句侧重表现野草生命的历时之美，后四句侧重表现其共时之美。全诗章法谨严，用语自然流畅，对仗工整，写景抒情水乳交融，意境浑成，是“赋得体”中的绝唱。“野火烧不尽，春风吹又生”二句更是传诵千古。\n"
        }
      ]
    };
  },
  computed: {

  },
  mounted: function () {
    debugger


  },
  components: {

  },
  methods: {
    getPageArr(){

      var ret = [];
      //默认15页面
      for (var i = 0; i < this.totalCount / 15; i++) {
        ret.push(i + 1);
      }
      return ret;
    },
    changePage(e) {
      var selectPage = $(e.target).text() - 0;
      //选中状态的变更
      $(e.target).parent().siblings().removeClass("active");
      $(e.target).parent().addClass("active");

      this.search(selectPage);
    },
    getDynasty:function (dynasty){
      switch (dynasty)
      {
        case "T":
          return "唐";
        case "S":
          return "宋";
        case "Y":
          return "元";
        case "M":
          return "明";
        case "Q":
          return "清";
        default:
          return "唐";
      }
    },
    search(pageNum){
      pageNum=pageNum??1;
      let me=this;
      let keys=$("#inputSearchKeys").val();

      //采用分词等逻辑处理
      let url=`/poems/query`;
      let data={"keys":keys,"pageNum":pageNum};

      axios.post(url,data)
          .then((res) => {
              var data=res.data.data;

            me.datas= _.map(data,function(item){
                var contents=item.content.split("|");

                return {
                  "title":item.title,
                  "contents":contents,
                  "author":item.author,
                  "dynasty":me.getDynasty(item.dynasty),
                  "remark":""
                }

              });
          })

    }

  }
};
</script>

<style></style>
