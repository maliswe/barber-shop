<template>
    <div class="book">
        <button @click="navigateToBooking" class="book">
            <img src="../../assets/group.png">
            Book
        </button>
    </div>
</template>
<script>
export default {
  methods: {
    navigateToBooking() {
      this.$router.push({ name: 'Booking' })
    }
  }
}
</script>
<style lang="scss">
@import './bookBtn.module.scss';
</style>
