import axios from "axios";

const state = {
    error: null,
    companies: []
};

const getters = {
    allCompanies(state) {
        return state.companies;
    }
};

const actions = {
    getCompanies({ commit }, payload) {

        if (payload === undefined) {
            payload = { country: '' }
        }

        if (payload.country != '') {
            payload.country = 'country/' + payload.country;
        }

        axios.get('https://lapi.ocean-erp.de/v1/sales-company/' + payload.country)
            .then((response) => {
                commit('setCompanies', response.data);
            })
            .catch((err) => {});
    }
};

const mutations = {
    setCompanies(state, companies) {
        state.companies = companies;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};