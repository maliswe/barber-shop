<template>
  <div>
    <div class="rectangle-51">
      <v-calendar
        :events="events"
        :disabled-days="disabledDays"
        :highlight="highlightDays"
        @event-clicked="eventClicked"
        @day-clicked="dayClicked"
        @period-clicked="periodClicked"
        @period-context-menu="periodContextMenu"
        @event-context-menu="eventContextMenu"
        class="vue-calendar"
      ></v-calendar>
    </div>
    <div class="continue-button">
      <button class="btn">Continue</button>
    </div>
  </div>
</template>

<script>
import { Calendar } from 'v-calendar'

export default {
  name: 'book',
  components: {
    VCalendar: Calendar
  },
  data() {
    return {
      events: [],
      disabledDays: [],
      highlightDays: []
    }
  },
  methods: {
    eventClicked(event) {
      console.log('Event Clicked:', event)
    },
    dayClicked(day) {
      console.log('Day Clicked:', day)
    },
    periodClicked(period) {
      console.log('Period Clicked:', period)
    },
    eventContextMenu(event) {
      console.log('Event Context Menu:', event)
    },
    periodContextMenu(period) {
      console.log('Period Context Menu:', period)
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
  font-family:'Roboto', sans-serif;
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
