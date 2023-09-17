<template>
  <div>
    <Navbar></Navbar>
      <b-jumbotron header="Collection hair & beard" lead="Welcome to Old School BarberShop">
      <b-button class="btn_message" variant="primary" v-on:click="getMessage()" >See all Services</b-button>
      <p>Message from the server:<br/>
      {{ message }}</p>
    </b-jumbotron>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../component/Nav/Navbar.vue'

export default {
  name: 'home' 
}

</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
