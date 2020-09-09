import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/router'
import Common from './common'


Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.COMMON = Common;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
