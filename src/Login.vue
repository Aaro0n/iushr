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
        <el-button type="primary" plain size="medium" v-on:click="login">&emsp;&emsp;&emsp;登录&emsp;&emsp;&emsp;
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    login: function () {
      let passwd = md5(this.password)
      let loginData = {'name': this.username, 'password': passwd}
      axios.post(this.COMMON.server + 'login', loginData).then(response => {
        console.log(response.data)
        if (response.data.code === 0) {
          localStorage.setItem("token", response.data.data.token)
          this.$router.push("/upload")
        } else {
          console.log(response.data.data.message)
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