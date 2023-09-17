<template>
<div><Navbar /><carousel />
</div>
</template>

<script>
import Navbar from '../component/Nav/Navbar.vue'
import carousel from '../component/Home/carousel.vue'

export default {
  name: 'home',
  components: {
    Navbar,
    carousel
  }
}
</script>

<style>
.btn_message {
    margin-bottom: 1em;
}
</style>
