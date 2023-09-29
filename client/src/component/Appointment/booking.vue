<template>
  <div class="calendar-bar">
    <div class="calendar"></div>
    <div class="background"></div>
    <div class="rectangle-51"></div>
    <vue-meeting-selector
      class="simple-example__meeting-selector"
      v-model="meeting"
      :date="date"
      :loading="loading"
      :class-names="classNames"
      :meetings-days="meetingsDays"
      @next-date="nextDate"
      @previous-date="previousDate"
    />
    <p>Meeting Selected: {{ meeting ? meeting : 'No Meeting selected' }}</p>
  </div>
</template>
<script>
import { VueMeetingSelector } from 'vue-meeting-selector'
export default {
  name: 'book',
  components: {
    VueMeetingSelector
  }
}
</script>
<style scoped>
.calendar-bar {
  width: 1140px;
  height: 107px;
}
.calendar {
}
.background {
}
.rectangle-51 {
  box-sizing: border-box;
  width: 1140px;
  height: 89px;
  background: #ffffff;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
}
</style>
