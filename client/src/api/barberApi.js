import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api/v1/barbers'

export const barber = {
  getAllbarbers() {
    return axios.get(`${BASE_URL}`)
  },

  getBarber(userId) {
    return axios.get(`${BASE_URL}/${userId}`)
  },

  createBarber(userData) {
    return axios.post(`${BASE_URL}`, userData)
  },

  updateBarber(userId, userData) {
    return axios.put(`${BASE_URL}/${userId}`, userData)
  },

  deleteBarber(userId) {
    return axios.delete(`${BASE_URL}/${userId}`)
  },

  deleteAllBarber() {
    return axios.delete(`${BASE_URL}`)
  }
}
