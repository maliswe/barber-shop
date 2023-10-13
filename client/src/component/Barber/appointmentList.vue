<template>
  <div>
    <h2>Today's Appointments</h2>
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Customer Name</th>
          <th>Message</th>
          <th>Services</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="appointment in todaysAppointments" :key="appointment.confNumber"
          :class="{ 'colored-row': $index % 2 === 1 }">
          <td>{{ new Date(appointment.date).toLocaleTimeString() }}</td>
          <td>{{ appointment.customerName }}</td>
          <td>{{ appointment.message }}</td>
          <td>{{ appointment.service.join(', ') }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    appointments: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      fetchedAppointments: []
    }
  },
  computed: {
    ...mapGetters(['userPhone']),
    todaysAppointments() {
      const today = new Date().toISOString().split('T')[0]
      return this.fetchedAppointments.filter(appointment => appointment.date.split('T')[0] === today)
    }
  },
  mounted() {
    this.fetchAppointments()
  },
  methods: {
    markAsDone(appointmentId) {
      this.$emit('updateStatus', appointmentId, 'DONE')
    },
    async fetchAppointments() {
      const userPhone = this.$store.state.phone
      try {
        const response = await fetch(`http://localhost:3000/api/v1/appointments/barber/${userPhone}`)
        if (response.ok) {
          this.fetchedAppointments = await response.json()
        } else {
          console.error('Failed to fetch appointments')
        }
      } catch (error) {
        console.error('"Error fetching appointments:"', error)
      }
    },
    async updateAppointmentStatus(appointmentId, status) {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/appointment/${appointmentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status })
        })
        if (response.ok) {
          console.log('"Appointment status updated"')
          this.fetchAppointments()
        } else {
          console.error('"Failed to update appointment status"')
        }
      } catch (error) {
        console.error('"Error updating appointment status:"', error)
      }
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

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    tr:hover {
      background-color: #ddd;
    }

    th {
      background-color: #f2f2f2;
      color: black;
    }
  }
}
</style>
