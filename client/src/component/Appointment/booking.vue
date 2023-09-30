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
.rectangle-51 {
  box-sizing: border-box;
  width: 1140px;
  height: 300px;
  background: #ffffff;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vue-calendar {
  display: flex;
  position: relative;
  width: 50%;
  height: 90%;
}
</style>
