<template>
  <div class="container">
    <carousel />
    <bestfeatures />
    <SlideShow />
    <ServicesButton />
    <Gallery />
  </div>
</template>

<script>
import carousel from '../component/Home/carousel.vue'
import ServicesButton from '../component/Home/ServicesButton.vue'
import bestfeatures from '../component/Home/bestfeatures.vue'
import SlideShow from '../component/Home/SlideShow.vue'
import Gallery from '../component/Home/Gallery.vue'

export default {
  name: 'home',
  components: {
    carousel,
    ServicesButton,
    bestfeatures,
    SlideShow,
    Gallery
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 75px;
  padding-bottom: 80px;
}
</style>
