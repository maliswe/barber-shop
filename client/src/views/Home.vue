<template>
<div><Navbar /><carousel /> <bestfeatures />
</div>
</template>

<script>
import Navbar from '../component/Nav/Navbar.vue'
import carousel from '../component/Home/carousel.vue'
import bestfeatures from '../component/Home/bestfeatures.vue'

export default {
  name: 'home',
  components: {
    Navbar,
    carousel,
    bestfeatures
  }
}
</script>

<style>
.btn_message {
    margin-bottom: 1em;
}
</style>
