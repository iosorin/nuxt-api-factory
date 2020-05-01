import Repository from './home';
const REPOS = '../data/repositories.json';

export default {
    get() {
        return Repository.get(`${REPOS}`);
    },
    getAPI(slug) {
        return Repository.get(`${REPOS}`).then((res) => {
            return {
                data: res.data.filter(obj => obj.component === slug)
            };
        })
            .catch((e) => {
                console.log(e);
            });
    }
};
