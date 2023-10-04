<template>
  <div class="time-container">
    <button v-for="(time, index) in timeSlots" :key="index" @click="selectTime(time)" class="time-slot"
      :class="{ 'time-slot-selected': selectedTime === time }">
      {{ time }}
    </button>
  </div>
</template>
<script>
export default {
  props: ['selectedDate'],
  data() {
    return {
      selectedTime: null,
      timeSlots: this.generateTimeSlots()
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
      this.selectedTime = time
      this.$emit('time-selected', time)
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

  &:hover {
    background-color: #E7A35630;
  }
}

.time-slot-selected {
  background-color: #E7A356;
  color: white;
}
</style>
