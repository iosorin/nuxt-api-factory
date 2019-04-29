export default {
	state: {
		loading: false,
		localload: false,
		error: null
	},
	mutations: {
		setLoading (state, payload) {
			state.loading = payload
		},
		setLocalLoad (state, payload) {
			state.localload = payload
		},
		setError (state, payload) {
			state.error = payload
		},
		clearError (state) {
			state.error = null
		}
	},
	actions: {
		setLoading ({ commit }, payload) {
			commit('setLoading', payload)
		},
		setLocalLoad ({ commit }, payload) {
			commit('setLocalLoad', payload)
		},
		setError ({ commit }, payload) {
			commit('setError', payload)
		},
		clearError ({ commit }) {
			commit('clearError')
		}
	},
	getters: {
		loading (state) {
			return state.loading
		},
		localload (state) {
			return state.localload
		},
		error (state) {
			return state.error
		}
	}
}
