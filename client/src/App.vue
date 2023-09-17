<template>
  <div id="app">
    <Home></Home>
    <Navbar/>
    <router-view/>
  </div>
</template>
<script>

import Home from './component/Home.vue'
import Navbar from './component/Navbar.vue'


export default {
  components: {
    Home,
    Navbar,
  }
}
</script>
<style>
</style>
