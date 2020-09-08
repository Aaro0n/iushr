import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/router'

Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.component('todo-item', {
    template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">Remove</button>\
    </li>\
  ',
    props: ['title']
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
