<template>
  <div class="book-container">
    <h1 class="page-header">Book Your Appointment</h1>

    <div class="under-cal">
      <v-calendar :events="events" @dayclick="dayClicked" class="vue-calendar"></v-calendar>
    </div>
    <div v-if="selectedDate" class="barber-table">
      <div class="table-header">
        <div class="table-cell" v-for="barber in barbers" :key="barber.phone">{{ barber.name }}</div>
      </div>

      <div class="table-row">
        <div class="table-cell" v-for="barber in barbers" :key="barber.phone">
          <ul>
            <li v-for="time in barber.availability" :key="time">{{ time }}</li>
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
      barbers: []
    }
  },
  methods: {
    async dayClicked(dateInfo) {
      this.selectedDate = dateInfo.date
      const calendarDate = [
        this.selectedDate.getFullYear(),
        String(this.selectedDate.getMonth() + 1).padStart(2, '0'),
        String(this.selectedDate.getDate()).padStart(2, '0')
      ].join('-')
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/barbers/allavailability/${calendarDate}`)
        this.barbers = response.data.map(barber => ({
          name: barber.name,
          phone: barber.barberPhone,
          availability: barber.times
        }))
        console.log(this.barbers)
      } catch (error) {
        console.error("Error fetching barbers' availability:", error)
      }
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
      width: 100%;
    }

    p {
      color: black;
      text-align: center;
      font-family: 'Roboto', sans-serif;
      font-style: normal;
      padding-top: 0.25rem;
    }

    .horizontal {
      margin-left: 1%;
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

  .barber-table {
    width: 65%;
    margin-left: 2%;
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
