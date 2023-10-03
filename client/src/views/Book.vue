<template>
  <div class="container">
    <booking />
  </div>
</template>

<script>
import booking from '../component/Appointment/booking.vue'
export default {
  name: 'Book',
  components: {
    booking
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  padding-bottom: 200px;
  width: 100%;
}
</style>
