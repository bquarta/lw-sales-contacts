import { createStore } from 'vuex';
import companies   from './modules/companies';
import contacts   from './modules/contacts';
import continents from './modules/continents';

export default createStore({
    modules: {
        companies,
        contacts,
        continents,
    }
})