<template>
  <header :class="{ 'scrolled-nav': scrollNav }">
    <div class="navbar-container">
      <div class="branding">
        <Logo />
      </div>
      <nav>
        <ul v-show="!mobile" class="navigation">
          <li><router-link class="link" active-class="active-class" :to="{ name: 'Home' }">Home</router-link></li>
          <li><router-link class="link" active-class="active-class" :to="{ name: 'About' }">About Us</router-link></li>
          <li><router-link class="link" active-class="active-class" :to="{ name: 'Service' }">Services</router-link></li>
          <li><router-link class="link" active-class="active-class" :to="{ name: 'Gallery' }">Gallery</router-link></li>
          <li><router-link class="link" active-class="active-class" :to="{ name: 'Team' }">Team</router-link></li>
          <li><router-link class="link" active-class="active-class" :to="{ name: 'Testimonials' }">Testimonials</router-link></li>
          <li><router-link class="link" active-class="active-class" :to="{ name: ' Contact' }">Contact</router-link></li>
        </ul>
        <button @click="goToSignInPage" class="buttons">
          Sign In
        </button>
        <div class="icon">
          <i @click="toggleMobileNav" v-show="mobile" class="far fa-bars" :class="{ 'icon-active': mobileNav }"></i>
        </div>
        <transition name="mobile-nav">
          <ul v-show="mobileNav" class="dropdown-nav">
            <li><router-link class="link" :to="{ name: 'Home' }">Home</router-link></li>
            <li><router-link class="link" :to="{ name: 'About' }">About Us</router-link></li>
            <li><router-link class="link" :to="{ name: 'Services' }">Services</router-link></li>
            <li><router-link class="link" :to="{ name: 'Gallery' }">Gallery</router-link></li>
            <li><router-link class="link" :to="{ name: 'Team' }">Team</router-link></li>
            <li><router-link class="link" :to="{ name: 'Testimonials' }">Testimonials</router-link></li>
            <li><router-link class="link" :to="{ name: ' Contact' }">Contact</router-link></li>
            <li><router-link class="link" :to="{ name: ' ' }">Book</router-link></li>
          </ul>
        </transition>
      </nav>
      <bookbtn />
    </div>
  </header>
</template>
<script>
import Logo from './Logo.vue'
import Bookbtn from './Bookbtn.vue'
export default {
  components: {
    Logo,
    Bookbtn
  },
  name: 'Navbar',
  data() {
    return {
      scrollNav: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null
    }
  },
  methods: {
    goToSignInPage() {
      this.$router.push({ name: 'Login' })
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav
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
    updateScroll() {
      const scrollPosition = window.scrollY
      if (scrollPosition > 50) {
        this.scrollNav = true
        return
      }
      this.scrollNav = false
    }
  },
  created() {
    window.addEventListener('resize', this.checkScreen)
    this.checkScreen()
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll)
    this.updateScroll()
  }
}
</script>
<style lang="scss" scoped>
header {
  background-color: #292727;
  z-index: 99;
  width: 100%;
  position: fixed;
  transition: .1s ease all;
  color: rgba($color: #000000, $alpha: 1.0);

  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 5%;
  }

  nav {
    display: flex;
    flex-direction: row;
    padding: 0;
    justify-content: space-between;
    /* Distribute nav elements across the space */
    align-items: center;
    transition: .5s ease all;
    width: 90%;
    margin: 0;

    @media(min-width: 1140px) {
      max-width: 1140px;
    }

    ul,
    .link {
      font-weight: 500;
      color: aliceblue;
      list-style: none;
      text-decoration: none;
    }

    li {
      text-transform: uppercase;
      padding: 14px;
      margin-left: 16px;
    }

    .link {
      font-size: 14px;
      transition: .5s ease all;
      padding-bottom: 4px;
      border-bottom: 1px solid transparent;

      &:hover {
        color: #E7A356;
        border-color: reds;
      }
    }

    .navigation {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
    }

    .icon {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      right: 24px;
      height: 100%;
      color: aliceblue;

      i {
        cursor: pointer;
        font-size: 24px;
        transition: 0.8s ease all;
      }
    }

    .icon-active {
      transform: rotate(180deg);
    }

    .dropdown-nav {
      display: flex;
      flex-direction: column;
      position: fixed;
      width: 100%;
      max-width: 250px;
      height: 100%;
      background-color: white;
      top: 0;
      left: 0;

      li {
        margin-left: 0;

        .link {
          color: #000000;
        }
      }
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
      transition: 1s ease all;
    }

    .mobile-nav-enter-from,
    .mobile-nav-leave-to {
      transform: translateX(-250px);
    }

    .mobile-nav-enter-to {
      transform: translateX(0);
    }
  }

  .buttons {
    order: 3;
    display: flex;
    align-items: center;
    padding: 8px 16px;
    background-color: white;
    color: #E7A356;
    border: 1px solid black;
    /* Corrected from 'border: black;' */
    border-radius: 5px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    i {
      margin-right: 8px;
      font-size: 16px;
    }

    &:hover {
      background-color: darken(#E7A356, 10%);
      color: aliceblue;
    }

    @media (max-width: 758px) {
      display: none;
    }
  }

  .link.active-link {
      color: #E7A356;
  }
}

.scrolled-nav {
  background-color: #292727;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px, -1px rgba(0, 0, 0, 0.06);

  nav {
    padding: 8px 0;
  }

  .branding {
    img {
      width: 35%;
    }
  }
}
</style>
