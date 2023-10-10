import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api/v1/admins'

export const admin = {
  getAllAdmins() {
    return axios.get(`${BASE_URL}`)
  },

  getAdmin(userId) {
    return axios.get(`${BASE_URL}/${userId}`)
  },

  createAdmin(userData) {
    return axios.post(`${BASE_URL}`, userData)
  },

  updateAdmin(userId, userData) {
    return axios.put(`${BASE_URL}/${userId}`, userData)
  },

  deleteAdmin(userId) {
    return axios.delete(`${BASE_URL}/${userId}`)
  }
}
