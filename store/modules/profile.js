import { DB } from '~/services/firebase'

const _db = DB.ref('profiles')

class Profile {
	constructor (firstName, lastName, animal, city, gender, bio, user, id = null, active = false) {
		this.firstName = firstName
		this.lastName = lastName
		this.animal = animal
		this.city = city
		this.gender = gender
		this.bio = bio
		this.user = user
		this.id = id
		this.active = active
	}
}

export default {
	state: {
		profiles: []
	},

	mutations: {
		newProfile (state, payload) {
			state.profiles.push(payload)
		},

		loadProfiles (state, payload) {
			state.profiles = payload
		},

		editProfile (state, payload) {
			const profile = state.profiles.find(p => p.id === payload.id)

			Object.keys(profile).forEach((key) => {
				profile[key] = payload[key]
			})
		},

		setActiveStatus (state, id) {
			const profile = state.profiles.find(p => p.id === id)

			profile.active = true

			state.profiles
				.filter(p => p.id !== id)
				.forEach(p => { p.active = false })
		},

		resetActiveStatus (state) {
			state.profiles.forEach(p => { p.active = false })
		}
	},

	actions: {
		async loadProfiles ({ commit }) {
			commit('clearError')
			commit('setLoading', true)

			try {
				const profile = await _db.once('value')
				const profiles = profile.val()

				if (profiles) {
					const profilesArray = []

					Object.keys(profiles).forEach(key => {
						const t = profiles[key]

						profilesArray.push(
							new Profile(
								t.firstName,
								t.lastName,
								t.animal,
								t.city,
								t.gender,
								t.bio,
								t.user,
								key,
								t.active
							)
						)
					})

					commit('loadProfiles', profilesArray)
				}
				else {
					commit('loadProfiles', [])
				}

				commit('setLoading', false)
			}
			catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)

				throw error
			}
		},

		async newProfile ({ commit, getters }, payload) {
			commit('clearError')
			commit('setLocalLoad', true)

			try {
				const newProfile = new Profile(
					payload.firstName,
					payload.lastName,
					payload.animal,
					payload.city,
					payload.gender,
					payload.bio,
					getters.user.id
				)
				const profile = await _db.push(newProfile)

				commit('newProfile', {
					...newProfile,
					id: profile.key,
					active: false
				})

				setTimeout(() => commit('setLocalLoad', false), 1300)
			}
			catch (error) {
				commit('setLocalLoad', false)
				commit('setError', error.message)

				throw error
			}
		},
		async removeProfiles ({ commit, getters }, payload) {
			commit('clearError')

			try {
				const active = getters.activeProfile

				if (typeof payload === 'string') {
					await _db.child(payload).remove()

					if (active && active.id === payload) commit('resetActiveStatus')
				}
				else {
					await payload.forEach(blob => {
						_db.child(blob.id).remove()
					})

					if (active && payload.some(p => p.id === active.id)) commit('resetActiveStatus')
				}
			}
			catch (error) {
				commit('setError', error.message)

				throw error
			}
		},

		async editProfile ({ commit, getters }, payload) {
			commit('clearError')
			commit('setLocalLoad', true)

			try {
				await _db.child(payload.id).update(payload)

				commit('editProfile', payload)
				commit('setLocalLoad', false)
			}
			catch (error) {
				commit('setLocalLoad', false)
				commit('setError', error.message)

				throw error
			}
		},

		async setActiveStatus ({ commit }, id) {
			commit('clearError')
			commit('setLocalLoad', true)

			try {
				await _db.once('value', (snapshot) => {
					snapshot.forEach((child) => {
						child.ref.update({
							active: false
						})
					})
				}).then(() => {
					_db.child(id).update({ active: true })
				})

				commit('setActiveStatus', id)

				setTimeout(() => commit('setLocalLoad', false), 750)
			}
			catch (error) {
				setTimeout(() => commit('setLocalLoad', false), 750)

				commit('setError', error.message)

				throw error
			}
		},
		async resetActiveStatus ({ commit }) {
			commit('clearError')
			commit('setLocalLoad', true)

			try {
				await _db.once('value', (snapshot) => {
					snapshot.forEach((child) => {
						child.ref.update({
							active: false
						})
					})
				})

				commit('resetActiveStatus')
				commit('setLocalLoad', false)
			}
			catch (error) {
				commit('setLocalLoad', false)
				commit('setError', error.message)

				throw error
			}
		}
	},
	getters: {
		profiles: (state, getters) => !getters.guest ? state.profiles.filter(t => t.user === getters.user.id) : [],
		activeProfile: (state) => state.profiles.filter(p => p.active)
	}
}
