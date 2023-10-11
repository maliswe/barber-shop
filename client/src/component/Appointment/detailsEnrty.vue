<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <input class="form-control my-2" v-model="name" placeholder="Name" />
                <input class="form-control my-2" v-model="phoneNumber" placeholder="Phone Number" />
                <textarea class="form-control my-2" v-model="message" placeholder="Message to Barber"></textarea>
                <button class="btn btn-primary w-100 my-2" @click="finalizeAppointment">Submit</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  props: ['barber', 'time', 'services'],
  data() {
    return {
      name: '',
      phoneNumber: '',
      message: '',
      selectedBarber: null,
      selectedTime: null
    }
  },
  mounted() {
    if (this.$route.query.barberData && this.$route.query.selectedTime) {
      console.log('Attempting to parse:', this.$route.query.barberData)
      this.selectedBarber = JSON.parse(decodeURIComponent(this.$route.query.barberData))
      this.selectedTime = this.$route.query.selectedTime
      console.log('time: ', this.selectedTime)
    }
  },
  methods: {
    async finalizeAppointment() {
      console.log('Barber data:', this.selectedBarber)
      try {
        const response = await axios.post('http://localhost:3000/api/v1/appointments', {
          barberId: this.selectedBarber.phone,
          time: this.selectedTime,
          name: this.name,
          phoneNumber: this.phoneNumber,
          message: this.message
          // Note: You don't have the 'services' data on this page. You may need to handle it if required.
        })
        if (response.status === 201) {
          this.$router.push('/booking/confirmation')
        } else {
          console.log('Error')
        }
      } catch (error) {
        console.error('Error creating appointment:', error)
      }
    }
  }
}
</script>
<style scoped>
/* You can add additional styles or change the colors here */
/* Example color style: */
textarea.form-control {
  height: 150px; /* adjust based on your preference */
}

/* Any other custom styles go here */
</style>
