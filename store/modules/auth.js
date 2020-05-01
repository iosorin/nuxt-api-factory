import { auth } from '~/services/firebase';

class User {
    constructor(id) {
        this.id = id;
    }
}

export default {
    state: {
        user: null
    },

    mutations: {
        setUser(state, payload) {
            state.user = payload;
        }
    },

    actions: {
        async registerUser({ commit }, { email, password }) {
            commit('clearError');
            commit('setLoading', true);

            try {
                const user = await auth.createUserWithEmailAndPassword(email, password);

                commit('setUser', new User(user.user.uid));
                commit('setLoading', false);
            }
            catch (error) {
                commit('setLoading', false);
                commit('setError', error.message);

                throw error;
            }
        },

        async loginUser({ commit }, { email, password }) {
            commit('clearError');
            commit('setLoading', true);

            try {
                const user = await auth.signInWithEmailAndPassword(email, password);

                commit('setUser', new User(user.user.uid));
                commit('setLoading', false);
            }
            catch (error) {
                commit('setLoading', false);
                commit('setError', error.message);

                throw error;
            }
        },

        loggedUser({ commit }, payload) {
            commit('setUser', new User(payload.uid));
        },

        logoutUser({ commit }) {
            auth.signOut();

            commit('setUser', null);
        }
    },

    getters: {
        user: (state) => state.user,
        guest: (state) => state.user === null
    }
};
