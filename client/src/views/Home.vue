<template>
  <div>
    <carousel />
    <bestfeatures />
    <SlideShow />
    <ServicesButton />
  </div>
</template>

<script>
import carousel from '../component/Home/carousel.vue'
import ServicesButton from '../component/Home/ServicesButton.vue'
import bestfeatures from '../component/Home/bestfeatures.vue'
import SlideShow from '../component/Home/SlideShow.vue'

export default {
  name: 'home',
  components: {
    carousel,
    ServicesButton,
    bestfeatures,
    SlideShow
  }
}
</script>

<style></style>
