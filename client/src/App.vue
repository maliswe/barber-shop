<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>
<script>
import Navbar from '../src/component/Nav/Navbar.vue'
export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>
<style>
</style>
