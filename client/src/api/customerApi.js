import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api/v1/customers'

export const customer = {
  getAllCustomer() {
    return axios.get(`${BASE_URL}`)
  },

  getCustomer(userId) {
    return axios.get(`${BASE_URL}/${userId}`)
  },

  createCustomer(userData) {
    return axios.post(`${BASE_URL}`, userData)
  },

  updateCustomer(userId, userData) {
    return axios.put(`${BASE_URL}/${userId}`, userData)
  },

  deleteCustomer(userId) {
    return axios.delete(`${BASE_URL}/${userId}`)
  },

  deleteAllCustomer() {
    return axios.delete(`${BASE_URL}`)
  }
}
