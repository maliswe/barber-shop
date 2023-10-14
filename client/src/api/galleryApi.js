import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api/v1/galleries'

export const galleries = {
  getAllGalleries() {
    return axios.get(`${BASE_URL}`)
  },

  getGallery(id) {
    return axios.get(`${BASE_URL}/${id}`)
  },

  createGallery(userData) {
    return axios.post(`${BASE_URL}`, userData)
  },

  updateGallery(id, userData) {
    return axios.patch(`${BASE_URL}/${id}`, userData)
  },

  deleteGallery(id) {
    return axios.delete(`${BASE_URL}/${id}`)
  }
}
