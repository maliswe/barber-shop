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
              <button :class="{ 'selected-time': selectedTimeSlot === time }" @mouseover="hoverTimeSlot(time)"
                @mouseout="leaveTimeSlot" @click="selectTimeSlot(time)">{{ time }}</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="button-container">
      <button v-if="selectedTimeSlot" @click="proceedToForm">Continue</button>
    </div>
  </div>
</template>
<script>
import { Calendar } from 'v-calendar'
import axios from 'axios'
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
      selectedServices: [],
      totalPrice: 0,
      totalDuration: 0,
      hoveredTimeSlot: null,
      selectedTimeSlot: null,
      phone: 0,
      name: ''
    }
  },
  mounted() {
    if (this.$route.query.selectedServices) {
      this.selectedServices = JSON.parse(this.$route.query.selectedServices)
      this.totalPrice = parseFloat(this.$route.query.totalPrice) || 0
      this.totalDuration = parseInt(this.$route.query.totalDuration) || 0
      console.log('Total Price:', this.totalPrice)
      console.log('Total Duration (minutes):', this.totalDuration)
    }
  },
  methods: {
    async dayClicked(dateInfo) {
      this.barbers = []

      this.selectedDate = dateInfo.date
      const calendarDate = [
        this.selectedDate.getFullYear(),
        String(this.selectedDate.getMonth() + 1).padStart(2, '0'),
        String(this.selectedDate.getDate()).padStart(2, '0')
      ].join('-')

      try {
        const response = await axios.get(`http://localhost:3000/api/v1/barbers/allavailability/${calendarDate}`)

        if (Array.isArray(response.data)) {
          this.barbers = response.data.map(barberData => {
            const timeSlots = barberData.timeSlots || []
            const availability = this.calculateAvailableTimes(timeSlots, this.totalDuration)
            this.phone = barberData.barberPhone
            return {
              name: barberData.name,
              phone: barberData.barberPhone,
              availability: availability || []
            }
          })
        }

        console.log('Barber availability:', this.barbers)
      } catch (error) {
        console.error('Error fetching barbers" availability:', error)
      }
    },
    canAccommodate(timeSlots, startTime, serviceDuration) {
      let availableDuration = 0
      let nextStartTime = startTime

      for (const slot of timeSlots) {
        if (slot.startTime === nextStartTime) {
          availableDuration += this.getTimeDifference(slot.startTime, slot.endTime)

          if (availableDuration >= serviceDuration) {
            return true
          }

          nextStartTime = slot.endTime
        }
      }

      return false
    },
    getTimeDifference(start, end) {
      const [startHour, startMinute] = start.split(':').map(Number)
      const [endHour, endMinute] = end.split(':').map(Number)
      return (endHour - startHour) * 60 + (endMinute - startMinute)
    },
    calculateAvailableTimes(timeSlots, serviceDuration) {
      const availableTimes = []

      for (const slot of timeSlots) {
        if (this.canAccommodate(timeSlots, slot.startTime, serviceDuration)) {
          availableTimes.push(slot.startTime)
        }
      }

      return availableTimes
    },
    hoverTimeSlot(time) {
      this.hoveredTimeSlot = time
    },
    leaveTimeSlot() {
      this.hoveredTimeSlot = null
    },
    selectTimeSlot(time) {
      this.selectedTimeSlot = time
    },
    proceedToForm() {
      console.log('barbers: ', this.barbers)

      const combinedDateTime = new Date(this.selectedDate)
      const [hour, minute] = this.selectedTimeSlot.split(':').map(Number)
      combinedDateTime.setHours(hour, minute, 0, 0)

      if (this.selectedTimeSlot) {
        this.$router.push({
          name: 'Details',
          query: {
            services: this.selectedServices,
            price: this.totalPrice,
            barberPhone: this.phone,
            selectedTime: combinedDateTime.toISOString()
          }
        })
      }
    }
  },
  computed: {
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
    margin-top: 10px;
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
      border-bottom: 1px solid #e0e0e0;

      .table-cell button {
        background-color: #E7A356;
        border: none;
        border-radius: 4px;
        padding: 4px 8px;
        margin: 2px;
        color: #fff;
        font-size: 0.8rem;
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
  background: rgba(231, 163, 86, 1);
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
    background-color: rgba(231, 163, 86, 1);
  }
}

button:hover,
.selected-time {
  background-color: rgba(231, 163, 86, 1);
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
      margin: 0;
      padding-bottom: 1rem;
    }
  }
}

@media screen and (max-width: 767px) {
  .book-container {
    padding: 0 20px;

    .page-header {
      font-size: 20px;
      padding-left: 1.5rem;
      padding-top: 10%;
    }

    .under-cal {
      flex-direction: column;
    }

    .barber-table {
      width: 100%;
      margin-left: 0;
    }

    .table-cell {
      .table-cell button {
        font-size: 0.7rem;
      }
    }
  }

  .button-container {
    margin-left: 0;
    text-align: center;
  }

  button {
    width: 100%;
    height: 3rem;
    font-size: 16px;
    padding-bottom: 1rem;
  }
}

.no-time-message {
  margin-left: 4%;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: #e74c3c;
}
</style>
