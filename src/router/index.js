import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "@/view/Home";

const routes = [
    {
        path: '/',
        component: Home
    },
]

export default createRouter({
    history: createWebHashHistory(),
    routes
})
