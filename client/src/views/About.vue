<template>
    <div class="container">
        <headerPhoto/>
        <textSection/>
        <whoAreWe/>
    </div>
</template>

<script>

import headerPhoto from '../component/About/headerPhoto.vue'
import textSection from '../component/About/textSection.vue'
import whoAreWe from '../component/About/whoAreWe.vue'

export default {
  name: 'About',
  components: {
    headerPhoto,
    textSection,
    whoAreWe
  }
}
</script>

<style>
.container{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
