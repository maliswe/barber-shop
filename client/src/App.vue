<template>
  <div id="app" class="app">
    <Navbar />
    <router-view />
    <footerVue />
  </div>
</template>
<script>
import Navbar from '../src/component/Nav/Navbar.vue'
import footerVue from '../src/component/Footer/footer.vue'
export default {
  name: 'app',
  components: {
    Navbar,
    footerVue
  }
}
</script>
<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* This ensures it takes at least the full height of the viewport */
}

</style>
