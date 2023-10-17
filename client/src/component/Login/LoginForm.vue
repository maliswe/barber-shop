<template>
  <div class="login-form">
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <input type="email" placeholder="Email" v-model="email">
      </div>
      <div class="input-group">
        <input type="password" placeholder="Password" v-model="password">
      </div>
      <div class="input-group">
        <button type="submit" class="login-btn">Sign In</button>
      </div>
    </form>
    <div>
      <p>Don't have an account? <i @click.prevent="showSignUp" role="button">Sign Up</i></p>
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

<style lang="scss" scoped>

.login-form{
  input {
    width: 25rem;
    border-radius: 10px;
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.06);
    border: silver;
    box-shadow: 0;

    padding: 10px;
    margin: 10px 0;
  }

  .login-btn {
    background-color: #E7A356;
    margin-top: 5%;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    cursor-color

    &:hover {
      background-color: #d68c3f;
    }
  }
  i{
    color: #d68c3f;
    &:hover{
      color: rgb(85, 85, 231);
    }
  }

  p{
    padding-top: 8%;
  }

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
