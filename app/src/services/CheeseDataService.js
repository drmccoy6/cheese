import http from "../http-common";

class CheeseDataService {
  getAll() {
    return http.get("/cheeses");
  }

  get(id) {
    return http.get(`/cheeses/${id}`);
  }

  create(data) {
    return http.post("/cheeses", data);
  }

  update(id, data) {
    return http.put(`/cheeses/${id}`, data);
  }

  delete(id) {
    return http.delete(`/cheeses/${id}`);
  }

  deleteAll() {
    return http.delete(`/cheeses`);
  }

  findByTitle(title) {
    return http.get(`/cheeses?title=${title}`);
  }
}

export default new CheeseDataService();