<template>
  <div class="book-container">
    <h1 class="page-header">Book Your Appointment</h1>

    <div class="under-cal">
      <v-calendar :events="events" @dayclick="dayClicked" class="vue-calendar"></v-calendar>
    </div>
    <div v-if="selectedDate && noAvailableTimes" class="no-time-message">
      There are no available times for the selected date.
    </div>
    <div v-if="selectedDate && !noAvailableTimes" class="barber-table">
      <div class="table-header">
        <div class="table-cell" v-for="barber in barbers" :key="barber.phone">{{ barber.name }}</div>
      </div>
      <div class="table-row">
        <div class="table-cell" v-for="barber in barbers" :key="barber.phone">
          <ul>
            <li v-for="time in barber.availability" :key="time">
              <button @click="createAppointment(barber, time)">{{ time }}</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="button-container">
      <button>Continue</button>
    </div>
  </div>
</template>
<script>
import { Calendar } from 'v-calendar'
import axios from 'axios'
import { calculateTotalPrice } from './serviceUtil'
import service from '../../api/serviceApi.js'
export default {
  name: 'setAvailability',
  components: {
    VCalendar: Calendar
  },
  data() {
    return {
      selectedDate: null,
      events: [],
      disabledDays: [],
      highlightDays: [],
      barbers: [],
      selectedServicesDetails: [],
      selectedServices: []
    }
  },
  mounted() {
    if (this.$route.query.selectedServices) {
      this.selectedServices = JSON.parse(this.$route.query.selectedServices)
      console.log(this.selectedServices)
    }
  },
  methods: {
    async dayClicked(dateInfo) {
      // Set barbers to an empty array to force a reactivity update
      this.barbers = []

      this.selectedDate = dateInfo.date
      const calendarDate = [
        this.selectedDate.getFullYear(),
        String(this.selectedDate.getMonth() + 1).padStart(2, '0'),
        String(this.selectedDate.getDate()).padStart(2, '0')
      ].join('-')

      try {
        const response = await axios.get(`http://localhost:3000/api/v1/barbers/allavailability/${calendarDate}`)
        const info = await service.getService(this.selectedServices)
        this.selectedServices = info.data
        console.log(this.selectedServices)

        // Check if the response is an array
        if (Array.isArray(response.data)) {
          // If it's an array, loop through each item
          this.barbers = response.data.map(barberData => {
            const timeSlots = barberData.timeSlots || []
            const serviceDuration = this.selectedServices[0].duration // Assuming you have only one selected service
            const availability = this.calculateAvailableTimes(timeSlots, serviceDuration)

            return {
              name: barberData.name,
              phone: barberData.barberPhone,
              availability: availability || [] // Check if availability is defined, otherwise provide an empty array
            }
          })
        }

        console.log('Barber availability:', this.barbers)
      } catch (error) {
        console.error("Error fetching barbers' availability:", error)
      }
    },
    calculateAvailableTimes(timeSlots, serviceDuration) {
      // Filter time slots based on service duration
      const availableTimes = timeSlots.filter(timeSlot => {
        const startTime = new Date(timeSlot.startTime)
        const endTime = new Date(timeSlot.endTime)

        // Calculate the duration of the time slot in minutes
        const slotDuration = (endTime - startTime) / (60 * 1000)

        // Check if the slot duration is greater than or equal to the service duration
        return slotDuration >= serviceDuration
      })

      return availableTimes // Return the array of available time slots
    },
    createAppointment(barber, time) {
      const [hour, minute] = time.split(':').map(num => parseInt(num))

      const combinedDate = new Date(Date.UTC(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate(), hour, minute, 0, 0))
      const dateTimeISO = combinedDate.toISOString()
      // Serialize the barber object and selected time
      const serializedBarber = encodeURIComponent(JSON.stringify(barber))

      // Navigate to the details page with the serialized data
      this.$router.push({
        name: 'Details',
        query: {
          barberData: serializedBarber,
          selectedTime: dateTimeISO
        }
      })
    },
    totalDuration() {
      const duration = this.selectedServices.reduce((total, service) => {
        // Assuming each service has a 'duration' property in minutes
        return total + service.duration
      }, 0)

      console.log('Total Duration (minutes):', duration)

      return duration
    }
  },
  computed: {
    totalPrice() {
      return calculateTotalPrice(this.selectedServices)
    },
    noAvailableTimes() {
      return this.barbers.every(barber => barber.availability.length === 0)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

.book-container {
  width: 100%;

  .availability {
    color: black;
    font-family: sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 48px;
    letter-spacing: 0.02em;
    margin-left: 1%;
    margin-right: auto;
    max-width: 100%;
    margin-top: -.5rem;
  }

  .page-header {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 48px;
    text-align: left;
    letter-spacing: 0.02em;
    color: #333;
    padding-left: 3.5rem;
    margin-bottom: 20px;
    padding-top: 20%;
  }

  .under-cal {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.759);
    box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: row;

    .vue-calendar {
      width: 100%;
    }

    p {
      color: black;
      text-align: center;
      font-family: 'Roboto', sans-serif;
      font-style: normal;
      padding-top: 0.25rem;
    }

  }

  .barber-table {
    width: 65%;
    margin-left: 4%;
    margin-top: 10px; // Added a bit of margin on top to separate it from the horizontal div
    display: flex;
    flex-direction: column;
    gap: 10px;

    .table-header,
    .table-row {
      display: flex;
      flex-direction: row;
    }

    .table-cell {
      flex: 1;
      padding: 10px;
      // Removed border for columns
      border-bottom: 1px solid #e0e0e0; // Just a bottom border to separate rows

      .table-cell button {
        background-color: #E7A356;
        border: none;
        border-radius: 4px; // Slightly reduced for a sharper appearance
        padding: 4px 8px; // Reduced padding for a smaller button
        margin: 2px; // Slight margin adjustment
        color: #fff;
        font-size: 0.8rem; // Reduced font size for the smaller button
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: darken(#E7A356, 10%);
        }
      }
    }

  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
}

.button-container {
  margin-left: 74%;
}

button {
  width: 18rem;
  height: 4rem;
  background: #ef952f;
  border-radius: 10px;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 48px;
  text-align: center;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  box-shadow: none;
  border: none;
  color: #ffffff;

  &:hover {
    background-color: #ff8800c5;
  }
}

@media screen and (max-width: 767px) {
  .book-container {
    .under-cal {
      flex-direction: column;
    }

    .vue-calendar {
      width: 100%;
    }

    .horizontal {
      width: 100%;
      margin-left: 0;
    }

    .button-container {
      margin-left: 0;
    }
  }
}

.no-time-message {
  margin-left: 4%;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: #e74c3c; // Red color to highlight the unavailability
}
</style>
