import axios from "axios";

const state = {
    error: null,
    // isLoading: false,
    contacts: []
};

const getters = {
    allContacts(state) {
        return state.contacts;
    }
};

const actions = {
    getContacts({ commit }, payload) {

        if (payload === undefined) {
            payload = { country: '' }
        }

        // state.isLoading = true;
        // state.error = null;

        if (payload.country != '') {
            payload.country = 'country/' + payload.country;
        }

        axios.get('https://lapi.ocean-erp.de/v1/sales-contacts/' + payload.country)
            .then((response) => {

                commit('setContacts', response.data);

                // state.isLoading = false;
            })
            .catch((err) => {
                // state.isLoading = false;
                // state.error = err;
            });
    }
};

const mutations = {
    setContacts(state, contacts) {
        state.contacts = contacts;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};