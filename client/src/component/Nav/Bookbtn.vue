<template>
    <div class="button-container">
        <button @click="goToSignInPage">
            Sign In
        </button>
        <button>
            <i class="fa fa-calendar"></i> Book
        </button>
    </div>
</template>
<script>
export default {
  name: 'BookingButton',
  methods: {
    goToBook() {
      this.$router.push({ name: 'Book' })
    }
  },
  methods: {
    goToSignInPage() {
      this.$router.push({ name: 'Login' }).catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          throw err
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.button-container {
    display: flex;
    gap: 2rem;
}
button{
    display: flex;
    align-items: center;
    padding: 8px 16px;
    background-color: white;
    color: #E7A356;
    font-weight: 500;
    border: black;
    border-radius: 5px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s ease-in-out;

  i {
    margin-right: 8px;
    font-size: 16px;
  }

    &:hover {
        background-color: darken(#E7A356, 10%);
        color: aliceblue;
    }

  @media (max-width: 758px) {
    display: none;
  }
}
</style>
