import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "@/view/Home";
import Article from "@/view/Article";

const routes = [
    {
        path: '/',
        component: Home
    }, {
        path: '/article',
        component: Article
    }
]

export default createRouter({
    history: createWebHashHistory(),
    routes
})
