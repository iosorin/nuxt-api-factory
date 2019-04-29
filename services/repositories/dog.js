import axios from 'axios'

const baseDomain = 'https://dog.ceo/api'
const baseURL = `${baseDomain}/breed`
const query = `${baseURL}/hound/afghan/images`

const Repository = axios.create({
	baseURL
})

export default {
	get () {
		return Repository.get(`${query}`).then((res) => res.data.message)
			.catch((e) => {
				console.log(e)
			})
	}
}
