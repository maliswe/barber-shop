<template>
  <header>
    <div class="navbar">
      <!-- Logo goes here, outside the container -->
      <div>
        <logo />
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
      <!-- button goes here, outside the container -->
      <div>
        <btn />
      </div>
    </div>
  </header>
</template>

<script>

import btn from './bookBtn.vue'
import logo from './logo.vue'

export default {
  name: 'Navbar',
  components: {
    btn,
    logo
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
@import './navbar.module.scss';

.scrolled-nav {
  background-color: black;
  box-shadow: 0 40px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: black;
  box-shadow: 0 40px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
