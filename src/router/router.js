import Vue from 'vue/dist/vue.js'
import Router from 'vue-router'
import Tab from '@/Tab'
import Blog from "@/Blog";
import Home from "@/Home";
import Upload from "@/Upload";
import Login from "@/Login";
import Editor from '@/Editor';
import Admin from '@/Admin';
import Preview from '@/Preview';
import Register from '@/Register';

Vue.use(Router)

const routeMap = [
    {path: '/tab', component: Tab},
    {path: '/blog/:id', component: Blog},
    {path: '/home', component: Home},
    {path: '/upload', component: Upload},
    {path: '/login', component: Login},
    {path: '/editor', component: Editor},
    {path: '/admin', component: Admin},
    {path: '/preview', component: Preview},
    {path: '/register', component: Register},
];

const router = new Router({
    routes: routeMap
});

export default router

router.beforeEach((to, from, next) => {
    /* must call `next` */
    if (to.path === "/") {
        next({path: "/home"})
    }
    console.log(to.path);
    next()
});
