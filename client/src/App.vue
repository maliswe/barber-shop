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
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;

}

.app{
  min-height: 100vh;
  position: relative;
}

.container{
  padding: 0;
  max-width: 1140px;
  margin: 0 auto;
}
</style>
