import httpClient from '../Common/Http';

class MovieService {
    retrieveAll(title) {
        return httpClient.get(`/movies/?title=${title}`);
    }

    searchByTitle(title) {
        return httpClient.get(`/movies?title=${title}`);
    }

    retrieveById(id) {
        return httpClient.get(`/movies/${id}`);
    }

    create(data) {
        return httpClient.post("/movies/", data);
    }

    update(id, data) {
        return httpClient.put(`/movies/${id}`, data);
    }

    delete(id) {
        return httpClient.delete(`/movies/${id}`);
    }
}

export default new MovieService();