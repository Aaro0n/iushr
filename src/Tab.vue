<template>
  <div id="Tab">
    <el-tabs v-show="false" v-model="activeName" @tab-click="handleClick" ref="tabs" stretch="true"
             tab-position="top">
      <el-tab-pane v-for="item in nameList" v-bind:key="item.id" v-bind:label="item.title"
                   v-bind:name="item.id+''">
        <ul>
          <li v-for="item in newList" v-bind:key="item.id">
            <a v-bind:href="item.url">{{ item.title }}</a>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>

    <!--    <el-button v-show="true" type="primary" @click="jump">主要按钮</el-button>-->
    <!--    <el-button v-show="true" type="primary" @click="blog">跳转到Blog</el-button>-->
    <el-button v-show="false" type="primary" @click="request">请求数据</el-button>

    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/home">Home</router-link>
    <br>
    <router-link to="/upload">Upload</router-link>
    <br>
    <router-link to="/login">Login</router-link>
    <!-- <router-link to="/bar">Go to Bar</router-link>-->
    <!-- <router-link to="/user/test">Go to User</router-link>-->

    <!-- 这就使用了TestButton 组件 -->
    <test-button v-show="false" v-bind:title="title"></test-button>
    <test-button v-show="false" v-bind:title="newTitle"></test-button>
    <p v-show="false">Using v-html directive: <span v-html="rawHtml"></span></p>
  </div>
</template>

<script>
import axios from 'axios'
import TestButton from "@/components/TestButton";

export default {

  name: "Tab",
  components: {TestButton},
  data() {
    return {
      activeName: "2",
      nameList: [{title: "配置管理配置管理"}],
      newList: [],
      title: {name: "this is test button"},
      rawHtml: "<span style=\"color: red\">This should be red.</span>"
    };
  },
  // webstorm 的提示有问题
  beforeCreate() {

    axios.get("http://api-hot.mrcuriosity.org/sites?format=json").then(response => {
      this.nameList = response.data.data


      axios.get("http://api-hot.mrcuriosity.org/sites/2/news?format=json").then(response => {
        this.newList = response.data.data
      })
    })
  },


  computed: {
    newTitle: function () {
      return {name: "this is computed button"}
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      console.log(tab.name)
      // 获取数据
      axios.get("http://api-hot.mrcuriosity.org/sites/" + tab.name + "/news?format=json").then(response => {
        this.newList = response.data.data
      })

    },
    jump() {
      this.$router.push({path: '/message/mmessmm'})
    },

    blog() {
      this.$router.push({path: '/blog'})
    },

    request() {
      axios.get("http://api-hot.mrcuriosity.org/sites?format=json").then(response => {
        this.nameList = response.data.data
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>


</style>