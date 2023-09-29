<template>
    <div class="container">
        <form @submit.prevent="handleRegister">
            <div class="input-group">
                <input type="text" placeholder="Name" v-model="name">
            </div>
            <div class="input-group">
                <input type="text" placeholder="Last Name" v-model="lastName">
            </div>
            <div class="input-group">
                <input type="tel" placeholder="Phone" v-model="phone">
            </div>
            <div class="input-group">
                <input type="email" placeholder="Email" v-model="email">
            </div>
            <div class="input-group">
                <input type="password" placeholder="Password" v-model="password">
            </div>
            <div class="input-group">
                <button @click="handleRegister">Register</button>
            </div>
        </form>
    </div>
</template>
<script>

import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      lastName: '',
      phone: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async handleRegister() {
      try {
        const userData = {
          name: this.name,
          lastName: this.lastName,
          phone: this.phone,
          email: this.email,
          password: this.password
        }

        // Modify the endpoint to point to your server
        const response = await axios.post('http://localhost:3000/api/customers', userData)

        if (response.data) {
          // Handle success - maybe navigate to another page or show a success message
          console.log('Registration successful', response.data)
        }
      } catch (error) {
        // Handle error - show an error message or handle it accordingly
        console.error('There was an error registering the user:', error)
      }
    }
  }
}
</script>
<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.input-group {
    margin-bottom: 20px;
}

button {
    background-color: #E7A356;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #d68c3f;
}
</style>
