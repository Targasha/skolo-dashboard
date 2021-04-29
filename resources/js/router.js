import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import Login from './components/Login';

import ListLinks from "./components/links/ListLinks";
import CreateLink from "./components/links/CreateLink";
import EditLink from "./components/links/EditLink";


Vue.use(VueRouter);

const routes = [
    {
        path: '*',
        component: NotFound
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            auth: true
        }
    },
    {
        path: '/links',
        name: 'ListLinks',
        component: ListLinks,
        meta: {
            auth: true
        }
    },
    {
        path: '/links/create',
        name: 'CreateLink',
        component: CreateLink,
        meta: {
            auth: true
        }
    },
    {
        path: '/links/edit/:id',
        name: 'EditLink',
        component: EditLink,
        props: true,
        meta: {
            auth: true
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user')

    if (to.matched.some(record => record.meta.auth) && !loggedIn) {
        next('/login')
        return
    }
    next()
});

export default router
