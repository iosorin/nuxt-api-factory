import axios from 'axios'

const proxyurl = 'https://cors-anywhere.herokuapp.com/'
const baseDomain = `${proxyurl}https://itunes.apple.com`
const baseURL = `${baseDomain}/search?term=`
const query = `${baseURL}daft&entity=album`

const Repository = axios.create({
	baseURL
})

export default {
	get () {
		return Repository.get(`${query}`).then((res) => res.data.results)
			.catch((e) => {
				console.log(e)
			})
	},
	getAlbum (word) {
		const req = baseURL + word + '&entity=album'
		return Repository.get(`${req}`).then((res) => res.data.results)
			.catch((e) => {
				console.log(e)
			})
	}
}
