<template>
  <div>
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <input type="email" placeholder="Email" v-model="email">
      </div>
      <div class="input-group">
        <input type="password" placeholder="Password" v-model="password">
      </div>
      <div class="input-group">
        <button type="submit">Sign In</button>
      </div>
    </form>
    <div>
      <p>Don't have an account? <button @click.prevent="showSignUp">Sign Up</button></p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['onLogin'],
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async handleLogin() {
      this.onLogin(this.email, this.password)
    },

    showSignUp() {
      this.$router.push({ name: 'Register' })
    }
  }
}
</script>
