<!--
* This component displays a form for booking appointments with a barber. It allows customers to
* input their name, phone number, a message to the barber, and submit the appointment request.
-->
<template>
  <div class="appo-form">
    <form>
      <div v-if="!isLoggedIn" class="input-group">
        <input v-model="name" placeholder="Name">
      </div>
      <div v-if="!isLoggedIn" class="input-group">
        <input type="tel" v-model="phoneNumber" placeholder="Phone Number" />
      </div>
      <div class="input-group">
        <textarea class="form-control my-2" v-model="message" placeholder="Message to Barber"></textarea>
      </div>
      <div class="input-group">
        <button type="button" @click="finalizeAppointment" class="submit-btn">Submit</button>
      </div>
    </form>
    <ConfirmationPopup v-if="showPopup" :barberName="barberName" :selectedTime="selectedTime" />
  </div>
</template>
<script>
import axios from 'axios'
import ConfirmationPopup from './confirmation.vue'

export default {
  components: {
    ConfirmationPopup
  },
  props: ['barber', 'time', 'services'],
  data() {
    return {
      name: '',
      phoneNumber: '',
      message: '',
      Phone: null,
      selectedTime: null,
      selectedServices: [],
      totalPrice: 0,
      showPopup: false

    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn
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
      let customerPhone

      // Check if the user is logged in
      if (this.isLoggedIn) {
        // If logged in, use the user's phone number from the store
        customerPhone = this.$store.state.phone
      } else {
        // If not logged in, use the phone number from this.phoneNumber
        customerPhone = this.phoneNumber
      }

      const appointmentData = {
        price: this.totalPrice,
        date: new Date(this.selectedTime),
        message: this.message,
        service: this.selectedServices,
        barber: this.Phone,
        phoneNumber: customerPhone
      }
      try {
        const response = await axios.post(`http://localhost:3000/api/v1/customers/${customerPhone}/appointments`, appointmentData)

        if (response.status === 201) {
          this.showPopup = true
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
<style lang="scss" scoped>
.appo-form {
  padding: 14% 20%;

  input,
  textarea {
    width: 100%;
    border-radius: 15px;
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.06);
    padding: 10px;
    margin: 10px 0;
  }

  .submit-btn {
    background-color: #E7A356;
    margin-top: 5%;
    margin-left: 45%;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #d68c3f;
    }
  }

  i {
    color: #d68c3f;

    &:hover {
      color: rgb(85, 85, 231);
    }
  }

  p {
    padding-top: 8%;
  }
}

@media (max-width: 413px) {
  .appo-form {
    padding: 30% 20%;

    input {
      width: 100%;
      margin: 10px 0;
    }

    .submit-btn {
      margin-top: 10%;
      margin-left: 0;
      padding-left: 2%;
      width: 100%;
    }
  }
}
</style>
