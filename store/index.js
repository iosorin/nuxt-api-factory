import Vuex from 'vuex';
import auth from './modules/auth';
import loading from './modules/loading';
import profile from './modules/profile';
import api from './modules/api';

let store;

const initStore = () => {
    return store || (store = new Vuex.Store({
        modules: {
            auth,
            loading,
            profile,
            api
        }
    }));
};

export default initStore;
