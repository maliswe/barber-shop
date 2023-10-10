<template>
  <div class="register-page">
    <RegisterForm />
    <div class="separator"></div>
    <ThirdPartyRegister />
  </div>
</template>
<script>
import RegisterForm from '../component/Register/ RegisterForm.vue'
import ThirdPartyRegister from '../component/Register/ThirdPartyRegister.vue'

export default {
  components: {
    RegisterForm,
    ThirdPartyRegister
  }
}
</script>

<style lang="scss" scoped>
.register-page {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20% 11%;

  .separator {
    width: 1px;
    height: 26rem;
    background-color: #534d4dbb; // light gray, adjust as needed
    margin: 0 20px; // give some space between components
  }
    // Media query for phone size or smaller devices
    @media (max-width: 768px) {
    flex-direction: column; // stack children vertically
    justify-content: center; // center vertically
    align-items: center; // center horizontally

    .separator {
      width: 26rem; // make it horizontal for mobile
      height: 1px; // thin line
      margin: 60px 0; // give vertical space now instead of horizontal
    }
  }

}
</style>
