<template>
  <div class="book-container">
      <v-calendar
        :events="events"
        :disabled-days="disabledDays"
        :highlight="highlightDays"
        @dayclick="dayClicked"
        class="vue-calendar custom-v-calendar"
      ></v-calendar>

    <CustomTimePicker v-if="showTimePicker" @time-selected="selectTime" />

    <div class="button-container">
      <button @click="setAvailability">Continue</button>
    </div>
  </div>
</template>

<script>
import { Calendar } from 'v-calendar'
import CustomTimePicker from './CustomTimePicker.vue'
import axios from 'axios'

export default {
  name: 'setAvailability',
  components: {
    VCalendar: Calendar,
    CustomTimePicker
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
    dayClicked() {
      console.log('Day Clicked:')
      this.showTimePicker = true
    },
    selectTime(time) {
      if (!this.selectedTimes.includes(time)) {
        this.selectedTimes.push(time)
      } else {
        const index = this.selectedTimes.indexOf(time)
        if (index > -1) {
          this.selectedTimes.splice(index, 1)
        }
      }
    },
    setAvailability() {
      if (this.selectedDate && this.selectedTimes.length > 0) {
        const dateToSave = {
          date: this.selectedDate,
          times: this.selectedTimes
        }
        axios.post('http://localhost:3000/api/v1/barbers/availability', dateToSave)
          .then(response => {
            console.log('Data saved: ', response.data)
          })
          .catch(error => {
            console.log('Error saving data: ', error)
          })
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
