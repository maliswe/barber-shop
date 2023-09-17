<template>
  <div id="app">
    <Home/>
    <router-view/>
  </div>
</template>
<script>

import Home from './views/Home.vue'

export default {
  components: {
    Home
  }
}
</script>
<style>
</style>
