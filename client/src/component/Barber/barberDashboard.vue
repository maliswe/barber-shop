<template>
  <div class="dashboard">
    <h1>Barber Dashboard</h1>
    <section class="availability-section">
      <SetAvailability />
    </section>
    <section class="appointments-section">
      <AppointmentsList />
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
  }
}
</script>
<style scoped lang="scss">
.dashboard {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 25% 10%;

  h1 {
    text-align: center;
    margin-bottom: 10rem;
  }
}
</style>

// The following component represents the main dashboard view for barbers.
// It is divided into two sections: one for setting availability and the other for displaying appointments.
// The "SetAvailability" component allows barbers to manage their availability,
// while the "AppointmentsList" component shows a list of appointments for the day.
