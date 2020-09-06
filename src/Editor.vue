<template>
  <div id="editor">
    <div id="header">
      <el-button size="medium" plain v-on:click="publish">发布</el-button>
      <el-button size="medium" plain v-on:click="publish">保存</el-button>
    </div>
    <div id="content">
      <textarea id="text" v-model="content"></textarea>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Editor",
  data: {
    content: "",
  },

  methods: {
    publish: function () {
      let article = {
        'title': this.content.substring(0, this.content.indexOf('\n')),
        'content': this.content
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
    }
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