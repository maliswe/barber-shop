<template>
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
    <div class="input-group">
      <button type="submit">Register</button>
    </div>
  </form>
</template>

<script>
export default {
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
<style lang="scss" scoped>

input {
  width: 100%;
  border-radius: 30px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  box-shadow: 0cqmax;

  padding: 10px;
  margin: 10px 0;
}

.phone-container {
  display: flex;
  align-items: center;

  .vue-tel-input {
    margin-right: 10px; // adjust as needed for spacing
  }
}
</style>
