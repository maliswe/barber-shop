<template>
    <div>
        <headerPhoto/> <textSection/> <whoAreWe/>
        <p> This is the about us page</p>
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
</style>
