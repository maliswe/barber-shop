<template>
    <div class="container">
        <headerPhoto class="headerPhoto"/>
        <textSection class="textSection"/>
        <whoAreWe class="whoAreWe"/>
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
  align-items: center;
  gap: 75px;
  padding-bottom: 80px;
}

.textSection{
  width: auto;
}

</style>
