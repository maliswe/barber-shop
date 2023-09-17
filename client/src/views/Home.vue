<template>
<div>
    <Navbar />
    <carousel />
    <b-jumbotron header="Collection hair & beard" lead="Welcome to Old School BarberShop">
        <ServicesButton />
    </b-jumbotron>
</div>
</template>

<script>
import Navbar from '../component/Nav/Navbar.vue'
import ServicesButton from '../component/Home/ServicesButton.vue'
import carousel from '../component/Home/carousel.vue'

export default {
  name: 'home',
  components: {
    Navbar,
    ServicesButton,
    carousel
  }
}
</script>

<style>
.btn_message {
    margin-bottom: 1em;
}
</style>
