import Vue from 'vue';
import Vuex from 'vuex';

import auth from '../_services/auth-service';
import alert from './alert-module';
import linkService from "../_services/link-service";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        auth,
        alert,
        linkService
    }
});
