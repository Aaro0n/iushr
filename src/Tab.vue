<template>
  <div id="Tab">
    <router-link to="/home">Home</router-link>
    <br>
    <router-link to="/upload">Upload</router-link>
    <br>
    <router-link to="/login">Login</router-link>
    <br>
    <router-link to="/editor">Editor</router-link>
    <br>
    <router-link to="/admin">Admin</router-link>


    <test-button v-show="false" v-bind:title="title"></test-button>
    <test-button v-show="false" v-bind:title="newTitle"></test-button>
    <p v-show="false">Using v-html directive: <span v-html="rawHtml"></span></p>
  </div>
</template>

<script>
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

  computed: {
    newTitle: function () {
      return {name: "this is computed button"}
    }
  },
  methods: {
    blog() {
      this.$router.push({path: '/blog'})
    },
  }
}
</script>

<style scoped>

</style>