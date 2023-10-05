<template>
  <div class="book-container">
    <h1 class="page-header">Book Your Appointment</h1>

    <div class="under-cal">
      <v-calendar :events="events" :disabled-days="disabledDays" :highlight="highlightDays" @event-clicked="eventClicked"
        @day-clicked="dayClicked" @period-clicked="periodClicked" @period-context-menu="periodContextMenu"
        @event-context-menu="eventContextMenu" class="vue-calendar">
      </v-calendar>
      <h1 class="availability">Available Slot</h1>
    </div>
    <div class="button-container">
      <button>Continue</button>
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
      width: 35%;
      background: #ffffff;
    }

    .horizontal {
      margin-left: 1%;
      width: 65%;
      height: 2rem;
      padding-left: 10px;
      background-color: rgb(255, 255, 255);
      box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.08);
      border-radius: 10px;

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
</style>
