<template>
  <div class="container">
    <RegisterForm @submit="handleRegister" />
    <ThirdPartyRegister />
  </div>
</template>

<script>
import RegisterForm from '../component/Register/ RegisterForm.vue'
import ThirdPartyRegister from '../component/Register/ThirdPartyRegister.vue'
import axios from 'axios'

export default {
  components: {
    RegisterForm,
    ThirdPartyRegister
  },
  methods: {
    async handleRegister(payload) {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/customers', payload)
        if (response.data) {
          console.log('Registration successful', response.data)
        }
      } catch (error) {
        console.error('There was an error registering the user:', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  justify-content: space-between; // Use space-between to create space between the two components.
  padding: 0 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Add padding to make it look more centered
}
</style>
