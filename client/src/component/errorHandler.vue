<template>
  <div class="error-message-box">
    <div class="error-message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    errorMessage: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      message: ''
    }
  },
  created() {
    this.setErrorMessage(this.errorMessage)
  },
  methods: {
    setErrorMessage(errorMessage) {
      console.log(errorMessage)
      JSON.stringify(errorMessage)
      if (errorMessage.includes('email')) {
        this.message = 'Email is already in use'
      } else if (errorMessage.includes('phone')) {
        this.message = 'Phone is already in use'
      } else {
        this.message = 'OOPS..somthing went wrong, please try again'
      }
    }
  }
}
</script>

<style scoped>
.error-message-box {
  padding: 5px;
  margin: 5px 0;
}
.error-message {
  color: red;
}
</style>
