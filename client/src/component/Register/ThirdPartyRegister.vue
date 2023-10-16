<template>
  <div class="third-party">
    <button @click.prevent="handleGoogleRegister">Register with Google</button>
    <button @click.prevent="handleAppleRegister">Register with Apple</button>
  </div>
</template>

<script>
export default {
  name: 'ThirdPartyLogin',
  methods: {
    handleGoogleRegister() {
    },
    handleAppleRegister() {
    }
  }
}
</script>

<style scoped lang="scss">
.third-party{
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 0.5rem;

  button {
    background-color: #E7A356;
    padding: 10px 100px;
    border: none;
    line-height: 30px;
    border-radius: 5px;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #d68c3f;
    }
  }

  @media (max-width: 768px) {
    button {
      margin-top: 2%;
      margin-left: 0;
      width: 100%;
    }
  }

}
</style>
