<template>
  <div class="container">
    <booking />
    <VueCalendar />
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

<style>
.container {
  display: flex;
  flex-direction: row;
  gap: 75px;
  padding-bottom: 200px;
}

.continue-button {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  padding: 10px;
  margin-left: 66%;
}
</style>
