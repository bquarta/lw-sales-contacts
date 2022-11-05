import axios from "axios";

const state = {
    error: null,
    // isLoading: false,
    continents: []
};

const getters = {
    allContinents(state) {
        return state.continents;
    }
};

const actions = {
    getContinents({ commit }) {

        // state.isLoading = true;
        // state.error = null;

        axios
            .get('https://lapi.ocean-erp.de/v1/continent/')
            .then((response) => {
                // add default "isActive"-Property for each continent
                for (const continent of response.data) {
                    continent.isActive = true;
                }

                commit('setContinents', response.data);

                // state.isLoading = false;
            })
            .catch((err) => {
                // state.isLoading = false;
                // state.error = err;
            });
    }
};

const mutations = {
    setContinents(state, continents) {
        state.continents = continents;
    },
    setContinentIsActive(store, { continentCode, isActive }) {
        for (const continent of store.continents) {
            if (continent.continentCode === continentCode) {
                continent.isActive = isActive;
            }
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};