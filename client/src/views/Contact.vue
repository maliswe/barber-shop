<template>
    <div class="container">
        <contactPhoto class="photo"/>
        <messageBoxNonUser class="message"/>
    </div>
</template>

<script>
import contactPhoto from '../component/contactUs/contactInfo.vue'
import messageBoxNonUser from '../component/contactUs/messageBoxNonUser.vue'

export default {
  name: 'About',
  components: {
    contactPhoto,
    messageBoxNonUser
  }
}
</script>

<style>
.container{
  display: flex;
  flex-direction: row;
  justify-items: flex-start;
}

@media (max-width: 768px) {
  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
