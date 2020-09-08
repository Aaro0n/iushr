<template>
  <div style="height: 100%;width: 100%">
    <div id="logo">{{ title }}</div>
    <div id="blogs">
      <ul>
        <li v-for="article in articles" :key="article.id">
          <router-link :to="'/blog/'+article.id">{{ article.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      title: "iushr",
      articles: []
    }
  },

  mounted() {
    axios.get("http://127.0.0.1:8081/articles").then(response => {
      this.articles = response.data.data
    })
  },
}
</script>

<style scoped>

a {
  text-decoration: none;
}

a:link {
  color: #606266;
}

a:visited {
  color: #BEBEBE
}

a:hover {
  border-bottom: 1px solid #909399;
  padding-bottom: 5px;
}

#logo {
  position: fixed;
  color: #909399;
  font-size: 30px;
  margin-top: 20px;
  margin-left: 20px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

#blogs {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

ul {
  list-style-type: none;
  max-height: 300px;
  overflow: scroll;
}

li {
  font-size: 20px;
  height: 50px;
  width: 400px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>