<!--
* The "ContactUs" component is responsible for displaying the contact information.
-->
<template>
    <div class="asd">
        <contactPhoto class="photo"/>
        <messageBoxNonUser v-if="!isLoggedIn" class="message"/>
        <messageBox v-if="isLoggedIn" class="message"/>
    </div>
</template>

<script>
import contactPhoto from '../component/contactUs/contactInfo.vue'
import messageBoxNonUser from '../component/contactUs/messageBoxNonUser.vue'
import messageBox from '../component/contactUs/messageBox.vue'
import { mapState } from 'vuex'

export default {
  name: 'About',
  computed: {
    ...mapState(['isLoggedIn', 'role'])
  },
  components: {
    contactPhoto,
    messageBoxNonUser,
    messageBox
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
