<template>
  <div class="container">
    <div class="popup">
      <h2>Appointment Confirmed!</h2>
      <p>Your appointment at {{ selectedTime }} has been confirmed!</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['selectedTime'],
  mounted() {
    setTimeout(() => {
      this.$router.push('/')
    }, 5000)
  }
}
</script>
<style lang="scss" scoped>
.container {
  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    width: 80%;
    max-width: 400px;
    text-align: center;
  }
}
</style>

* This component displays a confirmation message to the user for their booked appointment. It
* shows the selected time for the appointment and automatically redirects the user back to the
* home page after a specified delay.
