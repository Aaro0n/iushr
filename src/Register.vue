<template>
  <div id="form">
    <div>
      <div class="input">
        <div class="title">用户名:</div>
        <el-input v-model="username" placeholder="请输入用户名"></el-input>
      </div>
      <div style="margin-top: 18px" class="input">
        <div class="title">密&emsp;码:</div>
        <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
      </div>
      <div style="text-align: center; margin-top: 28px">
        <el-button type="primary" plain size="medium" v-on:click="login">&emsp;&emsp;&emsp;注册&emsp;&emsp;&emsp;
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    login: function () {
      if (this.username.length === 0 || this.password.length === 0) {
        this.$message({
          type: 'error',
          message: '用户名或密码不能为空'
        });
        return;
      }
      let md5Password = md5(this.password)
      let registerData = new FormData()
      registerData.append('name', this.username)
      registerData.append('password', md5Password)
      axios.post(this.COMMON.server + 'register', registerData).then(response => {
        if (response.data.code === 0) {
          this.$router.push("/login")
        } else {
          this.$message({
            type: 'error',
            message: response.data.message
          });
        }
      })
    },
  }
}
</script>

<style scoped>

#form {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  height: 100%;
}

.input {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  width: 100px;
  color: #303133;
}

</style>