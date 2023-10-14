<!--
* The "Home" component is the landing page of your application, consisting of a carousel, featured content, and a section showcasing the best services.
* It communicates with the "Carousel," "Features," and "OurBestServices" child components.
-->
<template>
  <div class="container-fluid">
    <div>
      <Carousel />
    </div>
    <div>
      <features />
    </div>
    <div>
      <ourBestServices />
    </div>
  </div>
</template>

<script>
import Carousel from '../component/Home/carousel.vue'
import Features from '../component/Home/bestfeatures.vue'
import ourBestServices from '../component/Home/ourBestServices.vue'

export default {
  name: 'Home',
  components: {
    Carousel,
    Features,
    ourBestServices
  }
}
</script>

<style lang="scss" scoped>
.container-fluid {
  padding-left: 0;
  padding-right: 0;
}

</style>
