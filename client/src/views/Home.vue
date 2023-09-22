<template>
  <div>
    <Navbar /> <carousel /> <bestfeatures /> <SlideShow /> <ServicesButton /> <Gallery />
  </div>
</template>

<script>
import Navbar from '../component/Nav/Navbar.vue'
import carousel from '../component/Home/carousel.vue'
import ServicesButton from '../component/Home/ServicesButton.vue'
import bestfeatures from '../component/Home/bestfeatures.vue'
import SlideShow from '../component/Home/SlideShow.vue'
import Gallery from './Gallery.vue'

export default {
  name: 'home',
  components: {
    Navbar,
    carousel,
    ServicesButton,
    bestfeatures,
    SlideShow,
    Gallery
  }
}
</script>

<style>
.navbar{
  padding: 0;
}

</style>
