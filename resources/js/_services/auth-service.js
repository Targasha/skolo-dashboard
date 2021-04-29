import axios from 'axios';
import router from '../router'
import i18n from '../i18n'

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: {loggedIn: true}, user }
    : { status: {}, user: null };

const getters = {

}

const actions = {
    login({ dispatch, commit }, credentials) {
        commit('loginRequest', credentials.email)
        return axios.post('/login', credentials)
            .then( ({data}) => {
                if(data.user && data.access_token){
                    let user = data.user;
                    user.access_token = data.access_token
                    commit('loginSuccess', user);
                    localStorage.setItem('user', JSON.stringify(user));
                    axios.defaults.headers.common.Authorization = `Bearer ${user.access_token}`;
                    router.push({ name: 'Dashboard' });
                }
            })
            .catch(error => {
                commit('loginFailure', error);
                dispatch('alert/error', error, { root: true });
            });
    },
    logout({ commit }) {

        commit('logout');
        localStorage.clear();
        delete axios.defaults.headers.common['Authorization'];
    }
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loading: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    }
};

const auth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

export default auth;
