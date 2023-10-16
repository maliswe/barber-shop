<!--
* This component fetches and displays a list of appointments for today. It shows the time, customer name,
* message, and services for each appointment. Appointments are retrieved from an API.
-->
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
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="appointment in todaysAppointments" :key="appointment.confNumber"
          :class="{ 'colored-row': $index % 2 === 1 }">
          <td>{{ new Date(appointment.date).toLocaleTimeString() }}</td>
          <td>{{ appointment.customerName }}</td>
          <td>{{ appointment.message }}</td>
          <td @click="showServiceDetails(appointment.confNumber, appointment.service)">
            {{ appointment.service.join(', ') }}
          </td>
          <td>
            <button
              :class="{ 'success-btn': appointment.status !== 'Completed', 'completed-btn': appointment.status === 'Completed' }"
              @click="updateAppointmentStatus(appointment.confNumber, 'Completed')"
              :disabled="appointment.status === 'Completed'">
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
        const response = await axios.get(`http://localhost:3000/api/v1/appointments/barber/${userPhone}`)
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

  .success-btn {
    background-color: green;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    &:hover{
      color: blue;
    }
  }

  .completed-btn {
    background-color: yellow;
    color: black;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: not-allowed;
    pointer-events: none;
  }
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }

  .close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    &:hover, &:focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
    }
  }
}
</style>
