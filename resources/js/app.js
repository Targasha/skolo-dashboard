/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import router from "./router"
import { store }  from "./store"
import i18n from "./i18n"
import vuetify from "./vuetify"
import App from './components/App';
import authHeader from "./_helpers/auth-header"

window.Vue = require('vue').default;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// axios.defaults.baseURL = 'https://salons-api-gateway-bg.herokuapp.com';
axios.defaults.baseURL = 'http://skolo-dashboard.test/api';

// Assign global auth header to axios
let authToken = authHeader();

if (authToken) {
    axios.defaults.headers.common.Authorization = authToken;
}

const app = new Vue({
    el: '#app',
    router,
    vuetify,
    store,
    i18n,
    created() {
        axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response.status === 401) {
                    if (this.$route.name !== 'Login') {
                        this.$store.dispatch('auth/logout');
                        router.push('/login').catch(() => { });
                    }

                    return Promise.reject(error.response.data);
                }

                if (error.response.status === 422) {
                    // console.log('app.js', error.response.data.error);

                    let errors = error.response.data.error;

                    return Promise.reject(errors)
                }

                console.log(error);
                let data = error.response.data;
                error = (data && data.message) || response.statusText;
                return Promise.reject(error)
            }
        )
    },
    render: (h) => h(App)
});
