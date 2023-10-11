<template>
    <div class="popup">
        <h2>Appointment Confirmed!</h2>
        <p>Your appointment with {{ barberName }} at {{ selectedTime }} has been confirmed!</p>
    </div>
</template>
<script>
export default {
  props: ['barberName', 'selectedTime'],
  mounted() {
    setTimeout(() => {
      this.$router.push('/')
    }, 10000)
  }
}
</script>
<style scoped>
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
</style>
