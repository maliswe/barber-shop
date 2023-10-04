<template>
  <div>
    <ul>
      <li v-for="appointment in appointments" :key="appointment.id">
        {{ appointment.customerName }} - {{ appointment.time }}
        <button @click="markAsDone(appointment.id)">Mark as Done</button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    appointments: Array
  },
  methods: {
    markAsDone(appointmentId) {
      this.$emit('updateStatus', appointmentId, 'DONE')
    }
  }
}
</script>
<style scoped lang="scss">
div {
  margin-top: 2rem;

  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }

  // Sample style for a list of appointments, modify as per your UI component
  .appointment-list {
    display: flex;
    flex-direction: column;

    .appointment {
      border: 1px solid white;
      padding: 1rem;
      margin-bottom: 0.5rem;
    }
  }
}
</style>
