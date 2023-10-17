<template>
  <div>
    <div v-if="!isLoggedIn" class="button-container">
      <button @click="goToSignInPage">Sign In</button>
      <button @click="goToBook"><i class="fa fa-calendar"></i>Book</button>
    </div>
    <div v-if="isLoggedIn && role === 'Customer'" class="button-container">
      <button @click="logout">Logout</button>
      <button @click="goToBook"><i class="fa fa-calendar"></i>Book</button>
    </div>
    <div v-if="isLoggedIn && role === 'Barber'" class="button-container">
      <button @click="logout">Logout</button>
      <button @click="goToBarberDashboard">Barber Dashboard</button>
    </div>
    <div v-if="isLoggedIn && role === 'Admin'" class="button-container">
      <button @click="logout">Logout</button>
      <button @click="goToAdminDashboard">Admin Dashboard</button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'BookingButton',
  computed: {
    ...mapState(['isLoggedIn', 'role'])
  },
  methods: {
    goToSignInPage() {
      this.$router.push({ name: 'Login' }).catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          throw err
        }
      })
    },
    goToBarberDashboard() {
      this.$router.push({ name: 'BarberDashoard' }).catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          throw err
        }
      })
    },
    goToAdminDashboard() {
      this.$router.push({ name: 'AdminDashboard' }).catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          throw err
        }
      })
    },
    goToBook() {
      this.$router.push({ name: 'Book' }).catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          throw err
        }
      })
    },
    logout() {
      this.$store.commit('SET_LOGIN_STATUS', false)
      this.$store.commit('SET_ROLE', null)
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
<style lang="scss" scoped>
.button-container {
  display: flex;
  gap: 2rem;
}

button {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: white;
  color: #E7A356;
  font-weight: 500;
  border: black;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  i {
    margin-right: 8px;
    font-size: 16px;
  }

  &:hover {
    background-color: darken(#E7A356, 10%);
    color: aliceblue;
  }

  @media (max-width: 758px) {
    display: none;
  }
}
</style>
