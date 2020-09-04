<template>
  <div id="form">
    <div id="content">
      <div class="un">
        <div class="name">用户名：</div>
        <input v-model="username" placeholder="请输入用户名">
      </div>
      <div class="un" style="margin-top: 10px">
        <div class="name">密码：</div>
        <input type="password" v-model="password" placeholder="请输入密码">
      </div>
      <div style="text-align: center">
        <button id="login_btn" v-on:click="login">登录</button>
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
      axios.post('http://127.0.0.1:8081/login', loginData).then(response => {
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
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}


.un {
  height: 40px;
}

.name {
  display: inline-block;
  width: 100px;
}

input {
  height: 30px;
}

#login_btn {
  margin-top: 20px;
  width: 200px;
  height: 30px;
}


</style>