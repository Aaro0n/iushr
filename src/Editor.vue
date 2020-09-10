<template>
  <div id="editor" v-loading.fullscreen.lock="fullscreenLoading">
    <div id="header">
      <i class="el-icon-arrow-left" @click="back"></i>
      <div>
        <el-button size="medium" plain v-on:click="publish(0)">发布</el-button>
        <el-button size="medium" plain v-on:click="publish(1)">保存</el-button>
        <el-button size="medium" plain v-on:click="preview">预览</el-button>
      </div>
    </div>
    <div id="content" @dragover.prevent @dragenter.prevent @dragleave.prevent v-on:drop="drop">
      <textarea placeholder="Start Type!!!" v-model="content"></textarea>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import marked from 'marked';
import hljs from 'highlight.js';

export default {
  name: "Editor",
  data() {
    return {
      article: null,
      content: "",
      rawHtml: "",
      fullscreenLoading: false,
    }
  },

  methods: {
    publish: function (type) {
      let article = {
        'id': null,
        'title': this.content.substring(0, this.content.indexOf('\n')).replace(/#/g, "").trim(),
        'content': this.content,
        'type': type,
        'categoryId': 0,
      }
      if (this.article != null) {
        article.id = this.article.id
        article.categoryId = this.article.categoryId
      }
      axios.post(this.COMMON.server + 'article',
          article,
          {
            headers: {
              'Content-Type': 'application/json',
              'token': localStorage.getItem('token')
            }
          }
      ).then(response => {
        console.log(response.data)
        this.$router.push('/admin')
      })
    },

    preview: function () {
      let route = this.$router.resolve({path: '/preview'})
      window.open(route.href, '_blank');
      localStorage.setItem('preview', this.content);
    },

    back: function () {
      this.$router.push('/admin')
    },

    drop: function (event) {
      this.fullscreenLoading = true;
      event.preventDefault();
      let file = event.dataTransfer.files[0]
      let formData = new FormData();
      formData.append("file", file)
      axios.post(this.COMMON.server + 'upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'token': localStorage.getItem('token')
            },
            onUploadProgress: progressEvent => {
              let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
              console.log(complete)
            }
          }
      ).then(response => {
            this.fullscreenLoading = false
            this.content = this.content + '\n![avatar](' + this.COMMON.server + response.data.data.data + ')'
          }
      )
    }

  },
  mounted() {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login')
    }
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
    if (localStorage.getItem('article') !== 'null' && localStorage.getItem('article') !== null) {
      console.log(localStorage.getItem('article'))
      let article = JSON.parse(localStorage.getItem('article'))
      localStorage.removeItem('article')
      this.article = article;
      this.content = article.content;
    }
  }
}
</script>

<style scoped>

#editor {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}

#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 38px;
}

#content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  padding-right: 38px;
  padding-left: 38px;
  padding-bottom: 63px;
}

textarea {
  height: 100%;
  width: 100%;
  padding: 20px;
  border: none;
  background-color: #FFF;
  resize: none;
  font-size: 14px;
  color: #606266;
}

textarea:focus {
  outline: none !important;
  border-color: #DCDFE6;
  box-shadow: 0 0 10px #DCDFE6;
}

</style>