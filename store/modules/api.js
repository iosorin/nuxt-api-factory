import { RepositoryFactory } from '~/services/repositoryFactory'
const REPOLIST = RepositoryFactory.get('REPOLIST')
const ITUNES = RepositoryFactory.get('itunes')

class API {
	constructor (info, data) {
		this.info = info
		this.data = data
	}
}

export default {
	state: {
		API: null,
		APILIST: null
	},
	mutations: {
		setApiPerPage (state, payload) {
			state.API = payload
		},
		setAPIList (state, payload) {
			state.APILIST = payload
		},
		updateData (state, payload) {
			state.API.data = payload
		}
	},
	actions: {
		async getApiList ({ commit }) {
			commit('clearError')
			commit('setLoading', true)
			try {
				const data = await REPOLIST.get().then((res) => res.data)
				commit('setAPIList', data)
				commit('setLoading', false)
			} catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)
				throw error
			}
		},
		async setApiPerPage ({ commit }, slug) {
			commit('clearError')
			commit('setLoading', true)
			try {
				let info

				const data = await REPOLIST.getAPI(slug)
					.then(res => {
						info = res.data[0]
						return res.data[0].component
					})
					.then(name => RepositoryFactory.get(name).get())

				commit('setApiPerPage', new API(info, data))
				commit('setLoading', false)
			} catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)
				throw error
			}
		},
		async getAlbum ({ commit }, album) {
			commit('clearError')
			commit('setLoading', true)
			try {
				const data = await ITUNES.getAlbum(album)
				commit('updateData', data)
				commit('setLoading', false)
			} catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)
				throw error
			}
		}
	},
	getters: {
		API: (state) => state.API,
		APIData: (state) => state.API ? state.API.data : [],
		APIList: (state) => state.APILIST
	}
}
