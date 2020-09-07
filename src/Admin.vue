<template>
  <div id="admin">
    <el-button v-on:click="editor(null)">Editor</el-button>

    <div>
      <el-table :data="articles" style="width: 100%"
                max-height="350">

        <el-table-column
            prop="updateTime"
            label="日期"
            width="180">
        </el-table-column>

        <el-table-column
            prop="title"
            label="标题"
            width="180">
        </el-table-column>

        <el-table-column
            fixed="right"
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button @click="editor(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Admin",
  data() {
    return {
      articles: [],
    }
  },

  methods: {
    editor: function (article) {
      console.log(article)
      localStorage.setItem('article', article)
      this.$router.push('/editor')
    }
  },
  mounted() {
    axios.get("http://127.0.0.1:8081/article").then(response => {
      this.articles = response.data.data
      console.log(this.articles)
    })
  },
}
</script>

<style scoped>

#admin {
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

</style>