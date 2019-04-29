import axios from 'axios'

const baseDomain = `https://breaking-bad-quotes.herokuapp.com`
const baseURL = `${baseDomain}/v1/quotes`
const query = `${baseURL}/30`

const Repository = axios.create({
	baseURL
})

export default {
	get () {
		return Repository.get(`${query}`).then((res) => res.data)
			.catch((e) => {
				console.log(e)
			})
	}
}
