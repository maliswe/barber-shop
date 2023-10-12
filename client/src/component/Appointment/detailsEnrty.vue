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
      Phone: null,
      selectedTime: null,
      selectedServices: [],
      totalPrice: 0

    }
  },
  mounted() {
    if (this.$route.query.barberPhone && this.$route.query.selectedTime) {
      this.Phone = this.$route.query.barberPhone
      this.selectedTime = this.$route.query.selectedTime
    }

    try {
      this.selectedServices = this.$route.query.services
    } catch (error) {
      console.error('"Error parsing services:"', error)
    }

    if (this.$route.query.price) {
      this.totalPrice = parseFloat(this.$route.query.price)
    }
  },
  methods: {
    async finalizeAppointment() {
      const appointmentData = {
        price: this.totalPrice,
        date: new Date(this.selectedTime),
        message: this.message,
        service: this.selectedServices,
        barber: this.Phone,
        customer: this.phoneNumber
      }

      // Step 2: Log the data to console
      console.log('"Sending data:"', appointmentData)

      // Step 3: Send the data to the server
      try {
        const response = await axios.post('http://localhost:3000/api/v1/appointments', appointmentData)

        if (response.status === 201) {
          this.$router.push('/booking/confirmation')
        } else {
          console.error('Error while booking:', response.data.message)
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
  height: 150px;
  /* adjust based on your preference */
}

/* Any other custom styles go here */
</style>
