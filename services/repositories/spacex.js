import axios from 'axios';

const baseDomain = `https://api.spacexdata.com/v3`;
const baseURL = `${baseDomain}`;
const query = `${baseURL}/rockets`;

const Repository = axios.create({
    baseURL
});

export default {
    get() {
        return Repository.get(`${query}`).then((res) => res.data)
            .catch((e) => {
                console.log(e);
            });
    }
};
