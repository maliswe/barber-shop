<!--
*The "Book" component is responsible for displaying and managing the selection of services for booking appointments.
-->
<template>
  <div class="container">
    <selectedServices/>
  </div>
</template>

<script>
import selectedServices from '../component/Appointment/serviceSelecting.vue'
export default {
  name: 'Book',
  components: {
    selectedServices
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
