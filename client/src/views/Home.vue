<template>
 <div> <Navbar /> <carousel /> <bestfeatures /> <SlideShow /> <ServicesButton />
  </div>
</template>

<script>
import Navbar from '../component/Nav/Navbar.vue'
import carousel from '../component/Home/carousel.vue'
import ServicesButton from '../component/Home/ServicesButton.vue'
import bestfeatures from '../component/Home/bestfeatures.vue'
import SlideShow from '../component/Home/SlideShow.vue'

export default {
  name: 'home',
  components: {
    Navbar,
    carousel,
    ServicesButton,
    bestfeatures,
    SlideShow
  }
}
</script>

<style>
</style>
