<template>
  <div id="admin">
    <el-button v-on:click="editor(null)">Editor</el-button>

    <div>
      <el-table :data="articles" style="width: 100%"
                max-height="390">

        <el-table-column
            prop="updateTime"
            label="日期"
            width="180">
        </el-table-column>

        <el-table-column
            prop="title"
            label="标题"
            width="200">
        </el-table-column>

        <el-table-column
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-on:click="preview(scope.row)">查看</el-button>
            <el-button @click="editor(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>

        <el-table-column
            label="发布"
            width="80">
          <template slot-scope="scope">
            <el-switch
                @change="changeStatus(scope.row)"
                v-model="scope.row.type"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
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
      publish: true,
    }
  },

  methods: {
    editor: function (article) {
      console.log(article)
      localStorage.setItem('article', article)
      this.$router.push('/editor')
    },
    changeStatus: function (param) {
      let typeValue = param.type === true ? 0 : 1
      let formData = new FormData()
      formData.append('type', typeValue)
      axios.post('http://127.0.0.1:8081/article/' + param.id,
          formData,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'token': localStorage.getItem('token')
            }
          }
      ).then(response => {
        console.log(response.data)
      })
    },
    preview: function (param) {
      this.$router.push('/blog/' + param.id)
    }

  },
  mounted() {
    axios.get("http://127.0.0.1:8081/article").then(response => {
      this.articles = response.data.data
      this.articles.forEach(it => {
        it.type = it.type === 0
      })
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