<template>
    <div class="asd">
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
.asd {
  padding-top: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-bottom: 100px;
}

.message{
  margin-top: 50px;
}

@media (max-width: 768px) {
  .asd {
    padding-top: 200px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 100px;
  }
}
</style>
