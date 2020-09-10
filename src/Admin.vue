<template>
  <div id="admin">
    <el-button v-on:click="editor(null)">TYPE</el-button>

    <div>
      <el-table
          :data="articles"
          style="width: 100%"
          max-height="390">

        <el-table-column
            label="日期"
            width="180">
          <template slot-scope="scope">
            <span>{{ new Date(scope.row.updateTime).toDateString() }}</span>
          </template>
        </el-table-column>

        <el-table-column
            prop="title"
            label="标题"
            width="200">
        </el-table-column>

        <el-table-column
            label="操作"
            width="110">
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

        <el-table-column
            label="删除"
            width="80">
          <template slot-scope="scope">
            <i class="el-icon-delete"
               @click="deleteItem(scope.row)">
            </i>
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
    editor: function (param) {
      console.log(param)
      localStorage.setItem('article', JSON.stringify(param))
      this.$router.push('/editor')
    },
    changeStatus: function (param) {
      let typeValue = param.type === true ? 0 : 1
      let formData = new FormData()
      formData.append('type', typeValue)
      axios.post(this.COMMON.server + 'article/' + param.id,
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
      localStorage.setItem('preview', param.content)
      let route = this.$router.resolve({path: '/preview'})
      window.open(route.href, '_blank');
    },

    deleteItem: function (param) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete(this.COMMON.server + 'article/' + param.id, {
          headers: {
            'token': localStorage.getItem('token')
          }
        }).then(response => {
          if (response.data.code === 0) {
            this.getAllArticle();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    getAllArticle: function () {
      axios.get(this.COMMON.server + "article").then(response => {
        this.articles = response.data.data
        this.articles.forEach(it => {
          it.type = it.type === 0
        })
      })
    },
  },
  mounted() {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login')
    }
    this.getAllArticle()
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