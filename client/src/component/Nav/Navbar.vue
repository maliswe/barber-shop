<template>
  <header :class="{ 'scrolled-nav': scrollNav }">
    <div class="navbar-container">
      <div class="branding">
        <Logo />
      </div>
      <nav>
        <ul v-if="isLoggedIn && (role === 'Customer' || role === 'Admin') || !isLoggedIn" class="navigation">
          <li><router-link class="link" active-class="active-class" :to="{ name: 'Home' }">Home</router-link></li>
          <li><router-link class="link" active-class="active-class" :to="{ name: 'About' }">About Us</router-link></li>
          <li><router-link class="link" active-class="active-class" :to="{ name: 'Service' }">Services</router-link></li>
          <li><router-link class="link" active-class="active-class" :to="{ name: 'Gallery' }">Gallery</router-link></li>
          <li><router-link class="link" active-class="active-class" :to="{ name: 'Contact' }">Contact</router-link></li>
        </ul>
        <ul v-if="isLoggedIn && role === 'Barber'" class="navigation">
        </ul>
        <div class="icon">
          <i @click="toggleMobileNav" v-show="mobile" class="far fa-bars" :class="{ 'icon-active': mobileNav }"></i>
        </div>
        <transition name="mobile-nav">
          <ul v-if="mobileNav && isLoggedIn && role === 'Customer'" class="dropdown-nav">
            <li><router-link @click.native="closeMobileNav" class="link" :to="{ name: 'Home' }">Home</router-link></li>
            <li><router-link @click.native="closeMobileNav" class="link" :to="{ name: 'About' }">About Us</router-link></li>
            <li><router-link @click.native="closeMobileNav" class="link" :to="{ name: 'Service' }">Services</router-link></li>
            <li><router-link @click.native="closeMobileNav" class="link" :to="{ name: 'Gallery' }">Gallery</router-link></li>
            <li><router-link @click.native="closeMobileNav" class="link" :to="{ name: 'Contact' }">Contact</router-link></li>
            <li><router-link @click.native="closeMobileNav" class="link" :to="{ name: 'Book' }">Book</router-link></li>
            <li @click="logout" class="logout-btn">Logout</li>
          </ul>
        </transition>
        <transition name="mobile-nav">
          <ul v-if="mobileNav && !isLoggedIn" class="dropdown-nav">
            <li><router-link @click.native="closeMobileNav" class="link" :to="{ name: 'Home' }">Home</router-link></li>
            <li><router-link @click.native="closeMobileNav" class="link" :to="{ name: 'About' }">About Us</router-link></li>
            <li><router-link @click.native="closeMobileNav" class="link" :to="{ name: 'Service' }">Services</router-link></li>
            <li><router-link @click.native="closeMobileNav" class="link" :to="{ name: 'Gallery' }">Gallery</router-link></li>
            <li><router-link @click.native="closeMobileNav" class="link" :to="{ name: 'Contact' }">Contact</router-link></li>
            <li><router-link @click.native="closeMobileNav" class="link" :to="{ name: 'Book' }">Book</router-link></li>
            <li><router-link @click.native="closeMobileNav" class="link" :to="{ name: 'Login' }">Sign In</router-link></li>
          </ul>
        </transition>
        <transition name="mobile-nav">
          <ul v-if="mobileNav && isLoggedIn && role === 'Barber'" class="dropdown-nav">
            <li><router-link @click.native="closeMobileNav" class="link" :to="{ name: 'BarberDashoard' }">Dashboard</router-link></li>
            <li @click="logout" class="logout-btn">Logout</li>
          </ul>
        </transition>
        <transition name="mobile-nav">
          <ul v-if="mobileNav && isLoggedIn && role === 'Admin'" class="dropdown-nav">
            <li><router-link @click.native="closeMobileNav" class="link" :to="{ name: 'Home' }">Home</router-link></li>
            <li><router-link @click.native="closeMobileNav" class="link" :to="{ name: 'About' }">About Us</router-link></li>
            <li><router-link @click.native="closeMobileNav" class="link" :to="{ name: 'Service' }">Services</router-link></li>
            <li><router-link @click.native="closeMobileNav" class="link" :to="{ name: 'Gallery' }">Gallery</router-link></li>
            <li><router-link @click.native="closeMobileNav" class="link" :to="{ name: 'Contact' }">Contact</router-link></li>
            <li><router-link @click.native="closeMobileNav" class="link" :to="{ name: 'Book' }">Book</router-link></li>
            <li><router-link @click.native="closeMobileNav" class="link" :to="{ name: 'AdminDashboard' }">Dashoard</router-link></li>
            <li @click="logout" class="logout-btn">Logout</li>>
          </ul>
        </transition>
      </nav>
      <bookbtn />
    </div>
  </header>
</template>
<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState(['isLoggedIn', 'role'])
  },
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav
    },
    logout() {
      this.$store.commit('SET_LOGIN_STATUS', false)
      this.$store.commit('SET_ROLE', null)
      this.$router.push({ name: 'Home' })
      this.mobileNav = false
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
    },
    closeMobileNav() {
      this.mobileNav = false
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
    padding-right: 5%;
  }

  nav {
    display: flex;
    flex-direction: row;
    padding: 0;
    justify-content: space-between;
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
      padding-left: 0;
      padding-right: 3rem;
    }

    .icon {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      right: 24px;
      height: 100%;
      color: #E7A356;

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

      .logout-btn {
        color: black !important;
        font-size: 13px;

        a {
          color: black !important;
          text-decoration: none;

          &:hover,
          &:active,
          &:visited {
            color: #E7A356;
          }
        }
      }

      li {
        margin-left: 0;

        .link {
          color: #000000;

          &:hover {
            color: #E7A356;
          }
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

  .link.active-link {
    color: #E7A356;
  }
}

@media (max-width: 750px) {
  header {
    .navbar-container {
      padding-right: 2%;
    }

    .branding img {
      width: 60%;
    }

    nav .navigation {
      display: none;
    }
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
