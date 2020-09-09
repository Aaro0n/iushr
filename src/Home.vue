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
    axios.get(this.COMMON.server + "articles").then(response => {
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
  color: #BEBEBE;
}

a:hover {
  border-bottom: 1px solid #409EFF;
  padding-bottom: 5px;
}

#logo {
  position: fixed;
  color: #409EFF;
  font-size: 30px;
  margin-top: 13px;
  margin-left: 20px;
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
  padding-left: 15px;
  padding-right: 15px;
  font-size: 20px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  overflow: scroll;
}

</style>