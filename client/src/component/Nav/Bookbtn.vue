<template>
  <button @click="goToBook" class="booking-btn">
    <i class="fa fa-calendar"></i> Book
  </button>
</template>
<script>
export default {
  name: 'BookingButton',
  methods: {
    goToBook() {
      this.$router.push({ name: 'Book' })
    }
  }
}
</script>
<style lang="scss" scoped>
.booking-btn {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: white;
  color: #e7a356;
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
    background-color: darken(#e7a356, 10%);
  }

  @media (max-width: 758px) {
    display: none;
  }
}
</style>
