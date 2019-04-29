import { auth } from '@/services/firebase'

export default context => {
	const { store } = context

	return new Promise((resolve, reject) => {
		auth.onAuthStateChanged(user => {
			 if (user) {
				store.dispatch('loggedUser', user)
	        	store.dispatch('loadProfiles')
			 } else {
	        	store.dispatch('resetActiveStatus')
			 }
			resolve()
		})
	})
}
