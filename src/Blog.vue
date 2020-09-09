<template>
  <div id="markdown">
    <div v-html="rawHtml"></div>
  </div>
</template>

<script>

import axios from "axios";
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow-night.css';

export default {
  name: "Blog",
  data() {
    return {
      rawHtml: "",
      articleId: this.$route.params.id,
      article: {}
    }
  },

  mounted() {

    marked.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      },
      pedantic: false, //只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
      gfm: true,
      tables: true, //支持Github形式的表格，必须打开gfm选项
      breaks: true, //支持Github换行符，必须打开gfm选项，填写true或者false
      sanitize: false, //原始输出，忽略HTML标签，这个作为一个开发人员，一定要写false
      smartLists: true, //优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
      smartypants: true,
      xhtml: false
    });

    axios.get("http://127.0.0.1:8081/article/" + this.articleId).then(response => {
      this.article = response.data.data
      this.rawHtml = marked(this.article.content).replace(/<pre>/g, "<pre class='hljs'>")
    })
  }
}
</script>

<style scoped>

#markdown {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 80px;
  padding-right: 80px;
}

</style>