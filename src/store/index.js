import { createStore } from 'vuex';
import contacts   from './modules/contacts';
import continents from './modules/continents';

export default createStore({
    modules: {
        contacts,
        continents,
    }
})