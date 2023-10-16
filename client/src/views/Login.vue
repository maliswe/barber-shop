<template>
  <div class="container">
    <LoginForm :onLogin="handleLogin" />
    <ThirdPartySignIn />
  </div>
</template>

<script>
import LoginForm from '../component/Login/LoginForm.vue'
import ThirdPartySignIn from '../component/Login/ThirdPartySignIn.vue'
import axios from 'axios'

export default {
  components: {
    LoginForm,
    ThirdPartySignIn
  },
  methods: {
    async handleLogin(email, password) {
      try {
        const response = await axios.post('http://localhost:3000/api/login', { email, password })

        console.log('API Response User Data:', response.data.phone)
        console.log(localStorage.getItem('token'))

        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token)
          this.updateStoreState(response.data.user, response.data.__t, response.data.phone)
          this.redirectBasedOnRole(response.data.__t)
        } else {
          console.error(response.data.message)
          alert('Login failed!')
        }
      } catch (error) {
        console.error('Login error:', error)
        if (error.response && error.response.status === 401) {
          alert('Invalid credentials. Please try again.')
        } else {
          alert('Login error! Please check your credentials or try again later.')
        }
      }
    },
    updateStoreState(user, role, phone) {
      this.$store.commit('SET_USER', phone)
      this.$store.commit('SET_LOGIN_STATUS', true)
      this.$store.commit('SET_ROLE', role)
    },
    redirectBasedOnRole(role) {
      const roleToRouteMapping = {
        Barber: 'BarberDashoard',
        Admin: 'AdminDashboard',
        Default: 'Home'
      }

      this.$router.push({ name: roleToRouteMapping[role] || roleToRouteMapping.Default })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  @media screen and (max-width: 768px) {
    margin: 0;
    padding: 15px;
  }

  @media screen and (max-width: 480px) {
    margin: 0;
    padding: 10px;
  }
}

button {
  background: linear-gradient(to right, #36D1DC, #5B86E5);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: linear-gradient(to right, #5B86E5, #36D1DC);
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
}
</style>

* The "Login" component is responsible for user authentication and login. It displays a login form and provides options for third-party sign-in.
* It communicates with the "LoginForm" and "ThirdPartySignIn" child components.
* It also handles user authentication by making an API request to log in a user and updating the application state based on the user's role.
