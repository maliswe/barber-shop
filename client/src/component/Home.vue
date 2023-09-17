<template>
  <div>
    <ul>
      v-show"mobileNav" class="dropdown-nav">
      <li>
        <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
      </li>
      <li>
        <router-link class="link" :to="{ name: 'About Us' }"
          >About Us</router-link
        >
      </li>
      <li>
        <router-link class="link" :to="{ name: 'Services' }"
          >Services</router-link
        >
      </li>
      <li>
        <router-link class="link" :to="{ name: 'Gallery' }"
          >Gallery</router-link
        >
      </li>
      <li>
        <router-link class="link" :to="{ name: 'Team' }">Team</router-link>
      </li>
      <li>
        <router-link class="link" :to="{ name: 'Testimonials' }"
          >Testimonials</router-link
        >
      </li>
      <li>
        <router-link class="link" :to="{ name: 'Contact' }"
          >Contact</router-link
        >
      </li>
    </ul>

    <div class="home-content">
      <h1>Welcome to our page</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobileNav: true
    }
  }
}
</script>


