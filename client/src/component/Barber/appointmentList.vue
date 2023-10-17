<!--
* This component fetches and displays a list of appointments for today. It shows the time, customer name,
* message, and services for each appointment. Appointments are retrieved from an API.
-->
<template>
  <div>
    <div class="table-heading">
      <h2>Today's Appointments</h2>
    </div>
    <table class="barber-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Customer Name</th>
          <th>Message</th>
          <th>Services</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="appointment in todaysAppointments" :key="appointment.confNumber"
          :class="{ 'gray-row': $index % 2 === 1, 'white-row': $index % 2 === 0 }">
          <td>{{ new Date(appointment.date).toLocaleTimeString() }}</td>
          <td>{{ appointment.customerName }}</td>
          <td>{{ appointment.message }}</td>
          <td @click="showServiceDetails(appointment.confNumber, appointment.service)">
            {{ appointment.service.join(', ') }}
          </td>
          <td>
            <button
              :class="{
                'action-button': true,
                'success-btn': appointment.status !== 'Completed',
                'completed-btn': appointment.status === 'Completed'
              }"
              @click="updateAppointmentStatus(appointment.confNumber, 'Completed')"
              :disabled="appointment.status === 'Completed'"
            >
              {{ appointment.status === 'Completed' ? 'COMPLETED' : 'DONE!' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span @click="closeModal" class="close">&times;</span>
        <h3>Service Details</h3>
        <p>Name: {{ currentService.name }}</p>
        <p>Description: {{ currentService.description }}</p>
        <p>Price: {{ currentService.price }}</p>
        <p>Duration: {{ currentService.duration }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  props: {
    appointments: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      fetchedAppointments: [],
      showModal: false,
      currentService: {}
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
    async fetchAppointments() {
      const userPhone = this.$store.state.phone
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/barbers/${userPhone}/appointments`)
        this.fetchedAppointments = response.data
      } catch (error) {
        console.error('Error fetching appointments:', error)
      }
    },
    async updateAppointmentStatus(appointmentId, status) {
      try {
        const response = await axios.patch(`http://localhost:3000/api/v1/appointments/${appointmentId}/status`, {
          status: status
        })
        if (response.status === 200) {
          console.log('Appointment status updated')
          this.fetchAppointments()
        } else {
          console.error('Failed to update appointment status')
        }
      } catch (error) {
        console.error('Error updating appointment status:', error)
      }
    },
    showServiceDetails(appointmentId, serviceId) {
      this.fetchServiceDetails(appointmentId, serviceId)
      this.showModal = true
    },

    closeModal() {
      this.showModal = false
    },

    async fetchServiceDetails(appointmentId, serviceId) {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/appointments/${appointmentId}/services/${serviceId}`)
        this.currentService = response.data
      } catch (error) {
        console.error('Error fetching service details:', error)
      }
    }
  }
}
</script>
<style scoped>

.table-heading {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.table-heading h2 {
  font-size: 24px;
  text-align: center;
}

.barber-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 50px;
}

.barber-table th, .barber-table td {
  padding: 10px;
  border: 1px solid #ccc;
}

.gray-row {
  background-color: #f0f0f0;
}

.white-row {
  background-color: #ffffff;
}

.action-button {
  background-color: green;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.action-button:disabled {
  background-color: yellow;
  color: black;
  cursor: not-allowed;
  pointer-events: none;
}

@media (max-width: 767px) {
  .barber-table {
    width: 90%;
    overflow-x: none;
  }

  .barber-table th, .barber-table td {
    padding: 0.09rem;
    font-size: 0.59rem;
  }
}

</style>
