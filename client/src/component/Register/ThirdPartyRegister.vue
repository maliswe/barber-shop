<template>
    <div class="third-party">
        <button @click.prevent="handleGoogleRegister">Register with Google</button>
        <button @click.prevent="handleAppleRegister">Register with Apple</button>
    </div>
</template>

<script>
export default {
  methods: {
    handleGoogleRegister() {
      // Logic for Google registration
    },
    handleAppleRegister() {
      // Logic for Apple registration
    }
  }
}
</script>

<style lang="scss" scoped>
.third-party {
    display: flex;
    flex-direction: column;
    gap: 20px;

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
}
</style>
