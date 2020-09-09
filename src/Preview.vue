<template>
  <div class="markdown-body" v-html="rawHtml"></div>
</template>

<script>
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'github-markdown-css/github-markdown.css'

export default {
  name: "Preview",
  data() {
    return {
      rawHtml: '',
    }
  },

  methods: {
    rendering: function () {
      let content = localStorage.getItem('preview');
      this.rawHtml = marked(content).replace(/<pre>/g, "<pre class='hljs'>");
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
    this.rendering()
  },
}
</script>

<style scoped>

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}

</style>