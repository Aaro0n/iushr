<template>
  <div id="home">

<!--    <div id="logo">-->
      <div id="logo">{{ title }}</div>
<!--    </div>-->

    <div id="blogs">
      <ul>
        <li v-for="article in articles" :key="article.id" id="title">
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
  color: #000
}

a:visited {
  color: #BEBEBE
}

a:hover {
  text-decoration: underline;
}

#logo {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 48px;
  height: 48px;
  color: black;
  text-align: center;
  font-size: 30px;
  line-height: 48px;
  margin-top: 20px;
  margin-left: 20px;
  font-family: "Verdana", Times, serif;
}

#blogs {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 80px;
}

/*ul{*/
/*  width: 400px;*/
/*  height: 400px;*/
/*}*/

#title {
  font-size: 20px;
  padding-bottom: 5px;
  margin-bottom: 15px;
  width: 400px;
  font-family: "Verdana", Times, serif;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

ul {
  list-style-type: none;
}


li {
  border-bottom: 1px solid #f3f3f3;
}


</style>