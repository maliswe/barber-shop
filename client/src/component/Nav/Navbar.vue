<template>
    <header :class="{ 'scrolled-nav': scrolledNav }">
        <nav>
            <div class="container">
                <logo />
                <ul v-show="!mobile" class="navigation">
                    <li><router-link class="link" :to="{ name: 'Home' }">Home</router-link></li>
                    <li><router-link class="link" :to="{ name: 'About Us' }">About Us</router-link></li>
                    <li><router-link class="link" :to="{ name: 'Services' }">Services</router-link></li>
                    <li><router-link class="link" :to="{ name: 'Gallery' }">Gallery</router-link></li>
                    <li><router-link class="link" :to="{ name: 'Team' }">Team</router-link></li>
                    <li><router-link class="link" :to="{ name: 'Testimonials' }">Testimonials</router-link></li>
                    <li><router-link class="link" :to="{ name: 'Contact' }">Contact</router-link></li>
                </ul>
                <div class="icon">
                    <i @click="toggleMobileNav" v-show="mobile" class="fat fa-bars" :class="{ 'icon-active': mobileNav }"></i>
                </div>
                <button @click="navigateToBooking" class="booking-btn">BOOK</button>
                <transition name="mobile-nav">
                <ul v-show="mobileNav" class="dropdown-nav">
                    <li><router-link class="link" :to="{ name: 'Home' }">Home</router-link></li>
                    <li><router-link class="link" :to="{ name: 'About Us' }">About Us</router-link></li>
                    <li><router-link class="link" :to="{ name: 'Services' }">Services</router-link></li>
                    <li><router-link class="link" :to="{ name: 'Gallery' }">Gallery</router-link></li>
                    <li><router-link class="link" :to="{ name: 'Team' }">Team</router-link></li>
                    <li><router-link class="link" :to="{ name: 'Testimonials' }">Testimonials</router-link></li>
                    <li><router-link class="link" :to="{ name: 'Contact' }">Contact</router-link></li>
                </ul>
            </transition>
            </div>
        </nav>
    </header>
</template>

<script>

import logo from './logo.vue'

export default {
  name: 'Navbar',
  components: {
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
header {
    align-items: center;
    z-index: 99;
    width: 100%;
    position: fixed;
    transition: 0.5s ease all;
    background: rgba(255, 255, 255, 0.33);
}

nav {
    width: 100%;
    display: flex;
    justify-content: center;
}

.container {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: 0 auto;

    @media (min-width: 1140px) {
        max-width: 1140px;
    }
}

.navigation {
    list-style: none;
    display: flex;
    align-items: center;
}

.link {
    font-weight: 500;
    color: black;
    text-decoration: none;
    text-transform: uppercase;
    padding: 16px;
    margin-left: 16px;
    font-size: 14px;
    transition: 0.5s ease all;
    padding-bottom: 4px;
    border-bottom: 1px solid transparent;

    &:hover {
        color: #E7A356;
        border-color: #E7A356;
    }
}

.icon {
    display: flex;
    align-items: center;
}

.booking-btn {
    width: 159px;
    height: 52px;
    background: #FFFFFF;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(77, 77, 77, 0.25);

    span {
        position: absolute;
        width: 54px;
        height: 24px;
        left: 50%;  /* Centering text horizontally */
        top: 50%;  /* Centering text vertically */
        transform: translate(-50%, -50%);  /* Needed for exact centering */
        font-family: 'Fira Sans';
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        text-transform: capitalize;
        color: #E7A356;
    }
}

.scrolled-nav {
    background-color: black;
    box-shadow: 0 40px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
}

</style>
