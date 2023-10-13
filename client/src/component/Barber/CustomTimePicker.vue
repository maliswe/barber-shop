<template>
  <div class="time-container">
    <button v-for="(time, index) in timeSlots" :key="index" @click="selectTime(time)" class="time-slot"
      :class="{ 'time-slot-selected': selectedTimes.includes(time) }">
      {{ time }}
    </button>
  </div>
</template>
<script>
export default {
  props: ['selectedDate', 'selectedTimes'],
  data() {
    return {
      timeSlots: this.generateTimeSlots()
    }
  },
  watch: {
    selectedDate(newDate, oldDate) {
      if (newDate !== oldDate) {
        this.selectedTime = []
      }
    }
  },
  computed: {
    isSelected() {
      return (time) => {
        return this.selectedTimes.includes(time)
      }
    }
  },
  methods: {
    generateTimeSlots() {
      const times = []
      for (let i = 8; i < 19; i += 1.5) {
        const startHour = Math.floor(i)
        const startMin = (i % 1) * 60
        const endHour = Math.floor(i + 1)
        const endMin = (i + 1) % 1 * 60

        const startTime = `${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}`
        const endTime = `${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`

        times.push(`${startTime}-${endTime}`)
      }
      return times
    },
    selectTime(time) {
      if (this.selectedTimes.includes(time)) {
        this.$emit('time-delete-request', time)
      } else {
        this.$emit('time-selected', time)
      }
    }
  },
  mounted() {
    console.log('Selected Times:', this.selectedTimes)
  }
}
</script>
<style scoped lang="scss">
.time-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.time-slot {
  border: 1px solid #E7A356;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover,
  &.time-slot-selected {
    background-color: #E7A35630;
  }
}

.time-slot.time-slot-selected:hover {
  background-color: #E7A35670;
}

.time-slot-selected {
  background-color: #E7A356;
  color: black;
}
</style>
