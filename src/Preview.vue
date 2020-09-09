<template>
  <div id="markdown" v-html="rawHtml"></div>
</template>

<script>
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow-night.css';

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
      sanitize: false, //原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
      smartLists: true, //优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
      smartypants: true,
      xhtml: false
    });
    this.rendering()
  },
}
</script>

<style>

#markdown {
  padding-top: 50px;
  padding-left: 100px;
  padding-right: 80px;
}

</style>