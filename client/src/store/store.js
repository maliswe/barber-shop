import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    phone: null,
    isLoggedIn: false,
    role: null
  },
  mutations: {
    SET_USER(state, phone) {
      state.phone = phone
    },
    SET_LOGIN_STATUS(state, status) {
      state.isLoggedIn = status
    },
    SET_ROLE(state, role) {
      state.role = role
    }
  },
  actions: {
    loginUser({ commit }, { status, role }) {
      commit('SET_LOGIN_STATUS', status)
      commit('SET_ROLE', role)

      // Store the state in localStorage
      localStorage.setItem('isLoggedIn', status)
      localStorage.setItem('role', role)
    },
    logoutUser({ commit }) {
      commit('SET_LOGIN_STATUS', false)
      commit('SET_ROLE', null)

      // remove the state from the localStorage
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('role')
    },
    setRole({ commit }, role) {
      commit('SET_ROLE', role)
    }
  },
  getters: {
    userPhone: state => {
      return state.phone ? state.phone : null
    }
  }
})
