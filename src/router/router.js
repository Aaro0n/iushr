import Vue from 'vue/dist/vue.js'
import Router from 'vue-router'
import Test from '../Test.vue'
import TabTest from '../TabTest.vue'
import ToDo from "@/ToDo";
import Blog from "@/Blog";
import Home from "@/Home";

Vue.use(Router)

const routeMap = [
    {path: '/message/:id', component: Test},
    {path: '/tab', component: TabTest},
    {path: '/todo', component: ToDo},
    {path: '/blog/:id', component: Blog},
    {path: '/home', component: Home}
];

const router = new Router({
    routes: routeMap
});

export default router

router.beforeEach((to, from, next) => {
    /* must call `next` */
    if (to.path === "/") {
        next({path: "/tab"})
    }
    console.log(to.path);
    next()

});
