<template>
  <div class="time-container">
    <button v-for="(time, index) in timeSlots" :key="index" @click="selectTime(time)" class="time-slot"
      :class="{ 'time-slot-selected': isSelected(time) || selectedTimes.includes(time) }">
      {{ time }}
    </button>
  </div>
</template>
<script>
export default {
  props: ['selectedDate', 'selectedTimes'],
  data() {
    return {
      selectedTime: this.selectedTimes || [],
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
        return this.selectedTime.includes(time)
      }
    }
  },
  methods: {
    generateTimeSlots() {
      const times = []
      for (let i = 8; i < 20; i++) {
        times.push(`${i}:00`)
        times.push(`${i}:30`)
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
  // Your hover styles here, e.g.
  background-color: #E7A35670; // slightly transparent
}

.time-slot-selected {
  background-color: #E7A356;
  color: white;
}
</style>
