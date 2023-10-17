<!--
// Book container serves as a scheduling and availability management tool for barbers.
// It integrates a customizable calendar component (V-Calendar) that allows the barber to select specific dates for which they want to manage their availability.
// Upon selecting a date in the calendar, the component reveals a custom time picker (CustomTimePicker) where the barber can choose specific time slots for appointments.
// Selected time slots are highlighted and can be deselected.
-->
<template>
  <div class="book-container">
    <v-calendar :events="events" :disabled-days="disabledDays" :highlight="highlightDays" @dayclick="dayClicked"
      class="vue-calendar custom-v-calendar"></v-calendar>

    <CustomTimePicker v-if="showTimePicker" @time-selected="selectTime" @time-delete-request="deleteTimeSlot"
      :selectedTimes="selectedTimes" />
    <div class="button-container" v-if="showTimePicker">
      <button @click="setAvailability">Save</button>
    </div>
  </div>
</template>

<script>
import { Calendar } from 'v-calendar'
import CustomTimePicker from './CustomTimePicker.vue'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'setAvailability',
  components: {
    VCalendar: Calendar,
    CustomTimePicker
  },
  computed: {
    ...mapGetters(['userPhone'])
  },
  data() {
    return {
      selectedDate: null,
      selectedTimes: [],
      events: [],
      disabledDays: [],
      highlightDays: [],
      showTimePicker: false
    }
  },
  methods: {
    dayClicked(dateInfo) {
      this.selectedDate = dateInfo.date
      this.showTimePicker = true
      this.highlightDays = [{ date: this.selectedDate }]
      this.selectedTimes = []

      const userPhone = this.$store.state.phone

      const calendarDate = [
        this.selectedDate.getFullYear(),
        String(this.selectedDate.getMonth() + 1).padStart(2, '0'),
        String(this.selectedDate.getDate()).padStart(2, '0')
      ].join('-')
      console.log('Calendar date sent to API:', calendarDate)
      axios.get(`http://localhost:3000/api/v1/barbers/${userPhone}/availability/${calendarDate}`)
        .then(response => {
          const timeSlots = response.data.timeSlots || []
          const transformedTimes = this.transformFetchedTimes(timeSlots)
          this.selectedTimes = transformedTimes
          console.log('Transformed times for picker:', transformedTimes)
          console.log('Transformed times for picker:', timeSlots)
        })
        .catch(error => {
          if (error.response && error.response.status === 200) {
            console.log('No times available for the selected date.')
          } else {
            console.log('Error fetching available times: ', error)
          }
        })
    },
    selectTime(time) {
      if (!this.selectedTimes.includes(time)) {
        this.selectedTimes.push(time)
      } else {
        this.selectedTimes = this.selectedTimes.filter(t => t !== time)
      }
    },
    deleteTimeSlot(time) {
      this.selectedTimes = this.selectedTimes.filter(t => t !== time)
    },
    transformFetchedTimes(fetchedTimes) {
      return fetchedTimes.map(slot => {
        return `${slot.startTime}-${slot.endTime}`
      })
    },
    setAvailability() {
      const userPhone = this.$store.state.phone

      const calendarDate = [
        this.selectedDate.getFullYear(),
        String(this.selectedDate.getMonth() + 1).padStart(2, '0'),
        String(this.selectedDate.getDate()).padStart(2, '0')
      ].join('-')

      const flattenedTimes = [].concat(...this.selectedTimes)

      const timeSlots = flattenedTimes.map(timeStr => {
        const [startTime, endTime] = timeStr.split('-').map(time => time.trim())
        return {
          startTime: startTime,
          endTime: endTime
        }
      })

      if (calendarDate) {
        const dateToSave = {
          date: calendarDate,
          timeSlots: timeSlots
        }
        console.log(dateToSave)

        if (flattenedTimes.length === 0) {
          axios.delete(`http://localhost:3000/api/v1/barbers/${userPhone}/availability/${calendarDate}`)
            .then(response => {
              console.log('Date with no times removed: ', response.data)
              this.showTimePicker = false
            })
            .catch(error => {
              console.log('Error removing date with no times: ', error)
            })
        } else {
          axios.put(`http://localhost:3000/api/v1/barbers/availability/${userPhone}`, dateToSave)
            .then(response => {
              console.log('Data saved: ', response.data)
              this.showTimePicker = false
            })
            .catch(error => {
              console.log('Error saving data: ', error)
            })
        }
      } else {
        console.log('Please enter the data')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
@import './custom-v-calendar.scss';

.book-container {
  width: 100%;

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

.button-container {
  margin-left: 68%;
  margin-top: 2rem;
}

button {
  width: 18rem;
  height: 4rem;
  background: #e7a356;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 48px;
  text-align: center;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.01);
  color: #ffffff;
  border-color: #e7a356;

  &:hover {
    background-color: #e7a356c5;
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

    .button-container {
      margin-left: 0;
    }
  }
}
</style>
