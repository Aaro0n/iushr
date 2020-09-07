<template>
  <div id="editor">
    <div v-show="showMD" id="markdown">
      <i class="el-icon-close" id="closeBtn" v-on:click="closeMarkdown"></i>
      <p v-html="rawHtml"></p>
    </div>
    <div id="header" v-show="showED">
      <el-button size="medium" plain v-on:click="publish(0)">发布</el-button>
      <el-button size="medium" plain v-on:click="publish(1)">保存</el-button>
      <el-button size="medium" plain v-on:click="preview">预览</el-button>
    </div>
    <div id="content" v-show="showED">
      <textarea id="text" v-model="content"></textarea>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow-night.css';

export default {
  name: "Editor",
  data() {
    return {
      showMD: false,
      showED: !this.showMD,
      content: "",
      rawHtml: "xxxx",
    }
  },

  methods: {
    publish: function (type) {
      let article = {
        'title': this.content.substring(0, this.content.indexOf('\n')).replace(/#/g, "").trim(),
        'content': this.content,
        'type': type,
      }
      axios.post('http://127.0.0.1:8081/article',
          article,
          {
            headers: {
              'Content-Type': 'application/json',
              'token': localStorage.getItem('token')
            }
          }
      ).then(response => {
        console.log(response.data)
      })
    },
    preview: function () {
      this.rawHtml = marked(this.content).replace(/<pre>/g, "<pre class='hljs'>")
      this.showMD = true
      this.showED = false
    },
    closeMarkdown: function () {
      this.showMD = false
      this.showED = true
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
  }
}
</script>

<style scoped>

#editor {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}

#markdown {
  padding: 30px 80px;
}

#closeBtn {
  float: right;
}

#header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 10%;
  margin-right: 20px;
}

#content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
}

#text {
  height: 85%;
  width: 80%;
  border: none;
  border-radius: 1px;
  background-color: #f1f1f1;
  resize: none;
  cursor: pointer;
  font-size: 20px;
}

</style>