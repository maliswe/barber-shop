<template>
  <div class="dashboard">
    <h1>Barber Dashboard</h1>
    <section class="availability-section">
      <SetAvailability />
    </section>
    <section class="appointments-section">
      <AppointmentsList :appointments="appointments" @updateStatus="updateAppointmentStatus" />
    </section>
  </div>
</template>
<script>
import AppointmentsList from './appointmentList.vue'
import SetAvailability from './setAvalibility.vue'

export default {
  components: {
    AppointmentsList,
    SetAvailability
  },
  data() {
    return {
      appointments: [] // fetch this data from your API
    }
  },
  methods: {
    updateAppointmentStatus(appointmentId, status) {
      // API call to update the status of the appointment
      // Then refresh the appointments list or update locally
    }
  },
  // Use lifecycle hooks like 'mounted' to fetch appointments from your backend
  mounted() {
    // Fetch appointments and assign to 'appointments' data property
  }
}
</script>
<style scoped lang="scss">
.dashboard {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15% 10%;

  h1 {
    text-align: center;
    margin-bottom: 10rem;
  }
}
</style>
