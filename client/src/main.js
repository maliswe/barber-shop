import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from './router/index.js'
import store from './store/store.js'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  router,
  store,
  created() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const role = localStorage.getItem('role')
    const token = localStorage.getItem('token')

    if (isLoggedIn && token) {
      // Validate the token with the backend
      axios.get('http://localhost:3000/api/validateToken', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          // Assuming the API responds with a success for valid tokens
          this.$store.commit('SET_LOGIN_STATUS', isLoggedIn)
          if (role) {
            this.$store.commit('SET_ROLE', role)
          }
        })
        .catch(error => {
          console.error('Token validation failed:', error)
          localStorage.removeItem('token')
          localStorage.removeItem('isLoggedIn')
          localStorage.removeItem('role')
          this.$store.commit('SET_LOGIN_STATUS', false)
          this.$store.commit('SET_ROLE', null)
        })
    }
  },
  render: h => h(App)
})

export default app
