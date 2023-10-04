<template>
  <div>
    <div class="rectangle-51">
      <v-calendar
        :events="events"
        :disabled-days="disabledDays"
        :highlight="highlightDays"
        @day-clicked="dayClicked"
        class="vue-calendar"
      ></v-calendar>
    </div>
    <CustomTimePicker v-if="selectedDate" :key="selectedDate" @time-selected="selectTime" />
    <div class="continue-button">
      <button class="btn" @click="setAvailability">Continue</button>
    </div>
  </div>
</template>

<script>
import { Calendar } from 'v-calendar'
import CustomTimePicker from './CustomTimePicker.vue'

export default {
  name: 'setAvailability',
  components: {
    VCalendar: Calendar,
    CustomTimePicker
  },
  data() {
    return {
      selectedDate: null,
      selectedTime: null,
      events: [],
      disabledDays: [],
      highlightDays: []
    }
  },
  methods: {
    dayClicked(day) {
      console.log('Day Clicked:', day)
      this.selectedDate = day.date
    },
    selectTime(time) {
      this.selectedTime = time
    },
    setAvailability() {
      if (this.selectedDate && this.selectedTime) {
        console.log(`Selected Date and Time: ${this.selectedDate} ${this.selectedTime}`)
      } else {
        console.log('Please select a date and time.')
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

.rectangle-51 {
  box-sizing: border-box;
  width: 1140px;
  height: auto;
  background: #ffffff;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
}

.vue-calendar {
  display: flex;
  width: 35%;
  height: auto;
}

.continue-button {
  width: 70%;
  transform: translateX(-50%);
}

.btn {
  width: 292px;
  height: 70px;
  background: #E7A356;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 48px;
  text-align: center;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.02);
  color: #FFFFFF;
}
</style>
