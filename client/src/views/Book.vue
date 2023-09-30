<template>
  <div class="container"><booking /> <VueCalendar /></div>
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
  flex-direction: column;
  align-items: center;
  gap: 75px;
  padding-bottom: 80px;
}

.textSection {
  width: auto;
}
</style>
