import axios from 'axios';

const proxyurl = 'https://cors-anywhere.herokuapp.com/';
const baseDomain = `${proxyurl}https://api-v3.igdb.com`;
const baseURL = `${baseDomain}/games`;
const query = `${baseURL}/?fields=name,url,summary,genres.name,screenshots.url,cover.url,popularity&order=popularity:desc&expand=genres`;

const Repository = axios.create({
    baseURL,
    headers: {
        'Accept': 'application/json',
        'user-key': '7336613fab1f8de302f852b854a3b085'
    }
});

export default {
    get() {
        return Repository.get(`${query}`).then((res) => res.data)
            .catch((e) => {
                console.log(e);
            });
    }
};
