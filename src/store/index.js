import { createStore } from 'vuex';
import contacts   from './modules/contacts';
import continents from './modules/continents';
import countries  from './modules/countries';

export default createStore({
    modules: {
        contacts,
        continents,
        countries
    }
})