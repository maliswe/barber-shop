<template>
  <div id="app">

    <body>
      <Navbar />
      <Home />
      <router-view />
    </body>
  </div>
</template>
<script>

import Navbar from './component/Nav/Navbar.vue'
import Home from './views/Home.vue'

export default {
  components: {
    Navbar,
    Home
  }
}
</script>
<style>
</style>
