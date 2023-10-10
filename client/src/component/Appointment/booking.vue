<template>
  <div class="book-container">

    <div class="under-cal">
      <v-calendar :events="events" :disabled-days="disabledDays" :highlight="highlightDays" @event-clicked="eventClicked"
        @day-clicked="dayClicked" @period-clicked="periodClicked" @period-context-menu="periodContextMenu"
        @event-context-menu="eventContextMenu" class="vue-calendar">
      </v-calendar>
      <div class="horizontal">
        <p>Availbility Time</p>
      </div>
    </div>

    <div class="button-container">
      <button>Continue</button>
    </div>
  </div>
</template>

<script>
import { Calendar } from 'v-calendar'

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
      highlightDays: []
    }
  },
  methods: {
    dayClicked(day) {
      console.log('Day Clicked:', day)
      this.selectedDate = day.date
    },
    setAvailability() {
      if (this.selectedDate) {
        console.log(`Selected Date: ${this.selectedDate}`)
      } else {
        console.log('Please select a date.')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

.book-container {
  width: 100%;

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
      margin-left: 2%;
      width: 65%;
      height: 2rem;
      padding-left: 10px;
      background-color: rgb(255, 255, 255);
      box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.08);
      border-radius: 10px;

      p {
        color: black;
        text-align: center;
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        padding-top: 0.25rem;
      }
    }
  }

  .button-container {
    margin-left: 74%;
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
