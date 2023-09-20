<template>
  <div class="navbar">
    <!-- Logo goes here, outside the container -->
    <div class="logo-bg">
      <div class="bg-images">
        <img src="../../assets/bg.png" class="bg-img" alt="Background 1">
        <img src="../../assets/bg.png" class="bg-img" alt="Background 1">
        <img src="../../assets/bg.png" class="bg-img" alt="Background 1">
        <!-- ... -->
      </div>
      <div class="logo">
        <img src="../../assets/logo.png" alt="">
      </div>
    </div>
    <!-- Navigation Links in the Center -->
    <ul v-show="!mobile" class="ul">
      <li><router-link class="link" :to="{ name: 'Home' }">Home</router-link></li>
      <li><router-link class="link" :to="{ name: 'About Us' }">About Us</router-link></li>
      <li><router-link class="link" :to="{ name: 'Services' }">Services</router-link></li>
      <li><router-link class="link" :to="{ name: 'Gallery' }">Gallery</router-link></li>
      <li><router-link class="link" :to="{ name: 'Team' }">Team</router-link></li>
      <li><router-link class="link" :to="{ name: 'Testimonials' }">Testimonials</router-link></li>
      <li><router-link class="link" :to="{ name: 'Contact' }">Contact</router-link></li>
    </ul>

    <!-- ...other parts of your template like mobile navigation... -->
    <div>
      <!-- Button on the Right -->
      <button @click="navigateToBooking" class="book">BOOK</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Navbar',
  components: {
  },
  data() {
    return {
      scrolledNav: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null
    }
  },
  created() {
    window.addEventListener('resize', this.checkScreen)
    this.checkScreen()
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll)
  },
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav
    },
    updateScroll() {
      const scrollPosition = window.scrollY
      if (scrollPosition > 50) {
        this.scrolledNav = true
        return
      }
      this.scrolledNav = false
    },
    checkScreen() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth <= 750) {
        this.mobile = true
        return
      }
      this.mobile = false
      this.mobileNav = false
    },
    navigateToBooking() {
      this.$router.push({ name: 'Booking' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './navbar.module.scss'
</style>
