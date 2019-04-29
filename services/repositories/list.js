import Repository from './home'
const resource = '../data/repositories.json'

export default {
	get () {
		return Repository.get(`${resource}`)
	},
	getAPI (slug) {
		return Repository.get(`${resource}`).then((res) => {
			return {
				data: res.data.filter(obj => obj.component === slug)
			}
		})
			.catch((e) => {
				console.log(e)
			})
	}
}
