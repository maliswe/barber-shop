<template>
    <header :class="{ 'scrolled-nav': scrolledNav }">

        <nav>
            <div class="branding">
                <img src="../../assets/logo.svg" alt="">
            </div>
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
        </nav>

    </header>
</template>

<script>
export default {
  name: 'Navbar',
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
    }
  }
}
</script>

<style lang="scss" scoped>
header {
    backgroud-color: black;
    z-index: 99;
    width: 100%;
    position: fixed;
    transition: .5s ease all;
    color: #00000014;

    nav {
        position: relative;
        display: flex;
        flex-direction: row;
        paddding: 12px 0;
        transition: .5s ease all;
        width: 90%;
        margin: 0 auto;

        @media(min-width: 1140px) {
            max-width: 1140px;
        }

        ul,
        .link {
            font-weight: 500;
            color: black;
            list-style: none;
            text-decoration: none;
        }

        li {
            text-transform: uppercase;
            padding: 16px;
            margin-left: 16px;
        }

        .link {
            font-size: 14px;
            transition: .5s ease all;
            padding-bottom: 4px;
            border-bottom: 1px solid transparent;
        }

        &:hover {
            color: #E7A356;
            border-color: #E7A356;
        }

        .branding {
            display: flex;
            align-items: center;

            img {
                width: 50px;
                transition: .5s ease all;
            }
        }

        .navigation {
            display: flex;
            align-items: center;
            flex: 1;
            justify-content: flex-end;
        }

        .icon {
            display: flex;
            align-items: center;
            position: absolute;
            top: 0;
            right: 24px;
            height: 100%;

            i {
                cursor: pointer;
                font-size: 24px;
                transition: .8s ease all;
            }
        }

        .icon-active {
            transform: rotate(180deg);
        }
        .dropdown-nav{
            display: flex;
            flex-direction: column;
            position:fixed;
            width: 100%;
            max-width: 250px;
            height: 100%;
            backgroud-color: white;
            top: 0;
            left: 0;
            li{
                margin-left: 0;
                .link{
                    color: black;
                }
            }
        }
        .mobile-nav-enter-active,
        .mobile-nav-leave-active {
            transition: 1s ease all;
        }

        .mobile-nav-enter-form,
        .mobile-nav-leave-to {
            transform: translateX(-250px);
        }

        .mobile-nav-enter-to {
            transform: translateX(0);
        }
    }
}

.scrolled-nav {
    background-color: black;
    box-shadow: 0 40px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
}

nav {
    padding: 8px 0;

    .branding {
        img {
            width: 40px;
            box-shadow: 0 40px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
        }
    }
}

</style>
