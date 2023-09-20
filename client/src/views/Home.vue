<template>
 <div> <Navbar /> <carousel /> <bestfeatures /> <SlideShow />
  </div>
</template>

<script>
import Navbar from '../component/Nav/Navbar.vue'
import carousel from '../component/Home/carousel.vue'
import bestfeatures from '../component/Home/bestfeatures.vue'
import SlideShow from '../component/Home/SlideShow.vue'

export default {
  name: 'home',
  components: {
    Navbar,
    carousel,
    bestfeatures,
    SlideShow
  }
}
</script>

<style>
</style>
