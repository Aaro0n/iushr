<template>
  <div>
    <div id="header">
      <button v-on:click="publish">发布</button>
    </div>
    <textarea id="editor" v-model="content"></textarea>
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

#header {
  display: flex;
  height: 80px;
}

#header button {
  height: 30px;
  width: 80px;
  margin-right: 10px;
}

#editor {
  height: 400px;
  width: 400px;
}

</style>