import Vue from 'vue/dist/vue.js'
import Router from 'vue-router'
import Test from '@/Test'
import Tab from '@/Tab'
import ToDo from "@/ToDo";
import Blog from "@/Blog";
import Home from "@/Home";
import Upload from "@/Upload";
import Login from "@/Login";
import Editor from '@/Editor';

Vue.use(Router)

const routeMap = [
    {path: '/message/:id', component: Test},
    {path: '/tab', component: Tab},
    {path: '/todo', component: ToDo},
    {path: '/blog/:id', component: Blog},
    {path: '/home', component: Home},
    {path: '/upload', component: Upload},
    {path: '/login', component: Login},
    {path: '/editor', component: Editor},
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
