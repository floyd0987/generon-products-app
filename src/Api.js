
const API = 'https://staging.generon.it/wp-json';
const QUERY_ITEMS = '?items=id,title,url&settore_merceologico=28';

const api = {
    fetchSiteInfo() {
        let url = API;
        return fetch(url).then((res) => res.json());
    },
    fetchPosts() {
        let url = API + '/wp/v2/product/';
        return fetch(url);
    }
};

export default api;
