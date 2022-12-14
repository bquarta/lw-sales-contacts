import axios from "axios";

const state = {
    error: null,
    continents: []
};

const getters = {
    allContinents(state) {
        return state.continents;
    }
};

const actions = {
    getContinents({ commit }) {
        axios
            .get('https://lapi.ocean-erp.de/v1/continent/')
            .then((response) => {
                for (const continent of response.data) {
                    continent.isActive = true;
                }
                commit('setContinents', response.data);
            })
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