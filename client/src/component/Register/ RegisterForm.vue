<template>
  <div class="registration-form">
    <!-- Your form elements go here -->
    <form @submit.prevent="$emit('submit', { name, lastName, phone, email, password })">
      <!-- Form fields -->
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
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegistrationForm',
  data() {
    return {
      name: '',
      lastName: '',
      phone: '',
      email: '',
      password: ''
    }
  }
}
</script>

<style scoped lang="scss">
.registration-form {

  // styling for the form
  input {
    width: 25rem;
    border-radius: 15px;
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.06);
    box-shadow: 0cqmax;

    padding: 10px;
    margin: 10px 0;
  }

  button {
    // styling for the buttons'
    background-color: #E7A356;
    margin-top: 5%;
    margin-left: 5%;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #d68c3f;
    }
  }

   // Media query for phone size or smaller devices
   @media (max-width: 768px) {
    input {
      width: 100%;
      margin: 5px 0;
    }

    button {
      margin-top: 10%;
      margin-left: 0;
      width: 100%;
    }
  }
}
</style>
