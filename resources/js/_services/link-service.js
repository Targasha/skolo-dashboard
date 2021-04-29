import axios from 'axios';
import i18n from '../i18n';
import router from "../router";

const state = {
    items: [],
    item: {},
    error: null,
    loading: false
};

const getters = {

}

const actions = {
    obtainLinks({ commit, dispatch }) {
        commit('obtainLinksRequest');
        return axios.get('/links')
            .then(({ data }) => {
                commit('obtainLinksSuccess', data)
                return data
            })
            .catch(error => {
                commit('obtainLinksFailure', error);
                dispatch('alert/error', error, { root: true });
            });
    },

    createLink({commit, dispatch}, item) {
        commit('createLinkRequest');
        return axios.post('/links', item)
            .then(({ data }) => {
                commit('createLinkSuccess', data);
                dispatch('alert/success', i18n.t('success.create'), { root: true });
                router.push({ name: 'ListLinks'})
            })
            .catch(error => {
                commit('createLinkFailure', error);
                dispatch('alert/error', error, { root: true });
            });
    },

    obtainLink({ commit, dispatch }, id) {
        commit('obtainLinkRequest');
        return axios.get(`/links/${id}`)
            .then(({ data }) => {
                commit('obtainLinkSuccess', data);
            })
            .catch(error => {
                commit('obtainLinkFailure', error);
                dispatch('alert/error', error, { root: true });
            });
    },

    updateLink({ commit, dispatch }, item) {
        commit('updateLinkRequest', item);
        return axios.put(`/links/${item.id}`, item)
            .then(({ data }) => {
                commit('updateLinkSuccess', data);
                dispatch('alert/success', i18n.t('success.update'), { root: true });
            })
            .catch(error => {
                commit('updateLinkFailure', error);
                dispatch('alert/error', error, { root: true });
            });
    },

    deleteLink({ commit, dispatch }, id) {
        commit('deleteLinkRequest');
        return axios.delete(`/links/${id}`)
            .then(() => {
                commit('deleteLinkSuccess', id);
                dispatch('alert/success', i18n.t('success.delete'), { root: true });
            })
            .catch(error => {
                commit('deleteLinkFailure');
                dispatch('alert/error', error, { root: true });
            });
    }

}

const mutations = {
    obtainLinksRequest(state) {
        state.loading = true;
    },
    obtainLinksSuccess(state, items) {
        state.loading = false;
        state.items = items;
    },
    obtainLinksFailure(state, error) {
        state.loading = false;
        state.error = error ;
    },
    createLinkRequest(state) {
        state.loading = true;
    },
    createLinkSuccess(state, item) {
        state.loading = false;
        state.item = item;
    },
    createLinkFailure(state, error) {
        state.loading = false;
        state.item = {};
        state.error = error;
    },
    obtainLinkRequest(state) {
        state.loading = true;
    },
    obtainLinkSuccess(state, item) {
        state.loading = false;
        state.item = item;
    },
    obtainLinkFailure(state, error) {
        state.loading = false;
        state.item = {};
        state.error = error;
    },
    updateLinkRequest(state) {
        state.loading = true;
    },
    updateLinkSuccess(state, item) {
        state.loading = false;
        state.item = item;
    },
    updateLinkFailure(state, error) {
        state.loading = false;
        state.error = error;
    },
    deleteLinkRequest(state, id) {
        // add 'deleting:true' property to item being deleted
        state.items = state.items.map(item =>
            item.id === id
                ? { ...item, deleting: true }
                : item
        )
    },
    deleteLinkSuccess(state, id) {
        // remove deleted item from state
        state.items = state.items.filter(item => item.id !== id)
    },
    deleteLinkFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to item
        state.items = state.items.map(item => {
            if (item.id === id) {
                // make copy of item without 'deleting:true' property
                const { deleting, ...itemCopy } = item;
                // return copy of item with 'deleteError:[error]' property
                return { ...itemCopy, deleteError: error };
            }

            return item;
        })
    }
}

const linkService = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

export default linkService
