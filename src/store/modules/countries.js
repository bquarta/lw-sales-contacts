import axios from "axios";

const state = {
    error: null,
    // isLoading: false,
    countries: []
};

const getters = {
    allCountries(state) {
        return state.countries;
    }
};

const actions = {
    getCountries({ commit }) {
        
        // state.isLoading = true;
        // state.error = null;

        axios.get('https://lapi.ocean-erp.de/v1/country/')
             .then((response) => {

                commit('setCountries', response.data);

                // state.isLoading = false;
             })
             .catch((err) => {
                // state.isLoading = false;
                // state.error = err;
             });
    }
};

const mutations = {
    setCountries(state, countries) {
        state.countries = countries;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};