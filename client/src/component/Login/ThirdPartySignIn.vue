<template>
  <div>
    <button @click.prevent="handleGoogleSignIn">Sign In with Google</button>
    <button @click.prevent="handleAppleSignIn">Sign In with Apple</button>
  </div>
</template>
<script>
export default {
  methods: {
    handleGoogleSignIn() {
      // Logic for Google sign-in
    },
    handleAppleSignIn() {
      // Logic for Apple sign-in
    }
  }
}
</script>
